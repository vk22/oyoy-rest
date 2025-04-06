import SubscribersService from "~~/server/services/subscribersService.js"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return SubscribersService.add(body)
})