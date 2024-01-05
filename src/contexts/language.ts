import {atom} from "recoil";

export const languageState = atom<string>({
    key: "languageState",
    default: window.sessionStorage.getItem("language") === "en" ? "en" : "ko",
})