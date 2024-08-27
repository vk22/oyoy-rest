export default defineNuxtPlugin(nuxtApp => {
  // now available on `nuxtApp.$injected`
  // nuxtApp.provide('injected', () => 'my injected function')

  // You can alternatively use this format, which comes with automatic type support
  return {
    provide: {
      // formatDate(date) {
      //   var date = new Date(date)
      //   var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
      //   var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
      //   var yyyy = date.getFullYear();
      //   // var time = date.toLocaleTimeString();
      //   return (dd + "." + MM + "." + yyyy );
      // },
      formatDate(date) {
        //console.log('formatDate locale ', state.locale)
        var monthsArr = [
          "January", "February", "March", "April", "May", "June", 
          "July", "August", "September", "October", "November", "December"
        ]
        var date = new Date(date)
        const dd = (date.getDate() < 10 ? '0' : '') + date.getDate()
        const MM = monthsArr[date.getMonth()]
        const yyyy = date.getFullYear()
        return (dd + ' ' + MM + ' ' + yyyy)
      }
    }
  }
})