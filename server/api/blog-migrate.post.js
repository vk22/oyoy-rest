import { Blog } from "~~/server/models/blog-model";

export default defineEventHandler( async (event) => {
    const allPosts = await Blog.find().sort({ date: -1 });
    /// reforma
    console.log('blog-migrate start')
    for (const post of allPosts) {
        if (post.images.length) {
            post.mainImage = post.images[0];
            post.previewImage = post.images[0];
            post.images.shift();
            await post.save();
        }
    }
    console.log('blog-migrate end')

    return {
        success: true
    }

})