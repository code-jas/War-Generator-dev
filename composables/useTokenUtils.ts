import CryptoJS from "crypto-js";

export const useTokenUtils = () => {
    
    return {

        /**
         * 
         * @param value 
         * @param secret 
         * @returns encrypted data
        */
        encryptData(value: any, secret: string = "cl13nt") {
            return CryptoJS.AES.encrypt(
                JSON.stringify(value) || "",
                secret
            ).toString();
        },

        /**
         * 
         * @param value 
         * @param secret 
         * @returns decrypt data
        */
        decryptData(value: any, secret: string = "cl13nt") {
            const decrypt = CryptoJS.AES.decrypt((value), secret)
                .toString(CryptoJS.enc.Utf8);
            return decrypt ? JSON.parse(decrypt) : {};
        }

    }

};