import { $fetch } from "ofetch";
import Clockify from "../../utils/Clockify";

export default defineEventHandler(async (event) => {
   const config = useRuntimeConfig(event)
   const {apikey, workspaceId,userId, dateRange} : any = await  readBody(event) 
   console.log('userId :>> ', userId);
   
   let response = await $fetch(`/workspaces/${config.workspaceId}/user/${userId}/time-entries`, {
      baseURL: config.baseUrl,
      headers: {'x-api-key': config.apiKey},
   })
   // console.log('response :>> ', response);
   // await Clockify.getWeeklyReport(response);
   const result = dateRange ? 
      await Clockify.getWeeklyReport(response, dateRange[0], dateRange[1]) : 
      await Clockify.getWeeklyReport(response); 
   console.log('result :>> ', JSON.stringify(result,null,2));
   return result
})