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
        <h1 class="text-4xl font-heading font-bold mb-12 text-center tracking-wider">Biodiversity Database</h1>

        <!-- Search Toggle and Bar -->
        <div class="mb-12 max-w-2xl mx-auto">
          <div class="mb-4">
            <div :class="[`inline-flex p-1 rounded-md`, currentTheme.cardClass]">
              <button @click="setSearchType('species')" :class="[`px-4 py-2 rounded-md transition-all duration-300 ease-in-out text-sm font-medium`,
                searchType === 'species' ? currentTheme.buttonClass : 'bg-transparent text-gray-700']">
                Species
              </button>
              <button @click="setSearchType('literature')" :class="[`px-4 py-2 rounded-md transition-all duration-300 ease-in-out text-sm font-medium`,
                searchType === 'literature' ? currentTheme.buttonClass : 'bg-transparent text-gray-700']">
                Literature
              </button>
              <button @click="setSearchType('dataset')" :class="[`px-4 py-2 rounded-md transition-all duration-300 ease-in-out text-sm font-medium`,
                searchType === 'dataset' ? currentTheme.buttonClass : 'bg-transparent text-gray-700']">
                Dataset
              </button>
            </div>
          </div>
          <div class="relative">
            <div class="flex items-center">
              <input v-model="searchQuery" type="text"
                :class="[`w-full px-4 py-3 rounded-l-lg focus:outline-none shadow-md`, currentTheme.inputClass]"
                :placeholder="getPlaceholder()" @input="fetchSuggestions" @keyup.enter="performSearch" />
              <button @click="performSearch"
                :class="[`px-6 py-3 rounded-r-lg text-white font-semibold transition-all duration-300 ease-in-out shadow-md`, currentTheme.buttonClass]">
                <SearchIcon class="w-5 h-5" />
              </button>
            </div>
            <!-- Dropdown for suggestions -->
            <div v-if="suggestions.length > 0" class="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
              <ul class="py-1">
                <li v-for="suggestion in suggestions" :key="suggestion.key" @click="selectSuggestion(suggestion)"
                  class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  {{ suggestion.title || suggestion.scientificName }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center mb-4">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          <span class="ml-2 text-lg">Loading...</span>
        </div>

        <!-- Species Information -->
        <div v-if="selectedSpecies" :class="[`mb-8 p-6 rounded-lg shadow-lg`, currentTheme.cardClass]">
          <h2 class="text-2xl font-heading font-bold mb-4">{{ selectedSpecies.scientificName }}</h2>
          <router-link :to="`/species/${selectedSpecies.key}`" class="text-blue-500 hover:underline">View
            Details</router-link>
          <p class="mb-2"><strong>Common Name:</strong> {{ selectedSpecies.vernacularName || 'Not available' }}</p>
          <p class="mb-2"><strong>Kingdom:</strong> {{ selectedSpecies.kingdom || 'Not available' }}</p>
          <p class="mb-2"><strong>Phylum:</strong> {{ selectedSpecies.phylum || 'Not available' }}</p>
          <p class="mb-2"><strong>Class:</strong> {{ selectedSpecies.class || 'Not available' }}</p>
          <p class="mb-2"><strong>Order:</strong> {{ selectedSpecies.order || 'Not available' }}</p>
          <p class="mb-4"><strong>Family:</strong> {{ selectedSpecies.family || 'Not available' }}</p>

          <!-- Display Taxa -->
          <p class="mb-2"><strong>Taxa:</strong>
            {{ selectedSpecies.kingdom }} -> {{ selectedSpecies.phylum }} -> {{ selectedSpecies.class }} -> {{
              selectedSpecies.order }} -> {{ selectedSpecies.family }} -> {{ selectedSpecies.genus || 'Not available' }}
          </p>

          <!-- Display Occurrence Count -->
          <p class="mb-2"><strong>Occurrences:</strong> {{ selectedSpecies.occurrenceCount || 'Not available' }}</p>

          <div v-if="selectedSpecies.media && selectedSpecies.media.length > 0" class="mb-4">
            <img :src="selectedSpecies.media[0].identifier" :alt="selectedSpecies.scientificName"
              class="w-full max-w-md mx-auto rounded-lg shadow-md" />
          </div>
          <p class="text-sm italic">Data provided by GBIF</p>
        </div>

        <!-- Species Results -->
        <!-- Species Results -->
        <div v-if="speciesResults.length > 0"
          :class="[`mb-8 rounded-lg shadow-lg overflow-hidden`, currentTheme.cardClass]">
          <h3 class="text-2xl font-heading font-bold p-6 border-b border-gray-200">Species Results</h3>
          <ul class="divide-y divide-gray-200">
            <li v-for="species in speciesResults" :key="species.key"
              class="p-6 hover:bg-gray-50 transition duration-150 ease-in-out">
              <article class="flex flex-col md:flex-row md:items-start md:space-x-6">
                <div class="md:w-1/3 mb-4 md:mb-0">
                  <div v-if="species.imageUrl" class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <img :src="species.imageUrl" :alt="species.scientificName" class="object-cover w-full h-full"
                      @error="handleImageError">
                  </div>
                  <div v-else
                    class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                    <span class="text-gray-400 text-sm">No image available</span>
                  </div>
                </div>
                <div class="md:w-2/3">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="text-xl font-semibold">
                      <router-link :to="`/species/${species.key}`"
                        class="hover:text-accent transition-colors duration-300">
                        <i>{{ species.scientificName }}</i>
                      </router-link>
                    </h4>
                    <span :class="[`px-2 py-1 text-xs font-semibold rounded-full`, currentTheme.buttonClass]">
                      {{ species.occurrenceCount }} occurrences
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 mb-2">{{ species.author }}</p>
                  <p v-if="species.publishedIn" class="text-sm text-gray-600 mb-2">
                    <strong>Published in:</strong> {{ species.publishedIn }}
                  </p>
                  <p class="text-sm text-gray-600 mb-2">
                    <strong>Classification:</strong>
                    {{ species.kingdom || 'Unknown' }} >
                    {{ species.phylum || 'Unknown' }} >
                    {{ species.class || 'Unknown' }} >
                    {{ species.order || 'Unknown' }} >
                    {{ species.family || 'Unknown' }} >
                    {{ species.genus || 'Unknown' }}
                  </p>
                  <div class="flex flex-wrap gap-2 mt-3">
                    <span v-if="species.rank"
                      :class="[`px-2 py-1 text-xs font-semibold rounded-full`, currentTheme.buttonClass]">
                      {{ species.rank }}
                    </span>
                    <span v-if="species.taxonomicStatus"
                      :class="[`px-2 py-1 text-xs font-semibold rounded-full`, currentTheme.buttonClass]">
                      {{ species.taxonomicStatus }}
                    </span>
                  </div>
                </div>
              </article>
            </li>
          </ul>
          <div class="p-6 border-t border-gray-200">
            <button v-if="hasMoreSpecies" @click="loadMoreSpecies"
              :class="[`w-full px-4 py-2 rounded-md text-white font-semibold transition-all duration-300 ease-in-out`, currentTheme.buttonClass]">
              View More Species
            </button>
          </div>
        </div>
        <!-- Literature Results -->
        <div v-if="literatureResults.length > 0" :class="[`mb-8 p-6 rounded-lg shadow-lg`, currentTheme.cardClass]">
          <h3 class="text-2xl font-heading font-bold mb-4">Literature Results</h3>
          <ul class="space-y-4">
            <li v-for="item in literatureResults" :key="item.id" class="border-b border-gray-200 pb-4 last:border-b-0">
              <h4 class="text-lg font-semibold mb-2">{{ item.title }}</h4>
              <p class="text-sm mb-1"><strong>Authors:</strong>
                <span v-if="item.authors && Array.isArray(item.authors)">
                  {{ item.authors.map(a => `${a.firstName} ${a.lastName}`).join('; ') }}
                </span>
                <span v-else>No authors available</span>
              </p>
              <p class="text-sm mb-1"><strong>Published:</strong>
                <span v-if="item.published">{{ new Date(item.published).toLocaleDateString() }}</span>
                <span v-else>Publication date not available</span>
              </p>
              <p class="text-sm mb-1"><strong>DOI:</strong>
                <a v-if="item.identifiers.doi" :href="`https://doi.org/${item.identifiers.doi}`" target="_blank"
                  rel="noopener noreferrer" class="text-accent hover:underline">
                  {{ item.identifiers.doi }}
                </a>
                <span v-else>No DOI available</span>
              </p>
              <p class="text-sm mb-1"><strong>Abstract:</strong> {{ item.abstract }}</p>
              <p class="text-sm mb-1"><strong>Link:</strong>
                <a v-if="item.websites.length > 0" :href="item.websites[0]" target="_blank" rel="noopener noreferrer"
                  class="text-accent hover:underline">
                  View More
                </a>
                <span v-else>No link available</span>
              </p>
            </li>
          </ul>
          <button v-if="hasMoreLiterature" @click="loadMoreLiterature"
            :class="[`mt-4 px-4 py-2 rounded-md text-white font-semibold transition-all duration-300 ease-in-out`, currentTheme.buttonClass]">
            View More Literature
          </button>
        </div>

        <!-- Dataset Results -->
        <div v-if="datasetResults.length > 0" :class="[`mb-8 p-6 rounded-lg shadow-lg`, currentTheme.cardClass]">
          <h3 class="text-2xl font-heading font-bold mb-4">Dataset Results</h3>
          <ul class="space-y-4">
            <li v-for="dataset in datasetResults" :key="dataset.key"
              class="border-b border-gray-200 pb-4 last:border-b-0">
              <h4 class="text-lg font-semibold mb-2">{{ dataset.title }}</h4>
              <p class="text-sm mb-1"><strong>Type:</strong> {{ dataset.type }}</p>
              <p class="text-sm mb-1"><strong>Description:</strong> {{ dataset.description }}</p>
              <p class="text-sm mb-1"><strong>DOI:</strong>
                <a v-if="dataset.doi" :href="`https://doi.org/${dataset.doi}`" target="_blank" rel="noopener noreferrer"
                  class="text-accent hover:underline">
                  {{ dataset.doi }}
                </a>
                <span v-else>No DOI available</span>
              </p>
            </li>
          </ul>
          <button v-if="hasMoreDatasets" @click="loadMoreDatasets"
            :class="[`mt-4 px-4 py-2 rounded-md text-white font-semibold transition-all duration-300 ease-in-out`, currentTheme.buttonClass]">
            View More Datasets
          </button>
        </div>

        <!-- Error Message -->
        <div v-if="error" :class="[`p-4 rounded-lg text-white`, currentTheme.errorClass]">
          {{ error }}
        </div>

        <!-- Example usage of taxa and backboneConstantKey -->
        <!-- <div v-if="taxa.length">
          <h2>Taxa</h2>
          <ul>
            <li v-for="item in taxa" :key="item.id">{{ item.name }}</li>
          </ul>
        </div> -->

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
            <p class="leading-relaxed font-body">All data provided by <a href="https://www.gbif.org/" target="_blank"
                rel="noopener noreferrer" class="text-accent hover:underline">GBIF</a>.
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
import { ref, onMounted } from 'vue'
import axios from 'axios'
import {
  Leaf as LeafIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
  SunMoon as SunMoonIcon,
  Search as SearchIcon,
  Home,
  Users,
  Database,
  Info
} from 'lucide-vue-next'

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
    inputClass: 'bg-green-100 border-green-300 focus:border-green-500',
    errorClass: 'bg-red-500',
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
    inputClass: 'bg-blue-100 border-blue-300 focus:border-blue-500',
    errorClass: 'bg-red-500',
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
    inputClass: 'bg-yellow-100 border-yellow-300 focus:border-yellow-500',
    errorClass: 'bg-red-500',
    icon: SunMoonIcon
  },
]

