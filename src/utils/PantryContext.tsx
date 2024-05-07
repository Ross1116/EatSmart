import React, { createContext } from 'react';

export interface PantryItemProps {
  id: React.Key;
  name: any;
  expiry_date: any;
  added_date: any;
  image: any;
  quantity: any;
}

interface PantryContextValue {
  pantryItemProps: PantryItemProps | null;
  updatePantryItemProps: (props: PantryItemProps) => void;
}

const PantryContext = createContext<PantryContextValue>({
  pantryItemProps: null,
  updatePantryItemProps: () => {},
});

export default PantryContext;