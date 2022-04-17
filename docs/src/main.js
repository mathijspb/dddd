import { createApp } from 'vue';
import App from './app/index.vue';
import VueHighlightJS from 'vue3-highlightjs';

import './assets/highlightjs-monokai-sublime-custom.css';

const app = createApp(App);
app.use(VueHighlightJS);
app.mount('#app');
