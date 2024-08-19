import { Button } from "@codeworker.br/govbr-tw-react/dist/components/Button";
import { GovBRLogo } from "@codeworker.br/govbr-tw-react/dist/components/GovBRLogo";
import Input from "@codeworker.br/govbr-tw-react/dist/components/Input";
import { faBars, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HeaderGov({children}:any) {
  return (
    <header className="flex flex-col gap-5 p-6">
      <div className="flex items-center gap-20">
        <div className="flex items-center gap-5">
          <div className="w-28">
            <GovBRLogo />
          </div>
          <span className="flex flex-col">
          <span className="text-xs text-govbr-gray-60">
            Ministério do Meio Ambiente
          </span>
          <span className="text-sm text-govbr-gray-60">
         Centro Nacional de Conservação da Flora
          </span>

          </span>
        </div>
        <div className="flex-1 flex gap-5 justify-end text-sm">
            <a href="" className="text-govbr-blue-warm-vivid-70">Visão Geral</a>
            <a href="" className="text-govbr-blue-warm-vivid-70">Painel Interativo</a>
            <a href="" className="text-govbr-blue-warm-vivid-70">Sobre</a>
        </div>
        <div>
          <Button className="font-normal">
            <FontAwesomeIcon icon={faUser} />
            <span>Entrar com <strong>gov.br</strong></span>
          </Button>
        </div>
      </div>
      {/* <div className="flex gap-5">
        <div className="flex-1 flex">
          <div className="flex gap-2">
            <span>
              <Button size="icon" variant="ghost">
                <FontAwesomeIcon icon={faBars} />
              </Button>
            </span>
            <span>
              <h1>Instituto de Pesquisas Jardim Botânico do Rio de Janeiro</h1>
              <h2 className="text-sm text-govbr-gray-60">
                CNCFlora &bull; Centro Nacional de Conservação da Flora
              </h2>
            </span>
          </div>
        </div>
        <div className="flex">
          <Input
            placeholder="Buscar Espécie"
            type="text"
            value=""
            iconPosition="right"
            className="rounded-md bg-govbr-gray-10 border-govbr-gray-10 w-[420px] placeholder:text-sm"
            density="low"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Input>
        </div>
      </div> */}
      {children && <h1 className="text-xl font-bold text-govbr-blue-warm-vivid-70">{children}</h1>}
    </header>
  );
}
