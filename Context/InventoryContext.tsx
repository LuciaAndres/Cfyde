import { createContext, useContext, useState, ReactNode } from 'react';
import { items, Item } from '../Data/items';

type InventoryContextType = {
  currentItems: Item[];
  consumeItem: (id: string) => void;
};

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function InventoryProvider({ children }: { children: ReactNode }) {

  const [currentItems, setCurrentItems] = useState<Item[]>(items);

  const consumeItem = (id: string) => {
    setCurrentItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <InventoryContext.Provider value={{ currentItems, consumeItem }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);

  if (!context) {
    throw new Error('useInventory must be used inside InventoryProvider');
  }

  return context;
}