import { Button, Dialog, Tabs, Tooltip } from "@codeworker.br/govbr-tw-react";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useRef } from "react";
import MapEditorToolbarButton from "../toolbar/button";

export default function MapEditorSettings() {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const toggleDialog = () => {
        if (!dialogRef.current) {
            return;
        }
        dialogRef.current.hasAttribute("open")
            ? dialogRef.current.close()
            : dialogRef.current.showModal();
    };

    useEffect(() => {
        toggleDialog();
    }, []);
    return (
        <>
            <MapEditorToolbarButton
                tooltip="Configurações do Editor"
                onClick={toggleDialog}
            >
                <SlidersHorizontal />
            </MapEditorToolbarButton>
            <Dialog ref={dialogRef} toggleDialog={toggleDialog} className="w-[80vw]">
                <Dialog.Header>
                    <h1>Configurações do Editor</h1>
                </Dialog.Header>
                <Dialog.Main className="overflow-auto h-[60vh]">
                    {/* <Tabs value="0" className="w-full">
                        <>
                            <Tabs.Trigger value="0" key={`0-trigger`}>
                                tetete
                            </Tabs.Trigger>
                        </>
                        <Tabs.Content value="0" key={`0-content`}>
                            content
                        </Tabs.Content>
                    </Tabs> */}
                </Dialog.Main>
                <Dialog.Footer>
                    <Button onClick={toggleDialog}>Fechar</Button>
                </Dialog.Footer>
            </Dialog>
        </>
    );
}
