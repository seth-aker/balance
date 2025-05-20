import { IUserStoreSnapshotOut } from "@/store/UserStore";

export interface IUserResponse {
    error: string | null,
    data: IUserStoreSnapshotOut
}
export const fetchUser: (url: string) => Promise<IUserResponse> = async (url: string) => {
    await new Promise((resolve) => setTimeout(resolve,250));
    return {error: null, data: {firstName: "Seth", lastName: "Aker", email: "saker132@gmail.com", userId: "1234567890", colorPreference: 'system'}}
}