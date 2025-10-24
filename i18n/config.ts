// 用来存 i18n 相关的配置。基本是名称相关，剩下在 nuxt.config.ts

export const nuxtI18nDefaultLocale = 'zh-cn';

// 这个非常的规律，但是动态生成的话 TypeScript 看不出来它很规律，暂时不太有想法
export const nuxtI18nLocales = [
  {
    code: 'zh-cn',
    language: 'zh-CN',
    name: '简体中文',
    file: 'zh-CN.ts'
  },
  // {
  //   code: 'en-us',
  //   language: 'en-US',
  //   name: 'English(en-US)',
  //   file: 'en-US.ts'
  // }
] as const;

const codeMap = {
  'zh-cn': 'zhCN',
  // 'en-us': 'enUS'
} as const;

export const i18nCodeToContent = (locale: NuxtI18nCode) => codeMap[locale];

export type NuxtI18nCode = keyof typeof codeMap;

export type NuxtI18nContentCode = (typeof codeMap)[keyof typeof codeMap];
