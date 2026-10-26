import { Blog } from "~~/server/models/blog-model";

export default defineEventHandler(async () => {

    const urls = [];

    try {
      const menus = await getFullMenuCatalog();
      const lastmod = menus.reduce((latest, menu) => {
        if (!menu.updatedAt) return latest;
        return !latest || menu.updatedAt > latest ? menu.updatedAt : latest;
      }, null);
      urls.push({ loc: "/full-menu", ...(lastmod ? { lastmod } : {}) });
    } catch (error) {
      console.log("error ", error);
      urls.push({ loc: "/full-menu" });
    }

    try {
      const allBlogPosts = await Blog.find({published: true}).sort({ date: -1 });
      allBlogPosts.forEach(el => {
        urls.push({ loc: `/blog/${el.url}` });
      })
    } catch (error) {
        console.log('error ', error)
    }

    return urls
});
