import React from "react";

export default function FilterTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-bold text-sm px-6 py-2 text-govbr-blue-warm-vivid-70 flex flex-col gap-1">
      {children}
    </h4>
  );
}
