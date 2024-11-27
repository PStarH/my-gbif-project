import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Leaf as LeafIcon, Sun as SunIcon, Moon as MoonIcon, SunMoon as SunMoonIcon, Database, Camera as CameraIcon, Users, Brain, Home, Info, Facebook, Twitter, Instagram, Globe } from 'lucide-vue-next';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
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
]);
const navLinks = [
    { href: "/", text: "Home" },
    { href: "/community", text: "Community" },
    { href: "/database", text: "Database" },
    { href: "/about", text: "About" },
];
const socialLinks = [
    { name: "Facebook", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "Instagram", href: "#" },
];
const currentSpecies = ref(speciesList.value[Math.floor(Math.random() * speciesList.value.length)]);
const scrollProgress = ref(0);
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
];
const currentTheme = ref(themes[0]);
let themeIndex = 0;
const toggleTheme = () => {
    themeIndex = (themeIndex + 1) % themes.length;
    currentTheme.value = themes[themeIndex];
};
const changeSpecies = () => {
    const randomIndex = Math.floor(Math.random() * speciesList.value.length);
    currentSpecies.value = speciesList.value[randomIndex];
};
const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    scrollProgress.value = Math.min(scrollPosition / windowHeight, 1);
};
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
// New features
const filters = ['All', 'Forest', 'Ocean', 'Rainforest', 'Various'];
const activeFilters = ref(['All']);
const toggleFilter = (filter) => {
    if (filter === 'All') {
        activeFilters.value = ['All'];
    }
    else {
        const allIndex = activeFilters.value.indexOf('All');
        if (allIndex > -1) {
            activeFilters.value.splice(allIndex, 1);
        }
        const index = activeFilters.value.indexOf(filter);
        if (index > -1) {
            activeFilters.value.splice(index, 1);
        }
        else {
            activeFilters.value.push(filter);
        }
        if (activeFilters.value.length === 0) {
            activeFilters.value = ['All'];
        }
    }
};
const filteredSpecies = computed(() => {
    if (activeFilters.value.includes('All')) {
        return speciesList.value;
    }
    return speciesList.value.filter(species => activeFilters.value.includes(species.habitat));
});
const hasMoreSpecies = ref(true);
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
    ];
    setTimeout(() => {
        newSpecies.forEach(species => {
            species.show = true;
            speciesList.value.push(species);
        });
        hasMoreSpecies.value = false; // For demo purposes, disable after one load
    }, 500);
};
const __VLS_fnComponent = (await import('vue')).defineComponent({});
;
let __VLS_functionalComponentProps;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([`min-h-screen text-gray-800 font-body bg-transition`, __VLS_ctx.currentTheme.bgClass])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({ ...{ class: (([`p-4 fixed w-full z-50 transition-colors duration-300 bg-transition`, __VLS_ctx.currentTheme.navClass])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container mx-auto flex justify-between items-center") }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
    /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ to: ("/"), ...{ class: ("text-2xl font-heading font-bold flex items-center tracking-wide") }, }));
    const __VLS_2 = __VLS_1({ to: ("/"), ...{ class: ("text-2xl font-heading font-bold flex items-center tracking-wide") }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.LeafIcon;
    /** @type { [typeof __VLS_components.LeafIcon, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ class: ("w-8 h-8 mr-2") }, }));
    const __VLS_8 = __VLS_7({ ...{ class: ("w-8 h-8 mr-2") }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_nonNullable(__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center space-x-6") }, });
    for (const [link] of __VLS_getVForSourceType((__VLS_ctx.navLinks))) {
        const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ key: ((link.href)), to: ((link.href)), ...{ class: ("hover:text-accent transition-colors duration-300") }, }));
        const __VLS_14 = __VLS_13({ key: ((link.href)), to: ((link.href)), ...{ class: ("hover:text-accent transition-colors duration-300") }, }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        (link.text);
        __VLS_nonNullable(__VLS_17.slots).default;
        const __VLS_17 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.toggleTheme) }, ...{ class: (([`hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg bg-transition`, __VLS_ctx.currentTheme.buttonClass])) }, "aria-label": ("Toggle theme"), });
    if (__VLS_ctx.currentTheme.name === 'Forest') {
        const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.SunIcon;
        /** @type { [typeof __VLS_components.SunIcon, ] } */
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ ...{ class: ("w-6 h-6") }, }));
        const __VLS_20 = __VLS_19({ ...{ class: ("w-6 h-6") }, }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    }
    if (__VLS_ctx.currentTheme.name === 'Ocean') {
        const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.MoonIcon;
        /** @type { [typeof __VLS_components.MoonIcon, ] } */
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ ...{ class: ("w-6 h-6") }, }));
        const __VLS_26 = __VLS_25({ ...{ class: ("w-6 h-6") }, }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    }
    if (__VLS_ctx.currentTheme.name === 'Savanna') {
        const __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.SunMoonIcon;
        /** @type { [typeof __VLS_components.SunMoonIcon, ] } */
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ ...{ class: ("w-6 h-6") }, }));
        const __VLS_32 = __VLS_31({ ...{ class: ("w-6 h-6") }, }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("hero-section h-screen flex items-end justify-center relative overflow-hidden") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out") }, ...{ style: (({
                backgroundImage: `url(${__VLS_ctx.currentSpecies.image})`,
                transform: `scale(${1 + __VLS_ctx.scrollProgress * 0.1}) translateY(${__VLS_ctx.scrollProgress * -50}px)`
            })) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container mx-auto px-4 relative z-10 text-center pb-24") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-6xl md:text-8xl font-heading font-bold text-white mb-4 hero-text") }, });
    (__VLS_ctx.currentSpecies.name);
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto") }, });
    (__VLS_ctx.currentSpecies.description);
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.changeSpecies) }, ...{ class: (([`hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 bg-transition`, __VLS_ctx.currentTheme.buttonClass])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: (([`py-16 transition-colors duration-300 bg-transition`, __VLS_ctx.currentTheme.sectionClass])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container mx-auto px-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-4xl font-heading font-bold mb-12 text-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-8 flex flex-wrap justify-center gap-4") }, });
    for (const [filter] of __VLS_getVForSourceType((__VLS_ctx.filters))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                    __VLS_ctx.toggleFilter(filter);
                } }, key: ((filter)), ...{ class: (([
                    'px-4 py-2 rounded-full transition-all duration-300',
                    __VLS_ctx.activeFilters.includes(filter) ? __VLS_ctx.currentTheme.buttonClass : 'bg-gray-200 text-gray-700'
                ])) }, });
        (filter);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-1 md:grid-cols-3 gap-8") }, });
    for (const [species, index] of __VLS_getVForSourceType((__VLS_ctx.filteredSpecies))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((index)), ...{ class: ("species-card") }, ...{ class: (({ 'animate-fade-in': species.show })) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative overflow-hidden rounded-lg shadow-lg") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((species.image)), alt: ((species.name)), ...{ class: ("w-full h-64 object-cover transition-transform duration-300 hover:scale-110") }, loading: ("lazy"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-xl font-heading font-semibold mb-2") }, });
        (species.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm") }, });
        (species.habitat);
    }
    if (__VLS_ctx.hasMoreSpecies) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-12 text-center") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.loadMoreSpecies) }, ...{ class: (([`hover:bg-opacity-80 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 bg-transition`, __VLS_ctx.currentTheme.buttonClass])) }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: (([`py-16 transition-colors duration-300 bg-transition`, __VLS_ctx.currentTheme.bgClass])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container mx-auto px-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-4xl font-heading font-bold mb-12 text-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-1 md:grid-cols-2 gap-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([`p-6 rounded-lg shadow-lg transition-colors duration-300 bg-transition`, __VLS_ctx.currentTheme.cardClass])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-2xl font-heading font-semibold mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ class: (([`hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 bg-transition`, __VLS_ctx.currentTheme.buttonClass])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([`p-6 rounded-lg shadow-lg transition-colors duration-300 bg-transition`, __VLS_ctx.currentTheme.cardClass])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-2xl font-heading font-semibold mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ class: (([`hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 bg-transition`, __VLS_ctx.currentTheme.buttonClass])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({ ...{ class: (([`text-white py-8 transition-colors duration-300 bg-transition`, __VLS_ctx.currentTheme.footerClass])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container mx-auto px-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-1 md:grid-cols-3 gap-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-xl font-heading font-semibold mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-xl font-heading font-semibold mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("space-y-2") }, });
    for (const [link] of __VLS_getVForSourceType((__VLS_ctx.navLinks))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((link.href)), });
        const __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ to: ((link.href)), ...{ class: ("hover:text-accent transition-colors duration-300") }, }));
        const __VLS_38 = __VLS_37({ to: ((link.href)), ...{ class: ("hover:text-accent transition-colors duration-300") }, }, ...__VLS_functionalComponentArgsRest(__VLS_37));
        (link.text);
        __VLS_nonNullable(__VLS_41.slots).default;
        const __VLS_41 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-xl font-heading font-semibold mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex space-x-4") }, });
    for (const [social] of __VLS_getVForSourceType((__VLS_ctx.socialLinks))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ key: ((social.name)), href: ((social.href)), ...{ class: ("hover:text-accent transition-colors duration-300") }, target: ("_blank"), rel: ("noopener noreferrer"), });
        (social.name);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-8 text-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_styleScopedClasses['min-h-screen'];
    __VLS_styleScopedClasses['text-gray-800'];
    __VLS_styleScopedClasses['font-body'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['fixed'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['z-50'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['container'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['tracking-wide'];
    __VLS_styleScopedClasses['w-8'];
    __VLS_styleScopedClasses['h-8'];
    __VLS_styleScopedClasses['mr-2'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['space-x-6'];
    __VLS_styleScopedClasses['hover:text-accent'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['hover:bg-opacity-80'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['ease-in-out'];
    __VLS_styleScopedClasses['transform'];
    __VLS_styleScopedClasses['hover:scale-105'];
    __VLS_styleScopedClasses['hover:shadow-lg'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['w-6'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['w-6'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['w-6'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['hero-section'];
    __VLS_styleScopedClasses['h-screen'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-end'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['overflow-hidden'];
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['inset-0'];
    __VLS_styleScopedClasses['bg-cover'];
    __VLS_styleScopedClasses['bg-center'];
    __VLS_styleScopedClasses['transition-transform'];
    __VLS_styleScopedClasses['duration-1000'];
    __VLS_styleScopedClasses['ease-out'];
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['inset-0'];
    __VLS_styleScopedClasses['bg-gradient-to-t'];
    __VLS_styleScopedClasses['from-black'];
    __VLS_styleScopedClasses['via-transparent'];
    __VLS_styleScopedClasses['to-transparent'];
    __VLS_styleScopedClasses['opacity-60'];
    __VLS_styleScopedClasses['container'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['z-10'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['pb-24'];
    __VLS_styleScopedClasses['text-6xl'];
    __VLS_styleScopedClasses['md:text-8xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['hero-text'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['md:text-2xl'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['max-w-3xl'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['hover:bg-opacity-80'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['py-3'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['transform'];
    __VLS_styleScopedClasses['hover:scale-105'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['py-16'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['container'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['text-4xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-12'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['gap-4'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['grid'];
    __VLS_styleScopedClasses['grid-cols-1'];
    __VLS_styleScopedClasses['md:grid-cols-3'];
    __VLS_styleScopedClasses['gap-8'];
    __VLS_styleScopedClasses['species-card'];
    __VLS_styleScopedClasses['animate-fade-in'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['overflow-hidden'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['h-64'];
    __VLS_styleScopedClasses['object-cover'];
    __VLS_styleScopedClasses['transition-transform'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['hover:scale-110'];
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['bottom-0'];
    __VLS_styleScopedClasses['left-0'];
    __VLS_styleScopedClasses['right-0'];
    __VLS_styleScopedClasses['bg-black'];
    __VLS_styleScopedClasses['bg-opacity-50'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['mt-12'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['hover:bg-opacity-80'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['py-3'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['transform'];
    __VLS_styleScopedClasses['hover:scale-105'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['py-16'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['container'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['text-4xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-12'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['grid'];
    __VLS_styleScopedClasses['grid-cols-1'];
    __VLS_styleScopedClasses['md:grid-cols-2'];
    __VLS_styleScopedClasses['gap-8'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['hover:bg-opacity-80'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['transform'];
    __VLS_styleScopedClasses['hover:scale-105'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['hover:bg-opacity-80'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['transform'];
    __VLS_styleScopedClasses['hover:scale-105'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['py-8'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['container'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['grid'];
    __VLS_styleScopedClasses['grid-cols-1'];
    __VLS_styleScopedClasses['md:grid-cols-3'];
    __VLS_styleScopedClasses['gap-8'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['space-y-2'];
    __VLS_styleScopedClasses['hover:text-accent'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['space-x-4'];
    __VLS_styleScopedClasses['hover:text-accent'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['mt-8'];
    __VLS_styleScopedClasses['text-center'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    return {
        slots: __VLS_slots,
        refs: $refs,
        attrs: {},
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            LeafIcon: LeafIcon,
            SunIcon: SunIcon,
            MoonIcon: MoonIcon,
            SunMoonIcon: SunMoonIcon,
            navLinks: navLinks,
            socialLinks: socialLinks,
            currentSpecies: currentSpecies,
            scrollProgress: scrollProgress,
            currentTheme: currentTheme,
            toggleTheme: toggleTheme,
            changeSpecies: changeSpecies,
            filters: filters,
            activeFilters: activeFilters,
            toggleFilter: toggleFilter,
            filteredSpecies: filteredSpecies,
            hasMoreSpecies: hasMoreSpecies,
            loadMoreSpecies: loadMoreSpecies,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
//# sourceMappingURL=HomePage.vue.js.map