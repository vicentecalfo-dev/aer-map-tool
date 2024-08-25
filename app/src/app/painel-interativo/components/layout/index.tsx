import FooterGov from "@/components/app/footer-gov";
import HeaderGov from "@/components/app/header-gov";
import { Button } from "@codeworker.br/govbr-tw-react";
import { useTranslations } from "next-intl";
import React from "react";

const FilterLayout = ({ children, onFilterSubmit }: any) => {
  const [side, main] = React.Children.toArray(children);
  const t = useTranslations("Filters");
  return (
    <div className="h-screen w-screen bg-govbr-gray-5 overflow-hidden grid grid-rows-[auto_1fr_auto]">
      <HeaderGov />
      <main className="gap-5 row-span-1 grid grid-cols-[auto_1fr] overflow-hidden">
        <aside className="w-[400px] grid grid-rows-[1fr_auto] gap-5 overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">{side}</div>

          <div className="px-6 flex gap-3 ">
            <Button onClick={onFilterSubmit} className="w-1/2 !font-normal">
              {t("form.search")}
            </Button>
            <Button
              onClick={onFilterSubmit}
              className="w-1/2 !font-normal"
              variant="outline"
            >
              {t("form.clearSearch")}
            </Button>
          </div>
        </aside>
        <div className="overflow-hidden grid grid-rows-[1fr] pr-6">
          {main}
        </div>
      </main>
      <FooterGov />
    </div>
  );
};

export default FilterLayout;
