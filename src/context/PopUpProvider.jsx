import { useState } from "react";
import { PopUpContext } from "./PopUpContext";
import PopUpContainer from "../components/PopUpContainer";

const PopUpProvider = ({children}) => {
  const [headerText, setHeaderText] = useState(null);
  const [elements, setElements] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const openPopUp = (headerText, elements) => {
    setHeaderText(headerText);
    setElements(elements);
    setIsOpen(true);
  }

  const closePopUp = () => {
    setHeaderText('');
    setElements(null);
    setIsOpen(false);
  };
  
  const providedValue = { openPopUp, closePopUp };
  
  return (
    <PopUpContext.Provider value={providedValue}>
      <PopUpContainer 
        headerText={headerText}
        elements={elements}
        isOpen={isOpen}
        closePopUp={closePopUp}
      />
      <div inert={isOpen ? true : undefined}>
        {children}
      </div>
    </PopUpContext.Provider>
  );
}

export default PopUpProvider;