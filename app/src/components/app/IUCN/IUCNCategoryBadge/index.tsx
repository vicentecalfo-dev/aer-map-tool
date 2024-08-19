"use client";

import { cn } from "@/lib/utils";
import { IUCNCategories, categoriesColors, categoriesLabels } from "../config";

interface IUCNCategoryBadgeProps {
  category: IUCNCategories;
  shape?: "circle" | "rounded" | "square" | "logo";
  textSize?: string;
  size?: string;
  onClick?: any;
}

const _defaults: { [key: string]: string | boolean } = {
  category: "NE",
  shape: "logo",
  textSize: "text-sm",
  size: "w-10 h-10",
  onClick: false,
};

const _shapes: { [key: string]: string } = {
  circle: "rounded-full",
  rounded: "rounded",
  square: "rounded-none",
  logo: "rounded-tl-full rounded-bl-full rounded-br-full"
};

const IUCNCategoryBadge = (props: IUCNCategoryBadgeProps) => {
  const { category, shape, textSize, size, onClick }: { [key: string]: any } = {
    ..._defaults,
    ...props,
  };
  const label = categoriesLabels({ category });
  const badgeTooltipClasses = [
    "relative",
    "before:content-[attr(data-tooltip)]",
    "before:px-3",
    "before:py-2",
    "before:left-1/2",
    "before:-bottom-20",
    "before:w-max",
    "before:max-w-xs",
    "before:-translate-x-1/2",
    "before:-translate-y-full",
    "before:bg-gray-700/80",
    "before:text-white",
    "before:rounded",
    "before:invisible",
    "before:transition-all",
    "before:ease-in-out",
    "before:text-xs",
    "before:absolute",
    "before:z-50",
    "hover:before:visible",
  ];
  const badgeClasses = [
    "group/iucn-badge",
    "inline-flex",
    "items-center",
    "font-bold",
    "justify-center",
    "relative",
    "cursor-pointer",
    _shapes[shape],
    size,
    textSize,
    categoriesColors[category.toUpperCase()],
  ];
  const handleOnClick = (e:any) => {
    if (onClick)
      onClick({
        category,
        label,
      });
  };
  return (
    <span data-tooltip={label} className={cn(...badgeTooltipClasses)}>
      <span className={cn(...badgeClasses)} onClick={handleOnClick}>
        {category}
      </span>
    </span>
  );
};

export default IUCNCategoryBadge;
