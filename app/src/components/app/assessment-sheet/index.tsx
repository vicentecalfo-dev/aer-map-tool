import Badge from "@codeworker.br/govbr-tw-react/dist/components/Badge";
import statesOptions from "../../../lib/options/states-options.json" assert { type: "json" };
import { _categoriesLabels } from "../IUCN/config";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dynamic from "next/dynamic";
import { Spinner } from "@codeworker.br/govbr-tw-react/dist/components/Spinner";
import useFetchData from "@/lib/useFetchData";

const threats = [
  {
    stress: "1.1 Ecosystem conversion",
    threat: "2.3.4 Scale Unknown/Unrecorded",
    decline: "Habitat",
    timming: "Passado, Presente e Futuro",
    incidence: "Local",
    severity: "high",
    detail:
      "De acordo com o Atlas das Pastagens Brasileiras, o município Ituaçu (BA) possui 37,29% (44721,22ha) do seu território convertido em áreas de pastagem, segundo dados de 2020 (Lapig, 2022). De acordo com o MapBiomas, o município Ituaçu (BA) possui 34,42% (41286,55ha) do seu território convertido em áreas de pastagens, segundo dados de 2020 (MapBiomas, 2022).",
  },
];

const conservation = [
  {
    action: "5.1.2 National level",
    situation: "needed",
    detail:
      "A espécie ocorre em território que será contemplado por Plano de Ação Nacional Territorial (PAT), no âmbito do projeto GEF Pró-Espécies - Todos Contra a Extinção: Território PAT Chapada Diamantina-Serra da Jiboia - 39/40 (BA).",
  },
  {
    action: "1.1 Site/area protection",
    situation: "needed",
    detail:
      "A espécie não é conhecida em nenhuma unidade de conservação, mas claramente existe a necessidade de melhorar a proteção do habitat nos locais onde se sabe que ela ocorre. São necessárias pesquisas adicionais para determinar se esta espécie está ou não experimentando um declínio efetivo ou está passando por flutuações naturais da população.",
  },
];

const threatSeverityLabel: any = {
  "very low": ["Muito Baixa", "w-1/5 bg-govbr-green-cool-vivid-50"],
  low: ["Baixa", "w-2/5 bg-govbr-green-cool-vivid-50"],
  medium: ["Média", "w-3/5 bg-govbr-yellow-vivid-20"],
  high: ["Alta", "w-4/5 bg-govbr-red-vivid-50"],
  "very high": ["Muito Alta", "w-5/5 bg-govbr-red-vivid-50"],
};

function AssessmentSheetItem({ label, hint, children, vAlign = "top" }: any) {
  return (
    <li
      className={`flex gap-5 ${
        vAlign === "top" ? "justify-start" : "items-center"
      }`}
    >
      <span className="w-1/5 text-govbr-blue-warm-vivid-70 flex flex-col">
        <span>{label}</span>
        {hint && <span className="text-govbr-gray-60 text-xs">{hint}</span>}
      </span>
      <span className="w-4/5">{children}</span>
    </li>
  );
}

function AssessmentSheetTitle({ children }: any) {
  return (
    <h2 className="text-govbr-blue-warm-vivid-70 my-5 pb-2 font-semibold border-b border-govbr-gray-10">
      {children}
    </h2>
  );
}

function AssessmentSheetSubTitle({ children }: any) {
  return (
    <h2 className="text-govbr-blue-warm-vivid-70 my-5 pb-2 border-b border-govbr-gray-10 text-sm">
      {children}
    </h2>
  );
}

function AssessmentSheetItemList({ data, label, hint }: any) {
  return (
    <>
      {data && data.length > 0 && (
        <AssessmentSheetItem label={label} hint={hint}>
          <span className="flex flex-col gap-1 capitalize">
            {data.map((value: any) => (
              <span key={value}>{value}</span>
            ))}
          </span>
        </AssessmentSheetItem>
      )}
    </>
  );
}

function AssessmentSheetItemValue({ data, label, hint, children }: any) {
  return (
    <>
      {data && (
        <AssessmentSheetItem label={label} hint={hint}>
          {data} {children}
        </AssessmentSheetItem>
      )}
    </>
  );
}

