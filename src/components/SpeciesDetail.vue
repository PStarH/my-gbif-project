<template>
  <div :class="[`min-h-screen flex flex-col text-gray-800 font-body bg-transition`, currentTheme.bgClass]">
    <!-- Navigation Bar -->
    <nav :class="[`p-4 fixed w-full z-50 transition-colors duration-300 bg-transition`, currentTheme.navClass]">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/" class="text-2xl font-heading font-bold flex items-center tracking-wide">
          <LeafIcon class="w-8 h-8 mr-2" />
          Flora & Fauna Gallery
        </router-link>
        <div class="flex items-center space-x-6">
          <router-link v-for="link in navLinks" :key="link.href" :to="link.href"
            class="hover:text-accent transition-colors duration-300">{{ link.text }}</router-link>
          <button @click="toggleTheme"
            :class="[`hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg bg-transition`, currentTheme.buttonClass]"
            aria-label="Toggle theme">
            <SunIcon v-if="currentTheme.name === 'Forest'" class="w-6 h-6" />
            <MoonIcon v-if="currentTheme.name === 'Ocean'" class="w-6 h-6" />
            <SunMoonIcon v-if="currentTheme.name === 'Savanna'" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main :class="[`flex-grow py-16 transition-colors duration-300 bg-transition`, currentTheme.sectionClass]"
      style="padding-top: 125px;">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-heading font-bold mb-12 text-center tracking-wider">Species Information and Occurrences
        </h1>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="text-center">
          <p class="text-xl">Loading...</p>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="mb-8 p-6 rounded-lg shadow-lg bg-red-100 text-red-700">
          {{ errorMessage }}
        </div>

        <!-- Species Information -->
        <div v-if="speciesInfo && !isLoading && !errorMessage"
          :class="[`mb-8 p-6 rounded-lg shadow-lg`, currentTheme.cardClass]">
          <h2 class="text-2xl font-heading font-bold mb-4">{{ speciesInfo.scientificName }}</h2>
          <p class="mb-2"><strong>Common Name:</strong> {{ speciesInfo.vernacularName || 'Not available' }}</p>
          <p class="mb-2"><strong>Kingdom:</strong> {{ speciesInfo.kingdom }}</p>
          <p class="mb-2"><strong>Phylum:</strong> {{ speciesInfo.phylum }}</p>
          <p class="mb-2"><strong>Class:</strong> {{ speciesInfo.class }}</p>
          <p class="mb-2"><strong>Order:</strong> {{ speciesInfo.order }}</p>
          <p class="mb-4"><strong>Family:</strong> {{ speciesInfo.family || 'Not available' }}</p>
          <div v-if="speciesInfo.media && speciesInfo.media.length > 0" class="mb-4">
            <img :src="speciesInfo.media[0].identifier" :alt="speciesInfo.scientificName"
              class="w-full max-w-md mx-auto rounded-lg shadow-md" />
          </div>

          <!-- Additional Information -->
          <div class="mt-4">
            <h3 class="text-xl font-semibold mb-2">Conservation Status</h3>
            <p>{{ conservationStatus?.conservation_status || 'Not available' }}</p>
          </div>

          <div class="mt-4">
            <h3 class="text-xl font-semibold mb-2">Taxonomic Order</h3>
            <p>{{ taxOrder?.order || 'Not available' }}</p>
          </div>

          <div class="mt-4">
            <h3 class="text-xl font-semibold mb-2">NCBI Taxonomy</h3>
            <a :href="ncbiTaxonomy?.taxonomy_link" target="_blank" rel="noopener noreferrer">
              {{ ncbiTaxonomy?.species || 'View on NCBI' }}
            </a>
          </div>
        </div>

        <!-- Occurrences Map -->
        <div v-if="occurrences.length > 0 && !isLoading && !errorMessage"
          :class="[`mb-8 p-6 rounded-lg shadow-lg`, currentTheme.cardClass]">
          <h2 class="text-2xl font-heading font-bold mb-4">Occurrences Map</h2>
          <div class="w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            <!-- Removed <client-only> wrapper -->
            <l-map ref="map" v-model:zoom="zoom" :center="center">
              <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                name="OpenStreetMap"></l-tile-layer>
              <l-marker v-for="occurrence in occurrences" :key="occurrence.key"
                :lat-lng="[occurrence.decimalLatitude, occurrence.decimalLongitude]">
                <l-popup>{{ occurrence.scientificName }}</l-popup>
              </l-marker>
            </l-map>
            <!-- End of removed <client-only> wrapper -->
          </div>
        </div>

        <!-- Occurrences List -->
        <div :class="[`mb-8 p-6 rounded-lg shadow-lg`, currentTheme.cardClass]">
          <h2 class="text-2xl font-heading font-bold mb-4">Occurrences</h2>
          <ul class="space-y-2">
            <li v-for="(occurrence, index) in occurrences.slice(0, 3)" :key="occurrence.key">
              {{ occurrence.scientificName }} - Lat: {{ occurrence.decimalLatitude }}, Lon: {{
                occurrence.decimalLongitude }}
            </li>
          </ul>
          <button v-if="occurrences.length > 3" @click="loadMoreOccurrences"
            class="mt-4 bg-green-500 text-white px-4 py-2 rounded">
            See More Occurrences
          </button>
        </div>

        <!-- Datasets -->
        <div :class="[`mb-8 p-6 rounded-lg shadow-lg`, currentTheme.cardClass]">
          <h2 class="text-2xl font-heading font-bold mb-4">Datasets</h2>
          <ul class="space-y-2">
            <li v-for="(dataset, index) in datasets.slice(0, 3)" :key="dataset.key">
              <strong>{{ dataset.title }}</strong> -
              <span>{{ dataset.description.length > 50 ? dataset.description.substring(0, 50) + '...' :
                dataset.description }}</span>
            </li>
          </ul>
          <button v-if="datasets.length > 3" @click="loadMoreDatasets"
            class="mt-4 bg-green-500 text-white px-4 py-2 rounded">
            See More Datasets
          </button>
        </div>

        <!-- Additional Data Sections (e.g., GTDB Clusters, UniProt) -->
        <!-- Add similar sections as needed -->
      </div>
    </main>

    <!-- Footer -->
    <footer :class="[`text-white py-12 transition-colors duration-300 bg-transition`, currentTheme.footerClass]">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-2xl font-heading font-semibold mb-4 tracking-wider">Flora & Fauna Gallery</h3>
            <p class="leading-relaxed font-body">Exploring biodiversity through data and literature.</p>
          </div>
          <div>
            <h3 class="text-2xl font-heading font-semibold mb-4 tracking-wider">Quick Links</h3>
            <ul class="space-y-2">
              <li v-for="link in navLinks" :key="link.href">
                <a :href="link.href" class="hover:text-accent transition-colors duration-300 flex items-center">
                  <component :is="getLinkIcon(link.text)"
                    class="w-6 h-6 mr-2 transition-all duration-300 hover:rotate-6" />
                  {{ link.text }}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-2xl font-heading font-semibold mb-4 tracking-wider">Data Sources</h3>
            <p class="leading-relaxed font-body">
              Species data provided by
              <a href="https://www.gbif.org/" target="_blank" rel="noopener noreferrer"
                class="text-accent hover:underline">
                GBIF
              </a>.
            </p>
          </div>
        </div>
        <div class="mt-8 text-center">
          <p class="font-body">&copy; 2023 Flora & Fauna Gallery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import {
  Leaf as LeafIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
  SunMoon as SunMoonIcon,
  Home,
  Users,
  Database,
  Info
} from 'lucide-vue-next'
import { gbifService } from '../services/gbifService'

