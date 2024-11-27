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
    <section class="hero-section h-80 flex items-center justify-center relative overflow-hidden pt-16">
      <div class="absolute inset-0 bg-cover bg-center bg-fixed"
        :style="{ backgroundImage: `url(${currentTheme.heroImage})` }"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
      <div class="container mx-auto px-4 relative z-10 text-center">
        <h1
          class="text-4xl md:text-6xl font-heading font-bold text-white mb-4 shadow-text tracking-wider leading-tight">
          Our Community</h1>
        <p class="text-xl font-body text-white shadow-text leading-relaxed">Connect, Share, and Explore with Fellow
          Nature Enthusiasts</p>
      </div>
    </section>

    <!-- Main Content -->
    <main :class="[`py-16 transition-colors duration-300 bg-transition`, currentTheme.sectionClass]">
      <div class="container mx-auto px-4">
        <!-- Daily Quiz -->
        <section class="mb-16">
          <h2 class="text-3xl font-heading font-bold mb-8 text-center tracking-wider">Daily Quiz</h2>
          <div
            :class="[`p-6 rounded-lg shadow-lg transition-all duration-300 bg-transition hover:shadow-xl`, currentTheme.cardClass]">
            <h3 class="text-xl font-heading font-semibold mb-4">Today's Question:</h3>
            <p class="mb-4 font-body">What is the scientific name of the Giant Panda?</p>
            <form @submit.prevent="submitQuiz">
              <input v-model="quizAnswer" type="text"
                :class="[`w-full p-2 mb-4 border rounded transition-all duration-300`, currentTheme.inputClass]"
                placeholder="Enter your answer">
              <button type="submit"
                :class="[`text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md`, currentTheme.buttonClass]">
                <LeafIcon class="inline-block w-5 h-5 mr-2" />
                Submit Answer
              </button>
            </form>
          </div>
        </section>

        <!-- Discussion Forums -->
        <section class="mb-16">
          <h2 class="text-3xl font-heading font-bold mb-8 text-center tracking-wider">Discussion Forums</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="forum in forums" :key="forum.id"
              :class="[`p-6 rounded-lg shadow-lg transition-all duration-300 bg-transition hover:shadow-xl transform hover:scale-105`, currentTheme.cardClass]">
              <div class="flex items-center mb-4">
                <component :is="forum.icon"
                  class="w-8 h-8 mr-4 text-accent transition-all duration-300 hover:rotate-12" />
                <h3 class="text-xl font-heading font-semibold tracking-wider">{{ forum.name }}</h3>
              </div>
              <p class="mb-4 leading-relaxed font-body">{{ forum.description }}</p>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">{{ forum.topics }} topics</span>
                <button
                  :class="[`text-sm hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out hover:shadow-md bg-transition transform hover:scale-105`, currentTheme.buttonClass]">
                  <MessageSquareIcon class="inline-block w-5 h-5 mr-2" />
                  Join Discussion
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- User Contributions -->
        <section>
          <h2 class="text-3xl font-heading font-bold mb-8 text-center tracking-wider">Recent Contributions</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div v-for="contribution in recentContributions" :key="contribution.id"
              :class="[`p-4 rounded-lg shadow-lg transition-all duration-300 bg-transition hover:shadow-xl transform hover:scale-105`, currentTheme.cardClass]"
              :style="{ height: contribution.height }">
              <div class="relative overflow-hidden rounded-lg mb-4">
                <img :src="contribution.image" :alt="contribution.title"
                  class="w-full h-40 object-cover transition-transform duration-300 hover:scale-110" />
                <div
                  :class="[`absolute inset-0 transition-opacity duration-300 flex items-center justify-center`, contribution.overlay]">
                  <span
                    class="text-white text-lg font-bold opacity-0 hover:opacity-100 transition-opacity duration-300">View</span>
                </div>
              </div>
              <h4 class="text-lg font-heading font-semibold mb-2 tracking-wider">{{ contribution.title }}</h4>
              <p class="text-sm mb-2 leading-relaxed font-body">{{ contribution.description }}</p>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-600">By {{ contribution.user }}</span>
                <button
                  :class="[`text-xs hover:bg-opacity-80 text-white font-bold py-1 px-2 rounded-full transition-all duration-300 ease-in-out hover:shadow-md bg-transition transform hover:scale-105`, currentTheme.buttonClass]">
                  View
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Share Your Passion -->
        <section class="mb-16" style="padding-top: 30px;">
          <h2 class="text-3xl font-heading font-bold mb-8 text-center">Share Your Passion</h2>
          <div
            :class="[`p-6 rounded-lg shadow-lg transition-all duration-300 bg-transition hover:shadow-xl`, currentTheme.cardClass]">
            <div class="flex mb-4">
              <button @click="uploadType = 'picture'"
                :class="[`mr-2 py-2 px-4 rounded transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md`, uploadType === 'picture' ? currentTheme.buttonClass : 'bg-gray-200']">
                <CameraIcon class="inline-block w-5 h-5 mr-2" />
                Picture
              </button>
              <button @click="uploadType = 'article'"
                :class="[`py-2 px-4 rounded transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md`, uploadType === 'article' ? currentTheme.buttonClass : 'bg-gray-200']">
                <FileTextIcon class="inline-block w-5 h-5 mr-2" />
                Article
              </button>
            </div>
            <form @submit.prevent="uploadContent">
              <input v-if="uploadType === 'picture'" type="file" accept="image/*" class="mb-4">
              <textarea v-else v-model="articleContent"
                :class="[`w-full p-2 mb-4 border rounded transition-all duration-300`, currentTheme.inputClass]"
                placeholder="Write your article here..." rows="4"></textarea>
              <button type="submit"
                :class="[`text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md`, currentTheme.buttonClass]">
                <UploadIcon class="inline-block w-5 h-5 mr-2" />
                Upload
              </button>
            </form>
          </div>
        </section>

      </div>
    </main>

    <!-- Footer -->
    <footer
      :class="[`text-white py-8 transition-colors duration-300 bg-transition`, currentTheme.footerClass, 'bg-texture']">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-heading font-semibold mb-4 tracking-wider">Flora & Fauna Gallery</h3>
            <p class="leading-relaxed font-body">Celebrating the diversity of life on Earth, one species at a time.</p>
          </div>
          <div>
            <h3 class="text-xl font-heading font-semibold mb-4 tracking-wider">Quick Links</h3>
            <ul class="space-y-2">
              <li v-for="link in navLinks" :key="link.href">
                <a :href="link.href" class="hover:text-accent transition-colors duration-300 flex items-center">
                  <component :is="getLinkIcon(link.text)"
                    class="w-6 h-6 mr-2 transition-all duration-300 hover:rotate-12" />
                  {{ link.text }}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-heading font-semibold mb-4 tracking-wider">Connect With Us</h3>
            <div class="flex space-x-4">
              <a v-for="social in socialLinks" :key="social.name" :href="social.href"
                class="hover:text-accent transition-colors duration-300">
                <component :is="getSocialIcon(social.name)"
                  class="w-6 h-6 transition-all duration-300 hover:rotate-12" />
              </a>
            </div>
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
import { ref } from 'vue'
import {
  Leaf as LeafIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
  SunMoon as SunMoonIcon,
  TreeDeciduous,
  Globe,
  Camera as CameraIcon,
  Map,
  Home,
  Users,
  Database,
  Info,
  Facebook,
  Twitter,
  Instagram,
  FileText as FileTextIcon,
  Upload as UploadIcon,
  MessageSquare as MessageSquareIcon
} from 'lucide-vue-next'

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