const currentTheme = ref(themes[0])
const themeIndex = ref(0)
const searchType = ref('species')
const searchQuery = ref('')
const selectedSpecies = ref(null)
const speciesResults = ref([])
const literatureResults = ref([])
const datasetResults = ref([])
const loading = ref(false)
const error = ref(null)
const suggestions = ref([])
const offset = ref(0)
const limit = ref(5)
const hasMoreSpecies = ref(false)
const hasMoreLiterature = ref(false)
const hasMoreDatasets = ref(false)

// Track unique species keys to prevent duplicates
const uniqueSpeciesKeys = new Set()

// Classification Order
const classificationOrder = ['kingdom', 'phylum', 'class', 'order', 'family', 'genus']

// Capitalize Function
const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1)

// Show Classification Function
const showClassification = (species) => {
  const speciesRank = species.rank ? species.rank.toLowerCase() : ''
  return classificationOrder.some(taxa => species[taxa] && taxa !== speciesRank)
}

// Handle Image Load Error
const handleImageError = (event) => {
  event.target.style.display = 'none'
}

// Fetch Density Map URL
const fetchDensityMapUrl = (taxonKey) => {
  return `https://api.gbif.org/v1/map/density/tile.png?x=0&y=0&z=0&palette=yellows_reds&key=${taxonKey}&type=TAXON&resolution=4`
}