// Navigation Links
const navLinks = [
  { href: "/", text: "Home" },
  { href: "/community", text: "Community" },
  { href: "/database", text: "Database" },
  { href: "/about", text: "About" },
]

// Themes Configuration
const themes = [
  {
    name: 'Forest',
    bgClass: 'bg-gradient-to-br from-green-100 to-green-300',
    navClass: 'bg-green-800 bg-opacity-90 backdrop-blur-md',
    sectionClass: 'bg-green-50',
    cardClass: 'bg-white bg-opacity-80 backdrop-blur-md',
    buttonClass: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800',
    footerClass: 'bg-green-900',
    icon: LeafIcon
  },
  {
    name: 'Ocean',
    bgClass: 'bg-gradient-to-br from-blue-100 to-blue-300',
    navClass: 'bg-blue-800 bg-opacity-90 backdrop-blur-md',
    sectionClass: 'bg-blue-50',
    cardClass: 'bg-white bg-opacity-80 backdrop-blur-md',
    buttonClass: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
    footerClass: 'bg-blue-900',
    icon: MoonIcon
  },
  {
    name: 'Savanna',
    bgClass: 'bg-gradient-to-br from-yellow-100 to-yellow-300',
    navClass: '!bg-yellow-800 bg-opacity-90 backdrop-blur-md',
    sectionClass: '!bg-gradient-to-br from-yellow-50 to-orange-100',
    cardClass: 'bg-white bg-opacity-80 backdrop-blur-md',
    buttonClass: 'bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800',
    footerClass: 'bg-yellow-900',
    icon: SunMoonIcon
  },
]

const currentTheme = ref(themes[0])
const themeIndex = ref(0)

// Theme Toggle Function
const toggleTheme = () => {
  themeIndex.value = (themeIndex.value + 1) % themes.length
  currentTheme.value = themes[themeIndex.value]
}

// Get Link Icon Function
const getLinkIcon = (text) => {
  switch (text) {
    case 'Home': return Home
    case 'Community': return Users
    case 'Database': return Database
    case 'About': return Info
    default: return Info
  }
}

// Get Species Data States
const route = useRoute()
const speciesKey = ref(null)

// Species Data States
const speciesInfo = ref(null)
const occurrences = ref([])
const datasets = ref([])
const offsetOccurrences = ref(0)
const offsetDatasets = ref(0)

// Additional Data States
const conservationStatus = ref(null)
const taxOrder = ref(null)
const ncbiTaxonomy = ref(null)
const gtdbClusters = ref([])
const phylogeneticTree = ref('')
const uniProtResults = ref([])
const additionalDataLoaded = ref(false)

