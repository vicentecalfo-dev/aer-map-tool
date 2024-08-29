import axios from "axios";

const BASE_API_URL = "http://localhost:3100/data";

const assessmentCategory = [
  { label: "Extinta (EX)", value: "EX" },
  { label: "Extinta na Natureza (EW)", value: "EW" },
  { label: "Regionalmente Extinta (RE)", value: "RE" },
  {
    label: "Criticamente em Perigo (possivelmente extinta na natureza) (PEW)",
    value: "PEW",
  },
  { label: "Criticamente em Perigo (possivelmente extinta) (PE)", value: "PE" },
  { label: "Criticamente em Perigo (CR)", value: "CR" },
  { label: "Em Perigo (EN)", value: "EN" },
  { label: "Vulnerável (VU)", value: "VU" },
  { label: "Quase Ameaçada (NT)", value: "NT" },
  { label: "Menos Preocupante (LC)", value: "LC" },
  { label: "Dados Insuficientes (DD)", value: "DD" },
  { label: "Não Avaliada (NE)", value: "NE" },
];

const yesOrNo = [
  { label: "Sim", value: "Sim" },
  { label: "Não", value: "Não" },
];

const getFiltersService = (filter = null) => {
  const config = {
    scientificName: {
      options: {},
      dbField: "scientificName",
      component: "searchByText",
      translate: "Filters.scientificName",
      isExactMatch: true,
      isExactMatchValue: true,
      validColumns: ["espécie", "nome científico", "species", "scientific name", 'táxon', 'taxon']
    },
    taxonId: {
      options: {},
      dbField: "taxonID",
      component: "searchByText",
      translate: "Filters.taxonId",
      isExactMatch: false,
      isExactMatchValue: true,
      validColumns: ["taxonID", "taxonId", "id"]
    },
    synonym: {
      options: {},
      dbField: "synonyms.scientificName",
      component: "searchByText",
      translate: "Filters.synonym",
      isExactMatch: true,
      isExactMatchValue: true,
      validColumns: ["espécie", "nome científico", "species", "scientific name", 'táxon', 'taxon']
    },
    vernacularName: {
      options: {},
      dbField: "vernacularNames.vernacularName",
      component: "searchByText",
      translate: "Filters.vernacularName",
      isExactMatch: true,
      isExactMatchValue: true,
      validColumns: ["nome popular", "vernacular name", "name", "nome"]
    },
    scientificNameAuthorship: {
      options: axios.get(`${BASE_API_URL}/authorship`),
      dbField: "scientificNameAuthorship",
      component: "multiComboBox",
      exists:false
    },
    taxonRank: {
      options: axios.get(`${BASE_API_URL}/taxonRank`),
      dbField: "taxonRank",
      component: "multiComboBox",
      translate:"Filters.taxonRank.options"
    },
    kingdom: {
      options: [
        { label: "Fungi", value: "Fungi" },
        { label: "Plantae", value: "Plantae" },
      ],
      dbField: "kingdom",
      component: "multiComboBox",
      translate: "Filters.kingdom.options"
    },
    phylum: {
      options: axios.get(`${BASE_API_URL}/phylum`),
      dbField: "phylum",
      component: "multiComboBox",
    },
    class: {
      options: axios.get(`${BASE_API_URL}/class`),
      dbField: "class",
      component: "multiComboBox",
    },
    order: {
      options: axios.get(`${BASE_API_URL}/order`),
      dbField: "order",
      component: "multiComboBox",
    },
    family: {
      options: axios.get(`${BASE_API_URL}/family`),
      dbField: "family",
      component: "multiComboBox",
    },
    genus: {
      options: axios.get(`${BASE_API_URL}/genus`),
      dbField: "genus",
      component: "multiComboBox",
    },
    profileLifeForm: {
      options: axios.get(`${BASE_API_URL}/lifeForm`),
      dbField: "profile.lifeForm",
      component: "multiComboBox",
      isExactMatch: true,
      isExactMatchValue: false,
      translate:"Filters.profileLifeForm.options"
    },
    profileVegatationType: {
      options: axios.get(`${BASE_API_URL}/vegetationType`),
      dbField: "profile.vegetationType",
      component: "multiComboBox",
      isExactMatch: true,
      isExactMatchValue: false,
      translate: "Filters.profileVegatationType.options"
    },
    profileHabitat: {
      options: axios.get(`${BASE_API_URL}/habitat`),
      dbField: "profile.habitat",
      component: "multiComboBox",
      isExactMatch: true,
      isExactMatchValue: false,
      translate: "Filters.profileHabitat.options"
    },
    profilePopulationExtremeFluctuation: {
      options: axios.get(`${BASE_API_URL}/population/extremeFluctuation`),
      dbField: "profile.population.extremeFluctuation.extremeFluctuation",
      component: "multiComboBox",
      isExactMatch: true,
      isExactMatchValue: false,
      translate: "MultiComboBox.yesNoOrUnknown",
      sortOrder: "desc",
    },
    substratum: {
      options: axios.get(`${BASE_API_URL}/substratum`),
      dbField: "profile.ecology.substratum",
      component: "multiComboBox",
      isExactMatch: true,
      isExactMatchValue: false,
      translate: "Filters.substratum.options"
    },
    distributionFragmented: {
      options: axios.get(`${BASE_API_URL}/distribution/fragmented`),
      dbField: "profile.distribution.fragmented",
      component: "multiComboBox",
      isExactMatch: true,
      isExactMatchValue: false,
      translate: "MultiComboBox.yesNoOrUnknown",
      sortOrder: "desc",
    },
    distributionRegion: {
      options: [
        { value: "Norte", label: "Norte" },
        { value: "Nordeste", label: "Nordeste" },
        { value: "Centro-Oeste", label: "Centro-Oeste" },
        { value: "Sudeste", label: "Sudeste" },
        { value: "Sul", label: "Sul" },
      ],
      dbField: "distribution.region",
      component: "multiComboBox",
      isExactMatch: true,
      isExactMatchValue: false,
      translate:"Filters.distributionRegion.options"
    },
    distributionState: {
      options: [
        { value: "AC", label: "Acre (AC)" },
        { value: "AL", label: "Alagoas (AL)" },
        { value: "AP", label: "Amapá (AP)" },
        { value: "AM", label: "Amazonas (AM)" },
        { value: "BA", label: "Bahia (BA)" },
        { value: "CE", label: "Ceará (CE)" },
        { value: "DF", label: "Distrito Federal (DF)" },
        { value: "ES", label: "Espírito Santo (ES)" },
        { value: "GO", label: "Goiás (GO)" },
        { value: "MA", label: "Maranhão (MA)" },
        { value: "MT", label: "Mato Grosso (MT)" },
        { value: "MS", label: "Mato Grosso do Sul (MS)" },
        { value: "MG", label: "Minas Gerais (MG)" },
        { value: "PA", label: "Pará (PA)" },
        { value: "PB", label: "Paraíba (PB)" },
        { value: "PR", label: "Paraná (PR)" },
        { value: "PE", label: "Pernambuco (PE)" },
        { value: "PI", label: "Piauí (PI)" },
        { value: "RJ", label: "Rio de Janeiro (RJ)" },
        { value: "RN", label: "Rio Grande do Norte (RN)" },
        { value: "RS", label: "Rio Grande do Sul (RS)" },
        { value: "RO", label: "Rondônia (RO)" },
        { value: "RR", label: "Roraima (RR)" },
        { value: "SC", label: "Santa Catarina (SC)" },
        { value: "SP", label: "São Paulo (SP)" },
        { value: "SE", label: "Sergipe (SE)" },
        { value: "TO", label: "Tocantins (TO)" },
      ],
      dbField: "distribution.stateProvince",
      component: "multiComboBox",
      isExactMatch: true,
      isExactMatchValue: false,
    },
    distributionMunicipalityState: {
      options: axios.get(`/options/municipios.json`),
      dbField: "distribution.municipality",
      component: "multiComboBox",
      isExactMatch: true,
      isExactMatchValue: false,
    },
    establishmentMeans: {
      options: axios.get(`${BASE_API_URL}/establishmentMeans`),
      dbField: "distribution.establishmentMeans",
      component: "multiComboBox",
      translate: "Filters.establishmentMeans.options",
    },
    endemism: {
      options: [
        { label: "Sim", value: "Endemica" },
        { label: "Não", value: "Não endemica" },
      ],
      dbField: "distribution.endemism",
      component: "multiComboBox",
      sortOrder: "asc",
      translate:"Filters.endemism.options",
    },
    phytogeographicDomain: {
      options: axios.get(`${BASE_API_URL}/phytogeographicDomain`),
      dbField: "distribution.phytogeographicDomain",
      component: "multiComboBox",
      isExactMatch: true,
      isExactMatchValue: false,
      translate: "Filters.phytogeographicDomain.options",
    },
    eoo: {
      options: {
        limits: [0, new Date().getFullYear()],
        comparisonTypeDefault: "$eq",
      },
      dbField: "profile.distribution.eoo",
      component: "searchByNumber",
      translate: "Filters.eoo",
      hint: true,
      exists:true
    },
    aoo: {
      options: {
        limits: [0, new Date().getFullYear()],
        comparisonTypeDefault: "$eq",
      },
      dbField: "profile.distribution.aoo",
      component: "searchByNumber",
      translate: "Filters.aoo",
      hint: true,
      exists:true
    },
    economicValue: {
      options: axios.get(`${BASE_API_URL}/economicValue`),
      dbField: "profile.economicValue.potentialEconomicValue",
      component: "multiComboBox",
      translate: "MultiComboBox.yesNoOrUnknown",
      sortOrder: "desc",
    },
    assessmentCategory: {
      options: assessmentCategory,
      dbField: "assessment.category",
      component: "multiComboBox",
      translate: "Filters.assessmentCategory.options",
    },
    reassessment: {
      options: yesOrNo,
      dbField: "assessment.reassessment.status",
      component: "multiComboBox",
      translate: "MultiComboBox.yesOrNo",
    },
    reasonForReAssessment: {
      options: axios.get(`${BASE_API_URL}/reasonForReAssessment`),
      dbField: "assessment.reasonsForReAssessment.reason",
      component: "multiComboBox",
      translate: "Filters.reasonForReAssessment.options",
    },
    assessmentCategoryChanged: {
      options: yesOrNo,
      dbField: "assessment.categoryChanged",
      component: "multiComboBox",
      translate: "MultiComboBox.yesOrNo",
    },
    reasonForChangeCategory: {
      options: axios.get(`${BASE_API_URL}/reasonForChange`),
      dbField: "assessment.reasonsForChange.reason",
      component: "multiComboBox",
      translate: "Filters.reasonForChangeCategory.options",
    },
    lastAssessmentCategory: {
      options: assessmentCategory,
      dbField: "assessment.lastCategory",
      component: "multiComboBox",
      translate: "Filters.assessmentCategory.options",
    },
    assessmentYear: {
      options: {
        limits: [1950, new Date().getFullYear()],
        comparisonTypeDefault: "$eq",
      },
      dbField: "assessment.year",
      component: "searchByNumber",
    },
    threats: {
      options: axios.get(`${BASE_API_URL}/threats`),
      dbField: "profile.threats.threat",
      component: "multiComboBox",
      translate:"Filters.threats.options"
    },
    threatsStress: {
      options: axios.get(`${BASE_API_URL}/threats/stress`),
      dbField: "profile.threats.stress",
      component: "multiComboBox",
      translate:"Filters.threatsStress.options"
    },
    threatsIncidence: {
      options: axios.get(`${BASE_API_URL}/threats/incidence`),
      dbField: "profile.threats.incidence",
      component: "multiComboBox",
      translate:"Filters.threatsIncidence.options"
    },
    threatsTiming: {
      options: axios.get(`${BASE_API_URL}/threats/timing`),
      dbField: "profile.threats.timing",
      component: "multiComboBox",
      translate:"Filters.threatsTiming.options"
    },
    threatsDecline: {
      options: axios.get(`${BASE_API_URL}/threats/decline`),
      dbField: "profile.threats.decline",
      component: "multiComboBox",
      translate:"Filters.threatsDecline.options"
    },
    threatsSeverity: {
      options: axios.get(`${BASE_API_URL}/threats/severity`),
      dbField: "profile.threats.severity",
      component: "multiComboBox",
      translate:"Filters.threatsSeverity.options"
    },
    conservationAction: {
      options: axios.get(`${BASE_API_URL}/conservation/action`),
      dbField: "profile.actions.action",
      component: "multiComboBox",
      translate:"Filters.conservationAction.options"
    },
    conservationActionSituation: {
      options: axios.get(`${BASE_API_URL}/conservation/action/situation`),
      dbField: "profile.actions.situation",
      component: "multiComboBox",
      translate:"Filters.conservationActionSituation.options"
    },
    usesInformation: {
      options: axios.get(`${BASE_API_URL}/uses`),
      dbField: "profile.uses.use",
      component: "multiComboBox",
      translate:"Filters.usesInformation.options"
    },
    assessmentAssessor: {
      options: axios.get(`${BASE_API_URL}/assessor`),
      dbField: "assessment.assessor",
      component: "multiComboBox",
    },
    assessmentEvaluator: {
      options: axios.get(`${BASE_API_URL}/evaluator`),
      dbField: "assessment.evaluator",
      component: "multiComboBox",
    },
    governmentDocuments: {
      options: [
        { label: "Portaria MMA 443 (2014)", value: "MMA_443" },
        { label: "Portaria MMA 148 (2022)", value: "MMA_148" },
      ],
      dbField: "governmentDocuments",
      component: "multiComboBox",
      translate: "Filters.governmentDocuments.options",
      isExactMatch: true,
      isExactMatchValue: false,
    },
  };

  return filter ? config[filter] : config;
};

export default getFiltersService;
