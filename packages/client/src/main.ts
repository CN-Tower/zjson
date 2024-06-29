import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css'

import './assets/css/theme.css'
import './assets/css/variables.css'
import './assets/css/utilities.css'

import './styles/global.scss'
import './styles/shared.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')
