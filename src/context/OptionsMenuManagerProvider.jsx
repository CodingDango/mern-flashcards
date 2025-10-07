import { useEffect, useState } from "react";
import { OptionsMenuManagerContext } from "./OptionsMenuManagerContext";
import { identifierClass as optionsMenuClass } from "../components/OptionsMenu";

const OptionsMenuMangerProvider = ({children}) => {
  const [openOptionsMenuId, setOpenOptionsMenuId] = useState(null);

  const value = {
    setOpenOptionsMenuId,
    openOptionsMenuId
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(`.${optionsMenuClass}`)) {
      setOpenOptionsMenuId(null);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpenOptionsMenuId(null);
    }
  }
+
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  });


  return (
    <OptionsMenuManagerContext.Provider value={value}>
      {children}
    </OptionsMenuManagerContext.Provider>
  );
};


export default OptionsMenuMangerProvider;