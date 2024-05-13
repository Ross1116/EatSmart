import React, { createContext } from 'react';

export interface PantryItemProps {
  id: string;
  name: string;
  expiry_date: number;
  added_date: number;
  quantity: number;
  image: string;
  category_id: number;
  category_name: string;
  category_refrigerate: number | null;
  category_freeze: number | null;
  category_pantry: number;
  category_decompose: string;
  dayDiff: number;
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