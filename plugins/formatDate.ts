export default defineNuxtPlugin(nuxtApp => {

  return {
    provide: {
      formatDate(dateInit: string) {
        var monthsArr = [
          "January", "February", "March", "April", "May", "June", 
          "July", "August", "September", "October", "November", "December"
        ]
        var date = new Date(dateInit)
        const dd = (date.getDate() < 10 ? '0' : '') + date.getDate()
        const MM = monthsArr[date.getMonth()]
        const yyyy = date.getFullYear()
        return (dd + ' ' + MM + ' ' + yyyy)
      }
    }
  }
})