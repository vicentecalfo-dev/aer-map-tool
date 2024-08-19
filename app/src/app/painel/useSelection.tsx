import { useState } from 'react';

function useSelection<T>(initialState: T[] = []) {
  const [selectedItems, setSelectedItems] = useState<T[]>(initialState);

  const handleSelectionChange = (selected: T[]) => {
    setSelectedItems(selected);
  };

  const handleRemoveSelection = (value: T) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((selected) => selected !== value)
    );
  };

  return {
    selectedItems,
    handleSelectionChange,
    handleRemoveSelection
  };
}

export default useSelection;
