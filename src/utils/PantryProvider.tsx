"use client";
import React, { useState } from 'react';
import PantryContext, { PantryItemProps } from './PantryContext';

interface PantryProviderProps {
  children: React.ReactNode;
}

const PantryProvider: React.FC<PantryProviderProps> = ({ children }) => {
  const [pantryItemProps, setPantryItemProps] = useState<PantryItemProps | null>(null);

  const updatePantryItemProps = (props: PantryItemProps) => {
    setPantryItemProps(props);
  };

  return (
    <PantryContext.Provider value={{ pantryItemProps, updatePantryItemProps }}>
      {children}
    </PantryContext.Provider>
  );
};

export default PantryProvider;