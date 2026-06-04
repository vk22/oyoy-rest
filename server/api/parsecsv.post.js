import CSVService from "~~/server/services/csvService.js"
import SubscribersService from "~~/server/services/subscribersService.js"
const sleep = ms => new Promise(r => setTimeout(r, ms))
export default defineEventHandler(async (event) => {
    await requireAuth(event);
  console.log('readcsv')
  const body = await readBody(event)
  const csvData = await CSVService.fetchFile(body.fileUrl)
  for (let i = 0; i < csvData.length; i++) {
    if (i === 0) { 
      continue; 
    }
    const element = csvData[i];
    const candidate = { name: element[0], email: element[1] }
    const result = await SubscribersService.add(candidate)
    console.log('result ', result)
    // await sleep(1000);

  }
  return {
    success: true,
    status: 'success',
    data: true
  }

})