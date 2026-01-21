<script setup>
import { Icon } from '#components';
const { t, tm, _locale } = useI18n();

const getComp = computed(() => {
  const linkValue = tm('allUniversalLink');
  const localLink = linkValue.local;

  return [
    [
      {
        title: t('BarLeft.projects'),
        children: [
          localLink.aoscOs,
          localLink.afterglow,
          localLink.liblol,
          localLink.oma,
          localLink.l10n,
          { title: ['支持中心'], url: '/support' }
        ],
        show: true
      },
      {
        title: t('BarLeft.news'),
        children: [
          localLink.news,
          localLink.events,
          localLink.gallery,
          useTIndex(localLink.contact, 1),
          useTIndex(linkValue.aoscWiki, 1)
        ],
        show: true
      },
      {
        title: t('BarLeft.culture'),
        children: [
          localLink.about,
          localLink.internship,
          localLink.sponsors,
          localLink.crowdsourcing,
          localLink.guidelines,
          localLink.mascot
        ],
        show: true
      },
      {
        title: t('BarLeft.infrastructures'),
        children: [
          localLink.paste,
          linkValue.forum,
          useTIndex(linkValue.githubOrg, 1),
          linkValue.mail20,
          linkValue.buildbots,
          linkValue.buildit,
          useTIndex(linkValue.aoscPackagesSite, 1)
        ],
        show: true
      }
    ],
    ['0', '1', '2', '3']
  ];
});

const navigationList = computed(() => {
  return getComp.value[0];
});

const defaultOpeneds = computed(() => {
  return getComp.value[1];
});

const openMenuList = new Set();

const menuDivRef = useTemplateRef('menuDiv');
const menuRef = useTemplateRef('menu');
const stickyNavRef = useTemplateRef('stickyNav');
const rowHeight = 32;
const chunkPading = 6;
const rowHeightpx = `${rowHeight}px`;

const thisElSubEnum = ref(undefined);

const route = useRoute();

const openMenu = (MenuOpenEvent) => {
  let height =
    navigationList.value[MenuOpenEvent].children.length * rowHeight +
    chunkPading +
    menuDivRef.value.clientHeight;
  for (const item of openMenuList) {
    if (highlyIsQualified(height)) {
      break;
    } else {
      height -=
        navigationList.value[item].children.length * rowHeight + chunkPading;
      closeMenu(item);
    }
  }
  openMenuList.add(MenuOpenEvent);
};

const closeMenu = (MenuOpenEvent) => {
  openMenuList.delete(MenuOpenEvent);
  menuRef.value.close(MenuOpenEvent);
};

const highlyIsQualified = (
  height,
  mainHeight = window.innerHeight -
    stickyNavRef.value.getBoundingClientRect().top -
    // 需要 BarFooter + margin 高度，目前是 2.5rem。应该找个地方统一定义一下比较好
    parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.5
) => {
  // 在中心内容长度小于window.innerHeight时，回到首页弹窗不可能出来
  // 此时高度比较参照中心内容长度即可，不需要算上弹窗和底栏
  // 中心内容长度大于window.innerHeight时，总长度要加上底栏和弹窗和1px的弹窗下边距与window.innerHeight对比
  if (height < mainHeight) return true;
  return false;
};

const { $mitt } = useNuxtApp();
onMounted(() => {
  autoFold();
  $mitt.on('mainDomChange', (newHeight) => {
    retractMenuBar(newHeight);
  });
});
onBeforeUnmount(() => {
  $mitt.off('mainDomChange');
});

const changeThisElSubEnum = () => {
  let thisElSubEnmu_cache = undefined;
  if (route.path !== '/') {
    for (const [index, item] of navigationList.value.entries()) {
      if (item.children.find((item1) => route.path.includes(item1.url))) {
        // 记录当前所在
        thisElSubEnmu_cache = index;
        break;
      }
    }
    if (thisElSubEnum.value !== undefined)
      openMenuList.add(String(thisElSubEnum.value));

    openMenuList.delete(String(thisElSubEnmu_cache));
    thisElSubEnum.value = thisElSubEnmu_cache;
  }
};

const autoFold = (newHeight) => {
  let height = menuDivRef.value.clientHeight;
  // Set 有顺序，这里就从后往前关
  for (const item of [...openMenuList].reverse()) {
    if (highlyIsQualified(height, newHeight)) {
      break;
    } else {
      if (openMenuList.size === 1) break;
      height -=
        navigationList.value[item].children.length * rowHeight + chunkPading;
      closeMenu(item);
    }
  }
};