function AssessmentSheetItemValueText({ data, label, hint }: any) {
  return (
    <>
      {data && (
        <AssessmentSheetItem label={label} hint={hint}>
          <p className="text-justify">{data}</p>
        </AssessmentSheetItem>
      )}
    </>
  );
}

function AssessmentSheetItemTrueOrFalse({ data, label, hint }: any) {
  return (
    <>
      {data && (
        <AssessmentSheetItem label={label} hint={hint}>
          <Badge variant={data ? "success-light" : "danger-light"}>
            {data ? "Sim" : "Não"}
          </Badge>
        </AssessmentSheetItem>
      )}
    </>
  );
}

function AssessmentSheetItemReferences({ data, label, hint }: any) {
  return (
    <>
      {data && data.length > 0 && (
        <AssessmentSheetItem label={`Referência (${data.length})`}>
          <ol className="list-decimal text-xs">
            {data.map((reference: any, index: number) => (
              <li className="mb-1 ml-5" key={index}>
                {reference}
              </li>
            ))}
          </ol>
        </AssessmentSheetItem>
      )}
    </>
  );
}

const MapEditor = dynamic(() => import("@/components/app/map-editor"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner />
    </div>
  ),
});

export function AssessmentSheet({ row, id }: any) {
  const BASE_API_URL = "http://localhost:3100/data";
  const { data: data, loading: dataLoading }: any = useFetchData(
    `${BASE_API_URL}/taxon/${id}`
  );
  console.log(data);
  const criteria = row.getValue("criteria");
  const trueAndFalseLabel = (value: boolean) => (value ? "Sim" : "Não");
  const yesNoUnknowLabel: any = {
    yes: "Sim",
    no: "Não",
    unknow: "Desconhecido",
  };
  const distributionStates = data?.distribution?.states || [];
  let distributionStatesFullName: any = [];
  if (distributionStates.length) {
    distributionStatesFullName = statesOptions.filter(({ value }: any) =>
      distributionStates.includes(value)
    );
  }
  const fenology =
    data?.profile?.reproduction?.fenology &&
    data?.profile?.reproduction?.fenology > 0 &&
    data?.profile?.reproduction?.fenology.map(
      ({ fenology, start, end }: any) => `${fenology} (${start}~${end})`
    );
  function hasValues(obj: any): boolean {
    if (Array.isArray(obj)) {
      return obj.length > 0;
    } else if (typeof obj === "object" && obj !== null) {
      return Object.values(obj).some(hasValues);
    } else {
      return obj !== undefined && obj !== null && obj !== "";
    }
  }
  return (
    <>
      {dataLoading ? (
        "Carregando"
      ) : (
        <>
          <div className="flex w-full border-b border-t border-govbr-gray-10">
            <MapEditor
              data={[
                {
                  title: "Ocorrências",
                  content: "LISTAR CAMADAS DE OCORRÊNCIA, EOO E AOO",
                },
              ]}
            ></MapEditor>
          </div>
          <div className="p-10 pt-0">
            <AssessmentSheetTitle>
              Dados de Avaliação de Risco de Extinção
            </AssessmentSheetTitle>
            <ul className="flex flex-col gap-2 w-full text-sm mb-10">
              <AssessmentSheetItem label="Categoria de Risco">
                {_categoriesLabels.BR[row.getValue("category") as string]} (
                {row.getValue("category")})
              </AssessmentSheetItem>

              <AssessmentSheetItemValue
                data={data?.assessment?.criteria}
                label="Critério"
              />

              <AssessmentSheetItemValue
                data={data?.assessment?.assessor}
                label="Avaliador"
              />

              <AssessmentSheetItemValue
                data={data?.assessment?.evaluator}
                label="Revisor"
              />

              <AssessmentSheetItemValueText
                data={data?.assessment?.rationale}
                label="Justificativa"
              />

              {data?.assessment?.reasonsForReAssessment.resume && (
                <>
                  <AssessmentSheetSubTitle>
                    Informações da Reavaliação
                  </AssessmentSheetSubTitle>

                  <AssessmentSheetItemValue
                    data={data?.assessment?.reasonsForReAssessment.reason}
                    label="Motivo"
                  />

                  <AssessmentSheetItemTrueOrFalse
                    data={data?.assessment?.reasonsForReAssessment.change}
                    label="Houve Mudança?"
                    hint="Categoria de Risco"
                  />

                  <AssessmentSheetItemValueText
                    data={data?.assessment?.reasonsForReAssessment.resume}
                    label="Detalhes"
                  />

                  <AssessmentSheetItemValue
                    data={data?.assessment?.reasonsForChange.reason}
                    label="Motivo da Mudança"
                    hint="Categoria de Risco"
                  />
                  <AssessmentSheetItemValueText
                    data={data?.assessment?.reasonsForChange.resume}
                    label="Justificativa da Mudança"
                    hint="Categoria de Risco"
                  />
                </>
              )}

              {hasValues(data?.assessment?.information) && (
                <AssessmentSheetSubTitle>
                  Informações Gerais
                </AssessmentSheetSubTitle>
              )}

              <AssessmentSheetItemTrueOrFalse
                data={data?.assessment?.information.possiblyExtinct}
                label="Possivelmente Extinta?"
              />

              <AssessmentSheetItemValue
                data={data?.assessment?.information?.dateLastSeen}
                label="Data do Último Avistamento"
              />

              <AssessmentSheetItemValue
                data={data?.assessment?.information?.generationLength}
                label="Tempo de Geração"
              />

              <AssessmentSheetItemValue
                data={data?.assessment?.information?.timePeriodOfPastDecline}
                label="Período de Declínio Passado"
              />

              <AssessmentSheetItemValue
                data={data?.assessment?.information?.numberOfLocation}
                label="Quantidade de Localidades"
              />

              <AssessmentSheetItemTrueOrFalse
                data={data?.assessment?.information?.severelyFragmented}
                label="Severamente Fragmentada?"
              />

              <AssessmentSheetItemValue
                data={data?.assessment?.information?.currentPopulationTrend}
                label="Tendência Populacional Atual"
              />

              <AssessmentSheetItemValue
                data={data?.assessment?.information?.numberOfMatureIndividuals}
                label="Quantidade de Indivíduos Maduros"
              />
              <AssessmentSheetItemReferences
                data={data?.assessment.references}
                label="Referência"
              />
            </ul>

            {(hasValues(data?.profile?.distribution) ||
              hasValues(data?.distribution)) && (
              <AssessmentSheetTitle>Distribuição</AssessmentSheetTitle>
            )}

            <ul className="flex flex-col gap-2 w-full text-sm mb-10">
              <AssessmentSheetItemValue
                data={data?.profile?.distribution?.eoo}
                label="EOO"
                hint="Extensão de Ocorrência"
              >
                Km<sup>2</sup>
              </AssessmentSheetItemValue>

              <AssessmentSheetItemValue
                data={data?.profile?.distribution?.aoo}
                label="AOO"
                hint="Área de Ocupação"
              >
                Km<sup>2</sup>
              </AssessmentSheetItemValue>

              <AssessmentSheetItemTrueOrFalse
                data={data?.distribution?.endemism}
                label="Endêmica do Brasil?"
              />

              <AssessmentSheetItemList
                value={data?.distribution?.states}
                label="Estados"
              />

              <AssessmentSheetItemValueText
                data={data?.profile?.distribution.resume}
                label="Detalhes"
              />

              <AssessmentSheetItemReferences
                data={data?.profile?.distribution?.references}
                label="Referência"
              />
            </ul>

            {hasValues(data?.profile?.taxonomicNotes) && (
              <AssessmentSheetTitle>Perfil da Espécie</AssessmentSheetTitle>
            )}

            {data?.profile?.taxonomicNotes?.notes && (
              <ul className="flex flex-col gap-2 w-full text-sm mb-10">
                <AssessmentSheetItemValueText
                  data={data?.profile?.taxonomicNotes?.notes}
                  label="Obra Princeps"
                />
                <AssessmentSheetItemReferences
                  data={data?.profile?.taxonomicNotes.references}
                  label="Referência"
                />
              </ul>
            )}

            {hasValues(data?.profile?.economicValue) && (
              <AssessmentSheetSubTitle>Valor Econômico</AssessmentSheetSubTitle>
            )}

            {(data?.profile?.economicValue?.potentialEconomicValue ||
              data?.profile?.economicValue?.details) && (
              <ul className="flex flex-col gap-2 w-full text-sm mb-10">
                <AssessmentSheetItemValue
                  data={data?.profile?.economicValue?.potentialEconomicValue}
                  label="Potencial Valor"
                />

                <AssessmentSheetItemValueText
                  data={data?.profile?.economicValue?.details}
                  label="Detalhes"
                />

                <AssessmentSheetItemReferences
                  data={data?.profile?.economicValue?.references}
                  label="Referência"
                />
              </ul>
            )}

            {hasValues(data?.profile?.population) && (
              <AssessmentSheetSubTitle>População</AssessmentSheetSubTitle>
            )}

            {(data?.profile?.population?.resume ||
              data?.profile?.population?.extremeFluctuation
                ?.extremeFluctuation) && (
              <ul className="flex flex-col gap-2 w-full text-sm mb-10">
                <AssessmentSheetItemList
                  value={data?.profile?.population?.extremeFluctuation}
                  label="Flutuação Extrema"
                />

                <AssessmentSheetItemValueText
                  data={data?.profile?.population?.resume}
                  label="Detalhes"
                />

                <AssessmentSheetItemReferences
                  data={data?.profile?.population?.references}
                  label="Referência"
                />
              </ul>
            )}

            <AssessmentSheetSubTitle>Ecologia</AssessmentSheetSubTitle>

            <ul className="flex flex-col gap-2 w-full text-sm mb-10">
              <AssessmentSheetItemList
                data={data?.profile?.ecology?.substratum}
                label="Substrato"
              />
              <AssessmentSheetItemList
                data={data?.profile?.lifeForm}
                label="Forma de Vida"
                hint="Flora e Funga"
              />
              <AssessmentSheetItemList
                data={data?.profile?.vegetationType}
                label="Tipo de Vegetação"
                hint="Flora e Funga"
              />

              <AssessmentSheetItemList
                data={data?.profile?.habitat}
                label="Habitat"
                hint="Flora e Funga"
              />

              <AssessmentSheetItemList
                data={data?.profile?.ecology?.habitats}
                label="Habitat"
                hint="IUCN"
              />

              <AssessmentSheetItemList
                data={data?.profile?.ecology?.luminosity}
                label="Luminosidade"
              />

              <AssessmentSheetItemValue
                data={data?.profile?.ecology?.fenology}
                label="Fenologia"
              />

              <AssessmentSheetItemValue
                data={data?.profile?.ecology?.longevity}
                label="Longevidade"
              />

              <AssessmentSheetItemList
                data={data?.distribution?.phytogeographicDomain}
                label="Biomas"
                hint="Flora e Funga"
              />

              <AssessmentSheetItemValue
                data={data?.profile?.ecology?.clonal}
                label="Clone"
              />

              <AssessmentSheetItemValue
                data={data?.profile?.ecology?.resprout}
                label="Rebrota"
              />

              <AssessmentSheetItemReferences
                data={data?.profile?.ecology?.references}
                label="Referência"
              />
            </ul>

            {hasValues(data?.profile?.reproduction) && (
              <AssessmentSheetSubTitle>Reprodução</AssessmentSheetSubTitle>
            )}

            <ul className="flex flex-col gap-2 w-full text-sm mb-10">
              <AssessmentSheetItemValueText
                data={data?.profile?.reproduction?.resume}
                label="Detalhes"
              />

              <AssessmentSheetItemList data={fenology} label="Fenologia" />

              <AssessmentSheetItemValue
                data={data?.profile?.reproduction?.strategy}
                label="Estratégia"
              />
              <AssessmentSheetItemValue
                data={data?.profile?.reproduction?.system}
                label="Sistema"
              />
              <AssessmentSheetItemValue
                data={data?.profile?.reproduction?.sexualSystem}
                label="Sistema Sexual"
              />
              <AssessmentSheetItemValue
                data={data?.profile?.reproduction?.pollinatorInformation}
                label="Informações sobre Polinizadores"
              />

              <AssessmentSheetItemList
                data={data?.profile?.reproduction?.pollinationSyndrome}
                label="Síndrome de Polinização"
              />

              <AssessmentSheetItemList
                data={data?.profile?.reproduction?.dispersionSyndrome}
                label="Síndrome de Dispersão"
              />

              <AssessmentSheetItemReferences
                data={data?.profile?.reproduction?.references}
                label="Referência"
              />
            </ul>

            {hasValues(data?.profile?.threats) && (
              <AssessmentSheetSubTitle>
                Ameaça
                <Badge type="pill" className="ml-3 h-6 w-6 text-xs">
                  {data?.profile?.threats.length}
                </Badge>
              </AssessmentSheetSubTitle>
            )}
            {data?.profile?.threats.map(
              (
                {
                  stress,
                  threat,
                  decline,
                  timming,
                  incidence,
                  severity,
                  details,
                  references,
                }: any,
                index: number
              ) => (
                <>
                  <Table className="mb-0">
                    <TableHeader>
                      <TableRow className="text-govbr-blue-warm-vivid-70">
                        <TableHead className="w-[200px]">Estresse</TableHead>
                        <TableHead className="w-[200px]">Ameaça</TableHead>
                        <TableHead>Declínio</TableHead>
                        <TableHead>Tempo</TableHead>
                        <TableHead>Incidência</TableHead>
                        <TableHead>Severidade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow
                        key={`${stress}_${index}`}
                        className="capitalize"
                      >
                        <TableCell>{stress}</TableCell>
                        <TableCell>{threat}</TableCell>
                        <TableCell>{decline}</TableCell>
                        <TableCell>{timming}</TableCell>
                        <TableCell>{incidence}</TableCell>
                        <TableCell>
                          <div className="w-full h-3 bg-govbr-gray-10 rounded-md">
                            <div className="flex w-full">
                              <div
                                className={`h-3 rounded-l-md ${severity && threatSeverityLabel[severity][1]}`}
                              ></div>
                            </div>
                          </div>
                          <p className="text-xs pl-1 mt-1 capitalize">
                            {severity && threatSeverityLabel[severity][0]}
                          </p>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={6} className="p-4 bg-govbr-gray-2">
                          <p className="text-sm">{details}</p>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <ul className="flex flex-col gap-2 w-full text-sm mb-10">
                    <AssessmentSheetItemReferences
                      data={references}
                      label="Referência"
                    />
                  </ul>
                </>
              )
            )}

            {hasValues(data?.profile?.actions) && (
              <AssessmentSheetSubTitle>
                Ação de Conservação
                <Badge type="pill" className="ml-3 h-6 w-6 text-xs">
                  {data?.profile?.actions.length}
                </Badge>
              </AssessmentSheetSubTitle>
            )}
            {data?.profile?.actions.map(
              (
                { action, situation, details, references }: any,
                index: number
              ) => (
                <>
                  <Table className="mb-0">
                    <TableHeader>
                      <TableRow className="text-govbr-blue-warm-vivid-70">
                        <TableHead className="w-3/5">Ação</TableHead>
                        <TableHead className="w-2/5">Situação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow key={`${action}_${index}`}>
                        <TableCell>{action}</TableCell>
                        <TableCell>{situation}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3} className="p-4 bg-govbr-gray-2">
                          <p className="text-sm">{details}</p>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <ul className="flex flex-col gap-2 w-full text-sm mb-10">
                    <AssessmentSheetItemReferences
                      data={references}
                      label="Referência"
                    />
                  </ul>
                </>
              )
            )}

            <AssessmentSheetSubTitle>Usos</AssessmentSheetSubTitle>
            <ul className="flex flex-col gap-2 w-full text-sm mb-10">
              <AssessmentSheetItem label="Categoria">
                17. Desconhecido
              </AssessmentSheetItem>
              <AssessmentSheetItem label="Detalhe">
                Não existem dados sobre usos efetivos ou potenciais.
              </AssessmentSheetItem>
            </ul>
          </div>
        </>
      )}
    </>
  );
}
