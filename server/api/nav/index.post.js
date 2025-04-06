import { Nav } from "~~/server/models/nav-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    const navNew = await Nav.create(body)
    if (navNew) {
      return {
        success: true,
        message: 'Nav created successfully',
        data: navNew
      }
    } else {
      return {
        success: false,
        message: 'Something wrong'
      }
    }

})