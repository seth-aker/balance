import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { ITransactionStore, TransactionStoreModel } from "./TransactionStore";
import { IUserStore, UserStoreModel } from "./UserStore";
export const RootStoreModel = types.model({
    userStore: types.optional(UserStoreModel, {} as IUserStore),
    transactionStore: types.optional(TransactionStoreModel, {} as ITransactionStore)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}