import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { Leaf as LeafIcon, Sun as SunIcon, Moon as MoonIcon, SunMoon as SunMoonIcon, Home, Users, Database, Info } from 'lucide-vue-next';
import { gbifService } from '../services/gbifService';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
// Navigation Links
const navLinks = [
    { href: "/", text: "Home" },
    { href: "/community", text: "Community" },
    { href: "/database", text: "Database" },
    { href: "/about", text: "About" },
];
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
];
const currentTheme = ref(themes[0]);
const themeIndex = ref(0);
// Theme Toggle Function
const toggleTheme = () => {
    themeIndex.value = (themeIndex.value + 1) % themes.length;
    currentTheme.value = themes[themeIndex.value];
};
// Get Link Icon Function
const getLinkIcon = (text) => {
    switch (text) {
        case 'Home': return Home;
        case 'Community': return Users;
        case 'Database': return Database;
        case 'About': return Info;
        default: return Info;
    }
};
// Get Species Data States
const route = useRoute();
const speciesKey = ref(null);
// Species Data States
const speciesInfo = ref(null);
const occurrences = ref([]);
const datasets = ref([]);
const offsetOccurrences = ref(0);
const offsetDatasets = ref(0);
// Additional Data States
const conservationStatus = ref(null);
const taxOrder = ref(null);
const ncbiTaxonomy = ref(null);
const gtdbClusters = ref([]);
const phylogeneticTree = ref('');
const uniProtResults = ref([]);
const additionalDataLoaded = ref(false);
// Loading and Error States
const isLoading = ref(false);
const errorMessage = ref(null);
// Fetch Functions
const fetchSpeciesInfo = async (key) => {
    isLoading.value = true;
    errorMessage.value = null;
    try {
        const response = await axios.get(`https://api.gbif.org/v1/species/${key}`);
        speciesInfo.value = response.data;
    }
    catch (error) {
        console.error('Error fetching species info:', error);
        errorMessage.value = 'Failed to load species information. Please try again later.';
        speciesInfo.value = null;
    }
    finally {
        isLoading.value = false;
    }
};
const fetchOccurrences = async (key) => {
    try {
        const response = await axios.get(`https://api.gbif.org/v1/occurrence/search`, {
            params: {
                taxonKey: key,
                limit: 10, // Increased limit for more data points
                offset: offsetOccurrences.value,
                country: 'US' // Example filter; adjust as needed
            }
        });
        // Filter out occurrences without valid coordinates
        const validOccurrences = response.data.results.filter((occurrence) => occurrence.decimalLatitude && occurrence.decimalLongitude);
        occurrences.value = [...occurrences.value, ...validOccurrences];
        // Update map center if new occurrences are added
        if (validOccurrences.length > 0 && offsetOccurrences.value === 0) {
            center.value = [validOccurrences[0].decimalLatitude, validOccurrences[0].decimalLongitude];
        }
    }
    catch (error) {
        console.error('Error fetching occurrences:', error);
        errorMessage.value = 'Failed to load occurrence data.';
    }
};
const fetchDatasets = async (key) => {
    try {
        const response = await axios.get(`https://api.gbif.org/v1/dataset/search`, {
            params: {
                q: speciesInfo.value.scientificName,
                limit: 3,
                offset: offsetDatasets.value
            }
        });
        datasets.value = [...datasets.value, ...response.data.results];
    }
    catch (error) {
        console.error('Error fetching datasets:', error);
    }
};
const loadMoreOccurrences = async () => {
    offsetOccurrences.value += 3;
    await fetchOccurrences(speciesKey.value);
};
const loadMoreDatasets = async () => {
    offsetDatasets.value += 3;
    await fetchDatasets(speciesKey.value);
};
const fetchAdditionalData = async () => {
    try {
        if (speciesKey.value) {
            // Fetch Conservation Status
            conservationStatus.value = await gbifService.getIUCNStatus(speciesKey.value);
            // Fetch Taxonomic Order
            taxOrder.value = await gbifService.getTaxOrder(speciesInfo.value.scientificName);
            // Fetch NCBI Taxonomy
            ncbiTaxonomy.value = await gbifService.getNCBITaxonomy(speciesInfo.value.scientificName);
            // Fetch GTDB Clusters
            const gtdbResponse = await gbifService.getGTDBClusters(speciesInfo.value.scientificName);
            gtdbClusters.value = gtdbResponse.clusters;
            // Generate Phylogenetic Tree
            const treeResponse = await gbifService.generateWGDTTree(speciesInfo.value.scientificName);
            phylogeneticTree.value = treeResponse.tree;
            // Search UniProt
            const uniProtResponse = await gbifService.searchUniProt(speciesInfo.value.scientificName);
            uniProtResults.value = uniProtResponse.results;
            additionalDataLoaded.value = true;
        }
    }
    catch (error) {
        console.error('Error fetching additional data:', error);
    }
};
// Map States
const map = ref(null);
const zoom = ref(2);
const center = ref([20, 0]);
// Watch for route changes
watch(() => route.params.key, async (newKey) => {
    if (newKey) {
        speciesKey.value = newKey;
        // Reset previous data
        speciesInfo.value = null;
        occurrences.value = [];
        datasets.value = [];
        offsetOccurrences.value = 0;
        offsetDatasets.value = 0;
        additionalDataLoaded.value = false;
        conservationStatus.value = null;
        taxOrder.value = null;
        ncbiTaxonomy.value = null;
        gtdbClusters.value = [];
        phylogeneticTree.value = '';
        uniProtResults.value = [];
        isLoading.value = true;
        errorMessage.value = null;
        try {
            // Fetch new data
            await fetchSpeciesInfo(speciesKey.value);
            if (speciesInfo.value) {
                await fetchOccurrences(speciesKey.value);
                await fetchDatasets(speciesKey.value);
                await fetchAdditionalData();
            }
        }
        catch (error) {
            console.error('Error during data fetching:', error);
            errorMessage.value = 'An unexpected error occurred while loading data.';
        }
        finally {
            isLoading.value = false;
        }
    }
}, { immediate: true });
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([`min-h-screen flex flex-col text-gray-800 font-body bg-transition`, __VLS_ctx.currentTheme.bgClass])) }, });
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({ ...{ class: (([`flex-grow py-16 transition-colors duration-300 bg-transition`, __VLS_ctx.currentTheme.sectionClass])) }, ...{ style: ({}) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container mx-auto px-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ ...{ class: ("text-4xl font-heading font-bold mb-12 text-center tracking-wider") }, });
    if (__VLS_ctx.isLoading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("text-center") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-xl") }, });
    }
    if (__VLS_ctx.errorMessage) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-8 p-6 rounded-lg shadow-lg bg-red-100 text-red-700") }, });
        (__VLS_ctx.errorMessage);
    }
    if (__VLS_ctx.speciesInfo && !__VLS_ctx.isLoading && !__VLS_ctx.errorMessage) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([`mb-8 p-6 rounded-lg shadow-lg`, __VLS_ctx.currentTheme.cardClass])) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-2xl font-heading font-bold mb-4") }, });
        (__VLS_ctx.speciesInfo.scientificName);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.speciesInfo.vernacularName || 'Not available');
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.speciesInfo.kingdom);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.speciesInfo.phylum);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.speciesInfo.class);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.speciesInfo.order);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.speciesInfo.family || 'Not available');
        if (__VLS_ctx.speciesInfo.media && __VLS_ctx.speciesInfo.media.length > 0) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-4") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.speciesInfo.media[0].identifier)), alt: ((__VLS_ctx.speciesInfo.scientificName)), ...{ class: ("w-full max-w-md mx-auto rounded-lg shadow-md") }, });
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-xl font-semibold mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.conservationStatus?.conservation_status || 'Not available');
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-xl font-semibold mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
        (__VLS_ctx.taxOrder?.order || 'Not available');
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-xl font-semibold mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ((__VLS_ctx.ncbiTaxonomy?.taxonomy_link)), target: ("_blank"), rel: ("noopener noreferrer"), });
        (__VLS_ctx.ncbiTaxonomy?.species || 'View on NCBI');
    }
    if (__VLS_ctx.occurrences.length > 0 && !__VLS_ctx.isLoading && !__VLS_ctx.errorMessage) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([`mb-8 p-6 rounded-lg shadow-lg`, __VLS_ctx.currentTheme.cardClass])) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-2xl font-heading font-bold mb-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden shadow-lg") }, });
        const __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.LMap;
        /** @type { [typeof __VLS_components.LMap, typeof __VLS_components.lMap, typeof __VLS_components.LMap, typeof __VLS_components.lMap, ] } */
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ ref: ("map"), zoom: ((__VLS_ctx.zoom)), center: ((__VLS_ctx.center)), }));
        const __VLS_38 = __VLS_37({ ref: ("map"), zoom: ((__VLS_ctx.zoom)), center: ((__VLS_ctx.center)), }, ...__VLS_functionalComponentArgsRest(__VLS_37));
        // @ts-ignore navigation for `const map = ref()`
        __VLS_ctx.map;
        var __VLS_42 = {};
        const __VLS_43 = __VLS_resolvedLocalAndGlobalComponents.LTileLayer;
        /** @type { [typeof __VLS_components.LTileLayer, typeof __VLS_components.lTileLayer, typeof __VLS_components.LTileLayer, typeof __VLS_components.lTileLayer, ] } */
        // @ts-ignore
        const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({ url: ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"), layerType: ("base"), name: ("OpenStreetMap"), }));
        const __VLS_45 = __VLS_44({ url: ("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"), layerType: ("base"), name: ("OpenStreetMap"), }, ...__VLS_functionalComponentArgsRest(__VLS_44));
        for (const [occurrence] of __VLS_getVForSourceType((__VLS_ctx.occurrences))) {
            const __VLS_49 = __VLS_resolvedLocalAndGlobalComponents.LMarker;
            /** @type { [typeof __VLS_components.LMarker, typeof __VLS_components.lMarker, typeof __VLS_components.LMarker, typeof __VLS_components.lMarker, ] } */
            // @ts-ignore
            const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({ key: ((occurrence.key)), latLng: (([occurrence.decimalLatitude, occurrence.decimalLongitude])), }));
            const __VLS_51 = __VLS_50({ key: ((occurrence.key)), latLng: (([occurrence.decimalLatitude, occurrence.decimalLongitude])), }, ...__VLS_functionalComponentArgsRest(__VLS_50));
            const __VLS_55 = __VLS_resolvedLocalAndGlobalComponents.LPopup;
            /** @type { [typeof __VLS_components.LPopup, typeof __VLS_components.lPopup, typeof __VLS_components.LPopup, typeof __VLS_components.lPopup, ] } */
            // @ts-ignore
            const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({}));
            const __VLS_57 = __VLS_56({}, ...__VLS_functionalComponentArgsRest(__VLS_56));
            (occurrence.scientificName);
            __VLS_nonNullable(__VLS_60.slots).default;
            const __VLS_60 = __VLS_pickFunctionalComponentCtx(__VLS_55, __VLS_57);
            __VLS_nonNullable(__VLS_54.slots).default;
            const __VLS_54 = __VLS_pickFunctionalComponentCtx(__VLS_49, __VLS_51);
        }
        __VLS_nonNullable(__VLS_41.slots).default;
        const __VLS_41 = __VLS_pickFunctionalComponentCtx(__VLS_36, __VLS_38);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([`mb-8 p-6 rounded-lg shadow-lg`, __VLS_ctx.currentTheme.cardClass])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-2xl font-heading font-bold mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("space-y-2") }, });
    for (const [occurrence, index] of __VLS_getVForSourceType((__VLS_ctx.occurrences.slice(0, 3)))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((occurrence.key)), });
        (occurrence.scientificName);
        (occurrence.decimalLatitude);
        (occurrence.decimalLongitude);
    }
    if (__VLS_ctx.occurrences.length > 3) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.loadMoreOccurrences) }, ...{ class: ("mt-4 bg-green-500 text-white px-4 py-2 rounded") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([`mb-8 p-6 rounded-lg shadow-lg`, __VLS_ctx.currentTheme.cardClass])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-2xl font-heading font-bold mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("space-y-2") }, });
    for (const [dataset, index] of __VLS_getVForSourceType((__VLS_ctx.datasets.slice(0, 3)))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((dataset.key)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (dataset.title);
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (dataset.description.length > 50 ? dataset.description.substring(0, 50) + '...' :
            dataset.description);
    }
    if (__VLS_ctx.datasets.length > 3) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.loadMoreDatasets) }, ...{ class: ("mt-4 bg-green-500 text-white px-4 py-2 rounded") }, });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({ ...{ class: (([`text-white py-12 transition-colors duration-300 bg-transition`, __VLS_ctx.currentTheme.footerClass])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("container mx-auto px-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("grid grid-cols-1 md:grid-cols-3 gap-8") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-2xl font-heading font-semibold mb-4 tracking-wider") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("leading-relaxed font-body") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-2xl font-heading font-semibold mb-4 tracking-wider") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("space-y-2") }, });
    for (const [link] of __VLS_getVForSourceType((__VLS_ctx.navLinks))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((link.href)), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ((link.href)), ...{ class: ("hover:text-accent transition-colors duration-300 flex items-center") }, });
        const __VLS_61 = ((__VLS_ctx.getLinkIcon(link.text)));
        // @ts-ignore
        const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({ ...{ class: ("w-6 h-6 mr-2 transition-all duration-300 hover:rotate-6") }, }));
        const __VLS_63 = __VLS_62({ ...{ class: ("w-6 h-6 mr-2 transition-all duration-300 hover:rotate-6") }, }, ...__VLS_functionalComponentArgsRest(__VLS_62));
        (link.text);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-2xl font-heading font-semibold mb-4 tracking-wider") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("leading-relaxed font-body") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ("https://www.gbif.org/"), target: ("_blank"), rel: ("noopener noreferrer"), ...{ class: ("text-accent hover:underline") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mt-8 text-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("font-body") }, });
    __VLS_styleScopedClasses['min-h-screen'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
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
    __VLS_styleScopedClasses['flex-grow'];
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
    __VLS_styleScopedClasses['tracking-wider'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['bg-red-100'];
    __VLS_styleScopedClasses['text-red-700'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['max-w-md'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['h-[400px]'];
    __VLS_styleScopedClasses['bg-gray-100'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['overflow-hidden'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['space-y-2'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['bg-green-500'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['space-y-2'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['bg-green-500'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['rounded'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['py-12'];
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
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['tracking-wider'];
    __VLS_styleScopedClasses['leading-relaxed'];
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
    __VLS_styleScopedClasses['leading-relaxed'];
    __VLS_styleScopedClasses['font-body'];
    __VLS_styleScopedClasses['text-accent'];
    __VLS_styleScopedClasses['hover:underline'];
    __VLS_styleScopedClasses['mt-8'];
    __VLS_styleScopedClasses['text-center'];
    __VLS_styleScopedClasses['font-body'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {
        "map": __VLS_42,
    };
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
            currentTheme: currentTheme,
            toggleTheme: toggleTheme,
            getLinkIcon: getLinkIcon,
            speciesInfo: speciesInfo,
            occurrences: occurrences,
            datasets: datasets,
            conservationStatus: conservationStatus,
            taxOrder: taxOrder,
            ncbiTaxonomy: ncbiTaxonomy,
            isLoading: isLoading,
            errorMessage: errorMessage,
            loadMoreOccurrences: loadMoreOccurrences,
            loadMoreDatasets: loadMoreDatasets,
            map: map,
            zoom: zoom,
            center: center,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
//# sourceMappingURL=SpeciesDetail.vue.js.map