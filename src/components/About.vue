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

        <!-- Hero Section with Gradient Background and Parallax Effect -->
        <section class="hero-section h-96 flex items-center justify-center relative overflow-hidden pt-16">
            <div class="absolute inset-0 bg-cover bg-center bg-fixed opacity-50 transform scale-110 transition-transform duration-1000"
                :style="{ backgroundImage: `url(${currentTheme.heroImage})`, transform: `translateY(${scrollY * 0.5}px)` }">
            </div>
            <div class="absolute inset-0" :class="currentTheme.gradientOverlay"></div>
            <div class="container mx-auto px-4 relative z-10 text-center">
                <h1
                    class="text-5xl md:text-7xl font-heading font-bold text-white mb-4 shadow-text tracking-wider leading-tight">
                    About Flora & Fauna Gallery
                </h1>
                <p class="text-2xl font-body text-white shadow-text leading-relaxed">Celebrating and Protecting Earth's
                    Biodiversity</p>
            </div>
        </section>

        <!-- Main Content -->
        <main :class="[`py-16 transition-colors duration-300 bg-transition`, currentTheme.sectionClass]">
            <div class="container mx-auto px-4">
                <!-- Welcome Section with more space -->
                <section class="mb-16 max-w-4xl mx-auto px-8">
                    <h2 class="text-3xl font-heading font-bold mb-8 text-center tracking-wider section-title">Welcome to
                        Flora & Fauna Gallery</h2>
                    <div
                        :class="[`p-8 rounded-lg shadow-lg transition-all duration-500 bg-transition hover:shadow-xl hover:scale-103 hover:rotate-1`, currentTheme.cardClass]">
                        <p class="mb-4 font-body text-lg leading-loose">
                            Flora & Fauna Gallery is a digital sanctuary created by a student passionate about wildlife
                            and technology. Our mission is to celebrate and protect the rich diversity of life on Earth,
                            bringing together nature enthusiasts from around the globe.
                        </p>
                    </div>
                </section>

                <!-- Vision Section with more space -->
                <section class="mb-16 max-w-4xl mx-auto px-8">
                    <h2 class="text-3xl font-heading font-bold mb-8 text-center tracking-wider section-title">Our Vision
                    </h2>
                    <div
                        :class="[`p-8 rounded-lg shadow-lg transition-all duration-500 bg-transition hover:shadow-xl hover:scale-103 hover:rotate-1`, currentTheme.cardClass]">
                        <p class="mb-4 font-body text-lg leading-loose">
                            We aim to become a platform that unites nature lovers and conservationists. By sharing
                            knowledge, experiences, and passion, we can all play a part in protecting our planet's
                            fragile ecosystems. Through highlighting endangered species and conservation efforts, we
                            hope to ignite conversations and inspire positive environmental actions.
                        </p>
                    </div>
                </section>

                <section class="mb-16">
                    <h2 class="text-3xl font-heading font-bold mb-8 text-center tracking-wider section-title">What We
                        Offer</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div v-for="(feature, index) in features" :key="index"
                            :class="[`p-6 rounded-lg shadow-lg transition-all duration-500 bg-transition hover:shadow-xl hover:scale-103 hover:rotate-1`, currentTheme.cardClass]">
                            <div class="flex items-center mb-4">
                                <component :is="feature.icon"
                                    class="w-12 h-12 mr-4 text-accent transition-all duration-300 hover:rotate-6" />
                                <h3 class="text-2xl font-heading font-semibold tracking-wider">{{ feature.title }}</h3>
                            </div>
                            <p class="mb-4 leading-loose font-body text-lg">{{ feature.description }}</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>

        <!-- Footer with Enhanced Landscape -->
        <footer
            :class="[`text-white py-12 transition-colors duration-300 bg-transition relative`, currentTheme.footerClass, 'bg-texture']">
            <div class="absolute bottom-0 left-0 w-full h-48 bg-no-repeat bg-cover opacity-75 hover:opacity-100 transition-opacity duration-300"
                :style="{ backgroundImage: `url(${currentTheme.footerImage})` }"></div>
            <div class="container mx-auto px-4 relative z-10">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <h3 class="text-2xl font-heading font-semibold mb-4 tracking-wider">Flora & Fauna Gallery</h3>
                        <p class="leading-loose font-body">Celebrating the diversity of life on Earth, one species at a
                            time.</p>
                    </div>
                    <div>
                        <h3 class="text-2xl font-heading font-semibold mb-4 tracking-wider">Quick Links</h3>
                        <ul class="space-y-2">
                            <li v-for="link in navLinks" :key="link.href">
                                <a :href="link.href"
                                    class="hover:text-accent transition-colors duration-300 flex items-center">
                                    <component :is="getLinkIcon(link.text)"
                                        class="w-6 h-6 mr-2 transition-all duration-300 hover:rotate-6" />
                                    {{ link.text }}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-2xl font-heading font-semibold mb-4 tracking-wider">Connect With Us</h3>
                        <div class="flex space-x-4">
                            <a v-for="social in socialLinks" :key="social.name" :href="social.href"
                                class="hover:text-accent transition-colors duration-300">
                                <component :is="getSocialIcon(social.name)"
                                    class="w-8 h-8 transition-all duration-300 hover:rotate-6" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="mt-12 text-center">
                    <p class="font-body">&copy; 2023 Flora & Fauna Gallery. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
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
        heroImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80',
        gradientOverlay: 'bg-gradient-to-b from-green-500/80 to-green-800/80',
        footerImage: '/images/forest-landscape.png',
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
        heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
        gradientOverlay: 'bg-gradient-to-b from-blue-500/80 to-blue-800/80',
        footerImage: '/images/ocean-landscape.png',
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
        heroImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1920&q=80',
        gradientOverlay: 'bg-gradient-to-b from-yellow-500/80 to-yellow-800/80',
        footerImage: '/images/savanna-landscape.png',
        icon: SunMoonIcon
    },
]

