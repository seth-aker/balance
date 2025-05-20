import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { IUserStore, UserStoreModel } from "./UserStore";
export const RootStoreModel = types.model({
    userStore: types.optional(UserStoreModel, {} as IUserStore)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}