import CryptoJS from "crypto-js";
import { Token } from "../Types/types";
const secretekey = import.meta.env.VITE_SECRETETOKEN;

export const decryptCode = ({token}: Token) => {
    const bytes = CryptoJS.AES.decrypt(token, secretekey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};


