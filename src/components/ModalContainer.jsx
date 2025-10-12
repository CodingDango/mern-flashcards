import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

export default function ModalContainer({
  headerText, 
  elements,
  isOpen, 
  closeModal
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleClickOutside);
    }

  }, [closeModal]);
  
  if (isOpen) return (
    <div
      className="
        fixed inset-0 bg-black/50 w-screen 
        h-screen z-100 flex justify-center 
        items-center p-4 "
    >
      <div ref={modalRef} className="px-my-sm py-my-md rounded-lg bg-black-lg border border-black-md text-white max-w-xl overflow-y-auto w-full">
        <div className="flex flex-col">
          <div className="pb-my-sm w-full flex justify-between items-center">
            <h2 className="text-xl">{headerText}</h2>
            <button className="cursor-pointer" onClick={closeModal}>
              <IoClose size={36}/>
            </button>
          </div>
          <div className="pt-my-sm">
            {elements}
          </div>
        </div>
      </div>
    </div>
  );
}