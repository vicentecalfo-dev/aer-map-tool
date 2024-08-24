import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge, Dialog, Spinner } from "@codeworker.br/govbr-tw-react";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { memo, useEffect, useRef, useState } from "react";

const AccordionFilterTitle = memo(
  ({ loading = false, filter = "", selected = [], help }: any) => {
    const t = useTranslations("Filters");
    return (
      <>
        <div className="flex gap-5 items-center">
          <span className="flex-1 text-sm items-center gap-2 flex">
            {loading ? <Spinner size="button" /> : ""}
            <span>
              <span className="block">{t(`${filter}.label`)}</span>
              {t(`${filter}.context`) && (
                <span className="text-xs !font-light text-gray-400">
                  {t(`${filter}.context`)}
                </span>
              )}
            </span>
          </span>
          {selected.length > 0 && <Badge>{selected.length}</Badge>}
        </div>
      </>
    );
  }
);

export default AccordionFilterTitle;
