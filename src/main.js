import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import "bootstrap"

createApp(App).use(createPinia()).mount('#app')
