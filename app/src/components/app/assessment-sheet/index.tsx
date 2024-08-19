import Badge from "@codeworker.br/govbr-tw-react/dist/components/Badge";
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
  "very low": "Muito Baixa",
  low: "Baixa",
  medium: "Média",
  high: "Alta",
  "very high": "Muito Alta",
};

function AssessmentSheetItem({ label, children }: any) {
  return (
    <li className="flex gap-5 justify-start">
      <span className="w-1/5 text-govbr-blue-warm-vivid-70">{label}</span>
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

const MapEditor = dynamic(() => import("@/components/app/map-editor"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner />
    </div>
  ),
});

export function AssessmentSheet({ row }: any) {
  const criteria = row.getValue("criteria");
  return (
    <>
      <div className="flex w-full border-b border-t border-govbr-gray-10">
        <MapEditor></MapEditor>
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
          {criteria && (
            <AssessmentSheetItem label="Critério">
              {row.getValue("criteria")}
            </AssessmentSheetItem>
          )}

          <AssessmentSheetItem label="Justificativa">
            <p className="text-justify">
              A espécie é descrita como subarbusto, hermafrodita, sem usos ou
              potencial econômico. É endêmica do Brasil, onde ocorre apenas no
              estado da Bahia, nos limites entre os municípios de Ituaçu e Barra
              da Estiva. Ocorre na Caatinga, em Campo Rupestre. Devido a
              ausência de estudos sobre tendências populacionais e análises
              quantitativas, a espécie pode ser avaliada apenas pelo critério B
              (distribuição geográfica). A espécie foi descrita em 2005 com base
              em material coletado em 1980. Até 2022, a mesma era conhecida
              apenas pelo tipo, quando, durante a realização de estudo
              revisional sobre o gênero, duas coletas foram realizadas próximo à
              localidade típica. Assim, infere-se apenas uma única localidade
              para os três registros, inseridos fora dos limites de UCs. A
              conversão de habitat em pastagem incide moderadamente sobre o
              único município em que a espécie ocorre, tendo atingido 37,29% da
              área de Ituaçu. Infere-se o declínio contínuo de qualidade de
              habitat e ressalta-se que a localidade em que a espécie ocorre,
              Morro do Ouro, é um destino turístico com grande visitação. Tendo
              em vista que a espécie não foi coletada por mais de 40 anos e,
              mesmo após estudo revisional, foi coletada apenas próximo à
              localidade tipo, atualmente a espécie é avaliada como Criticamente
              Em Perigo (CR). Isso pois se enquadra nos limiares de AOO/EOO,
              possui apenas uma localidade sujeita à ameaça (subcritério a) e
              infere-se o declínio contínuo da qualidade de habitat.
            </p>
          </AssessmentSheetItem>
          <AssessmentSheetItem label="Possivelmente Extinta?">
            <Badge variant="success-light">Não</Badge>
          </AssessmentSheetItem>
          <AssessmentSheetItem label="Referência">
            <ol className="list-decimal text-xs">
              <li>
                Cardoso, P.H., Salimena, F.R.G., 2022. Stachytarpheta. Flora e
                Funga do Brasil. Jardim Botânico do Rio de Janeiro. URL
                https://floradobrasil.jbrj.gov.br/FB21464 (acesso em 03 de
                outubro de 2022)
              </li>
            </ol>
          </AssessmentSheetItem>
        </ul>
        <AssessmentSheetTitle>
          Distribuição
        </AssessmentSheetTitle>
        <ul className="flex flex-col gap-2 w-full text-sm mb-10">
          <AssessmentSheetItem label="EOO">0,177 Km<sup>2</sup></AssessmentSheetItem>
          <AssessmentSheetItem label="AOO">12 Km<sup>2</sup></AssessmentSheetItem>
          <AssessmentSheetItem label="Endêmica do Brasil">
          <Badge variant="success-light">Sim</Badge>
          </AssessmentSheetItem>
          <AssessmentSheetItem label="Estados">
          <span className="flex flex-col gap-1">
              <span>Espirito Santo (ES)</span>
              <span>Rio de Janeiro (RJ)</span>
            </span>
          </AssessmentSheetItem>
        </ul>
        <AssessmentSheetTitle>Perfil da Espécie</AssessmentSheetTitle>
        <ul className="flex flex-col gap-2 w-full text-sm mb-10">
          <AssessmentSheetItem label="Obra Princeps">
            <p>
              Descrita em: Kew Bull. 60(2): 221, 2005. É afim de S. arenaria,
              mas difere por possuir hábito ereto; e é afim de S. lychnitis, mas
              difere por possuir folhas com formato diferente e um indumento
              estrigoso (vs. seríceo) (Atkins, 2005).
            </p>
          </AssessmentSheetItem>
        </ul>
        <AssessmentSheetSubTitle>Valor Econômico</AssessmentSheetSubTitle>
        <ul className="flex flex-col gap-2 w-full text-sm mb-10">
          <AssessmentSheetItem label="Potencial Valor">
            <span className="text-govbr-gray-20">Desconhecido</span>
          </AssessmentSheetItem>
          <AssessmentSheetItem label="Detalhes">
            Não é conhecido valor econômico da espécie.
          </AssessmentSheetItem>
        </ul>

        <AssessmentSheetSubTitle>População</AssessmentSheetSubTitle>
        <ul className="flex flex-col gap-2 w-full text-sm mb-10">
          <AssessmentSheetItem label="Flutuação Extrema">
            <span className="text-govbr-gray-20">Desconhecido</span>
          </AssessmentSheetItem>
          <AssessmentSheetItem label="Detalhes">
            Não existem dados populacionais.
          </AssessmentSheetItem>
        </ul>

        <AssessmentSheetSubTitle>Ecologia</AssessmentSheetSubTitle>
        <ul className="flex flex-col gap-2 w-full text-sm mb-10">
          <AssessmentSheetItem label="Substrato">
            Terrestrial
          </AssessmentSheetItem>
          <AssessmentSheetItem label="Forma de Visa">
            Subarbusto
          </AssessmentSheetItem>
          <AssessmentSheetItem label="Fenologia">
            Perenifolia
          </AssessmentSheetItem>
          <AssessmentSheetItem label="Longevidade">
            Perennial
          </AssessmentSheetItem>
          <AssessmentSheetItem label="Bioma">
            <span className="flex flex-col gap-1">
              <span>Caatinga</span>
              <span> Mata Atlântica</span>
            </span>
          </AssessmentSheetItem>
          <AssessmentSheetItem label="Vegetação">
            Campo Rupestre
          </AssessmentSheetItem>
          <AssessmentSheetItem label="Habitat">
            <span className="flex flex-col gap-1">
              <span>3.7 Subtropical/Tropical High Altitude Shrubland</span>
              <span>4.7 Subtropical/Tropical High Altitude Grassland</span>
            </span>
          </AssessmentSheetItem>

          <AssessmentSheetItem label="Clone">
            <span className="text-govbr-gray-20">Desconhecido</span>
          </AssessmentSheetItem>
          <AssessmentSheetItem label="Rebrota">
            <span className="text-govbr-gray-20">Desconhecido</span>
          </AssessmentSheetItem>
          <AssessmentSheetItem label="Referência">
            <ol className="list-decimal text-xs">
              <li>
                Cardoso, P.H., Salimena, F.R.G., 2022. Stachytarpheta. Flora e
                Funga do Brasil. Jardim Botânico do Rio de Janeiro. URL
                https://floradobrasil.jbrj.gov.br/FB21464 (acesso em 03 de
                outubro de 2022)
              </li>
            </ol>
          </AssessmentSheetItem>
        </ul>
        <AssessmentSheetSubTitle>Reprodução</AssessmentSheetSubTitle>
        <ul className="flex flex-col gap-2 w-full text-sm mb-10">
          <AssessmentSheetItem label="Detalhes">
            A espécie é hermafrodita, e iterópara. Com base nos registros, foi
            coletada com flores: de janeiro a março, e em julho.
          </AssessmentSheetItem>
          <AssessmentSheetItem label="Fenologia">
            <span className="flex flex-col gap-1">
              <span>Floração (Janeiro ~ Março)</span>
              <span>Floração (Julho)</span>
            </span>
          </AssessmentSheetItem>
          <AssessmentSheetItem label="Estratégia">
            Iteropara
          </AssessmentSheetItem>
          <AssessmentSheetItem label="Sistema Sexual">
            Hermafrodita
          </AssessmentSheetItem>
          {/* <AssessmentSheetItem label="Sistema"><span className="text-govbr-gray-20">Desconhecido</span></AssessmentSheetItem> */}
          <AssessmentSheetItem label="Referência">
            <ol className="list-decimal text-xs">
              <li>
                Cardoso, P.H., Salimena, F.R.G., 2022. Stachytarpheta. Flora e
                Funga do Brasil. Jardim Botânico do Rio de Janeiro. URL
                https://floradobrasil.jbrj.gov.br/FB21464 (acesso em 03 de
                outubro de 2022)
              </li>
            </ol>
          </AssessmentSheetItem>
        </ul>

        <AssessmentSheetSubTitle>
          Ameaça
          <Badge type="pill" className="ml-3 h-6 w-6 text-xs">
            {threats.length}
          </Badge>
        </AssessmentSheetSubTitle>
        <Table className="mb-10">
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
            {threats.map(
              (
                {
                  stress,
                  threat,
                  decline,
                  timming,
                  incidence,
                  severity,
                  detail,
                },
                index
              ) => (
                <>
                  <TableRow key={`${stress}_${index}`}>
                    <TableCell>{stress}</TableCell>
                    <TableCell>{threat}</TableCell>
                    <TableCell>{decline}</TableCell>
                    <TableCell>{timming}</TableCell>
                    <TableCell>{incidence}</TableCell>
                    <TableCell>
                      <div className="w-full h-3 bg-govbr-gray-10 rounded-md">
                        <div className="flex w-full">
                          <div className="w-4/5 h-3 bg-govbr-red-vivid-50 rounded-l-md"></div>
                        </div>
                      </div>
                      <p className="text-xs pl-1 mt-1">
                        {threatSeverityLabel[severity]}
                      </p>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6} className="p-4 bg-govbr-gray-2">
                      <p className="text-sm">{detail}</p>
                    </TableCell>
                  </TableRow>
                </>
              )
            )}
          </TableBody>
        </Table>
        <ul className="flex flex-col gap-2 w-full text-sm mb-10">
          <AssessmentSheetItem label="Referência">
            <ol className="list-decimal text-xs">
              <li className="mb-2">
                Lapig - Laboratório de Processamento de Imagens e
                Geoprocessamento, 2022. Atlas Digital das Pastagens Brasileiras,
                dados de 2020. Município: Ituaçu (BA). URL
                https://www.lapig.iesa.ufg.br/lapig/index.php/produtos/atlas-digital-das-pastagens-brasileiras
                (acesso em 14 de outubro de 2022).
              </li>
              <li>
                MapBiomas, 2022. Projeto MapBiomas - Coleção 6 da Série Anual de
                Mapas de Cobertura e Uso de Solo do Brasil, dados de 2020.
                Município: Ituaçu (BA). URL
                https://drive.google.com/file/d/1RT7J2jS6LKyISM49ctfRO31ynJZXX_TY/view?usp=sharing
                (acesso em 14 de outubro de 2022).
              </li>
            </ol>
          </AssessmentSheetItem>
        </ul>

        <AssessmentSheetSubTitle>
          Ação de Conservação
          <Badge type="pill" className="ml-3 h-6 w-6 text-xs">
            {conservation.length}
          </Badge>
        </AssessmentSheetSubTitle>
        <Table className="mb-10">
          <TableHeader>
            <TableRow className="text-govbr-blue-warm-vivid-70">
              <TableHead className="w-3/5">Ação</TableHead>
              <TableHead className="w-2/5">Situação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conservation.map(({ action, situation, detail }, index) => (
              <>
                <TableRow key={`${action}_${index}`}>
                  <TableCell>{action}</TableCell>
                  <TableCell>{situation}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} className="p-4 bg-govbr-gray-2">
                    <p className="text-sm">{detail}</p>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
        <ul className="flex flex-col gap-2 w-full text-sm mb-10">
          <AssessmentSheetItem label="Referência">
            <ol className="list-decimal text-xs">
              <li className="mb-2">
                Lapig - Laboratório de Processamento de Imagens e
                Geoprocessamento, 2022. Atlas Digital das Pastagens Brasileiras,
                dados de 2020. Município: Ituaçu (BA). URL
                https://www.lapig.iesa.ufg.br/lapig/index.php/produtos/atlas-digital-das-pastagens-brasileiras
                (acesso em 14 de outubro de 2022).
              </li>
              <li>
                MapBiomas, 2022. Projeto MapBiomas - Coleção 6 da Série Anual de
                Mapas de Cobertura e Uso de Solo do Brasil, dados de 2020.
                Município: Ituaçu (BA). URL
                https://drive.google.com/file/d/1RT7J2jS6LKyISM49ctfRO31ynJZXX_TY/view?usp=sharing
                (acesso em 14 de outubro de 2022).
              </li>
            </ol>
          </AssessmentSheetItem>
        </ul>
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
  );
}
