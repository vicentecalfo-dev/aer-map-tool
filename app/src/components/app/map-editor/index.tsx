"use client";
import { Circle, MapContainer, TileLayer, WMSTileLayer } from "react-leaflet";
import { GeoJSON } from 'react-leaflet/GeoJSON'
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
  NativeSelect,
  Spinner,
} from "@codeworker.br/govbr-tw-react";
import MapEditorSettings from "@/app/map-editor/components/settings";
import MapEditorToolbarButton from "@/app/map-editor/components/toolbar/button";
import useFetchData from "@/lib/useFetchData";
import { useEffect, useState } from "react";
import MultiComboBox from "../../../../_lixo/index_bk2";

export default function MapEditor({ data }: any) {
  const { data: INPELayers, loading: INPELayersLoading } = useFetchData(
    "https://corsbypass-5jyi.onrender.com/https://visualizador.inde.gov.br/api/buscacamada"
  );

  const INPELayersWMS = INPELayers.filter((layer: any) => layer.wmsAvailable);
  const INPELayersOptions = INPELayersWMS.map(({ descricao, url }: any) => ({
    label: descricao,
    value: url,
  }));

  const [INPESLayerSelected, setINPELayerSelected] = useState("");
  const [INPEContextLayers, setINPEContextLayers] = useState([]);
  const [INPEContextLayersLoading, setINPEContextLayersLoading] =
    useState(false);
  const [INPEContextLayerSelected, setINPEContextLayerSelected] = useState([]);
  const [INPEWmsLayers, setINPEWmsLayers] = useState([]);

  useEffect(() => {
    if (INPESLayerSelected) {
      const fetchINPEContextLayers = async () => {
        setINPEContextLayersLoading(true);
        const response = await fetch(
          `https://visualizador.inde.gov.br/api/geoservico/get?url=${INPESLayerSelected}`
        );
        let data = await response.json();
        data = data.map(({ BaseUrl, Titulo, Camada }: any) => ({
          label: Titulo,
          value: Camada,
          url: BaseUrl,
        }));
        setINPEContextLayers(data);
        console.log(data);
        setINPEContextLayersLoading(false);
      };

      fetchINPEContextLayers();
    }
  }, [INPESLayerSelected]);

  useEffect(() => {
    const selectedLayers = INPEContextLayerSelected.map(
      (selectedLayer: any) => {
        console.log(selectedLayer);
        console.log(INPEContextLayers);
        return INPEContextLayers.find(
          (item: any) => item.value === selectedLayer
        );
      }
    ).filter((layer: any) => layer !== undefined); // Filtra layers que não foram encontrados

    setINPEWmsLayers(selectedLayers);
    console.log("Selected WMS Layers:", selectedLayers);
  }, [INPEContextLayerSelected, INPEContextLayers]);

  function handleSelectINPELayer(event: any) {
    const selectedLayer = event.target.value;
    setINPELayerSelected(selectedLayer);
  }

  function handleINPEContextLayerSelected(items: any) {
    setINPEContextLayerSelected(items);
  }

  return (
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
          {/* <li>
            <MapEditorToolbarButton tooltip="Camadas de Sobreposição">
              <Layers3 />
            </MapEditorToolbarButton>
          </li> */}
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
            center={[-14.235, -51.9253]}
            zoom={5}
            scrollWheelZoom={true}
            className="flex w-full h-full z-0 absolute"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
              attribution={`&copy; <a href="https://carto.com/attributions">CARTO DB</a>`}
            />

            {INPEWmsLayers.map(({ value, url }: any) => (
              <WMSTileLayer
                layers={value}
                url={url}
                maxZoom={6}
                transparent={true}
                format="image/png"
                opacity={0.8}
              />
            ))}
            {/* 
<WMSTileLayer
                  layers={"CGEO:pib2021_mun_var50"}
                  url={`https://geoservicos.ibge.gov.br/geoserver/ows`}
                  maxZoom={6}
                  transparent={true}
                  format="image/png"
                  opacity={0.8}
                /> */}
            {/* 
            <Circle center={[51.51, -0.06]} radius={22} /> */}
          </MapContainer>
        </main>

        <aside className="flex flex-col w-1/4">
          <div className="flex-1">
            <Accordion
              value=""
              multi={false}
              className="bg-white"
              fixedHeight="max-h-[300px]"
            >
              {data &&data.map(({ title, content }: any) => 
                <Accordion.Item value={title} key={title}>
                  <>{title}</>
                  <p>{content}</p>
                </Accordion.Item>
              )}
              <Accordion.Item value="1">
                <>INDE</>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3 items-center">
                    {INPEContextLayersLoading && (
                      <div>
                        <Spinner size="button" />
                      </div>
                    )}
                    <div className="flex-1">
                      <NativeSelect
                        options={INPELayersOptions}
                        onChange={handleSelectINPELayer}
                        selected={INPESLayerSelected}
                      ></NativeSelect>
                    </div>
                  </div>
                  <div className="max-h-[300px]">
                    {INPEContextLayers.length > 0 && (
                      <MultiComboBox
                        comboName="INPEContextLayer"
                        options={INPEContextLayers}
                        selected={INPEContextLayerSelected}
                        onSelectionChange={handleINPEContextLayerSelected}
                        sortOrder="asc"
                      />
                    )}
                  </div>
                </div>
              </Accordion.Item>
              <Accordion.Item value="2">
                <>MapBiomas</>
                <p>LISTAR CAMADAS</p>
              </Accordion.Item>
            </Accordion>
          </div>
        </aside>
      </div>
    </div>
  );
}
