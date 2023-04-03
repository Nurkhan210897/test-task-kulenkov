import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import '@/assets/main.css'
import Toast from 'vue-toastification'
import type { PluginOptions } from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

loadFonts()

const options: PluginOptions = {
  timeout: 2000
}

createApp(App).use(router).use(vuetify).use(Toast, options).mount('#app')
