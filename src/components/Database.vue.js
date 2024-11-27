import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Leaf as LeafIcon, Sun as SunIcon, Moon as MoonIcon, SunMoon as SunMoonIcon, Search as SearchIcon, Home, Users, Database, Info } from 'lucide-vue-next';
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
];
const currentTheme = ref(themes[0]);
const themeIndex = ref(0);
const searchType = ref('species');
const searchQuery = ref('');
const selectedSpecies = ref(null);
const speciesResults = ref([]);
const literatureResults = ref([]);
const datasetResults = ref([]);
const loading = ref(false);
const error = ref(null);
const suggestions = ref([]);
const offset = ref(0);
const limit = ref(5);
const hasMoreSpecies = ref(false);
const hasMoreLiterature = ref(false);
const hasMoreDatasets = ref(false);
// Track unique species keys to prevent duplicates
const uniqueSpeciesKeys = new Set();
// Classification Order
const classificationOrder = ['kingdom', 'phylum', 'class', 'order', 'family', 'genus'];
// Capitalize Function
const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);
// Show Classification Function
const showClassification = (species) => {
    const speciesRank = species.rank ? species.rank.toLowerCase() : '';
    return classificationOrder.some(taxa => species[taxa] && taxa !== speciesRank);
};
// Handle Image Load Error
const handleImageError = (event) => {
    event.target.style.display = 'none';
};
// Fetch Density Map URL
const fetchDensityMapUrl = (taxonKey) => {
    return `https://api.gbif.org/v1/map/density/tile.png?x=0&y=0&z=0&palette=yellows_reds&key=${taxonKey}&type=TAXON&resolution=4`;
};
// Toggle Theme Function
const toggleTheme = () => {
    themeIndex.value = (themeIndex.value + 1) % themes.length;
    currentTheme.value = themes[themeIndex.value];
};
// Set Search Type Function
const setSearchType = (type) => {
    searchType.value = type; // Update the current search type
    searchQuery.value = ''; // Clear the search input
    suggestions.value = []; // Clear the suggestions dropdown
    resetSearch(); // Reset search results and related states
};
// Reset Search Function
const resetSearch = () => {
    selectedSpecies.value = null;
    speciesResults.value = [];
    literatureResults.value = [];
    datasetResults.value = [];
    offset.value = 0;
    hasMoreSpecies.value = false;
    hasMoreLiterature.value = false;
    hasMoreDatasets.value = false;
    error.value = null;
    uniqueSpeciesKeys.clear(); // Clear the set to allow new unique entries
};
// Get Placeholder Function
const getPlaceholder = () => {
    switch (searchType.value) {
        case 'species':
            return 'Enter species name...';
        case 'literature':
            return 'Enter keywords...';
        case 'dataset':
            return 'Enter dataset name...';
        default:
            return 'Search...';
    }
};
// Perform Search Function
const performSearch = async () => {
    if (!searchQuery.value)
        return;
    loading.value = true;
    error.value = null;
    resetSearch();
    try {
        if (searchType.value === 'species') {
            await searchSpecies();
        }
        else if (searchType.value === 'literature') {
            await searchLiterature();
        }
        else if (searchType.value === 'dataset') {
            await searchDatasets();
        }
    }
    catch (err) {
        error.value = `An error occurred while searching. Please try again.`;
        console.error('Error during search:', err);
    }
    finally {
        loading.value = false;
    }
};
// Search Species Function
const searchSpecies = async () => {
    if (!searchQuery.value.trim())
        return;
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
        }
        else {
            error.value = 'No species found. Please try a different search term.';
        }
    }
    catch (err) {
        error.value = 'Error fetching species data.';
        console.error('Error details:', err);
    }
    finally {
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
        });
        if (response.data.results && response.data.results.length > 0) {
            literatureResults.value = [...literatureResults.value, ...response.data.results];
            hasMoreLiterature.value = response.data.endOfRecords === false;
            offset.value += limit.value;
        }
        else if (literatureResults.value.length === 0) {
            error.value = 'No literature found. Please try a different search term.';
        }
    }
    catch (err) {
        if (err.code === 'ECONNABORTED') {
            error.value = 'Request timed out. Please try again.';
        }
        else {
            a;
            error.value = 'Error fetching literature data.';
        }
        console.error(err);
    }
};
// Search Datasets Function
const searchDatasets = async () => {
    try {
        const response = await axios.get(`https://api.gbif.org/v1/dataset/search`, {
            params: {
                q: searchQuery.value,
                limit: limit.value,
                offset: offset.value
            }
        });
        if (response.data.results && response.data.results.length > 0) {
            datasetResults.value = [...datasetResults.value, ...response.data.results];
            hasMoreDatasets.value = response.data.endOfRecords === false;
            offset.value += limit.value;
        }
        else if (datasetResults.value.length === 0) {
            error.value = 'No datasets found. Please try a different search term.';
        }
    }
    catch (err) {
        error.value = 'Error fetching dataset data.';
        console.error(err);
    }
};
// Fetch Suggestions Function
const fetchSuggestions = async () => {
    if (searchQuery.value.length < 3) {
        suggestions.value = [];
        return;
    }
    try {
        let response;
        if (searchType.value === 'species') {
            response = await axios.get(`https://api.gbif.org/v1/species/suggest`, {
                params: {
                    q: searchQuery.value,
                    limit: 5
                }
            });
            suggestions.value = response.data.map(suggestion => ({
                scientificName: suggestion.scientificName,
                key: suggestion.key
            }));
        }
        else if (searchType.value === 'dataset') {
            response = await axios.get(`https://api.gbif.org/v1/dataset/search`, {
                params: {
                    q: searchQuery.value,
                    limit: 5
                }
            });
            suggestions.value = response.data.results.map(dataset => ({
                title: dataset.title,
                key: dataset.key
            }));
        }
        else {
            suggestions.value = [];
        }
    }
    catch (err) {
        console.error('Error fetching suggestions:', err);
        suggestions.value = [];
    }
};
// Select Suggestion Function
const selectSuggestion = (suggestion) => {
    searchQuery.value = suggestion.scientificName || suggestion.title;
    suggestions.value = [];
    performSearch();
};
// Load More Functions
const loadMoreSpecies = () => {
    searchSpecies();
};
const loadMoreLiterature = () => {
    searchLiterature();
};
const loadMoreDatasets = () => {
    searchDatasets();
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
const backboneConstantKey = ref('YOUR_BACKBONE_CONSTANT_KEY'); // Replace with actual key or fetch
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-12 max-w-2xl mx-auto") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-4") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([`inline-flex p-1 rounded-md`, __VLS_ctx.currentTheme.cardClass])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.setSearchType('species');
            } }, ...{ class: (([`px-4 py-2 rounded-md transition-all duration-300 ease-in-out text-sm font-medium`,
                __VLS_ctx.searchType === 'species' ? __VLS_ctx.currentTheme.buttonClass : 'bg-transparent text-gray-700'])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.setSearchType('literature');
            } }, ...{ class: (([`px-4 py-2 rounded-md transition-all duration-300 ease-in-out text-sm font-medium`,
                __VLS_ctx.searchType === 'literature' ? __VLS_ctx.currentTheme.buttonClass : 'bg-transparent text-gray-700'])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (...[$event]) => {
                __VLS_ctx.setSearchType('dataset');
            } }, ...{ class: (([`px-4 py-2 rounded-md transition-all duration-300 ease-in-out text-sm font-medium`,
                __VLS_ctx.searchType === 'dataset' ? __VLS_ctx.currentTheme.buttonClass : 'bg-transparent text-gray-700'])) }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("relative") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onInput: (__VLS_ctx.fetchSuggestions) }, ...{ onKeyup: (__VLS_ctx.performSearch) }, value: ((__VLS_ctx.searchQuery)), type: ("text"), ...{ class: (([`w-full px-4 py-3 rounded-l-lg focus:outline-none shadow-md`, __VLS_ctx.currentTheme.inputClass])) }, placeholder: ((__VLS_ctx.getPlaceholder())), });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.performSearch) }, ...{ class: (([`px-6 py-3 rounded-r-lg text-white font-semibold transition-all duration-300 ease-in-out shadow-md`, __VLS_ctx.currentTheme.buttonClass])) }, });
    const __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.SearchIcon;
    /** @type { [typeof __VLS_components.SearchIcon, ] } */
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ ...{ class: ("w-5 h-5") }, }));
    const __VLS_38 = __VLS_37({ ...{ class: ("w-5 h-5") }, }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    if (__VLS_ctx.suggestions.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("py-1") }, });
        for (const [suggestion] of __VLS_getVForSourceType((__VLS_ctx.suggestions))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.suggestions.length > 0)))
                            return;
                        __VLS_ctx.selectSuggestion(suggestion);
                    } }, key: ((suggestion.key)), ...{ class: ("px-4 py-2 hover:bg-gray-100 cursor-pointer") }, });
            (suggestion.title || suggestion.scientificName);
        }
    }
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex justify-center items-center mb-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("ml-2 text-lg") }, });
    }
    if (__VLS_ctx.selectedSpecies) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([`mb-8 p-6 rounded-lg shadow-lg`, __VLS_ctx.currentTheme.cardClass])) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({ ...{ class: ("text-2xl font-heading font-bold mb-4") }, });
        (__VLS_ctx.selectedSpecies.scientificName);
        const __VLS_42 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
        /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
        // @ts-ignore
        const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ to: ((`/species/${__VLS_ctx.selectedSpecies.key}`)), ...{ class: ("text-blue-500 hover:underline") }, }));
        const __VLS_44 = __VLS_43({ to: ((`/species/${__VLS_ctx.selectedSpecies.key}`)), ...{ class: ("text-blue-500 hover:underline") }, }, ...__VLS_functionalComponentArgsRest(__VLS_43));
        __VLS_nonNullable(__VLS_47.slots).default;
        const __VLS_47 = __VLS_pickFunctionalComponentCtx(__VLS_42, __VLS_44);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.selectedSpecies.vernacularName || 'Not available');
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.selectedSpecies.kingdom || 'Not available');
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.selectedSpecies.phylum || 'Not available');
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.selectedSpecies.class || 'Not available');
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.selectedSpecies.order || 'Not available');
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.selectedSpecies.family || 'Not available');
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.selectedSpecies.kingdom);
        (__VLS_ctx.selectedSpecies.phylum);
        (__VLS_ctx.selectedSpecies.class);
        (__VLS_ctx.selectedSpecies.order);
        (__VLS_ctx.selectedSpecies.family);
        (__VLS_ctx.selectedSpecies.genus || 'Not available');
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("mb-2") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
        (__VLS_ctx.selectedSpecies.occurrenceCount || 'Not available');
        if (__VLS_ctx.selectedSpecies.media && __VLS_ctx.selectedSpecies.media.length > 0) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("mb-4") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.selectedSpecies.media[0].identifier)), alt: ((__VLS_ctx.selectedSpecies.scientificName)), ...{ class: ("w-full max-w-md mx-auto rounded-lg shadow-md") }, });
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm italic") }, });
    }
    if (__VLS_ctx.speciesResults.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([`mb-8 rounded-lg shadow-lg overflow-hidden`, __VLS_ctx.currentTheme.cardClass])) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-2xl font-heading font-bold p-6 border-b border-gray-200") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("divide-y divide-gray-200") }, });
        for (const [species] of __VLS_getVForSourceType((__VLS_ctx.speciesResults))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((species.key)), ...{ class: ("p-6 hover:bg-gray-50 transition duration-150 ease-in-out") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({ ...{ class: ("flex flex-col md:flex-row md:items-start md:space-x-6") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("md:w-1/3 mb-4 md:mb-0") }, });
            if (species.imageUrl) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("aspect-w-16 aspect-h-9 rounded-lg overflow-hidden") }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({ ...{ onError: (__VLS_ctx.handleImageError) }, src: ((species.imageUrl)), alt: ((species.scientificName)), ...{ class: ("object-cover w-full h-full") }, });
            }
            else {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center") }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: ("text-gray-400 text-sm") }, });
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("md:w-2/3") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex items-center justify-between mb-2") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({ ...{ class: ("text-xl font-semibold") }, });
            const __VLS_48 = __VLS_resolvedLocalAndGlobalComponents.RouterLink;
            /** @type { [typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ] } */
            // @ts-ignore
            const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({ to: ((`/species/${species.key}`)), ...{ class: ("hover:text-accent transition-colors duration-300") }, }));
            const __VLS_50 = __VLS_49({ to: ((`/species/${species.key}`)), ...{ class: ("hover:text-accent transition-colors duration-300") }, }, ...__VLS_functionalComponentArgsRest(__VLS_49));
            __VLS_elementAsFunction(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)({});
            (species.scientificName);
            __VLS_nonNullable(__VLS_53.slots).default;
            const __VLS_53 = __VLS_pickFunctionalComponentCtx(__VLS_48, __VLS_50);
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: (([`px-2 py-1 text-xs font-semibold rounded-full`, __VLS_ctx.currentTheme.buttonClass])) }, });
            (species.occurrenceCount);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm text-gray-600 mb-2") }, });
            (species.author);
            if (species.publishedIn) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm text-gray-600 mb-2") }, });
                __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
                (species.publishedIn);
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm text-gray-600 mb-2") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (species.kingdom || 'Unknown');
            (species.phylum || 'Unknown');
            (species.class || 'Unknown');
            (species.order || 'Unknown');
            (species.family || 'Unknown');
            (species.genus || 'Unknown');
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("flex flex-wrap gap-2 mt-3") }, });
            if (species.rank) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: (([`px-2 py-1 text-xs font-semibold rounded-full`, __VLS_ctx.currentTheme.buttonClass])) }, });
                (species.rank);
            }
            if (species.taxonomicStatus) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ ...{ class: (([`px-2 py-1 text-xs font-semibold rounded-full`, __VLS_ctx.currentTheme.buttonClass])) }, });
                (species.taxonomicStatus);
            }
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("p-6 border-t border-gray-200") }, });
        if (__VLS_ctx.hasMoreSpecies) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.loadMoreSpecies) }, ...{ class: (([`w-full px-4 py-2 rounded-md text-white font-semibold transition-all duration-300 ease-in-out`, __VLS_ctx.currentTheme.buttonClass])) }, });
        }
    }
    if (__VLS_ctx.literatureResults.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([`mb-8 p-6 rounded-lg shadow-lg`, __VLS_ctx.currentTheme.cardClass])) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-2xl font-heading font-bold mb-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("space-y-4") }, });
        for (const [item] of __VLS_getVForSourceType((__VLS_ctx.literatureResults))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((item.id)), ...{ class: ("border-b border-gray-200 pb-4 last:border-b-0") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({ ...{ class: ("text-lg font-semibold mb-2") }, });
            (item.title);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm mb-1") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            if (item.authors && Array.isArray(item.authors)) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                (item.authors.map(a => `${a.firstName} ${a.lastName}`).join('; '));
            }
            else {
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm mb-1") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            if (item.published) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
                (new Date(item.published).toLocaleDateString());
            }
            else {
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm mb-1") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            if (item.identifiers.doi) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ((`https://doi.org/${item.identifiers.doi}`)), target: ("_blank"), rel: ("noopener noreferrer"), ...{ class: ("text-accent hover:underline") }, });
                (item.identifiers.doi);
            }
            else {
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm mb-1") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (item.abstract);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm mb-1") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            if (item.websites.length > 0) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ((item.websites[0])), target: ("_blank"), rel: ("noopener noreferrer"), ...{ class: ("text-accent hover:underline") }, });
            }
            else {
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            }
        }
        if (__VLS_ctx.hasMoreLiterature) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.loadMoreLiterature) }, ...{ class: (([`mt-4 px-4 py-2 rounded-md text-white font-semibold transition-all duration-300 ease-in-out`, __VLS_ctx.currentTheme.buttonClass])) }, });
        }
    }
    if (__VLS_ctx.datasetResults.length > 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([`mb-8 p-6 rounded-lg shadow-lg`, __VLS_ctx.currentTheme.cardClass])) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({ ...{ class: ("text-2xl font-heading font-bold mb-4") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({ ...{ class: ("space-y-4") }, });
        for (const [dataset] of __VLS_getVForSourceType((__VLS_ctx.datasetResults))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({ key: ((dataset.key)), ...{ class: ("border-b border-gray-200 pb-4 last:border-b-0") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({ ...{ class: ("text-lg font-semibold mb-2") }, });
            (dataset.title);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm mb-1") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (dataset.type);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm mb-1") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            (dataset.description);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({ ...{ class: ("text-sm mb-1") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
            if (dataset.doi) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.a, __VLS_intrinsicElements.a)({ href: ((`https://doi.org/${dataset.doi}`)), target: ("_blank"), rel: ("noopener noreferrer"), ...{ class: ("text-accent hover:underline") }, });
                (dataset.doi);
            }
            else {
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            }
        }
        if (__VLS_ctx.hasMoreDatasets) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({ ...{ onClick: (__VLS_ctx.loadMoreDatasets) }, ...{ class: (([`mt-4 px-4 py-2 rounded-md text-white font-semibold transition-all duration-300 ease-in-out`, __VLS_ctx.currentTheme.buttonClass])) }, });
        }
    }
    if (__VLS_ctx.error) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: (([`p-4 rounded-lg text-white`, __VLS_ctx.currentTheme.errorClass])) }, });
        (__VLS_ctx.error);
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
        const __VLS_54 = ((__VLS_ctx.getLinkIcon(link.text)));
        // @ts-ignore
        const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({ ...{ class: ("w-6 h-6 mr-2 transition-all duration-300 hover:rotate-6") }, }));
        const __VLS_56 = __VLS_55({ ...{ class: ("w-6 h-6 mr-2 transition-all duration-300 hover:rotate-6") }, }, ...__VLS_functionalComponentArgsRest(__VLS_55));
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
    __VLS_styleScopedClasses['mb-12'];
    __VLS_styleScopedClasses['max-w-2xl'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['inline-flex'];
    __VLS_styleScopedClasses['p-1'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['ease-in-out'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['ease-in-out'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['ease-in-out'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['font-medium'];
    __VLS_styleScopedClasses['relative'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-3'];
    __VLS_styleScopedClasses['rounded-l-lg'];
    __VLS_styleScopedClasses['focus:outline-none'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['px-6'];
    __VLS_styleScopedClasses['py-3'];
    __VLS_styleScopedClasses['rounded-r-lg'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['ease-in-out'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['w-5'];
    __VLS_styleScopedClasses['h-5'];
    __VLS_styleScopedClasses['absolute'];
    __VLS_styleScopedClasses['z-10'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['mt-1'];
    __VLS_styleScopedClasses['bg-white'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['py-1'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['hover:bg-gray-100'];
    __VLS_styleScopedClasses['cursor-pointer'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['animate-spin'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['h-12'];
    __VLS_styleScopedClasses['w-12'];
    __VLS_styleScopedClasses['border-t-2'];
    __VLS_styleScopedClasses['border-b-2'];
    __VLS_styleScopedClasses['border-accent'];
    __VLS_styleScopedClasses['ml-2'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['text-blue-500'];
    __VLS_styleScopedClasses['hover:underline'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['max-w-md'];
    __VLS_styleScopedClasses['mx-auto'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-md'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['italic'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['overflow-hidden'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['border-b'];
    __VLS_styleScopedClasses['border-gray-200'];
    __VLS_styleScopedClasses['divide-y'];
    __VLS_styleScopedClasses['divide-gray-200'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['hover:bg-gray-50'];
    __VLS_styleScopedClasses['transition'];
    __VLS_styleScopedClasses['duration-150'];
    __VLS_styleScopedClasses['ease-in-out'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-col'];
    __VLS_styleScopedClasses['md:flex-row'];
    __VLS_styleScopedClasses['md:items-start'];
    __VLS_styleScopedClasses['md:space-x-6'];
    __VLS_styleScopedClasses['md:w-1/3'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['md:mb-0'];
    __VLS_styleScopedClasses['aspect-w-16'];
    __VLS_styleScopedClasses['aspect-h-9'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['overflow-hidden'];
    __VLS_styleScopedClasses['object-cover'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['aspect-w-16'];
    __VLS_styleScopedClasses['aspect-h-9'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['overflow-hidden'];
    __VLS_styleScopedClasses['bg-gray-200'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-center'];
    __VLS_styleScopedClasses['text-gray-400'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['md:w-2/3'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-between'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['text-xl'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['hover:text-accent'];
    __VLS_styleScopedClasses['transition-colors'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['px-2'];
    __VLS_styleScopedClasses['py-1'];
    __VLS_styleScopedClasses['text-xs'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-600'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-600'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['text-gray-600'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['flex-wrap'];
    __VLS_styleScopedClasses['gap-2'];
    __VLS_styleScopedClasses['mt-3'];
    __VLS_styleScopedClasses['px-2'];
    __VLS_styleScopedClasses['py-1'];
    __VLS_styleScopedClasses['text-xs'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['px-2'];
    __VLS_styleScopedClasses['py-1'];
    __VLS_styleScopedClasses['text-xs'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['rounded-full'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['border-t'];
    __VLS_styleScopedClasses['border-gray-200'];
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['ease-in-out'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['space-y-4'];
    __VLS_styleScopedClasses['border-b'];
    __VLS_styleScopedClasses['border-gray-200'];
    __VLS_styleScopedClasses['pb-4'];
    __VLS_styleScopedClasses['last:border-b-0'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['mb-1'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['mb-1'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['mb-1'];
    __VLS_styleScopedClasses['text-accent'];
    __VLS_styleScopedClasses['hover:underline'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['mb-1'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['mb-1'];
    __VLS_styleScopedClasses['text-accent'];
    __VLS_styleScopedClasses['hover:underline'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['ease-in-out'];
    __VLS_styleScopedClasses['mb-8'];
    __VLS_styleScopedClasses['p-6'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['shadow-lg'];
    __VLS_styleScopedClasses['text-2xl'];
    __VLS_styleScopedClasses['font-heading'];
    __VLS_styleScopedClasses['font-bold'];
    __VLS_styleScopedClasses['mb-4'];
    __VLS_styleScopedClasses['space-y-4'];
    __VLS_styleScopedClasses['border-b'];
    __VLS_styleScopedClasses['border-gray-200'];
    __VLS_styleScopedClasses['pb-4'];
    __VLS_styleScopedClasses['last:border-b-0'];
    __VLS_styleScopedClasses['text-lg'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['mb-2'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['mb-1'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['mb-1'];
    __VLS_styleScopedClasses['text-sm'];
    __VLS_styleScopedClasses['mb-1'];
    __VLS_styleScopedClasses['text-accent'];
    __VLS_styleScopedClasses['hover:underline'];
    __VLS_styleScopedClasses['mt-4'];
    __VLS_styleScopedClasses['px-4'];
    __VLS_styleScopedClasses['py-2'];
    __VLS_styleScopedClasses['rounded-md'];
    __VLS_styleScopedClasses['text-white'];
    __VLS_styleScopedClasses['font-semibold'];
    __VLS_styleScopedClasses['transition-all'];
    __VLS_styleScopedClasses['duration-300'];
    __VLS_styleScopedClasses['ease-in-out'];
    __VLS_styleScopedClasses['p-4'];
    __VLS_styleScopedClasses['rounded-lg'];
    __VLS_styleScopedClasses['text-white'];
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
            SearchIcon: SearchIcon,
            navLinks: navLinks,
            currentTheme: currentTheme,
            searchType: searchType,
            searchQuery: searchQuery,
            selectedSpecies: selectedSpecies,
            speciesResults: speciesResults,
            literatureResults: literatureResults,
            datasetResults: datasetResults,
            loading: loading,
            error: error,
            suggestions: suggestions,
            hasMoreSpecies: hasMoreSpecies,
            hasMoreLiterature: hasMoreLiterature,
            hasMoreDatasets: hasMoreDatasets,
            handleImageError: handleImageError,
            toggleTheme: toggleTheme,
            setSearchType: setSearchType,
            getPlaceholder: getPlaceholder,
            performSearch: performSearch,
            fetchSuggestions: fetchSuggestions,
            selectSuggestion: selectSuggestion,
            loadMoreSpecies: loadMoreSpecies,
            loadMoreLiterature: loadMoreLiterature,
            loadMoreDatasets: loadMoreDatasets,
            getLinkIcon: getLinkIcon,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
//# sourceMappingURL=Database.vue.js.map