// Toggle Theme Function
const toggleTheme = () => {
  themeIndex.value = (themeIndex.value + 1) % themes.length
  currentTheme.value = themes[themeIndex.value]
}

// Set Search Type Function
const setSearchType = (type) => {
  searchType.value = type            // Update the current search type
  searchQuery.value = ''             // Clear the search input
  suggestions.value = []             // Clear the suggestions dropdown
  resetSearch()                      // Reset search results and related states
}

// Reset Search Function
const resetSearch = () => {
  selectedSpecies.value = null
  speciesResults.value = []
  literatureResults.value = []
  datasetResults.value = []
  offset.value = 0
  hasMoreSpecies.value = false
  hasMoreLiterature.value = false
  hasMoreDatasets.value = false
  error.value = null
  uniqueSpeciesKeys.clear() // Clear the set to allow new unique entries
}

// Get Placeholder Function
const getPlaceholder = () => {
  switch (searchType.value) {
    case 'species':
      return 'Enter species name...'
    case 'literature':
      return 'Enter keywords...'
    case 'dataset':
      return 'Enter dataset name...'
    default:
      return 'Search...'
  }
}

// Perform Search Function
const performSearch = async () => {
  if (!searchQuery.value) return

  loading.value = true
  error.value = null
  resetSearch()

  try {
    if (searchType.value === 'species') {
      await searchSpecies()
    } else if (searchType.value === 'literature') {
      await searchLiterature()
    } else if (searchType.value === 'dataset') {
      await searchDatasets()
    }
  } catch (err) {
    error.value = `An error occurred while searching. Please try again.`
    console.error('Error during search:', err)
  } finally {
    loading.value = false
  }
}