// Loading and Error States
const isLoading = ref(false)
const errorMessage = ref(null)

// Fetch Functions
const fetchSpeciesInfo = async (key) => {
  isLoading.value = true
  errorMessage.value = null
  try {
    const response = await axios.get(`https://api.gbif.org/v1/species/${key}`)
    speciesInfo.value = response.data
  } catch (error) {
    console.error('Error fetching species info:', error)
    errorMessage.value = 'Failed to load species information. Please try again later.'
    speciesInfo.value = null
  } finally {
    isLoading.value = false
  }
}

const fetchOccurrences = async (key) => {
  try {
    const response = await axios.get(`https://api.gbif.org/v1/occurrence/search`, {
      params: {
        taxonKey: key,
        limit: 10, // Increased limit for more data points
        offset: offsetOccurrences.value,
        country: 'US' // Example filter; adjust as needed
      }
    })
    // Filter out occurrences without valid coordinates
    const validOccurrences = response.data.results.filter(
      (occurrence) => occurrence.decimalLatitude && occurrence.decimalLongitude
    )
    occurrences.value = [...occurrences.value, ...validOccurrences]
    // Update map center if new occurrences are added
    if (validOccurrences.length > 0 && offsetOccurrences.value === 0) {
      center.value = [validOccurrences[0].decimalLatitude, validOccurrences[0].decimalLongitude]
    }
  } catch (error) {
    console.error('Error fetching occurrences:', error)
    errorMessage.value = 'Failed to load occurrence data.'
  }
}

const fetchDatasets = async (key) => {
  try {
    const response = await axios.get(`https://api.gbif.org/v1/dataset/search`, {
      params: {
        q: speciesInfo.value.scientificName,
        limit: 3,
        offset: offsetDatasets.value
      }
    })
    datasets.value = [...datasets.value, ...response.data.results]
  } catch (error) {
    console.error('Error fetching datasets:', error)
  }
}

const loadMoreOccurrences = async () => {
  offsetOccurrences.value += 3
  await fetchOccurrences(speciesKey.value)
}

const loadMoreDatasets = async () => {
  offsetDatasets.value += 3
  await fetchDatasets(speciesKey.value)
}

const fetchAdditionalData = async () => {
  try {
    if (speciesKey.value) {
      // Fetch Conservation Status
      conservationStatus.value = await gbifService.getIUCNStatus(speciesKey.value)

      // Fetch Taxonomic Order
      taxOrder.value = await gbifService.getTaxOrder(speciesInfo.value.scientificName)

      // Fetch NCBI Taxonomy
      ncbiTaxonomy.value = await gbifService.getNCBITaxonomy(speciesInfo.value.scientificName)

      // Fetch GTDB Clusters
      const gtdbResponse = await gbifService.getGTDBClusters(speciesInfo.value.scientificName)
      gtdbClusters.value = gtdbResponse.clusters

      // Generate Phylogenetic Tree
      const treeResponse = await gbifService.generateWGDTTree(speciesInfo.value.scientificName)
      phylogeneticTree.value = treeResponse.tree

      // Search UniProt
      const uniProtResponse = await gbifService.searchUniProt(speciesInfo.value.scientificName)
      uniProtResults.value = uniProtResponse.results

      additionalDataLoaded.value = true
    }
  } catch (error) {
    console.error('Error fetching additional data:', error)
  }
}

// Map States
const map = ref(null)
const zoom = ref(2)
const center = ref([20, 0])

// Watch for route changes
watch(() => route.params.key, async (newKey) => {
  if (newKey) {
    speciesKey.value = newKey
    // Reset previous data
    speciesInfo.value = null
    occurrences.value = []
    datasets.value = []
    offsetOccurrences.value = 0
    offsetDatasets.value = 0
    additionalDataLoaded.value = false
    conservationStatus.value = null
    taxOrder.value = null
    ncbiTaxonomy.value = null
    gtdbClusters.value = []
    phylogeneticTree.value = ''
    uniProtResults.value = []
    isLoading.value = true
    errorMessage.value = null

    try {
      // Fetch new data
      await fetchSpeciesInfo(speciesKey.value)
      if (speciesInfo.value) {
        await fetchOccurrences(speciesKey.value)
        await fetchDatasets(speciesKey.value)
        await fetchAdditionalData()
      }
    } catch (error) {
      console.error('Error during data fetching:', error)
      errorMessage.value = 'An unexpected error occurred while loading data.'
    } finally {
      isLoading.value = false
    }
  }
}, { immediate: true })
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Open+Sans:wght@400;600&display=swap');
@import 'leaflet/dist/leaflet.css';

:root {
  --color-accent: #6ca3ff;
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Open Sans', sans-serif;
}

.font-heading {
  font-family: var(--font-heading);
}

.font-body {
  font-family: var(--font-body);
}

.bg-transition {
  transition: background-color 0.5s, color 0.5s;
}

.leaflet-top,
.leaflet-bottom {
  z-index: 2 !important;
}
</style>