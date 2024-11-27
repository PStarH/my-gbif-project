<template>
  <div :class="[`min-h-screen text-gray-800 font-body bg-transition`, currentTheme.bgClass]">
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

    <!-- Hero Section -->
    <section class="hero-section h-screen flex items-end justify-center relative overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out" :style="{
        backgroundImage: `url(${currentSpecies.image})`,
        transform: `scale(${1 + scrollProgress * 0.1}) translateY(${scrollProgress * -50}px)`
      }"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
      <div class="container mx-auto px-4 relative z-10 text-center pb-24">
        <h1 class="text-6xl md:text-8xl font-heading font-bold text-white mb-4 hero-text">{{ currentSpecies.name }}</h1>
        <p class="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">{{ currentSpecies.description }}</p>
        <button @click="changeSpecies"
          :class="[`hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 bg-transition`, currentTheme.buttonClass]">
          Discover Another Species
        </button>
      </div>
    </section>

    <!-- Gallery Section -->
    <section :class="[`py-16 transition-colors duration-300 bg-transition`, currentTheme.sectionClass]">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-heading font-bold mb-12 text-center">Flora & Fauna Wonders</h2>

        <!-- Filters -->
        <div class="mb-8 flex flex-wrap justify-center gap-4">
          <button v-for="filter in filters" :key="filter" @click="toggleFilter(filter)" :class="[
            'px-4 py-2 rounded-full transition-all duration-300',
            activeFilters.includes(filter) ? currentTheme.buttonClass : 'bg-gray-200 text-gray-700'
          ]">
            {{ filter }}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(species, index) in filteredSpecies" :key="index" class="species-card"
            :class="{ 'animate-fade-in': species.show }">
            <div class="relative overflow-hidden rounded-lg shadow-lg">
              <img :src="species.image" :alt="species.name"
                class="w-full h-64 object-cover transition-transform duration-300 hover:scale-110" loading="lazy" />
              <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <h3 class="text-xl font-heading font-semibold mb-2">{{ species.name }}</h3>
                <p class="text-sm">{{ species.habitat }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-12 text-center" v-if="hasMoreSpecies">
          <button @click="loadMoreSpecies"
            :class="[`hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 bg-transition`, currentTheme.buttonClass]">
            Load More
          </button>
        </div>
      </div>
    </section>

    <!-- Community Section -->
    <section :class="[`py-16 transition-colors duration-300 bg-transition`, currentTheme.bgClass]">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-heading font-bold mb-12 text-center">Join Our Community</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            :class="[`p-6 rounded-lg shadow-lg transition-colors duration-300 bg-transition`, currentTheme.cardClass]">
            <h3 class="text-2xl font-heading font-semibold mb-4">Share Your Discoveries</h3>
            <p class="mb-4">Have you captured a stunning photo of local wildlife or discovered a rare plant species?
              Share your findings with our passionate community of nature enthusiasts!</p>
            <button
              :class="[`hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 bg-transition`, currentTheme.buttonClass]">
              Upload Your Photo
            </button>
          </div>
          <div
            :class="[`p-6 rounded-lg shadow-lg transition-colors duration-300 bg-transition`, currentTheme.cardClass]">
            <h3 class="text-2xl font-heading font-semibold mb-4">Join Discussion Forums</h3>
            <p class="mb-4">Engage in lively discussions about conservation efforts, species identification, and the
              latest discoveries in the world of flora and fauna.</p>
            <button
              :class="[`hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 bg-transition`, currentTheme.buttonClass]">
              Explore Forums
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer :class="[`text-white py-8 transition-colors duration-300 bg-transition`, currentTheme.footerClass]">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-heading font-semibold mb-4">Flora & Fauna Gallery</h3>
            <p>Celebrating the diversity of life on Earth, one species at a time.</p>
          </div>
          <div>
            <h3 class="text-xl font-heading font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li v-for="link in navLinks" :key="link.href">
                <!-- Replaced <a> with <router-link> -->
                <router-link :to="link.href" class="hover:text-accent transition-colors duration-300">
                  {{ link.text }}
                </router-link>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-heading font-semibold mb-4">Connect With Us</h3>
            <div class="flex space-x-4">
              <a v-for="social in socialLinks" :key="social.name" :href="social.href"
                class="hover:text-accent transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                {{ social.name }}
              </a>
            </div>
          </div>
        </div>
        <div class="mt-8 text-center">
          <p>&copy; 2023 Flora & Fauna Gallery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  Leaf as LeafIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
  SunMoon as SunMoonIcon,
  Database,
  Camera as CameraIcon,
  Users,
  Brain,
  Home,
  Info,
  Facebook,
  Twitter,
  Instagram,
  Globe
} from 'lucide-vue-next'
const speciesList = ref([
  {
    name: "Giant Panda",
    description: "An iconic bear native to China, known for its distinctive black and white coat.",
    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=1920&q=80",
    habitat: "Forest",
    show: true
  },
  {
    name: "Monarch Butterfly",
    description: "A migratory butterfly known for its striking orange and black wings.",
    image: "/monarch-butterfly.jpg",
    habitat: "Various",
    show: true
  },
  {
    name: "Rafflesia",
    description: "The world's largest individual flower, known for its strong odor.",
    image: "/rafflesia.jpg",
    habitat: "Rainforest",
    show: true
  },
  {
    name: "Blue Whale",
    description: "The largest animal known to have ever existed, a majestic marine mammal.",
    image: "/blue-whale.jpg",
    habitat: "Ocean",
    show: true
  },
  {
    name: "Sequoia Tree",
    description: "One of the world's tallest and most massive tree species.",
    image: "/tree.webp",
    habitat: "Forest",
    show: true
  },
  {
    name: "Chameleon",
    description: "A reptile famous for its ability to change color and its independently moving eyes.",
    image: "/chameleon.jpeg",
    habitat: "Various",
    show: true
  },
])

