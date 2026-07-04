export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.path === '/aoscc') return navigateTo('/aoscc/2026');
  return;
});
