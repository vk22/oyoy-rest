import { Blog } from "../models/blog-model.js";


async function start() {
  /// reforma
  console.log('reforma start')
  const allPosts = await Blog.find({});
  for (const post of allPosts) {
    if (post.images.length) {
      post.mainImage = post.images[0].file;
      post.previewImage = post.images[0].file;
      post.images.shift();
      await post.save();
    }
  }
  console.log('reforma end')

  return {
    success: true,
  }

}

start();
