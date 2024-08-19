"use client";
import {
  Circle,
  MapContainer,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  Layers3,
  MapPin,
  MapPinOff,
  MousePointer2,
  SquareDashedMousePointer,
} from "lucide-react";
import {
  Accordion,
  GovBRLogo,
} from "@codeworker.br/govbr-tw-react";
import MapEditorSettings from "@/app/map-editor/components/settings";
import MapEditorToolbarButton from "@/app/map-editor/components/toolbar/button";

export default function MapEditor() {
  return (
    <>
      <div className="h-full w-full flex relative">
        <aside className="flex flex-col w-16 bg-govbr-blue-warm-vivid-10">
          <ul className="flex flex-col flex-1 text-xs">
            <li>
              <MapEditorToolbarButton tooltip="Selecionar">
                <MousePointer2 />
              </MapEditorToolbarButton>
            </li>
            <li>
              <MapEditorToolbarButton tooltip="Seleção Múltipla">
                <SquareDashedMousePointer />
              </MapEditorToolbarButton>
            </li>
            <li>
              <MapEditorToolbarButton tooltip="Habilitar Criação de Pontos">
                <MapPin />
              </MapEditorToolbarButton>
            </li>
            <li>
              <MapEditorToolbarButton tooltip="Habilitar Deleção de Pontos">
                <MapPinOff />
              </MapEditorToolbarButton>
            </li>
            <li>
              <MapEditorToolbarButton tooltip="Camadas de Sobreposição">
                <Layers3 />
              </MapEditorToolbarButton>
            </li>
          </ul>
          <ul className="flex flex-col text-xs">
            <li>
              <MapEditorSettings />
            </li>
          </ul>
        </aside>
        <div className="flex w-full">
          <main className="flex w-3/4 bg-neutral-50 relative">
            <MapContainer
              center={[-14.2350, -51.9253]}
              zoom={5}
              scrollWheelZoom={true}
              className="flex w-full h-full z-0 absolute"
            >
              { <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"  attribution={`&copy; <a href="https://carto.com/attributions">CARTO DB</a>`} /> }
              {/* <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" /> */}

              {/* <TileLayer url="https://terrabrasilis.dpi.inpe.br/geoserver/deter-cerrado-nb/ows?service=WMS&request=GetMap&layers=deter-cerrado-nb%3Adeter_cerrado&styles=&format=image%2Fpng&transparent=true&version=1.1.1&id=622f5a8975933c70112b71e95c8107880cf423000144ebd8&tiled=true&_name=deter_cerrado&_baselayer=false&width=256&height=256&srs=EPSG%3A3857&bbox=-6261721.357121639,-1252344.2714243263,-5009377.085697311,0" /> */}

              <Circle center={[51.51, -0.06]} radius={22} />
            </MapContainer>
          </main>

          <aside className="flex flex-col w-1/4">
            <div className="flex-1">
              <Accordion value="1" multi={false} className="bg-white">
                <Accordion.Item value="1">
                  <>Camadas</>
                  <p>Camadas</p>
                </Accordion.Item>
                <Accordion.Item value="2">
                  <>Camadas</>
                  <p>Camadas</p>
                </Accordion.Item>
              </Accordion>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
