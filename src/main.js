import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';    // node_moduleディレクトリ内
import ja from 'element-plus/es/locale/lang/ja'

const app = createApp(App)
app.use(ElementPlus,{locale: ja,})
app.mount('#app')
// <div id="app"></div> にマウント
// つまり、App.vueに書かれた内容を<div id="app"></div>に挿入