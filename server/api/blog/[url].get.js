import { Blog } from "~~/server/models/blog-model";

export default defineEventHandler( async (event) => {
    try {    
        const url = getRouterParam(event, 'url')
        console.log('url ', url)
        // const url = event.context.params.id;
        const eventOne = await Blog.findOne({url: url})
        return eventOne
        
    } catch (error) {
        console.log('error ', error)
    }

})