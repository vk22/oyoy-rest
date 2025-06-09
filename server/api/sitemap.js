import { Blog } from "~~/server/models/blog-model";

export default defineEventHandler(async () => {

    try {    
      const allBlogPosts = await Blog.find({published: true}).sort({ date: -1 });
      const urls = allBlogPosts.map(el => { 
        return { loc: `/blog/${el.url}` } 
      })
      return urls
        
    } catch (error) {
        console.log('error ', error)
        return []
    }
});
