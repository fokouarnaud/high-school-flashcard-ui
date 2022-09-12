import { createContext, useState, useMemo } from "react";

export const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  const [on, setOn] = useState(false);
  const update = () => setOn(!on);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => {
    return {
      on,
      updateMenu: update,
    };
  });
  return (
    <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
  );
};

// HOC
export default MenuProvider;