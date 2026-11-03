import type { RouterConfig } from '@nuxt/schema';
import { useScrollStore } from '~/stores/scroll';

export default <RouterConfig>{
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    else if (to.hash) useScrollStore().scrollOrSet(to.path, to.hash);
    else return { top: 0 };
  }
};