const navLinks = [
  { href: "/", text: "Home" },
  { href: "/community", text: "Community" },
  { href: "/database", text: "Database" },
  { href: "/about", text: "About" },
]

const socialLinks = [
  { name: "Facebook", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "Instagram", href: "#" },
]

const currentSpecies = ref(speciesList.value[Math.floor(Math.random() * speciesList.value.length)])
const scrollProgress = ref(0)

const themes = [
  {
    name: 'Forest',
    bgClass: 'bg-gradient-to-br from-green-100 to-green-300',
    navClass: 'bg-green-800 bg-opacity-90',
    sectionClass: 'bg-green-50',
    cardClass: 'bg-white bg-opacity-80',
    buttonClass: 'bg-green-600',
    footerClass: 'bg-green-900',
  },
  {
    name: 'Ocean',
    bgClass: 'bg-gradient-to-br from-blue-100 to-blue-300',
    navClass: 'bg-blue-800 bg-opacity-90',
    sectionClass: 'bg-blue-50',
    cardClass: 'bg-white bg-opacity-80',
    buttonClass: 'bg-blue-600',
    footerClass: 'bg-blue-900',
  },
  {
    name: 'Savanna',
    bgClass: 'bg-gradient-to-br from-yellow-100 to-yellow-300',
    navClass: 'bg-yellow-800 bg-opacity-90',
    sectionClass: 'bg-yellow-50',
    cardClass: 'bg-white bg-opacity-80',
    buttonClass: 'bg-yellow-600',
    footerClass: 'bg-yellow-900',
  },
]

const currentTheme = ref(themes[0])
let themeIndex = 0

const toggleTheme = () => {
  themeIndex = (themeIndex + 1) % themes.length
  currentTheme.value = themes[themeIndex]
}

const changeSpecies = () => {
  const randomIndex = Math.floor(Math.random() * speciesList.value.length)
  currentSpecies.value = speciesList.value[randomIndex]
}

const handleScroll = () => {
  const scrollPosition = window.scrollY
  const windowHeight = window.innerHeight
  scrollProgress.value = Math.min(scrollPosition / windowHeight, 1)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// New features
const filters = ['All', 'Forest', 'Ocean', 'Rainforest', 'Various']
const activeFilters = ref(['All'])

const toggleFilter = (filter) => {
  if (filter === 'All') {
    activeFilters.value = ['All']
  } else {
    const allIndex = activeFilters.value.indexOf('All')
    if (allIndex > -1) {
      activeFilters.value.splice(allIndex, 1)
    }
    const index = activeFilters.value.indexOf(filter)
    if (index > -1) {
      activeFilters.value.splice(index, 1)
    } else {
      activeFilters.value.push(filter)
    }
    if (activeFilters.value.length === 0) {
      activeFilters.value = ['All']
    }
  }
}

const filteredSpecies = computed(() => {
  if (activeFilters.value.includes('All')) {
    return speciesList.value
  }
  return speciesList.value.filter(species => activeFilters.value.includes(species.habitat))
})

const hasMoreSpecies = ref(true)
const loadMoreSpecies = () => {
  // Simulating loading more species
  const newSpecies = [
    {
      name: "Red Panda",
      description: "A small arboreal mammal native to the eastern Himalayas and southwestern China.",
      image: "https://images.unsplash.com/photo-1525869916826-972885c91c1e?auto=format&fit=crop&w=1920&q=80",
      habitat: "Forest",
      show: false
    },
    {
      name: "Jellyfish",
      description: "A free-swimming marine animal with a gelatinous umbrella-shaped bell and trailing tentacles.",
      image: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1920&q=80",
      habitat: "Ocean",
      show: false
    }
  ]

  setTimeout(() => {
    newSpecies.forEach(species => {
      species.show = true
      speciesList.value.push(species)
    })
    hasMoreSpecies.value = false // For demo purposes, disable after one load
  }, 500)
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Open+Sans:wght@400;600&display=swap');

:root {
  --color-accent: #f76c6c;
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Open Sans', sans-serif;
}

.font-heading {
  font-family: var(--font-heading);
}

.font-body {
  font-family: var(--font-body);
}

.hero-section {
  background-attachment: fixed;
}

.hero-text {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.species-card {
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.species-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.bg-transition {
  transition: background-color 0.5s, color 0.5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
</style>

