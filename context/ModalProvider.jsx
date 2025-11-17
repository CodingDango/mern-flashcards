import { useState } from "react";
import { ModalContext } from "./ModalContext";
import ModalContainer from "../components/ModalContainer";

const ModalProvider = ({ children }) => {
  const [headerText, setHeaderText] = useState(null);
  const [elements, setElements] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [overrideTemplate, setIsOverrideTemplate] = useState(false);

  const openModal = (headerText, elements, overrideTemplate = false) => {
    setHeaderText(headerText);
    setElements(elements);
    setIsOpen(true);
    setIsOverrideTemplate(overrideTemplate);
  };

  const closeModal = () => {
    setHeaderText("");
    setElements(null);
    setIsOpen(false);
    setIsOverrideTemplate(false);
  };

  const providedValue = { openModal, closeModal };

  return (
    <ModalContext.Provider value={providedValue}>
      <ModalContainer
        headerText={headerText}
        elements={elements}
        isOpen={isOpen}
        closeModal={closeModal}
        overrideTemplate={overrideTemplate}
      />
      <div inert={isOpen ? true : undefined}>{children}</div>
    </ModalContext.Provider>
  );
};

export default ModalProvider;
