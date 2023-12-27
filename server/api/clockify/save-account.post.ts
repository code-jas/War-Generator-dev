import { useTokenUtils } from "~/composables/useTokenUtils";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

     setCookie(event, 'user', useTokenUtils().encryptData(JSON.stringify(body)))
    return body;
});
