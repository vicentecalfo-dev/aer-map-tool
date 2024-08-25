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
    },
    synonym: {
      options: {},
      dbField: "synonyms.scientificName",
      component: "searchByText",
      translate: "Filters.synonym",
    },
    vernacularName: {
      options: {},
      dbField: "vernacularNames.vernacularName",
      component: "searchByText",
      translate: "Filters.vernacularName",
    },
    scientificNameAuthorship: {
      options: axios.get(`${BASE_API_URL}/authorship`),
      dbField: "scientificNameAuthorship",
      component: "multiComboBox"
    },
    taxonRank: {
      options: [
        { value: "CLASSE", label: "Classe" },
        { value: "DIVISAO", label: "Divisão" },
        { value: "ESPECIE", label: "Espécie" },
        { value: "FAMILIA", label: "Família" },
        { value: "FORMA", label: "Forma" },
        { value: "GENERO", label: "Gênero" },
        { value: "ORDEM", label: "Ordem" },
        { value: "SUB_ESPECIE", label: "Subespécie" },
        { value: "SUB_FAMILIA", label: "Subfamília" },
        { value: "TRIBO", label: "Tribo" },
        { value: "VARIEDADE", label: "Variedade" },
      ],
      dbField: "taxonRank",
      component: "multiComboBox",
    },
    kingdom: {
      options: [
        { label: "Fungi", value: "Fungi" },
        { label: "Plantae", value: "Plantae" },
      ],
      dbField: "kingdom",
      component: "multiComboBox",
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
      options: [
        { label: "Aquática-Bentos", value: "Aquática-Bentos" },
        { label: "Aquática-Neuston", value: "Aquática-Neuston" },
        { label: "Aquática-Plâncton", value: "Aquática-Plâncton" },
        { label: "Arbusto", value: "Arbusto" },
        { label: "Bambu", value: "Bambu" },
        { label: "Coxim", value: "Coxim" },
        { label: "Dendróide", value: "Dendróide" },
        { label: "Desconhecida", value: "Desconhecida" },
        { label: "Dracenóide", value: "Dracenóide" },
        { label: "Endofítico", value: "Endofítico" },
        { label: "Erva", value: "Erva" },
        { label: "Flabelado", value: "Flabelado" },
        { label: "Folhosa", value: "Folhosa" },
        {
          label: "Liana/volúvel/trepadeira",
          value: "Liana/volúvel/trepadeira",
        },
        { label: "Liquenizado", value: "Liquenizado" },
        { label: "Micorrízico", value: "Micorrízico" },
        { label: "Palmeira", value: "Palmeira" },
        { label: "Parasita", value: "Parasita" },
        { label: "Pendente", value: "Pendente" },
        { label: "Saprobio", value: "Saprobio" },
        { label: "Subarbusto", value: "Subarbusto" },
        { label: "Suculenta", value: "Suculenta" },
        { label: "Talosa", value: "Talosa" },
        { label: "Tapete", value: "Tapete" },
        { label: "Trama", value: "Trama" },
        { label: "Tufo", value: "Tufo" },
        { label: "Árvore", value: "Árvore" },
      ],
      dbField: "profile.lifeForm",
      component: "multiComboBox",
    },
    profileVegatationType: {
      options: [
        {
          label: "Caatinga (stricto sensu)",
          value: "Caatinga (stricto sensu)",
        },
        { label: "Campinarana", value: "Campinarana" },
        { label: "Campo Limpo", value: "Campo Limpo" },
        { label: "Campo de Altitude", value: "Campo de Altitude" },
        { label: "Campo de Várzea", value: "Campo de Várzea" },
        { label: "Campo rupestre", value: "Campo rupestre" },
        { label: "Carrasco", value: "Carrasco" },
        { label: "Cerrado (lato sensu)", value: "Cerrado (lato sensu)" },
        {
          label: "Floresta Ciliar ou Galeria",
          value: "Floresta Ciliar ou Galeria",
        },
        {
          label: "Floresta Estacional Decidual",
          value: "Floresta Estacional Decidual",
        },
        {
          label: "Floresta Estacional Perenifólia",
          value: "Floresta Estacional Perenifólia",
        },
        {
          label: "Floresta Estacional Semidecidual",
          value: "Floresta Estacional Semidecidual",
        },
        {
          label: "Floresta Ombrófila (= Floresta Pluvial)",
          value: "Floresta Ombrófila (= Floresta Pluvial)",
        },
        {
          label: "Floresta Ombrófila Mista",
          value: "Floresta Ombrófila Mista",
        },
        { label: "Floresta de Igapó", value: "Floresta de Igapó" },
        { label: "Floresta de Terra Firme", value: "Floresta de Terra Firme" },
        { label: "Floresta de Várzea", value: "Floresta de Várzea" },
        { label: "Manguezal", value: "Manguezal" },
        { label: "Palmeiral", value: "Palmeiral" },
        { label: "Restinga", value: "Restinga" },
        { label: "Savana Amazônica", value: "Savana Amazônica" },
        { label: "Vegetação Aquática", value: "Vegetação Aquática" },
        {
          label: "Vegetação Sobre Afloramentos Rochosos",
          value: "Vegetação Sobre Afloramentos Rochosos",
        },
        { label: "Área Antrópica", value: "Área Antrópica" },
      ],
      dbField: "profile.vegetationType",
      component: "multiComboBox",
    },
    profileHabitat: {
      options: [
        { label: "Animal morto", value: "Animal morto" },
        { label: "Aquática", value: "Aquática" },
        { label: "Areia", value: "Areia" },
        { label: "Corticícola", value: "Corticícola" },
        { label: "Desconhecido", value: "Desconhecido" },
        { label: "Edáfica", value: "Edáfica" },
        { label: "Epixila", value: "Epixila" },
        { label: "Epífila", value: "Epífila" },
        { label: "Epífita", value: "Epífita" },
        { label: "Esterco ou Fezes", value: "Esterco ou Fezes" },
        { label: "Folhedo", value: "Folhedo" },
        { label: "Folhedo aéreo", value: "Folhedo aéreo" },
        { label: "Folhedo submerso", value: "Folhedo submerso" },
        { label: "Hemiepífita", value: "Hemiepífita" },
        { label: "Hemiparasita", value: "Hemiparasita" },
        { label: "Outro", value: "Outro" },
        { label: "Parasita", value: "Parasita" },
        { label: "Planta viva", value: "Planta viva" },
        {
          label: "Planta viva - córtex do caule",
          value: "Planta viva - córtex do caule",
        },
        {
          label: "Planta viva - córtex galho",
          value: "Planta viva - córtex galho",
        },
        { label: "Planta viva - folha", value: "Planta viva - folha" },
        { label: "Planta viva - fruto", value: "Planta viva - fruto" },
        {
          label: "Planta viva - inflorescência",
          value: "Planta viva - inflorescência",
        },
        { label: "Planta viva - raiz", value: "Planta viva - raiz" },
        { label: "Rocha", value: "Rocha" },
        { label: "Rupícola", value: "Rupícola" },
        { label: "Saprófita", value: "Saprófita" },
        { label: "Saxícola", value: "Saxícola" },
        {
          label: "Simbionte (incluindo fungos liquenizados)",
          value: "Simbionte (incluindo fungos liquenizados)",
        },
        { label: "Solo", value: "Solo" },
        { label: "Sub-aérea", value: "Sub-aérea" },
        { label: "Terrícola", value: "Terrícola" },
        { label: "Tronco em decomposição", value: "Tronco em decomposição" },
        { label: "Água", value: "Água" },
      ],
      dbField: "profile.habitat",
      component: "multiComboBox",
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
      dbField: "distribution.states",
      component: "multiComboBox",
    },
    establishmentMeans: {
      options: [
        { value: "", label: "Desconhecida" },
        { value: "CULTIVADA", label: "Cultivada" },
        { value: "NATIVA", label: "Nativa" },
        { value: "NATURALIZADA", label: "Naturalizada" },
      ],
      dbField: "distribution.establishmentMeans",
      component: "multiComboBox",
    },
    endemism: {
      options: [
        { label: "Sim", value: "Endemica" },
        { label: "Não", value: "Não endemica" },
      ],
      dbField: "distribution.endemism",
      component: "multiComboBox",
    },
    phytogeographicDomain: {
      options: [
        { value: "Amazônia", label: "Amazônia" },
        { value: "Caatinga", label: "Caatinga" },
        { value: "Cerrado", label: "Cerrado" },
        { value: "Mata Atlântica", label: "Mata Atlântica" },
        { value: "Pampa", label: "Pampa" },
        { value: "Pantanal", label: "Pantanal" },
      ],
      dbField: "distribution.phytogeographicDomain",
      component: "multiComboBox",
    },
    assessmentCategory: {
      options: assessmentCategory,
      dbField: "assessment.category",
      component: "multiComboBox",
    },
    reassessment: {
      options: yesOrNo,
      dbField: "assessment.reassessment",
      component: "multiComboBox",
      translate: "MultiComboBox.yesOrNo",
    },
    reasonForReAssessment: {
      options: axios.get(`${BASE_API_URL}/reasonForReAssessment`),
      dbField: "assessment.reasonForReAssessment",
      component: "multiComboBox",
      translate: "Filters.reasonForReAssessment.options"
    },
    assessmentCategoryChanged: {
      options: yesOrNo,
      dbField: "assessment.categoryChanged",
      component: "multiComboBox",
      translate: "MultiComboBox.yesOrNo"
    },
    lastAssessmentCategory: {
      options: assessmentCategory,
      dbField: "assessment.lastCategory",
      component: "multiComboBox",
    },
    assessmentYear: {
      options: {
        limits: [1950, new Date().getFullYear()],
        comparisonTypeDefault: "$eq",
      },
      dbField: "assessment.year",
      component: "searchByNumber",
    },
    threatsIncidence: {
      options: [
        { label: "Local", value: "local" },
        { label: "Nacional", value: "national" },
        { label: "Regional", value: "regional" },
      ],
      dbField: "threats.incidence",
      component: "multiComboBox",
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
    governmentOfficialList: {
      options: [
        { label: "Portaria MMA 443 (2014)", value: "MMA_443" },
        { label: "Portaria MMA 148 (2022)", value: "MMA_148" },
      ],
      dbField: "governmentOfficialList",
      component: "multiComboBox",
      translate: "Filters.governmentOfficialList.options"
    },
  };

  return filter ? config[filter] : config;
};

export default getFiltersService;
