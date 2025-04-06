import { Subscribers } from "~~/server/models/subscribers-model";
const result = {
    success: {
      success: true,
      status: 'success',
      message: "Thank you for subscribing to the newsletter"
    },
    dublicate: {
      success: true,
      status: 'dublicate',
      message: "Your email already exists"
    },
    error: {
      success: false,
      status: 'error',
      message: "There was an error"
    }
  }
class SubscribersService {
    constructor() {
    }
    async add (data) {
        console.log('SubscribersService add ', data)
        const candidate = await Subscribers.findOne({ 'email': data.email });
        if (candidate) return result.dublicate;
        const newItem = new Subscribers(data);
        try {
            const saving = await newItem.save();
            if (saving) {
            return result.success
            } else {
            return result.error
            }
        } catch (error) {
            return error.message
        }
    
    }

}
export default new SubscribersService();