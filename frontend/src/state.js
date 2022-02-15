import {
    atom,
} from "recoil"

const loginState = atom({
    key: "login",
    default: false,
})

const loginUsername = atom({
    key: "username",
    default: "non-login user username",
})

const loginNickname = atom({
    key: "nickname",
    default: "unknown user",
})

const roleOfUser = atom({
    key: "role",
    default: "ROLE_NONE",
})

const Token = atom({
    key: "token",
    default: "",
})

export { loginState, loginUsername, loginNickname, roleOfUser, Token }