import { createApp } from 'vue'
import App from './App.vue'
import VueSpeechRecognition from 'vue-speech-recognition'

createApp(App).use(VueSpeechRecognition).mount('#app')
