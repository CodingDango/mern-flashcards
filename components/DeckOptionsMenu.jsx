import { IoCloseOutline } from "react-icons/io5";
import { FaRegEdit, FaRegStar, FaStar } from "react-icons/fa";
import { useMemo } from "react";
import { useModalContext } from "@/context/ModalContext";

import OptionsMenu from "./OptionsMenu";
import EditDeckForm from "./EditDeckForm";

const DeckOptionsMenu = ({
  deckId,
  isFavorite,
  onToggleFavorite,
  onRemove,
  onEdit,
  deck,
}) => {
  const menuId = useMemo(() => `${deckId}-options`);
  const { openModal, closeModal } = useModalContext();

  const options = [
    {
      icon: isFavorite ? <FaStar size={16} /> : <FaRegStar size={16} />,
      text: isFavorite ? "unfavorite" : "favorite",
      callback: () => onToggleFavorite(deckId),
    },
    {
      icon: <FaRegEdit size={16} />,
      text: "edit",
      callback: () =>
        openModal(
          "Edit Deck",
          <EditDeckForm deck={{ ...deck, id: deckId }} closeModal={closeModal} />
        ),
    },
    {
      icon: <IoCloseOutline size={16} className="scale-125" />,
      text: "remove",
      callback: () => onRemove(deckId),
    },
  ];

  return <OptionsMenu options={options} id={menuId} />;
};

export default DeckOptionsMenu;
