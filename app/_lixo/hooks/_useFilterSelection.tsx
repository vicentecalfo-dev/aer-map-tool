import { useCallback, useState } from "react";

export default function useFilterSelection(initialState: any = []) {
  const [selection, setSelection]: any = useState(initialState);
  const handleSelectionChange =  (items: any[]) => setSelection(items);
  return {
    selection,
    handleSelectionChange,
  };
}
