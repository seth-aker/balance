import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import { withSetPropAction } from "../helpers/withSetPropAction";

export const TransactionModel = types.model({
    id: types.identifier,
    amountCents: types.number,
    createdBy: types.string,
    category: types.string,
    createdOn: types.Date,
    type: types.enumeration(['Credit', 'Debit', 'Cash']),
    paid: types.maybe(types.boolean)
}).actions(withSetPropAction)

export interface ITransaction extends Instance<typeof TransactionModel>{}
export interface ITransactionSnapshotIn extends SnapshotIn<typeof TransactionModel>{}
export interface ITransactionSnapshotOut extends SnapshotOut<typeof TransactionModel>{}