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

export { loginState, loginUsername, loginNickname }