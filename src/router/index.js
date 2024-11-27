import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import Community from '../components/Community.vue'; // Import the Community component
import About from '../components/About.vue'; // Add this import statement
import Database from '../components/Database.vue';
import SpeciesDetail from '../components/SpeciesDetail.vue'; // New import for species detail page
const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/community',
        name: 'Community',
        component: Community
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/database',
        name: 'Database',
        component: Database
    },
    {
        path: '/species/:key',
        name: 'SpeciesDetail', // Updated to match the reference in Database.vue
        component: SpeciesDetail
    },
    // Add more routes here as needed
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});
export default router;
//# sourceMappingURL=index.js.map