import { cn } from "@/lib/utils";
import { Tooltip } from "@codeworker.br/govbr-tw-react";

const BASE_CLASS =
  "flex w-16 h-16 items-center justify-center hover:bg-govbr-blue-warm-vivid-70 hover:text-govbr-pure-0 text-govbr-blue-warm-vivid-70";
const ACTIVE_CLASS = "bg-govbr-blue-warm-vivid-70";

export default function MapEditorToolbarButton({
  children,
  tooltip,
  position = "right",
  active = false,
  ...props
}: any) {
  return (
    <Tooltip position={position}>
      <button className={cn(BASE_CLASS, active ? ACTIVE_CLASS : "" )} {...props}>
        {children}
      </button>
      <span>{tooltip}</span>
    </Tooltip>
  );
}
