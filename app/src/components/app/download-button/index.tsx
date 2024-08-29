import { Button } from "@codeworker.br/govbr-tw-react/dist/components/Button";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons/faFileArrowDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const DownloadButton = ({ data, fileName, fileType, label, children }: any) => {
  const handleDownload = (event:any) => {
    // 1. Converter o array em um formato de string
    const fileContent =
      fileType === "json" ? JSON.stringify(data, null, 2) : convertToCSV(data);

    // 2. Criar um Blob a partir do conteúdo do arquivo
    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });

    // 3. Criar uma URL para o Blob
    const url = URL.createObjectURL(blob);

    // 4. Criar e clicar em um link oculto
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.${fileType}`;
    document.body.appendChild(link);
    link.click();

    // 5. Limpar o URL e remover o link da DOM
    URL.revokeObjectURL(url);
    document.body.removeChild(link);

    event.stopPropagation();
  };

  const convertToCSV = (arr: any) => {
    const headers = Object.keys(arr[0]).join(",") + "\n";
    const rows = arr.map((row: any) =>
      Object.values(row)
        .map((val) => `"${val}"`)
        .join(",")
    );
    return headers + rows.join("\n");
  };

  return (
    <button onClick={handleDownload}>
      {/* <FontAwesomeIcon icon={faFileArrowDown} /> {label} */}
      {children}
    </button>
  );
};

export default DownloadButton;
