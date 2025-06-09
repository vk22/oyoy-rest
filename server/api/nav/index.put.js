import { Nav } from "~~/server/models/nav-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    const navOne = await Nav.findById(body._id)
    if (!navOne) return false
    navOne.text = body.text
    navOne.href = body.href
    navOne.isHomePageAnchor = body.isHomePageAnchor
    navOne.isActive = body.isActive
    navOne.isPublished = body.isPublished
    navOne.order = body.order
    const saveItem = await navOne.save()
    if (saveItem) {
      return {
        success: true,
        message: 'nav saved successfully',
        data: saveItem
      }
    } else {
      return {
        success: false,
        message: 'Something wrong'
      }
    }

})