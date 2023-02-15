import { atom } from "recoil";

export const UserData = atom({
    key: "User",
    default: '',
});

export const UserData2 = atom({
    key: "User2",
    default: '',
});

export const UserDataFollowers = atom({
    key: "UserFollowers",
    default: '',
});
