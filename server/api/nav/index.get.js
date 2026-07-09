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
  const items = await getItems();

  return Promise.all(
    data.map(async (el) => {
      if (itemsForCheck.indexOf(el.text) > -1) {
        el.isActive = items[el.text] ? true : false;
      }
      return el
    })
  )
}

export default defineEventHandler( async (event) => {
  if (event.context.mongoUnavailable) {
    return {
      success: true,
      data: []
    }
  }

  try {
    const data = await Nav.find().sort({ order: 1 });
    const dataChecked = await checkIfDataExist(data, ['Events', 'Blog']);
    return {
      success: true,
      data: dataChecked
    }
  } catch (error) {
    console.error("Failed to load nav", error);
    return {
      success: true,
      data: []
    }
  }
})
