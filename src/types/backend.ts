export interface IUCNResponse {
  species_name: string
  conservation_status: string
  details: Record<string, any>
  key?: number // Add this line to include the key property
}

export interface SpSearchResponse {
  results: any[] // Update with actual structure
}

export interface WormstoolsResponse {
  data: Record<string, any>
}

export interface GTDBResponse {
  clusters: Cluster[]
}

export interface Cluster {
  id: number
  name: string
  // Add other relevant fields
}

export interface WGDTTreeResponse {
  tree: string
}

export interface TaxOrderResponse {
  species: string
  order: string
}

export interface Boldigger2Response {
  results: any[] // Update with actual structure
}

export interface PyOpenFisheriesResponse {
  fisheries_data: Record<string, any>
}

export interface PhylopyprunerResponse {
  pruned_tree: string
}

export interface PyBHLResponse {
  documents: any[] // Update with actual structure
}

export interface PyColResponse {
  colonization_data: Record<string, any>
}

export interface INaturalistObservation {
  species: string
  location: string
  url: string
}

export interface NCBIResponse {
  species: string
  taxonomy_link: string
}

export interface BioservicesUniProtResponse {
  results: UniProtEntry[]
}

export interface UniProtEntry {
  id: string
  name: string
  url: string
  // Add other relevant fields
}
