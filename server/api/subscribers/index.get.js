import { Subscribers } from "~~/server/models/subscribers-model";

export default defineEventHandler( async (event) => {
    const subscribers = await Subscribers.find().sort({ date: -1 });
    console.log('subscribers ', subscribers)
    return {
      subscribers: subscribers
    }
})