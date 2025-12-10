export function* reverseIterator(arr) {
  let i = arr.length - 1;
  while (i >= 0) yield [i, arr[i--]];
}
export const BToMB = (byteSize, fixed = 3) => {
  return (byteSize / 1024 / 1024).toFixed(fixed);
};

export const copyToClipboard = (locale, text, name = '') => {
  const lang = (() => {
    switch (locale) {
      case 'zh-cn':
        return {
          copy: '复制',
          success: '成功',
          failure: '失败'
        };
      case 'en-us':
        return {
          copy: 'copy',
          success: 'success',
          failure: 'failure'
        };
    }
  })();
  navigator.clipboard
    .writeText(text)
    .then(() => {
      ElMessage.success(`${lang.copy}${name}${lang.success}`);
    })
    .catch((err) => {
      ElMessage.success(`${lang.copy}${lang.failure}:${err}`);
    });
};

export const setNestedKeyValue = (objects, strings, keyPath) => {
  // 确保对象数组和字符串数组的长度相同
  if (objects.length !== strings.length) {
    console.error('对象数组和字符串数组长度不匹配');
    return;
  }

  // 将 keyPath 转换为数组形式（如果传的是字符串）
  if (typeof keyPath === 'string') {
    keyPath = keyPath.split('.');
  }

  // 遍历对象数组，按指定的路径添加或修改值
  objects.forEach((obj, index) => {
    // 使用递归设置嵌套的键值
    setValueByPath(obj, keyPath, strings[index]);
  });

  return objects;
};

const setValueByPath = (obj, path, value) => {
  // 遍历路径中的每一层，逐层创建
  path.reduce((acc, key, i) => {
    if (i === path.length - 1) {
      acc[key] = value; // 设置最终的键值
    } else {
      // 如果对象的键不存在，则创建该键并赋值为对象
      if (!acc[key]) {
        acc[key] = {};
      }
    }
    return acc[key];
  }, obj);
};

export const getSpecifiedTitle = (linkItem) => {
  if (Array.isArray(linkItem.title))
    return linkItem.title[linkItem.tIndex ? linkItem.tIndex : 0];
  else return linkItem.title;
};

// title index
export const useTIndex = (linkItem, tIndex) => {
  return { ...linkItem, tIndex };
};

// hash index
export const useHIndex = (linkItem, hIndex) => {
  return { ...linkItem, hIndex };
};

export const useHighlightWatch = (switchHash) => {
  const highBrightnessControllerStore = useHighBrightnessControllerStore();
  const route = useRoute();
  watch(
    () => highBrightnessControllerStore.obj[route.path.replace(/\/+$/, '')],
    () => {
      switchHash();
    },
    {
      flush: 'post'
    }
  );
  onMounted(() => {
    switchHash();
  });
};

// 盘古的简单版本，只在有部分头尾字符时加个空格，用于组合已知且有限的 SSR 场景
// 盘古还有个特点是不会删多余空格，如果多语言的话要么中文双空格要么英文缺空格了
export const spaceWord = (word) =>
  word.replace(/^[\w()]/, (m) => ` ${m}`).replace(/[\w()]$/, (m) => `${m} `);
