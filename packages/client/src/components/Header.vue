<template>
  <header class="zjs-header flex_between pd_sm mb_xs text_nowrap">
    <h3 class="mg_0 fw_bold">
      转杰森 | ZJSON
      <span class="fs_6">
        <a class="text_dec_none" href="https://www.zjson.net/old">（回到旧版）</a>
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
      <a-button class="hd-btn" size="small" type="text" @click="toggleLanguage" disabled>
        English
      </a-button>
      <a-button
        class="hd-btn btn-theme pd_0 flex_center"
        size="small"
        type="text"
        @click="toggleThemeMode"
      >
        <SvgDay v-if="themeMode === 'dark'" />
        <SvgNight v-else />
      </a-button>
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
import { ANIMATE_CLASSES_IN, ANIMATE_CLASSES_OUT, GREETINGS_CN } from '@/config'
import { randomNum } from '@/utils'

const { themeMode } = storeToRefs(useAppStore())
const { formatResult } = storeToRefs(useEditorStore())

const noticeMap = {
  ost: (idx: number, exp: string) => `第${idx}行，期望一个“String”！`,
  col: (idx: number, exp: string) => `第${idx}行，期望一个“冒号”！`,
  val: (idx: number, exp: string) => `第${idx}行，不是一个合法的值！`,
  end: (idx: number, exp: string) => `第${idx}行，期望一个“逗号”或一个“${exp}”！`,
  war: (idx: number, exp: string) => `非正常Json转换，行数：${idx}行！`,
  scc: (idx: number, exp: string) => `格式化成功，行数：${idx}行！`,
  err: (idx: number, exp: string) => `解析出错，过大的非正常Json字符串！`,
} as Record<string, any>

const format = computed(() => {
  if (formatResult.value && formatResult.value.result) {
    const { fmtSign, fmtLines, errIndex, errExpect, fmtType } = formatResult.value
    const type = fmtType === 'danger' ? 'error' : fmtType
    const msg = noticeMap[fmtSign]?.(errIndex || fmtLines, errExpect)
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
const greetingDefault = '你好，欢迎使用转杰森！'
const greetingWrod = ref(greetingDefault)
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
      greetingWrod.value = greetingDefault
      greetingIn()
      clearInterval(animationTimer)
      animationTimer = setInterval(() => {
        greetingOut()
        setTimeout(() => {
          const gidx = randomNum(GREETINGS_CN.length)
          greetingWrod.value = GREETINGS_CN[gidx]
          greetingIn()
        }, 500)
      }, 5000)
    } else {
      clearInterval(animationTimer)
    }
  })
}
watch(formatResult, () => animationGreeting())

/**
 * ===========================================================================
 * 响应页面事件
 * ===========================================================================
 */

const toggleLanguage = () => {}

const toggleThemeMode = () => {
  if (themeMode.value === 'light') {
    themeMode.value = 'dark'
    ;(window as any).monaco?.editor?.setTheme('vs-dark')
  } else {
    themeMode.value = 'light'
    ;(window as any).monaco?.editor?.setTheme('vs')
  }
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
  .zjs-hbtns {
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
    max-width: 780px;
    transform: translateY(3px);
  }
}
</style>
