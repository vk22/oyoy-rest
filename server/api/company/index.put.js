import { Company } from "~~/server/models/company-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    console.log('body: ' + JSON.stringify(body))
    const company = await Company.findById(body._id)
    if (!company) return false
    company.address = body.address
    company.phone = body.phone
    company.email = body.email
    company.map = body.map
    company.coords = body.coords

    const saveItem = await company.save()
    console.log('saveItem ', saveItem)
    
    return {
      success: true,
      message: 'Company saved successfully',
      data: saveItem
    }

})