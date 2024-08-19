import { Button } from "@codeworker.br/govbr-tw-react/dist/components/Button";
import Card from "@codeworker.br/govbr-tw-react/dist/components/Card";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons/faFileArrowDown";
import { faLeaf } from "@fortawesome/free-solid-svg-icons/faLeaf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TotalAssessedSpeciesCard() {
  return (
    <Card className="flex w-full bg-green-800 rounded-md text-white">
      <Card.Header className="flex items-center gap-3 text-govbr-blue-warm-vivid-70">
        {/* <span className="text-white flex border-2 border-white rounded-full w-10 h-10 items-center justify-center ">
          <FontAwesomeIcon icon={faLeaf} className="w-6 h-6" />
        </span> */}
        <span>
          <h1 className="text-sm text-white">Total de Espécies Avaliadas</h1>
          <h2 className="text-xs font-light text-white/80">
            &nbsp;
          </h2>
        </span>
      </Card.Header>
      <Card.Main className="text-right">
        <span className="text-5xl font-semibold text-white">7504</span>
      </Card.Main>
      <Card.Footer className="text-right">
        <Button
          variant="outline"
          className="text-white border-white hover:bg-white/20 text-xs font-normal"
        >
          <FontAwesomeIcon icon={faFileArrowDown} /> <span>Arquivo CSV</span>
        </Button>
      </Card.Footer>
    </Card>
  );
}
