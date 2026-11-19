import { defineStore } from 'pinia';

/** Mainly used for scrolling to elements in async components */
export const useScrollStore = defineStore('scroll', {
  state: () => ({
    pendingHash: ''
  }),
  actions: {
    setPendingHash(hash: string) {
      this.pendingHash = hash.startsWith('#') ? hash.substring(1) : hash;
    },
    clearPendingHash() {
      this.pendingHash = '';
    },

    /** Try to scroll to the hash if it exists, set pendingHash if it doesn't */
    scrollOrSet(to_path: string, to_hash: string) {
      if (!to_hash) return;
      this.setPendingHash(to_hash);
      // It's possible that when the scrollBehavior is triggered the page has
      // not yet changed so checking current path is necessary.
      if (
        useRoute().path === to_path &&
        document.getElementById(this.pendingHash)
      )
        this.scrollAndClear();
    },

    /**
     * Scroll to the element with pendingHash and clear it
     * This should be called after the async component has mounted / updated
     */
    scrollAndClear() {
      if (!this.pendingHash) return;
      const element = document.getElementById(this.pendingHash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        highlightElement(element);
      }
      this.clearPendingHash();
    }
  }
});
