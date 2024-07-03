<template>
  <header class="zjs-header flex_between pd_sm mb_xs text_nowrap">
    <h3 class="zjs-htitle mg_0 fw_bold">
      {{ t('header.zjsTitle') }}
      <span class="fs_6">
        <a class="text_dec_none" href="https://www.zjson.net/old">
          {{ t('header.oldVersion') }}
        </a>
      </span>
    </h3>
    <a-alert class="zjs-alert mx_sm text_center ov_hidden" :type="format.type">
      <template #message>
        <div class="fs_5">
          <div ref="greetingRef">{{ format.msg || greetingWrod }}</div>
        </div>
      </template>
    </a-alert>
    <div class="zjs-hbtns flex_start">
      <a-button class="hd-btn btn-lang" size="small" type="text" @click="toggleLanguage">
        {{ locale === 'en' ? '简体中文' : 'English' }}
      </a-button>
      <a-popover placement="bottom">
        <template #content>
          <div class="zjs-theme-conf flex_col">
            <a-button
              class="fs_5 mb_xs"
              size="small"
              :class="{ active: themeSetting === 'select' }"
              @click="handleThemeSetting('select')"
            >
              {{ t('header.keepSelect') }}
            </a-button>
            <a-button
              class="fs_5"
              size="small"
              :class="{ active: themeSetting === 'system' }"
              @click="handleThemeSetting('system')"
            >
              {{ t('header.followSys') }}
            </a-button>
          </div>
        </template>
        <a-button
          class="hd-btn btn-theme pd_0 flex_center"
          size="small"
          type="text"
          @click="toggleThemeMode"
        >
          <SvgDay v-if="themeMode === 'dark'" />
          <SvgNight v-else />
        </a-button>
      </a-popover>
      <a-button
        class="hd-btn btn-settings pd_0 flex_center"
        size="small"
        type="text"
        @click="handleOpenNpm"
      >
        <SvgNpm />
      </a-button>
      <a-button
        class="hd-btn btn-settings pd_0 flex_center"
        size="small"
        type="text"
        @click="handleOpenGithub"
      >
        <GithubOutlined />
      </a-button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import SvgDay from '@/assets/svg/day.svg'
import SvgNight from '@/assets/svg/night.svg'
import SvgNpm from '@/assets/svg/npm.svg'
import { storeToRefs, useAppStore, useEditorStore } from '@/stores'
import { GithubOutlined } from '@ant-design/icons-vue'
import { computed, ref, watch } from 'vue'
import {
  ANIMATE_CLASSES_IN,
  ANIMATE_CLASSES_OUT,
  GREETINGS_EN,
  GREETINGS_CN,
  ZJSON_THEME_LANGUAGE,
} from '@/config'
import { randomNum } from '@/utils'
import type { IThemeSetting } from '@/types'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const { formatResult } = storeToRefs(useEditorStore())
const { themeMode, themeSetting } = storeToRefs(useAppStore())

const noticeMap = {
  en: {
    ost: (idx: number, exp: string) => `Expect a string in line: ${idx}`,
    col: (idx: number, exp: string) => `Expect a colon in line: ${idx}`,
    val: (idx: number, exp: string) => `Invalid value in line: ${idx}`,
    end: (idx: number, exp: string) => `Expect a comma or a \"${exp}\" in line: ${idx}`,
    war: (idx: number, exp: string) => `Formated ${idx} lines, abnormal JSON source`,
    scc: (idx: number, exp: string) => `Success formated ${idx} lines`,
    err: (idx: number, exp: string) => `Parse Error, an excessive abnormal Json`,
  },
  zh: {
    ost: (idx: number, exp: string) => `第${idx}行，期望一个“String”！`,
    col: (idx: number, exp: string) => `第${idx}行，期望一个“冒号”！`,
    val: (idx: number, exp: string) => `第${idx}行，不是一个合法的值！`,
    end: (idx: number, exp: string) => `第${idx}行，期望一个“逗号”或一个“${exp}”！`,
    war: (idx: number, exp: string) => `非正常Json转换，行数：${idx}行！`,
    scc: (idx: number, exp: string) => `格式化成功，行数：${idx}行！`,
    err: (idx: number, exp: string) => `解析出错，过大的非正常Json字符串！`,
  },
} as Record<string, any>

const format = computed(() => {
  if (formatResult.value && formatResult.value.result) {
    const { fmtSign, fmtLines, errIndex, errExpect, fmtType } = formatResult.value
    const type = fmtType === 'danger' ? 'error' : fmtType
    const msg = noticeMap[locale.value][fmtSign]?.(errIndex || fmtLines, errExpect)
    return { type, msg }
  } else {
    return { type: 'info', msg: '' }
  }
})

/**
 * ===========================================================================
 * 欢迎语动画
 * ===========================================================================
 */

let animationTimer: any = null
const greetingDft = computed(() => locale.value === 'en' ? 'Hello, welcome to use zjson.' : '你好，欢迎使用转杰森！')
const greetingWrod = ref(greetingDft.value)
const greetingRef = ref()
const greetingIn = () => {
  const idx = randomNum(ANIMATE_CLASSES_IN.length)
  greetingRef.value.className = ANIMATE_CLASSES_IN[idx]
}
const greetingOut = () => {
  const idx = randomNum(ANIMATE_CLASSES_OUT.length)
  greetingRef.value.className = ANIMATE_CLASSES_OUT[idx]
}
const animationGreeting = () => {
  setTimeout(() => {
    if (!formatResult.value.result) {
      greetingWrod.value = greetingDft.value
      greetingIn()
      clearInterval(animationTimer)
      animationTimer = setInterval(() => {
        greetingOut()
        setTimeout(() => {
          const greetings = locale.value === 'en' ? GREETINGS_EN : GREETINGS_CN
          const gidx = randomNum(greetings.length)
          greetingWrod.value = greetings[gidx]
          greetingIn()
        }, 500)
      }, 5000)
    } else {
      clearInterval(animationTimer)
    }
  })
}
watch([formatResult, locale], () => animationGreeting())

/**
 * ===========================================================================
 * 响应页面事件
 * ===========================================================================
 */

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'zh' : 'en'
  localStorage.setItem(ZJSON_THEME_LANGUAGE, locale.value)
}

const handleThemeSetting = (conf: IThemeSetting) => {
  themeSetting.value = conf
}

const toggleThemeMode = () => {
  themeMode.value = themeMode.value === 'light' ? 'dark' : 'light'
}

const handleOpenNpm = () => {
  window.open('https://www.npmjs.com/package/format-to-json', '_blank')
}

const handleOpenGithub = () => {
  window.open('https://github.com/CN-Tower/zjson', '_blank')
}
</script>

<style lang="scss">
.dark-mode {
  .zjs-header {
    .zjs-alert.ant-alert-info {
      background: #1668dc0f;
    }
  }
}
.zjs-header {
  .zjs-htitle,
  .zjs-hbtns {
    width: 200px;
    flex-shrink: 0;
  }
  .zjs-hbtns {
    .btn-lang {
      width: 90px;
    }
    .hd-btn {
      height: 26px;
      margin-left: 11px;
      &.btn-settings {
        width: 26px;
        font-size: 16px;
      }
      &.btn-theme {
        width: 26px;
        svg {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
  .zjs-alert {
    height: 28px;
    width: 100%;
    max-width: 980px;
    transform: translateY(3px);
  }
}
.zjs-theme-conf {
  .ant-btn {
    width: 100px;
    &.active {
      color: var(--primary-color);
      border: 1px solid var(--primary-color);
    }
  }
}
</style>
