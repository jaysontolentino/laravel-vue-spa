import './style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {router} from './router'
import App from './App.vue'

import { IoSyncOutline, FaSpinner  } from 'oh-vue-icons/icons'

addIcons(IoSyncOutline, FaSpinner )

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.component('v-icon', OhVueIcon)
app.mount('#app')
