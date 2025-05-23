import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "./helpers/withSetPropAction";
import { ITransaction, ITransactionSnapshotIn, TransactionModel } from "./models/Transaction";

export const TransactionStoreModel = types.model({
    pendingTransactions: types.array(TransactionModel),
    appliedTransactions: types.array(TransactionModel),
    selectedTransaction: types.maybe(types.reference(TransactionModel)),
    bankBalanceCents: types.optional(types.number, 0),
}).views((store) => ({
    get getBalanceActualCents() {
        return store.pendingTransactions.reduce((total, value) => {
            return total - value.amountCents
        }, store.bankBalanceCents)
    }
})).actions((store) => ({
    addPendingTransaction(transaction: ITransactionSnapshotIn | ITransaction) {
        store.pendingTransactions.push(transaction)
        store.pendingTransactions.sort((a,b) => a.createdOn.valueOf() - b.createdOn.valueOf())
    },
    removePendingTransaction(id: string) {
        store.pendingTransactions.replace(store.pendingTransactions.filter((value) => value.id !== id))
    },
    addAppliedTransaction(transaction: ITransactionSnapshotIn | ITransaction) {
        store.appliedTransactions.push(transaction);
        store.appliedTransactions.sort((a,b) => a.createdOn.valueOf() - b.createdOn.valueOf());
    },
    removeAppliedTransaction(id: string) {
        store.appliedTransactions.replace(store.appliedTransactions.filter((value) => value.id !== id))
    }
}))
.actions(withSetPropAction)

export interface ITransactionStore extends Instance<typeof TransactionStoreModel> {}
export interface ITransactionStoreSnapshotIn extends SnapshotIn<typeof TransactionStoreModel> {}
export interface ITransactionStoreSnapshotOut extends SnapshotOut<typeof TransactionStoreModel> {}
