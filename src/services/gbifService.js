import axios from 'axios';
const BASE_URL = 'https://api.gbif.org/v1/';
const BACKEND_BASE_URL = 'http://localhost:8000/api/'; // Update if different
export const gbifService = {
    // --- Registry API Methods ---
    /**
     * Fetches registry information.
     * [Registry API Documentation](https://techdocs.gbif.org/en/openapi/v1/registry)
     */
    getRegistryInfo: async () => {
        try {
            const response = await axios.get(`${BASE_URL}registry`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching registry information:', error);
            throw error;
        }
    },
    /**
     * Fetches principal methods from the registry.
     * [Registry Principal Methods](https://techdocs.gbif.org/en/openapi/v1/registry-principal-methods)
     */
    getRegistryPrincipalMethods: async () => {
        try {
            const response = await axios.get(`${BASE_URL}registry/principal-methods`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching registry principal methods:', error);
            throw error;
        }
    },
    // --- Species API Methods ---
    /**
     * Searches for species based on a query string.
     * [Species API Documentation](https://techdocs.gbif.org/en/openapi/v1/species)
     */
    searchSpecies: async (query, limit = 10, offset = 0) => {
        try {
            const response = await axios.get(`${BASE_URL}species/search`, {
                params: { q: query, limit, offset },
            });
            return response.data.results;
        }
        catch (error) {
            console.error('Error searching species:', error);
            throw error;
        }
    },
    /**
     * Retrieves detailed information about a specific species by its unique key.
     * [Species API Documentation](https://techdocs.gbif.org/en/openapi/v1/species)
     */
    getSpeciesByKey: async (key) => {
        try {
            const response = await axios.get(`${BASE_URL}species/${key}`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching species by key:', error);
            throw error;
        }
    },
    /**
     * Retrieves the immediate children of a given taxon.
     * [Species API Documentation](https://techdocs.gbif.org/en/openapi/v1/species)
     */
    getSpeciesChildren: async (key, limit = 10, offset = 0) => {
        try {
            const response = await axios.get(`${BASE_URL}species/${key}/children`, {
                params: { limit, offset },
            });
            return response.data.results;
        }
        catch (error) {
            console.error('Error fetching species children:', error);
            throw error;
        }
    },
    // --- Occurrence API Methods ---
    /**
     * Searches for species occurrences based on various filters.
     * [Occurrence API Documentation](https://techdocs.gbif.org/en/openapi/v1/occurrence)
     */
    searchOccurrences: async (filters) => {
        try {
            const response = await axios.get(`${BASE_URL}occurrence/search`, {
                params: filters,
            });
            return response.data.results;
        }
        catch (error) {
            console.error('Error searching occurrences:', error);
            throw error;
        }
    },
    /**
     * Retrieves detailed information about a specific occurrence by its unique key.
     * [Occurrence API Documentation](https://techdocs.gbif.org/en/openapi/v1/occurrence)
     */
    getOccurrenceByKey: async (key) => {
        try {
            const response = await axios.get(`${BASE_URL}occurrence/${key}`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching occurrence by key:', error);
            throw error;
        }
    },
    // --- Maps API Methods ---
    /**
     * Retrieves map-related data.
     * [Maps API Documentation](https://techdocs.gbif.org/en/openapi/v2/maps)
     */
    getMapsData: async () => {
        try {
            const response = await axios.get(`${BASE_URL}maps`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching maps data:', error);
            throw error;
        }
    },
    // --- Literature API Methods ---
    /**
     * Searches for literature based on a query string.
     * [Literature API Documentation](https://techdocs.gbif.org/en/openapi/v1/literature)
     */
    searchLiterature: async (query, limit = 10, offset = 0) => {
        try {
            const response = await axios.get(`${BASE_URL}literature/search`, {
                params: { q: query, limit, offset },
            });
            return response.data.results;
        }
        catch (error) {
            console.error('Error searching literature:', error);
            throw error;
        }
    },
    /**
     * Retrieves detailed information about a specific literature entry by its unique key.
     * [Literature API Documentation](https://techdocs.gbif.org/en/openapi/v1/literature)
     */
    getLiteratureByKey: async (key) => {
        try {
            const response = await axios.get(`${BASE_URL}literature/${key}`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching literature by key:', error);
            throw error;
        }
    },
    // --- Validator API Methods ---
    /**
     * Validates a species name against GBIF taxonomy.
     * [Validator API Documentation](https://techdocs.gbif.org/en/openapi/v1/validator)
     */
    validateSpeciesName: async (name, strict = false) => {
        try {
            const response = await axios.get(`${BASE_URL}validator/species`, {
                params: { name, strict },
            });
            return response.data;
        }
        catch (error) {
            console.error('Error validating species name:', error);
            throw error;
        }
    },
    // --- Vocabulary API Methods ---
    /**
     * Searches for terms in GBIF vocabularies.
     * [Vocabulary API Documentation](https://techdocs.gbif.org/en/openapi/v1/vocabulary)
     */
    searchVocabulary: async (query, vocabulary = 'ALL', limit = 10, offset = 0) => {
        try {
            const response = await axios.get(`${BASE_URL}vocabulary/search`, {
                params: { q: query, vocabulary, limit, offset },
            });
            return response.data.results;
        }
        catch (error) {
            console.error('Error searching vocabulary:', error);
            throw error;
        }
    },
    /**
     * Retrieves detailed information about a specific vocabulary term by its unique key.
     * [Vocabulary API Documentation](https://techdocs.gbif.org/en/openapi/v1/vocabulary)
     */
    getVocabularyByKey: async (key) => {
        try {
            const response = await axios.get(`${BASE_URL}vocabulary/${key}`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching vocabulary by key:', error);
            throw error;
        }
    },
    /**
     * Fetches the IUCN conservation status for a species using its name.
     * @param speciesName - The name of the species.
     */
    getIUCNStatus: async (speciesName) => {
        try {
            const response = await axios.get(`${BASE_URL}species/search`, {
                params: { q: speciesName },
            });
            const speciesKey = response.data.key; // Get the first result's key
            if (!speciesKey) {
                throw new Error('Species not found');
            }
            const iucnResponse = await axios.get(`${BASE_URL}species/${speciesKey}/iucn`);
            return iucnResponse.data;
        }
        catch (error) {
            console.error('Error fetching IUCN status:', error);
            throw error;
        }
    },
};
export const backendService = {
    /**
     * Fetches conservation status from IUCN API.
     * @param speciesKey - Unique key of the species.
     */
    getIUCNStatus: async (speciesKey) => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}iucn/${speciesKey}`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching IUCN status:', error);
            throw error;
        }
    },
    /**
     * Searches species using the spsearch API.
     * @param query - Search query.
     */
    searchSpsearch: async (query) => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}spsearch/${encodeURIComponent(query)}`);
            return response.data;
        }
        catch (error) {
            console.error('Error searching species:', error);
            throw error;
        }
    },
    /**
     * Fetches marine species data using wormstools API.
     * @param speciesName - Name of the species.
     */
    getWormstoolsData: async (speciesName) => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}wormstools/${encodeURIComponent(speciesName)}`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching Wormstools data:', error);
            throw error;
        }
    },
    /**
     * Fetches GTDB clusters for a species.
     * @param speciesName - Name of the species.
     */
    getGTDBClusters: async (speciesName) => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}gtdb-clusters/${encodeURIComponent(speciesName)}`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching GTDB clusters:', error);
            throw error;
        }
    },
    /**
     * Generates a phylogenetic tree using wgdtree API.
     * @param speciesName - Name of the species.
     */
    generateWGDTTree: async (speciesName) => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}wgdtree/${encodeURIComponent(speciesName)}`);
            return response.data;
        }
        catch (error) {
            console.error('Error generating WGDT tree:', error);
            throw error;
        }
    },
    /**
     * Fetches taxonomic order using taxOrder API.
     * @param speciesName - Name of the species.
     */
    getTaxOrder: async (speciesName) => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}taxOrder/${encodeURIComponent(speciesName)}`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching Taxonomic Order:', error);
            throw error;
        }
    },
    /**
     * Analyzes a gene sequence using boldigger2 API.
     * @param geneSequence - Gene sequence string.
     */
    analyzeGeneSequence: async (geneSequence) => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}boldigger2/${encodeURIComponent(geneSequence)}`);
            return response.data;
        }
        catch (error) {
            console.error('Error analyzing gene sequence:', error);
            throw error;
        }
    },
    /**
     * Fetches fisheries data using pyOpenFisheries API.
     * @param fisheriesId - ID of the fisheries.
     */
    getFisheriesData: async (fisheriesId) => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}pyOpenFisheries/${fisheriesId}`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching fisheries data:', error);
            throw error;
        }
    },
    /**
     * Prunes a phylogenetic tree using phylopypruner API.
     * @param treeId - ID of the tree.
     */
    prunePhylogeneticTree: async (treeId) => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}phylopypruner/${encodeURIComponent(treeId)}`);
            return response.data;
        }
        catch (error) {
            console.error('Error pruning phylogenetic tree:', error);
            throw error;
        }
    },
    /**
     * Searches literature using pyBHL API.
     * @param query - Search query.
     */
    searchLiterature: async (query) => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}pyBHL/${encodeURIComponent(query)}`);
            return response.data;
        }
        catch (error) {
            console.error('Error searching literature:', error);
            throw error;
        }
    },
    /**
     * Fetches colonization data using pycol API.
     * @param speciesName - Name of the species.
     */
    getColonizationData: async (speciesName) => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}pycol/${encodeURIComponent(speciesName)}`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching colonization data:', error);
            throw error;
        }
    },
    /**
     * Fetches observations from iNaturalist using backend API.
     * @param speciesName - Name of the species.
     */
    getINaturalistObservations: async (speciesName) => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}inaturalist/${encodeURIComponent(speciesName)}`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching iNaturalist observations:', error);
            throw error;
        }
    },
    /**
     * Fetches NCBI taxonomy information using biopython API.
     * @param speciesName - Name of the species.
     */
    getNCBITaxonomy: async (speciesName) => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}biopython/ncbi/${encodeURIComponent(speciesName)}`);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching NCBI taxonomy:', error);
            throw error;
        }
    },
    /**
     * Searches UniProt using bioservices API.
     * @param query - Search query.
     */
    searchUniProt: async (query) => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URL}bioservices/uniprot/${encodeURIComponent(query)}`);
            return response.data;
        }
        catch (error) {
            console.error('Error searching UniProt:', error);
            throw error;
        }
    },
};
//# sourceMappingURL=gbifService.js.map