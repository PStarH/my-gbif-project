import { ref, onMounted, onUnmounted } from 'vue';
import { Leaf as LeafIcon, Sun as SunIcon, Moon as MoonIcon, SunMoon as SunMoonIcon, Database, Camera as CameraIcon, Users, Brain, Home, Info, Facebook, Twitter, Instagram, Globe } from 'lucide-vue-next';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
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
];
const currentTheme = ref(themes[0]);
const themeIndex = ref(0);
const scrollY = ref(0);
const toggleTheme = () => {
    themeIndex.value = (themeIndex.value + 1) % themes.length;
    currentTheme.value = themes[themeIndex.value];
    document.body.style.setProperty('--theme-transition', '0.5s');
    setTimeout(() => {
        document.body.style.setProperty('--theme-transition', '0s');
    }, 500);
};
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
];
const getLinkIcon = (text) => {
    switch (text) {
        case 'Home': return Home;
        case 'Community': return Users;
        case 'Database': return Database;
        case 'About': return Info;
        default: return Info;
    }
};
const getSocialIcon = (name) => {
    switch (name) {
        case 'Facebook': return Facebook;
        case 'Twitter': return Twitter;
        case 'Instagram': return Instagram;
        default: return Globe;
    }
};
const handleScroll = () => {
    scrollY.value = window.scrollY;
};
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("hero-section h-96 flex items-center justify-center relative overflow-hidden pt-16") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("absolute inset-0 bg-cover bg-center bg-fixed opacity-50 transform scale-110 transition-transform duration-1000") }, ...{ style: (({ backgroundImage: `url(${__VLS_ctx.currentTheme.heroImage})`, transform: `translateY(${__VLS_ctx.scrollY * 0.5}px)` })) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("absolute inset-0") }, ...{ class: ((__VLS_ctx.currentTheme.gradientOverlay)) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container mx-auto px-4 relative z-10 text-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-5xl md:text-7xl font-heading font-bold text-white mb-4 shadow-text tracking-wider leading-tight") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-2xl font-body text-white shadow-text leading-relaxed") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({ ...{ class: (([`py-16 transition-colors duration-300 bg-transition`, __VLS_ctx.currentTheme.sectionClass])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container mx-auto px-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("mb-16 max-w-4xl mx-auto px-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-3xl font-heading font-bold mb-8 text-center tracking-wider section-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([`p-8 rounded-lg shadow-lg transition-all duration-500 bg-transition hover:shadow-xl hover:scale-103 hover:rotate-1`, __VLS_ctx.currentTheme.cardClass])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-4 font-body text-lg leading-loose") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("mb-16 max-w-4xl mx-auto px-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-3xl font-heading font-bold mb-8 text-center tracking-wider section-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([`p-8 rounded-lg shadow-lg transition-all duration-500 bg-transition hover:shadow-xl hover:scale-103 hover:rotate-1`, __VLS_ctx.currentTheme.cardClass])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-4 font-body text-lg leading-loose") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("mb-16") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-3xl font-heading font-bold mb-8 text-center tracking-wider section-title") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-1 md:grid-cols-2 gap-8") }, });
    for (const [feature, index] of __VLS_getVForSourceType((__VLS_ctx.features))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((index)), ...{ class: (([`p-6 rounded-lg shadow-lg transition-all duration-500 bg-transition hover:shadow-xl hover:scale-103 hover:rotate-1`, __VLS_ctx.currentTheme.cardClass])) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center mb-4") }, });
        const __VLS_36 = ((feature.icon));
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ ...{ class: ("w-12 h-12 mr-4 text-accent transition-all duration-300 hover:rotate-6") }, }));
        const __VLS_38 = __VLS_37({ ...{ class: ("w-12 h-12 mr-4 text-accent transition-all duration-300 hover:rotate-6") }, }, ...__VLS_functionalComponentArgsRest(__VLS_37));
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-2xl font-heading font-semibold tracking-wider") }, });
        (feature.title);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-4 leading-loose font-body text-lg") }, });
        (feature.description);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({ ...{ class: (([`text-white py-12 transition-colors duration-300 bg-transition relative`, __VLS_ctx.currentTheme.footerClass, 'bg-texture'])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("absolute bottom-0 left-0 w-full h-48 bg-no-repeat bg-cover opacity-75 hover:opacity-100 transition-opacity duration-300") }, ...{ style: (({ backgroundImage: `url(${__VLS_ctx.currentTheme.footerImage})` })) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container mx-auto px-4 relative z-10") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-1 md:grid-cols-3 gap-12") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-2xl font-heading font-semibold mb-4 tracking-wider") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("leading-loose font-body") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-2xl font-heading font-semibold mb-4 tracking-wider") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("space-y-2") }, });
    for (const [link] of __VLS_getVForSourceType((__VLS_ctx.navLinks))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((link.href)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ((link.href)), ...{ class: ("hover:text-accent transition-colors duration-300 flex items-center") }, });
        const __VLS_42 = ((__VLS_ctx.getLinkIcon(link.text)));
        // @ts-ignore
        const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ ...{ class: ("w-6 h-6 mr-2 transition-all duration-300 hover:rotate-6") }, }));
        const __VLS_44 = __VLS_43({ ...{ class: ("w-6 h-6 mr-2 transition-all duration-300 hover:rotate-6") }, }, ...__VLS_functionalComponentArgsRest(__VLS_43));
        (link.text);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-2xl font-heading font-semibold mb-4 tracking-wider") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex space-x-4") }, });
    for (const [social] of __VLS_getVForSourceType((__VLS_ctx.socialLinks))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ key: ((social.name)), href: ((social.href)), ...{ class: ("hover:text-accent transition-colors duration-300") }, });
        const __VLS_48 = ((__VLS_ctx.getSocialIcon(social.name)));
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({ ...{ class: ("w-8 h-8 transition-all duration-300 hover:rotate-6") }, }));
        const __VLS_50 = __VLS_49({ ...{ class: ("w-8 h-8 transition-all duration-300 hover:rotate-6") }, }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-12 text-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("font-body") }, });
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
    __VLS_styleScopedClasses['h-96'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['overflow-hidden'];
    __VLS_styleScopedClasses['pt-16'];
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['inset-0'];
    __VLS_styleScopedClasses['bg-cover'];
    __VLS_styleScopedClasses['bg-center'];
    __VLS_styleScopedClasses['bg-fixed'];
    __VLS_styleScopedClasses['opacity-50'];
    __VLS_styleScopedClasses['transform'];
    __VLS_styleScopedClasses['scale-110'];
    __VLS_styleScopedClasses['transition-transform'];
    __VLS_styleScopedClasses['duration-1000'];
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['inset-0'];
    __VLS_styleScopedClasses['container'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['z-10'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-5xl'];
    __VLS_styleScopedClasses['md:text-7xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['shadow-text'];
    __VLS_styleScopedClasses['tracking-wider'];
    __VLS_styleScopedClasses['leading-tight'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-body'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['shadow-text'];
    __VLS_styleScopedClasses['leading-relaxed'];
    __VLS_styleScopedClasses['py-16'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['container'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['mb-16'];
    __VLS_styleScopedClasses['max-w-4xl'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['px-8'];
    __VLS_styleScopedClasses['text-3xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['tracking-wider'];
    __VLS_styleScopedClasses['section-title'];
    __VLS_styleScopedClasses['p-8'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-500'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['hover:shadow-xl'];
    __VLS_styleScopedClasses['hover:scale-103'];
    __VLS_styleScopedClasses['hover:rotate-1'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['font-body'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['leading-loose'];
    __VLS_styleScopedClasses['mb-16'];
    __VLS_styleScopedClasses['max-w-4xl'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['px-8'];
    __VLS_styleScopedClasses['text-3xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['tracking-wider'];
    __VLS_styleScopedClasses['section-title'];
    __VLS_styleScopedClasses['p-8'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-500'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['hover:shadow-xl'];
    __VLS_styleScopedClasses['hover:scale-103'];
    __VLS_styleScopedClasses['hover:rotate-1'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['font-body'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['leading-loose'];
    __VLS_styleScopedClasses['mb-16'];
    __VLS_styleScopedClasses['text-3xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['tracking-wider'];
    __VLS_styleScopedClasses['section-title'];
    __VLS_styleScopedClasses['grid'];
    __VLS_styleScopedClasses['grid-cols-1'];
    __VLS_styleScopedClasses['md:grid-cols-2'];
    __VLS_styleScopedClasses['gap-8'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-500'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['hover:shadow-xl'];
    __VLS_styleScopedClasses['hover:scale-103'];
    __VLS_styleScopedClasses['hover:rotate-1'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['w-12'];
    __VLS_styleScopedClasses['h-12'];
    __VLS_styleScopedClasses['mr-4'];
    __VLS_styleScopedClasses['text-accent'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['hover:rotate-6'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['tracking-wider'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['leading-loose'];
    __VLS_styleScopedClasses['font-body'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['py-12'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['bg-texture'];
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['bottom-0'];
    __VLS_styleScopedClasses['left-0'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['h-48'];
    __VLS_styleScopedClasses['bg-no-repeat'];
    __VLS_styleScopedClasses['bg-cover'];
    __VLS_styleScopedClasses['opacity-75'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['transition-opacity'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['container'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['z-10'];
    __VLS_styleScopedClasses['grid'];
    __VLS_styleScopedClasses['grid-cols-1'];
    __VLS_styleScopedClasses['md:grid-cols-3'];
    __VLS_styleScopedClasses['gap-12'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['tracking-wider'];
    __VLS_styleScopedClasses['leading-loose'];
    __VLS_styleScopedClasses['font-body'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['tracking-wider'];
    __VLS_styleScopedClasses['space-y-2'];
    __VLS_styleScopedClasses['hover:text-accent'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['w-6'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['mr-2'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['hover:rotate-6'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['tracking-wider'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['space-x-4'];
    __VLS_styleScopedClasses['hover:text-accent'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['w-8'];
    __VLS_styleScopedClasses['h-8'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['hover:rotate-6'];
    __VLS_styleScopedClasses['mt-12'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['font-body'];
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
            currentTheme: currentTheme,
            scrollY: scrollY,
            toggleTheme: toggleTheme,
            features: features,
            getLinkIcon: getLinkIcon,
            getSocialIcon: getSocialIcon,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
//# sourceMappingURL=About.vue.js.map