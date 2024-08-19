"use client";
import TotalAssessedSpeciesCard from "@/components/app/cards/total-assessed-species";
import TotalNonThreatenedSpeciesCard from "@/components/app/cards/total-non-threatened-species";
import TotalThreatenedSpeciesCard from "@/components/app/cards/total-threatened-species";
import HeaderGov from "@/components/app/header-gov";
import { Button } from "@codeworker.br/govbr-tw-react/dist/components/Button";
import { faChartSimple, faFileCsv, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Home() {
  return (
      <div className="flex flex-col  w-screen h-screen bg-govbr-gray-5">
        <HeaderGov />
        <main className="w-full h-full flex p-10 gap-5">
          <div className="flex flex-col w-2/3 gap-5">
            <div className="flex gap-5 items-center">
              <div className="flex-1">
                <h1 className="text-base"><strong className="text-govbr-blue-warm-vivid-70">Painel da Flora</strong> &bull; Visão Geral</h1>
                <small className="text-govbr-gray-80">Atualizado em: 05/08/2024 11:52</small>
              </div>
              <div className="flex gap-5">
                <Button className="font-normal">
                  <FontAwesomeIcon icon={faChartSimple} />
                  <span>Painel Interativo</span>
                </Button>
              </div>
            </div>
            <div className="flex gap-5 h-1/2">
              <div className="w-1/3 flex items-center">
                <TotalAssessedSpeciesCard />
              </div>
              <div className="w-1/3 flex items-center">
                <TotalThreatenedSpeciesCard />
              </div>
              <div className="w-1/3 flex items-center">
                <TotalNonThreatenedSpeciesCard />
              </div>
            </div>
            <div className="flex gap-5 h-1/2">
              {/* <div className="w-1/3 flex items-center">
                <TotalAssessedSpeciesCard />
              </div>
              <div className="w-1/3 flex items-center">
                <TotalThreatenedSpeciesCard />
              </div>
              <div className="w-1/3 flex items-center">
                <TotalNonThreatenedSpeciesCard />
              </div> */}
            </div>
          </div>
          <div className="flex w-1/3"></div>
        </main>
        <footer className="flex p-10 pt-0"></footer>
      </div>
    );
}
