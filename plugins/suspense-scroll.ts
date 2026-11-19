export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    useScrollStore().scrollAndClear()
  })
})
