import { createApp } from 'vue'
import App from './App.vue'

// Если у вас есть глобальные стили для тестирования
// import './styles.css';

const app = createApp(App)

// Здесь можно подключить плагины, если они нужны вашим сниппетам
// Например: i18n, Pinia или ваши UI-киты
// app.use(pinia);

app.mount('#app')
