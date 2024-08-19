import { type } from "os";

const categoriesColors: { [key: string]: string } = {
  EX: "bg-black text-red-700", // #000
  EW: "bg-black text-white", //#000
  RE: "bg-purple-800 text-white/50", //#6B21A8
  PEW: "bg-red-600 text-white/70", //#DC2626
  PE: "bg-red-600 text-white/70", //#DC2626
  CR: "bg-red-600 text-white/70", //#DC2626
  EN: "bg-orange-600 text-white/70", //#EA580C
  VU: "bg-yellow-500 text-white/70", //#EAB307
  NT: "bg-teal-700 text-white/70", //#0F766E
  LC: "bg-teal-700 text-white", //#0F766E #fff
  DD: "bg-gray-300 text-gray-400", //#D1D5DB  #A1A1AA
  NE: "bg-gray-200 text-gray-400", //#E5E7EB  #A1A1AA
};

export const _categoriesLabels: { [key: string]: { [key: string]: string } } = {
  EN: {
    EX: "Extinct",
    EW: "Extinct in the Wild",
    RE: "Regionally Extinct",
    PEW: "Critically Endangered (possibly extinct in the wild)",
    PE: "Critically Endangered (possibly extinct)",
    CR: "Critically Endangered",
    EN: "Endangered",
    VU: "Vulnerable",
    NT: "Near Threatened",
    LC: "Least Concern",
    DD: "Data Deficient",
    NE: "Not Evaluated",
  },
  BR:{
    EX: "Extinta",
    EW: "Extinta na Natureza",
    RE: "Regionalmente Extinta",
    PEW: "Criticamente em Perigo (possivelmente extinta na natureza)",
    PE: "Criticamente em Perigo (possivelmente extinta)",
    CR: "Criticamente em Perigo",
    EN: "Em Perigo",
    VU: "Vulnerável",
    NT: "Quase Ameaçada",
    LC: "Menos Preocupante",
    DD: "Dados Insuficientes",
    NE: "Não Avaliada",
  }
};

export type IUCNCategories =
  | "NE"
  | "DD"
  | "LC"
  | "NT"
  | "VU"
  | "EN"
  | "CR"
  | "PEW"
  | "PE"
  | "RE"
  | "EW"
  | "EX";

interface CategoriesLabelOptions {
  lang?: "BR" | "EN";
  category: IUCNCategories | string;
}

const categoriesLabels = (options: CategoriesLabelOptions) => {
  const _defaults = { lang: "EN", category: "NE" };
  const { lang, category } = { ..._defaults, ...options };
  return _categoriesLabels[lang][category];
};
export { categoriesColors, categoriesLabels };