const themes = [
  {
    name: 'Forest',
    bgClass: 'bg-gradient-to-br from-green-100 to-green-300',
    navClass: 'bg-green-800 bg-opacity-90 backdrop-blur-md',
    sectionClass: 'bg-green-50',
    cardClass: 'bg-white bg-opacity-80 backdrop-blur-md',
    buttonClass: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800',
    footerClass: 'bg-green-900',
    inputClass: 'border-green-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50',
    heroImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80'
  },
  {
    name: 'Ocean',
    bgClass: 'bg-gradient-to-br from-blue-100 to-blue-300',
    navClass: 'bg-blue-800 bg-opacity-90 backdrop-blur-md',
    sectionClass: 'bg-blue-50',
    cardClass: 'bg-white bg-opacity-80 backdrop-blur-md',
    buttonClass: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
    footerClass: 'bg-blue-900',
    inputClass: 'border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80'
  },
  {
    name: 'Savanna',
    bgClass: 'bg-gradient-to-br from-yellow-100 to-yellow-300',
    navClass: 'bg-yellow-800 bg-opacity-90 backdrop-blur-md',
    sectionClass: '!bg-gradient-to-br from-yellow-50 to-orange-100',
    cardClass: 'bg-white bg-opacity-80 backdrop-blur-md',
    buttonClass: 'bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800',
    footerClass: 'bg-yellow-900',
    inputClass: 'border-yellow-300 focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50',
    heroImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1920&q=80'
  },
]

