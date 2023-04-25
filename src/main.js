import './style.css'
import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import router from './router'
import App from './App.vue'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import { IoSyncOutline, FaSpinner,FaRegularEdit, FaRegularTrashAlt, FaUserPlus  } from 'oh-vue-icons/icons'

addIcons(IoSyncOutline, FaSpinner, FaRegularEdit, FaRegularTrashAlt, FaUserPlus )

const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})

const app = createApp(App)

app.use(pinia)
app.use(router)

app.component('Icon', OhVueIcon)
app.component('DataTable', Vue3EasyDataTable)

app.mount('#app')
