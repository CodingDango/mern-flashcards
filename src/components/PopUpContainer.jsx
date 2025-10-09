import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

export default function PopUpContainer({
  headerText, 
  elements,
  isOpen, 
  closePopUp
}) {
  const popUpRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        closePopUp();
      }
    };

    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        closePopUp();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleClickOutside);
    }

  }, [closePopUp]);
  
  if (isOpen) return (
    <div
      className="
        fixed inset-0 bg-black/75 w-screen 
        h-screen z-100 flex justify-center 
        items-center p-4 "
    >
      <div ref={popUpRef} className="px-my-sm py-my-md rounded-lg bg-neutral-900 text-white max-w-xl max-h-[700px] overflow-y-auto w-full">
        <div className="flex flex-col">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-lg">{headerText}</h2>
            <button className="cursor-pointer" onClick={closePopUp}>
              <IoClose size={36}/>
            </button>
          </div>
          {elements}
        </div>
      </div>

    </div>
  );
}