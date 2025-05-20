import * as Service from '@/service/userService';
import { applySnapshot, Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { withSetPropAction } from './helpers/withSetPropAction';
export const UserStoreModel = types.model({
    firstName: '',
    lastName: '',
    email: '',
    userId: '',
    colorPreference: ''
}).actions(withSetPropAction)
.actions((store) => ({async fetch() {
    const res = await Service.fetchUser("/profile")
    if(res.error) {
        console.log(res.error)
        return
    }
    applySnapshot(store, res.data);

}}));

export interface IUserStore extends Instance<typeof UserStoreModel> {}
export interface IUserStoreSnapshotIn extends SnapshotIn<typeof UserStoreModel> {}
export interface IUserStoreSnapshotOut extends SnapshotOut<typeof UserStoreModel> {}