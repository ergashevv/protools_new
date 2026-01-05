import { createContext, useState } from "react";

export const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [sub, setSub] = useState(false);
  const [menu, setMenu] = useState(false);
  return (
    <MenuContext.Provider value={{ menu, setMenu, setSub, sub }}>
      {children}
    </MenuContext.Provider>
  );
}

export const TitleContext = createContext();

export function TitleProvider({ children }) {
  const [title, setTitle] = useState([]);
  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
}
