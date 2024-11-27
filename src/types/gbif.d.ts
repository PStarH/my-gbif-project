// Registry API Types
export interface RegistryInfo {
  // Define the structure based on GBIF's Registry API response
  name: string
  version: string
  // Add other relevant fields
}

export interface RegistryPrincipalMethods {
  // Define the structure based on GBIF's Registry Principal Methods response
  methods: string[]
  // Add other relevant fields
}

// Species API Types
export interface SpeciesSearchResult {
  key: number
  scientificName: string
  vernacularName?: string
  // Add other relevant fields
}

export interface SpeciesDetail {
  key: number
  scientificName: string
  vernacularName?: string
  kingdom: string
  phylum: string
  class: string
  order: string
  family?: string
  genus?: string
  media?: {
    identifier: string
    // Include other media-related fields if necessary
  }[]
  datasetKey?: string;
  origin?: string;
  // Add other relevant fields
}

// Occurrence API Types
export interface Occurrence {
  key: number
  decimalLatitude: number
  decimalLongitude: number
  eventDate?: string
  // Add other relevant fields
}

// Literature API Types
export interface Literature {
  key: number
  title?: string
  link?: string
  authors?: string
  // Add other relevant fields
}

// Vocabulary API Types
export interface VocabularyTerm {
  key: number
  label: string
  preference?: string
  // Add other relevant fields
}

// Maps API Types
export interface MapsData {
  // Define the structure based on GBIF's Maps API response
  // Example fields:
  latitude: number
  longitude: number
  title: string
  description: string
  // Add other relevant fields
}

// Dataset API Types
export interface Dataset {
  key: number
  title: string
  link?: string
  publishingOrganizationName?: string
  // Add other relevant fields
}

// Publisher API Types
export interface Publisher {
  key: number
  name: string
  // Add other relevant fields
}

// Network API Types
export interface Network {
  key: number
  name: string
  // Add other relevant fields
}

// Validator API Types
// Define as needed based on Validator API response structure
export interface ValidatorResult {
  // Example fields:
  name: string
  matchType: string
  status: string
  // Add other relevant fields
}