// Search Species Function
const searchSpecies = async () => {
  if (!searchQuery.value.trim()) return;

  loading.value = true;
  error.value = null;

  try {
    const response = await axios.get(`https://api.gbif.org/v1/species/search`, {
      params: {
        q: searchQuery.value,
        limit: limit.value,
        offset: offset.value,
      }
    });

    console.log('Species API Response:', response.data);

    if (response.data.results && response.data.results.length > 0) {
      // Map the results to include the necessary fields
      speciesResults.value = response.data.results.map(species => ({
        key: species.key,
        scientificName: species.scientificName,
        vernacularName: species.vernacularNames.length > 0 ? species.vernacularNames[0] : 'Not available',
        kingdom: species.kingdom,
        phylum: species.phylum,
        class: species.class,
        order: species.order,
        family: species.family,
        genus: species.genus,
        occurrenceCount: species.numOccurrences, // Use numOccurrences for occurrence count
      }));
      hasMoreSpecies.value = response.data.endOfRecords === false;
      offset.value += limit.value;
    } else {
      error.value = 'No species found. Please try a different search term.';
    }
  } catch (err) {
    error.value = 'Error fetching species data.';
    console.error('Error details:', err);
  } finally {
    loading.value = false;
  }
};

// Search Literature Function
const searchLiterature = async () => {
  try {
    const response = await axios.get(`https://api.gbif.org/v1/literature/search`, {
      params: {
        q: searchQuery.value,
        limit: limit.value,
        offset: offset.value
      },
      timeout: 5000
    })

    if (response.data.results && response.data.results.length > 0) {
      literatureResults.value = [...literatureResults.value, ...response.data.results]
      hasMoreLiterature.value = response.data.endOfRecords === false
      offset.value += limit.value
    } else if (literatureResults.value.length === 0) {
      error.value = 'No literature found. Please try a different search term.'
    }
  } catch (err) {
    if (err.code === 'ECONNABORTED') {
      error.value = 'Request timed out. Please try again.'
    } else {
      a
      error.value = 'Error fetching literature data.'
    }
    console.error(err)
  }
}

