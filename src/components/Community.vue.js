import { ref } from 'vue';
import { Leaf as LeafIcon, Sun as SunIcon, Moon as MoonIcon, SunMoon as SunMoonIcon, TreeDeciduous, Globe, Camera as CameraIcon, Map, Home, Users, Database, Info, Facebook, Twitter, Instagram, FileText as FileTextIcon, Upload as UploadIcon, MessageSquare as MessageSquareIcon } from 'lucide-vue-next';
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
];
const currentTheme = ref(themes[0]);
const themeIndex = ref(0);
const toggleTheme = () => {
    themeIndex.value = (themeIndex.value + 1) % themes.length;
    currentTheme.value = themes[themeIndex.value];
};
const quizAnswer = ref('');
const uploadType = ref('picture');
const articleContent = ref('');
const submitQuiz = () => {
    console.log('Quiz answer submitted:', quizAnswer.value);
    quizAnswer.value = '';
};
const uploadContent = () => {
    if (uploadType.value === 'picture') {
        console.log('Picture uploaded');
    }
    else {
        console.log('Article uploaded:', articleContent.value);
        articleContent.value = '';
    }
};
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
];
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("hero-section h-80 flex items-center justify-center relative overflow-hidden pt-16") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("absolute inset-0 bg-cover bg-center bg-fixed") }, ...{ style: (({ backgroundImage: `url(${__VLS_ctx.currentTheme.heroImage})` })) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container mx-auto px-4 relative z-10 text-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-4xl md:text-6xl font-heading font-bold text-white mb-4 shadow-text tracking-wider leading-tight") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-xl font-body text-white shadow-text leading-relaxed") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({ ...{ class: (([`py-16 transition-colors duration-300 bg-transition`, __VLS_ctx.currentTheme.sectionClass])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container mx-auto px-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("mb-16") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-3xl font-heading font-bold mb-8 text-center tracking-wider") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([`p-6 rounded-lg shadow-lg transition-all duration-300 bg-transition hover:shadow-xl`, __VLS_ctx.currentTheme.cardClass])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-xl font-heading font-semibold mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-4 font-body") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.submitQuiz) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ value: ((__VLS_ctx.quizAnswer)), type: ("text"), ...{ class: (([`w-full p-2 mb-4 border rounded transition-all duration-300`, __VLS_ctx.currentTheme.inputClass])) }, placeholder: ("Enter your answer"), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), ...{ class: (([`text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md`, __VLS_ctx.currentTheme.buttonClass])) }, });
    const __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.LeafIcon;
    /** @type { [typeof __VLS_components.LeafIcon, ] } */
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ ...{ class: ("inline-block w-5 h-5 mr-2") }, }));
    const __VLS_38 = __VLS_37({ ...{ class: ("inline-block w-5 h-5 mr-2") }, }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("mb-16") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-3xl font-heading font-bold mb-8 text-center tracking-wider") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-1 md:grid-cols-2 gap-8") }, });
    for (const [forum] of __VLS_getVForSourceType((__VLS_ctx.forums))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((forum.id)), ...{ class: (([`p-6 rounded-lg shadow-lg transition-all duration-300 bg-transition hover:shadow-xl transform hover:scale-105`, __VLS_ctx.currentTheme.cardClass])) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center mb-4") }, });
        const __VLS_42 = ((forum.icon));
        // @ts-ignore
        const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ ...{ class: ("w-8 h-8 mr-4 text-accent transition-all duration-300 hover:rotate-12") }, }));
        const __VLS_44 = __VLS_43({ ...{ class: ("w-8 h-8 mr-4 text-accent transition-all duration-300 hover:rotate-12") }, }, ...__VLS_functionalComponentArgsRest(__VLS_43));
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-xl font-heading font-semibold tracking-wider") }, });
        (forum.name);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-4 leading-relaxed font-body") }, });
        (forum.description);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-sm text-gray-600") }, });
        (forum.topics);
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ class: (([`text-sm hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out hover:shadow-md bg-transition transform hover:scale-105`, __VLS_ctx.currentTheme.buttonClass])) }, });
        const __VLS_48 = __VLS_resolvedLocalAndGlobalComponents.MessageSquareIcon;
        /** @type { [typeof __VLS_components.MessageSquareIcon, ] } */
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({ ...{ class: ("inline-block w-5 h-5 mr-2") }, }));
        const __VLS_50 = __VLS_49({ ...{ class: ("inline-block w-5 h-5 mr-2") }, }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-3xl font-heading font-bold mb-8 text-center tracking-wider") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8") }, });
    for (const [contribution] of __VLS_getVForSourceType((__VLS_ctx.recentContributions))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((contribution.id)), ...{ class: (([`p-4 rounded-lg shadow-lg transition-all duration-300 bg-transition hover:shadow-xl transform hover:scale-105`, __VLS_ctx.currentTheme.cardClass])) }, ...{ style: (({ height: contribution.height })) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative overflow-hidden rounded-lg mb-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((contribution.image)), alt: ((contribution.title)), ...{ class: ("w-full h-40 object-cover transition-transform duration-300 hover:scale-110") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([`absolute inset-0 transition-opacity duration-300 flex items-center justify-center`, contribution.overlay])) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-white text-lg font-bold opacity-0 hover:opacity-100 transition-opacity duration-300") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({ ...{ class: ("text-lg font-heading font-semibold mb-2 tracking-wider") }, });
        (contribution.title);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm mb-2 leading-relaxed font-body") }, });
        (contribution.description);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-between items-center") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-xs text-gray-600") }, });
        (contribution.user);
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ class: (([`text-xs hover:bg-opacity-80 text-white font-bold py-1 px-2 rounded-full transition-all duration-300 ease-in-out hover:shadow-md bg-transition transform hover:scale-105`, __VLS_ctx.currentTheme.buttonClass])) }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({ ...{ class: ("mb-16") }, ...{ style: ({}) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-3xl font-heading font-bold mb-8 text-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([`p-6 rounded-lg shadow-lg transition-all duration-300 bg-transition hover:shadow-xl`, __VLS_ctx.currentTheme.cardClass])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.uploadType = 'picture';
            } }, ...{ class: (([`mr-2 py-2 px-4 rounded transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md`, __VLS_ctx.uploadType === 'picture' ? __VLS_ctx.currentTheme.buttonClass : 'bg-gray-200'])) }, });
    const __VLS_54 = __VLS_resolvedLocalAndGlobalComponents.CameraIcon;
    /** @type { [typeof __VLS_components.CameraIcon, ] } */
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({ ...{ class: ("inline-block w-5 h-5 mr-2") }, }));
    const __VLS_56 = __VLS_55({ ...{ class: ("inline-block w-5 h-5 mr-2") }, }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.uploadType = 'article';
            } }, ...{ class: (([`py-2 px-4 rounded transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md`, __VLS_ctx.uploadType === 'article' ? __VLS_ctx.currentTheme.buttonClass : 'bg-gray-200'])) }, });
    const __VLS_60 = __VLS_resolvedLocalAndGlobalComponents.FileTextIcon;
    /** @type { [typeof __VLS_components.FileTextIcon, ] } */
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({ ...{ class: ("inline-block w-5 h-5 mr-2") }, }));
    const __VLS_62 = __VLS_61({ ...{ class: ("inline-block w-5 h-5 mr-2") }, }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({ ...{ onSubmit: (__VLS_ctx.uploadContent) }, });
    if (__VLS_ctx.uploadType === 'picture') {
        __VLS_elementAsFunction(__VLS_intrinsicElements.input, __VLS_intrinsicElements.input)({ type: ("file"), accept: ("image/*"), ...{ class: ("mb-4") }, });
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.textarea, __VLS_intrinsicElements.textarea)({ value: ((__VLS_ctx.articleContent)), ...{ class: (([`w-full p-2 mb-4 border rounded transition-all duration-300`, __VLS_ctx.currentTheme.inputClass])) }, placeholder: ("Write your article here..."), rows: ("4"), });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ type: ("submit"), ...{ class: (([`text-white font-bold py-2 px-4 rounded transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md`, __VLS_ctx.currentTheme.buttonClass])) }, });
    const __VLS_66 = __VLS_resolvedLocalAndGlobalComponents.UploadIcon;
    /** @type { [typeof __VLS_components.UploadIcon, ] } */
    // @ts-ignore
    const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({ ...{ class: ("inline-block w-5 h-5 mr-2") }, }));
    const __VLS_68 = __VLS_67({ ...{ class: ("inline-block w-5 h-5 mr-2") }, }, ...__VLS_functionalComponentArgsRest(__VLS_67));
    __VLS_elementAsFunction(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({ ...{ class: (([`text-white py-8 transition-colors duration-300 bg-transition`, __VLS_ctx.currentTheme.footerClass, 'bg-texture'])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container mx-auto px-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-1 md:grid-cols-3 gap-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-xl font-heading font-semibold mb-4 tracking-wider") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("leading-relaxed font-body") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-xl font-heading font-semibold mb-4 tracking-wider") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("space-y-2") }, });
    for (const [link] of __VLS_getVForSourceType((__VLS_ctx.navLinks))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((link.href)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ((link.href)), ...{ class: ("hover:text-accent transition-colors duration-300 flex items-center") }, });
        const __VLS_72 = ((__VLS_ctx.getLinkIcon(link.text)));
        // @ts-ignore
        const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({ ...{ class: ("w-6 h-6 mr-2 transition-all duration-300 hover:rotate-12") }, }));
        const __VLS_74 = __VLS_73({ ...{ class: ("w-6 h-6 mr-2 transition-all duration-300 hover:rotate-12") }, }, ...__VLS_functionalComponentArgsRest(__VLS_73));
        (link.text);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-xl font-heading font-semibold mb-4 tracking-wider") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex space-x-4") }, });
    for (const [social] of __VLS_getVForSourceType((__VLS_ctx.socialLinks))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ key: ((social.name)), href: ((social.href)), ...{ class: ("hover:text-accent transition-colors duration-300") }, });
        const __VLS_78 = ((__VLS_ctx.getSocialIcon(social.name)));
        // @ts-ignore
        const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({ ...{ class: ("w-6 h-6 transition-all duration-300 hover:rotate-12") }, }));
        const __VLS_80 = __VLS_79({ ...{ class: ("w-6 h-6 transition-all duration-300 hover:rotate-12") }, }, ...__VLS_functionalComponentArgsRest(__VLS_79));
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-8 text-center") }, });
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
    __VLS_styleScopedClasses['h-80'];
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
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['inset-0'];
    __VLS_styleScopedClasses['bg-gradient-to-b'];
    __VLS_styleScopedClasses['from-transparent'];
    __VLS_styleScopedClasses['to-black'];
    __VLS_styleScopedClasses['opacity-70'];
    __VLS_styleScopedClasses['container'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['z-10'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-4xl'];
    __VLS_styleScopedClasses['md:text-6xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['shadow-text'];
    __VLS_styleScopedClasses['tracking-wider'];
    __VLS_styleScopedClasses['leading-tight'];
    __VLS_styleScopedClasses['text-xl'];
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
    __VLS_styleScopedClasses['text-3xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['tracking-wider'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['hover:shadow-xl'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['font-body'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['ease-in-out'];
    __VLS_styleScopedClasses['transform'];
    __VLS_styleScopedClasses['hover:scale-105'];
    __VLS_styleScopedClasses['hover:shadow-md'];
    __VLS_styleScopedClasses['inline-block'];
    __VLS_styleScopedClasses['w-5'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['mr-2'];
    __VLS_styleScopedClasses['mb-16'];
    __VLS_styleScopedClasses['text-3xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['tracking-wider'];
    __VLS_styleScopedClasses['grid'];
    __VLS_styleScopedClasses['grid-cols-1'];
    __VLS_styleScopedClasses['md:grid-cols-2'];
    __VLS_styleScopedClasses['gap-8'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['hover:shadow-xl'];
    __VLS_styleScopedClasses['transform'];
    __VLS_styleScopedClasses['hover:scale-105'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['w-8'];
    __VLS_styleScopedClasses['h-8'];
    __VLS_styleScopedClasses['mr-4'];
    __VLS_styleScopedClasses['text-accent'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['hover:rotate-12'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['tracking-wider'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['leading-relaxed'];
    __VLS_styleScopedClasses['font-body'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-600'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['hover:bg-opacity-80'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['ease-in-out'];
    __VLS_styleScopedClasses['hover:shadow-md'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['transform'];
    __VLS_styleScopedClasses['hover:scale-105'];
    __VLS_styleScopedClasses['inline-block'];
    __VLS_styleScopedClasses['w-5'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['mr-2'];
    __VLS_styleScopedClasses['text-3xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['tracking-wider'];
    __VLS_styleScopedClasses['grid'];
    __VLS_styleScopedClasses['grid-cols-1'];
    __VLS_styleScopedClasses['md:grid-cols-2'];
    __VLS_styleScopedClasses['lg:grid-cols-4'];
    __VLS_styleScopedClasses['gap-8'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['hover:shadow-xl'];
    __VLS_styleScopedClasses['transform'];
    __VLS_styleScopedClasses['hover:scale-105'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['overflow-hidden'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['h-40'];
    __VLS_styleScopedClasses['object-cover'];
    __VLS_styleScopedClasses['transition-transform'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['hover:scale-110'];
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['inset-0'];
    __VLS_styleScopedClasses['transition-opacity'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['opacity-0'];
    __VLS_styleScopedClasses['hover:opacity-100'];
    __VLS_styleScopedClasses['transition-opacity'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['tracking-wider'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['leading-relaxed'];
    __VLS_styleScopedClasses['font-body'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['text-xs'];
    __VLS_styleScopedClasses['text-gray-600'];
    __VLS_styleScopedClasses['text-xs'];
    __VLS_styleScopedClasses['hover:bg-opacity-80'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['py-1'];
    __VLS_styleScopedClasses['px-2'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['ease-in-out'];
    __VLS_styleScopedClasses['hover:shadow-md'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['transform'];
    __VLS_styleScopedClasses['hover:scale-105'];
    __VLS_styleScopedClasses['mb-16'];
    __VLS_styleScopedClasses['text-3xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['hover:shadow-xl'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['mr-2'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['ease-in-out'];
    __VLS_styleScopedClasses['transform'];
    __VLS_styleScopedClasses['hover:scale-105'];
    __VLS_styleScopedClasses['hover:shadow-md'];
    __VLS_styleScopedClasses['inline-block'];
    __VLS_styleScopedClasses['w-5'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['mr-2'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['ease-in-out'];
    __VLS_styleScopedClasses['transform'];
    __VLS_styleScopedClasses['hover:scale-105'];
    __VLS_styleScopedClasses['hover:shadow-md'];
    __VLS_styleScopedClasses['inline-block'];
    __VLS_styleScopedClasses['w-5'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['mr-2'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['p-2'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['border'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['ease-in-out'];
    __VLS_styleScopedClasses['transform'];
    __VLS_styleScopedClasses['hover:scale-105'];
    __VLS_styleScopedClasses['hover:shadow-md'];
    __VLS_styleScopedClasses['inline-block'];
    __VLS_styleScopedClasses['w-5'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['mr-2'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['py-8'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['bg-transition'];
    __VLS_styleScopedClasses['bg-texture'];
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
    __VLS_styleScopedClasses['tracking-wider'];
    __VLS_styleScopedClasses['leading-relaxed'];
    __VLS_styleScopedClasses['font-body'];
    __VLS_styleScopedClasses['text-xl'];
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
    __VLS_styleScopedClasses['hover:rotate-12'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['tracking-wider'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['space-x-4'];
    __VLS_styleScopedClasses['hover:text-accent'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['w-6'];
    __VLS_styleScopedClasses['h-6'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['hover:rotate-12'];
    __VLS_styleScopedClasses['mt-8'];
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
            CameraIcon: CameraIcon,
            FileTextIcon: FileTextIcon,
            UploadIcon: UploadIcon,
            MessageSquareIcon: MessageSquareIcon,
            navLinks: navLinks,
            socialLinks: socialLinks,
            currentTheme: currentTheme,
            toggleTheme: toggleTheme,
            quizAnswer: quizAnswer,
            uploadType: uploadType,
            articleContent: articleContent,
            submitQuiz: submitQuiz,
            uploadContent: uploadContent,
            forums: forums,
            recentContributions: recentContributions,
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
//# sourceMappingURL=Community.vue.js.map