const currentTheme = ref(themes[0])
const themeIndex = ref(0)

const toggleTheme = () => {
  themeIndex.value = (themeIndex.value + 1) % themes.length
  currentTheme.value = themes[themeIndex.value]
}

const quizAnswer = ref('')
const uploadType = ref('picture')
const articleContent = ref('')

const submitQuiz = () => {
  console.log('Quiz answer submitted:', quizAnswer.value)
  quizAnswer.value = ''
}

const uploadContent = () => {
  if (uploadType.value === 'picture') {
    console.log('Picture uploaded')
  } else {
    console.log('Article uploaded:', articleContent.value)
    articleContent.value = ''
  }
}

const forums = [
  {
    id: 1,
    name: "Conservation Initiatives",
    description: "Discuss ongoing and upcoming conservation projects, share ideas, and collaborate on new initiatives.",
    topics: 156,
    icon: TreeDeciduous
  },
  {
    id: 2,
    name: "Species Identification",
    description: "Get help identifying flora and fauna from our community of experts and enthusiasts.",
    topics: 324,
    icon: Map
  },
  {
    id: 3,
    name: "Nature Photography",
    description: "Share your best shots, get feedback, and learn tips and tricks from fellow photographers.",
    topics: 209,
    icon: CameraIcon
  },
  {
    id: 4,
    name: "Citizen Science Projects",
    description: "Join ongoing research projects and contribute to scientific discoveries as a citizen scientist.",
    topics: 87,
    icon: Globe
  }
]

const recentContributions = [
  {
    id: 1,
    title: "Rare Orchid Sighting",
    description: "Spotted a Ghost Orchid in the Everglades!",
    image: "https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?auto=format&fit=crop&w=800&q=80",
    user: "OrchidEnthusiast",
    height: '420px',
    overlay: 'bg-black bg-opacity-0 hover:bg-opacity-40'
  },
  {
    id: 2,
    title: "Urban Wildlife",
    description: "Fox family living in my backyard",
    image: "https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=800&q=80",
    user: "CityNaturalist",
    height: '400px',
    overlay: 'bg-black bg-opacity-0 hover:bg-opacity-40'
  },
  {
    id: 3,
    title: "Coral Reef Recovery",
    description: "Documenting reef regeneration in the Great Barrier Reef",
    image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=800&q=80",
    user: "MarineGuardian",
    height: '440px',
    overlay: 'bg-white bg-opacity-0 hover:bg-opacity-40'
  },
  {
    id: 4,
    title: "Migratory Birds",
    description: "Tracking Arctic Tern migration patterns",
    image: "https://images.unsplash.com/photo-1552727451-6f5671e14d83?auto=format&fit=crop&w=800&q=80",
    user: "BirdWatcher101",
    height: '380px',
    overlay: 'bg-black bg-opacity-0 hover:bg-opacity-40'
  }
]

const getLinkIcon = (text) => {
  switch (text) {
    case 'Home': return Home
    case 'Community': return Users
    case 'Database': return Database
    case 'About': return Info
    default: return Info
  }
}

const getSocialIcon = (name) => {
  switch (name) {
    case 'Facebook': return Facebook
    case 'Twitter': return Twitter
    case 'Instagram': return Instagram
    default: return Globe
  }
}
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
  letter-spacing: 0.05em;
  line-height: 1.2;
}

.font-body {
  font-family: var(--font-body);
  line-height: 1.6;
}

.hero-section {
  background-attachment: fixed;
}

.bg-transition {
  transition: background-color 0.5s, color 0.5s;
}

.shadow-text {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.bg-texture {
  background-image: url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.05" fill-rule="evenodd"/%3E%3C/svg%3E');
}

/* Enhanced hover effects */
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Pulse animation for interactive elements */
@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: .5;
  }
}

.hover\:animate-pulse:hover {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Consistent spacing */
.space-y-4>*+* {
  margin-top: 1rem;
}

.space-x-4>*+* {
  margin-left: 1rem;
}

/* Custom decorative elements */
.section-divider {
  height: 2px;
  background: linear-gradient(to right, transparent, currentColor, transparent);
  opacity: 0.2;
  margin: 2rem 0;
}

/* Thematic illustrations */
.nature-bg {
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="52" height="26" viewBox="0 0 52 26"%3E%3Cg fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z" /%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
}
</style>