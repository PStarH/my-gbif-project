import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // Import the router

// Import Vue Leaflet components from the correct package
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet' // Updated import

// Import Leaflet's CSS
import 'leaflet/dist/leaflet.css'

const app = createApp(App)

// Register Vue Leaflet components globally
app.component('l-map', LMap)
app.component('l-tile-layer', LTileLayer)
app.component('l-marker', LMarker)
app.component('l-popup', LPopup)

app.use(router) // Use the router
  .mount('#app')
