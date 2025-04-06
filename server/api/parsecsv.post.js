import CSVService from "~~/server/services/csvService.js"
import SubscribersService from "~~/server/services/subscribersService.js"
export default defineEventHandler(async (event) => {
  console.log('readcsv')
  const csvData = await CSVService.fetchFile("https://8hdewv6u55ya8hjg.public.blob.vercel-storage.com/svg/file-Zdl8MggCHXz720ArkZ9tqPF4SP2WZG.csv")
  for (let i = 0; i < csvData.length; i++) {
    if (i === 0) { 
      continue; 
    }
    const element = csvData[i];
    const candidate = { name: element[0], email: element[1] }
    const result = await SubscribersService.add(candidate)
    console.log('result ', result)

  }
  return {
    csvData: true
  }

})