const currentTheme = ref(themes[0])
const themeIndex = ref(0)
const scrollY = ref(0)

const toggleTheme = () => {
    themeIndex.value = (themeIndex.value + 1) % themes.length
    currentTheme.value = themes[themeIndex.value]
    document.body.style.setProperty('--theme-transition', '0.5s')
    setTimeout(() => {
        document.body.style.setProperty('--theme-transition', '0s')
    }, 500)
}

const features = [
    {
        title: "Species Database",
        description: "Explore our curated collection of plant and animal species, offering in-depth information on biodiversity.",
        icon: Database
    },
    {
        title: "Community Forums",
        description: "Engage with fellow wildlife enthusiasts! Our forums provide a space for discussions, debates, and shared experiences in nature.",
        icon: Users
    },
    {
        title: "Daily Quizzes",
        description: "Challenge yourself with fun, interactive quizzes to expand your knowledge of the natural world.",
        icon: Brain
    },
    {
        title: "Share Your Passion",
        description: "From photos to articles, we encourage you to contribute your love for wildlife and inspire others.",
        icon: CameraIcon
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

const handleScroll = () => {
    scrollY.value = window.scrollY
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Open+Sans:wght@400;600&display=swap');

:root {
    --color-accent: #6ca3ff;
    --font-heading: 'Playfair Display', serif;
    --font-body: 'Open Sans', sans-serif;
    --theme-transition: 0s;
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
    transition: background-color var(--theme-transition), color var(--theme-transition);
}

.shadow-text {
    text-shadow: 2px 4px 6px rgba(0, 0, 0, 0.5);
    letter-spacing: 0.05em;
}

.section-title {
    position: relative;
    display: inline-block;
}

.section-title::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.25rem;
    width: 100%;
    height: 2px;
    background-color: var(--color-accent);
}

.bg-texture {
    background-image: url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.05" fill-rule="evenodd"/%3E%3C/svg%3E');
}

/* Enhanced hover effects */
.hover\:scale-103:hover {
    transform: scale(1.03) rotate(1deg);
}

.hover\:shadow-xl:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
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

/* 3D effect for buttons */
.btn-3d {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
}

.btn-3d:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
}

.btn-3d:active {
    transform: translateY(1px);
}

/* Icon hover effects */
svg {
    transition: all 0.3s ease;
}

svg:hover {
    filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.5));
}

/* Footer enhancements */
footer {
    background-color: rgba(0, 0, 0, 0.8);
}
</style>