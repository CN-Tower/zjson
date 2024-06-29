<template>
  <header class="flex_between pd_sm mb_xs text_nowrap">
    <h3 class="mg_0 fw_bold">转杰森 | ZJSON <span class="fs_6"><a class="text_dec_none" href="">（回到旧版）</a></span></h3>
    <a-alert class="hd-alert mx_sm text_center" type="info">
      <template #message>
        <span class="fs_5">格式化成功</span>
      </template>
    </a-alert>
    <div class="hd-btns flex_start">
      <a-button class="mr_sm" size="small" type="text" @click="toggleThemeMode">
        English
      </a-button>
      <a-button class="btn-settings pd_0 flex_center mr_sm" size="small" type="text" @click="toggleThemeMode">
        <GithubOutlined />
      </a-button>
      <a-button class="btn-theme pd_0 flex_center mr_sm" size="small" type="text" @click="toggleThemeMode">
        <SvgDay />
      </a-button>
      <a-button class="btn-settings pd_0 flex_center" size="small" type="text" @click="toggleThemeMode">
        <SettingOutlined />
      </a-button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import SvgDay from '@/assets/svg/day.svg'
import SvgNight from '@/assets/svg/night.svg'
import { storeToRefs, useAppStore } from '@/stores'
import { SettingOutlined, GithubOutlined } from '@ant-design/icons-vue'

const { themeMode } = storeToRefs(useAppStore())

const toggleThemeMode = () => {
  if (themeMode.value === 'light') {
    themeMode.value = 'dark'
    ;(window as any).monaco?.editor?.setTheme('vs-dark')
  } else {
    themeMode.value = 'light'
    ;(window as any).monaco?.editor?.setTheme('vs')
  }
}
</script>

<style lang="scss">
.hd-btns {
  button {
    height: 26px;
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
.hd-alert {
  height: 28px;
  width: 100%;
  max-width: 780px;
}
</style>
