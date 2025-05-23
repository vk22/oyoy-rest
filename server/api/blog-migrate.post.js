import { Blog } from "~~/server/models/blog-model";

export default defineEventHandler( async (event) => {
    const data = await Blog.find().sort({ date: -1 });
    // console.log('blog-migrate ', data)

    for (let post of data) {
        const isGallery = post.gallery.length;
        const isText = post.text;
        post.contentItems = [];
        if (isText) {
            post.contentItems.push({
                type: 'text',
                data: post.text
            })
        }
        if (isGallery) {
            post.contentItems.push({
                type: 'gallery',
                data: ''
            })
        }

        await post.save();
        console.log('saved')
    }

    return {
      success: true,
      data: data
    }

})