import { Nav } from "~~/server/models/nav-model";
import { Blog } from "~~/server/models/blog-model";
import { Event } from "~~/server/models/event-model";

const getItems = async () => {
  const blog = await Blog.find().sort({ date: -1 });
  const events = await Event.find().sort({ date: -1 });
   return {
    "Blog": blog.length,
    "Events": events.length,
   }
}

const checkIfDataExist = async (data, itemsForCheck) => {
  return Promise.all(
    data.map(async (el) => {
      if (itemsForCheck.indexOf(el.text) > -1) {
        const items = await getItems();
        el.isActive = items[el.text] ? true : false;
      }
      return el
    })
  )
}

export default defineEventHandler( async (event) => {
    const data = await Nav.find().sort({ order: 1 });
    const dataChecked = await checkIfDataExist(data, ['Events', 'Blog']);
    // console.log('dataChecked ', dataChecked)
    return {
      success: true,
      data: dataChecked
    }
})