import { Nav } from "~~/server/models/nav-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event);
    const deleted = await Nav.deleteOne({ _id: body._id });
    if (!deleted) return false;
    return {
      success: true,
      message: 'Nav deleted successfully'
    }

})