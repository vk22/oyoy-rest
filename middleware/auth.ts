import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const token = useCookie('token'); // get token from cookies
  // console.log('token.value ', token.value)
  // console.log('to ', to)

  if (token.value) {
    // check if value exists
    // todo verify if token is valid, before updating the state
    authenticated.value = true; // update the state to authenticated
  }

  // if token exists and url is /login redirect to homepage
  if (token.value && to?.name === 'login') {
    return navigateTo('/admin/reservations');
  }

  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== 'login') {
    abortNavigation();
    return navigateTo('/login');
  }
});