// Search Datasets Function
const searchDatasets = async () => {
  try {
    const response = await axios.get(`https://api.gbif.org/v1/dataset/search`, {
      params: {
        q: searchQuery.value,
        limit: limit.value,
        offset: offset.value
      }
    })

    if (response.data.results && response.data.results.length > 0) {
      datasetResults.value = [...datasetResults.value, ...response.data.results]
      hasMoreDatasets.value = response.data.endOfRecords === false
      offset.value += limit.value
    } else if (datasetResults.value.length === 0) {
      error.value = 'No datasets found. Please try a different search term.'
    }
  } catch (err) {
    error.value = 'Error fetching dataset data.'
    console.error(err)
  }
}

// Fetch Suggestions Function
const fetchSuggestions = async () => {
  if (searchQuery.value.length < 3) {
    suggestions.value = []
    return
  }

  try {
    let response
    if (searchType.value === 'species') {
      response = await axios.get(`https://api.gbif.org/v1/species/suggest`, {
        params: {
          q: searchQuery.value,
          limit: 5
        }
      })
      suggestions.value = response.data.map(suggestion => ({
        scientificName: suggestion.scientificName,
        key: suggestion.key
      }))
    } else if (searchType.value === 'dataset') {
      response = await axios.get(`https://api.gbif.org/v1/dataset/search`, {
        params: {
          q: searchQuery.value,
          limit: 5
        }
      })
      suggestions.value = response.data.results.map(dataset => ({
        title: dataset.title,
        key: dataset.key
      }))
    } else {
      suggestions.value = []
    }
  } catch (err) {
    console.error('Error fetching suggestions:', err)
    suggestions.value = []
  }
}

// Select Suggestion Function
const selectSuggestion = (suggestion) => {
  searchQuery.value = suggestion.scientificName || suggestion.title
  suggestions.value = []
  performSearch()
}

// Load More Functions
const loadMoreSpecies = () => {
  searchSpecies()
}

const loadMoreLiterature = () => {
  searchLiterature()
}

const loadMoreDatasets = () => {
  searchDatasets()
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

const backboneConstantKey = ref('YOUR_BACKBONE_CONSTANT_KEY') // Replace with actual key or fetch

// Example fetch function
// const fetchTaxa = async () => {
//   try {
//     const response = await axios.get('https://api.gbif.org/v1/taxa') // Updated API endpoint
//     taxa.value = response.data
//   } catch (error) {
//     console.error('Error fetching taxa:', error)
//   }
// }

// onMounted(() => {
//   fetchTaxa()
// })
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Open+Sans:wght@400;600&display=swap');

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

/* Leaflet map container */
#occurrenceMap {
  z-index: 1;
}

/* Ensure Leaflet controls are above the map */
.leaflet-top,
.leaflet-bottom {
  z-index: 2 !important;
}

.density-map {
  width: 100%;
  height: auto;
  border-radius: 8px;
  /* Optional: for rounded corners */
}

/* Adjust or add any additional styles as needed */
</style>