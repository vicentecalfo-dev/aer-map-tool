import { Button } from "@codeworker.br/govbr-tw-react/dist/components/Button";
import { GovBRLogo } from "@codeworker.br/govbr-tw-react/dist/components/GovBRLogo";
import Input from "@codeworker.br/govbr-tw-react/dist/components/Input";
import { faBars, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

export default function HeaderGov({ children }: any) {
  const t = useTranslations("HeaderGov");
  return (
    <header className="flex flex-col gap-5 p-6">
      <div className="flex items-center gap-20">
        <div className="flex items-center gap-5">
          <div className="w-28">
            <GovBRLogo />
          </div>
          <span className="flex flex-col">
            <span className="text-xs text-govbr-gray-60">{t("cabinet")}</span>
            <span className="text-sm text-govbr-gray-60">{t("locator")}</span>
          </span>
        </div>
        <div className="flex-1 flex gap-5 justify-end text-sm">
          <a href="" className="text-govbr-blue-warm-vivid-70">
            Visão Geral
          </a>
          <a href="" className="text-govbr-blue-warm-vivid-70">
            Painel Interativo
          </a>
          <a href="" className="text-govbr-blue-warm-vivid-70">
            Sobre
          </a>
        </div>
        <div>
          <Button className="font-normal">
            <FontAwesomeIcon icon={faUser} />
            <span>
              Entrar com <strong>gov.br</strong>
            </span>
          </Button>
        </div>
      </div>

      <h1 className="text-xl font-bold text-govbr-blue-warm-vivid-70">
        {t("title")}
      </h1>
    </header>
  );
}
