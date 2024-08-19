"use client"
import { Spinner } from "@codeworker.br/govbr-tw-react";
import dynamic from "next/dynamic";



const MapEditor = dynamic(() => import("@/components/app/map-editor"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center"><Spinner/></div>,
});

export default function MapEditorPage() {
  return (
    <div className="flex w-screen h-screen">
      <nav className="w-16 flex bg-govbr-blue-warm-vivid-80">Nav</nav>
      <main className="w-full flex">
        <MapEditor></MapEditor>
      </main>
    </div>
  );
}
