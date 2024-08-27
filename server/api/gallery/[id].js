import { Gallery } from "~~/server/models/gallery-model";

export default defineEventHandler( async (event) => {
    const id = getRouterParam(event, 'id')
    const galleryItem = await Gallery.findById(id)
    return galleryItem
})