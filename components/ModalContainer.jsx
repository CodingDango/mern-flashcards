import { useLockBodyScroll } from "@uidotdev/usehooks";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

export default function ModalContainer({
  headerText,
  elements,
  isOpen,
  closeModal,
  overrideTemplate,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleClickOutside);
    };
  }, [closeModal]);

  if (isOpen)
    return (
      <Modal
        {...{ headerText, closeModal, modalRef, elements, overrideTemplate }}
      />
    );
}

const Modal = ({
  headerText,
  closeModal,
  modalRef,
  elements,
  overrideTemplate,
}) => {
  useLockBodyScroll();

  return (
    <>
      <div className="bg-black/25 backdrop-blur-xs fixed inset-0 w-screen h-[100dvh] z-75"></div>
      <div
        className="
        fixed inset-0 w-screen 
        h-[100dvh] z-100 "
      >
        <div className="flex items-center justify-center w-screen h-[100dvh] p-4">
          <div className="w-full flex justify-center">
            {!overrideTemplate ? (
              <div
                ref={modalRef}
                className="overflow-y-auto max-h-[700px] px-my-sm py-my-md rounded-xl bg-black-xl border border-black-md text-white max-w-xl w-full"
              >
                <div className="flex flex-col">
                  <div className="pb-my-sm w-full flex justify-between items-center">
                    <h2 className="text-xl font-medium">{headerText}</h2>
                    <button className="cursor-pointer" onClick={closeModal}>
                      <IoClose size={36} />
                    </button>
                  </div>
                  <div className="pt-my-sm">{elements}</div>
                </div>
              </div>
            ) : (
              <div ref={modalRef}>{elements}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
