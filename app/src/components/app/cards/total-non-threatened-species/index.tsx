import Card from "@codeworker.br/govbr-tw-react/dist/components/Card";
import { faLeaf } from "@fortawesome/free-solid-svg-icons/faLeaf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IUCNCategoryBadge from "../../IUCN/IUCNCategoryBadge";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";
import { Button } from "@codeworker.br/govbr-tw-react/dist/components/Button";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons/faFileArrowDown";

export default function TotalNonThreatenedSpeciesCard() {
  return (
    <Card className="flex w-full border-[1px] border-green-600 rounded-md">
      <Card.Header className="flex items-center gap-3 text-govbr-blue-warm-vivid-70">
        {/* <span className="flex border-2 border-govbr-blue-warm-vivid-70 rounded-full w-10 h-10 items-center justify-center ">
          <FontAwesomeIcon icon={faTriangleExclamation} className="w-6 h-6" />
        </span> */}
        <span>
          <h1 className="text-sm text-green-600">
            Total de Espécies Não Ameaçadas
          </h1>
          <h2 className="text-xs font-light text-white/80">
              &nbps;
            </h2>
        </span>
      </Card.Header>
      <Card.Main className="flex items-center justify-end gap-5">
        <div className="flex gap-1">
          <IUCNCategoryBadge category="DD" />
          <IUCNCategoryBadge category="LC" />
          <IUCNCategoryBadge category="NT" />
        </div>
        <span className="text-5xl font-semibold text-green-600">3850</span>
      </Card.Main>
      <Card.Footer className="text-right">
        <Button
          variant="outline"
          className="text-green-600 border-green-600 hover:bg-white/20 text-xs font-normal"
        >
          <FontAwesomeIcon icon={faFileArrowDown} /> <span>Arquivo CSV</span>
        </Button>
      </Card.Footer>
    </Card>
  );
}