const retractMenuBar = (newHeight) => {
  changeThisElSubEnum(newHeight);
  autoFold();
};
onMounted(() => {
  // 每次缩放改变的时候，判断有没有栏目需要缩回去，先展开的，优先缩进
  window.onresize = (() => {
    let timeoutID = undefined;
    return () => {
      if (timeoutID !== undefined) clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        autoFold();
        timeoutID = undefined;
      }, 40);
    };
  })();
  // 默认全部展开，找到并记一下目前所在栏目
  for (let i = 0; i < navigationList.value.length; i++) {
    openMenuList.add(String(i));
  }
  // 判断当前所在位置是否需要回到顶部按钮
  // 挂载监听器
  window.addEventListener('scroll', returnFromTop);

  // 当前会触发一次retractMenuBar无需手动处理
  // // 然后在剩余空间里按顺序遍历栏目，能展开尽量展开
  // // 默认全部展开，根据空间从下向上依次关闭，跳过当前栏目
  // let height = menuDivRef.value.clientHeight;
  // for (const [index, item] of reverseIterator(navigationList.value)) {
  //   if (highlyIsQualified(height)) {
  //     break;
  //   }
  //   if (thisElSubEnum.value !== index) {
  //     height -= item.children.length * rowHeight + chunkPading;
  //     closeMenu(String(index));
  //   }
  // }
});

const returnFromTop = (() => {
  let timeoutID = undefined;
  return () => {
    if (timeoutID !== undefined) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      if ((window.scrollY || document.documentElement.scrollTop) > 103) {
        backToTopBtnShow.value = true;
      } else {
        backToTopBtnShow.value = false;
      }
      timeoutID = undefined;
    }, 70);
  };
})();

const backToTopBtnShow = ref(false);
</script>

<template>
  <div id="sticky-nav" ref="stickyNav">
    <Transition name="anim-button">
      <div
        v-show="backToTopBtnShow"
        class="to-top-color mb-[1px] flex justify-between px-2 leading-8 text-white"
        onclick="window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth' 
        })">
        <!-- <el-icon class="my-auto ml-4" size="20"><el-icon-top /></el-icon> -->
        <Icon name="bi:chevron-bar-up" size="20" class="my-auto" />
        <span>{{ $t('BarLeft.returnToTop') }}</span>
      </div>
    </Transition>
    <div ref="menuDiv">
      <el-menu
        ref="menu"
        class="my-el-menu"
        :default-openeds="defaultOpeneds"
        @close="closeMenu"
        @open="openMenu">
        <!-- 它的 index 要求是字符串不然控制台发警告 -->
        <el-sub-menu
          v-for="(item, index) in navigationList"
          :key="`barleft-1-link-${index}`"
          :expand-open-icon="
            h(Icon, { name: 'bi:chevron-double-up', size: 16 })
          "
          :expand-close-icon="
            h(Icon, { name: 'bi:chevron-double-down', size: 16 })
          "
          :index="String(index)">
          <template #title>
            <span>{{ item.title }}</span>
          </template>
          <div class="my-item-ul">
            <AppLink
              v-for="(item2, index2) in item.children"
              :key="`barleft-2-link-${index2}`"
              :to="item2.url"
              class="hover:no-underline">
              <el-menu-item
                :index="`${index}-${index2}`"
                class="my-el-menu-item"
                :class="{
                  'my-el-menu-item-hover': route.path
                    .replace(/\/+$/, '')
                    .trim()
                    .startsWith(item2.url.trim())
                }">
                {{ getSpecifiedTitle(item2) }}
              </el-menu-item>
            </AppLink>
          </div>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<style scoped>
.my-el-menu {
  --el-menu-item-font-size: 12pt;
  --el-menu-bg-color: var(--primary);
  --el-menu-text-color: white;
  --el-menu-active-color: black;
  --el-menu-hover-bg-color: var(--secondary);
  --el-menu-item-height: v-bind(rowHeightpx);
  --el-menu-sub-item-height: v-bind(rowHeightpx);
  --el-menu-base-level-padding: 10px;
  --el-menu-level-padding: 5px;
  border: 0;
}

.my-el-menu-item {
  color: black;
  background-color: #ececec;
}
.my-el-menu-item-hover {
  background-color: #dcdcdc;
}
.my-el-menu-item:hover {
  background-color: #dcdcdc;
}
.to-top-color {
  background-color: var(--primary);
  cursor: pointer;
}
.to-top-color:hover {
  background-color: var(--secondary);
}
.anim-button-enter-active {
  overflow-y: hidden;
  animation: backtotop-slidein 0.15s linear;
}

.anim-button-leave-active {
  overflow-y: hidden;
  animation: backtotop-slidein 0.15s linear reverse;
}

@keyframes backtotop-slidein {
  0% {
    height: 0;
  }

  100% {
    height: 2rem;
  }
}

.my-item-ul {
  padding-top: 3px;
  padding-bottom: 3px;
  background-color: #ececec;
}
</style>
