import React, { createContext, useContext } from "react";

type CardContextType = "enroll" | "courses";

const CardContext = createContext<CardContextType>("enroll");

export const useCardContext = () => useContext(CardContext);

interface Props {
  context: CardContextType;
  children: React.ReactNode;
}

export const CardProvider: React.FC<Props> = ({ context, children }) => (
  <CardContext.Provider value={context}>
    {children}
  </CardContext.Provider>
);
