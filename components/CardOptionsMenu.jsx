import { IoCloseOutline } from "react-icons/io5";
import { FaRegEdit, FaRegStar, FaStar } from "react-icons/fa";
import { useMemo } from "react";
import { useModalContext } from "@/context/ModalContext";

import OptionsMenu from "./OptionsMenu";

const CardOptionsMenu = ({
  cardId,
  isFavorite,
  onToggleFavorite,
  onRemove,
  card,
}) => {
  const menuId = useMemo(() => `${cardId}-options`);
  const { openModal, closeModal } = useModalContext();

  const options = [
    {
      icon: isFavorite ? <FaStar size={16} /> : <FaRegStar size={16} />,
      text: isFavorite ? "unfavorite" : "favorite",
      callback: () => onToggleFavorite(cardId),
    },
    {
      icon: <FaRegEdit size={16} />,
      text: "edit",
      callback: () =>
        openModal(
          "Edit Card",
          <h1>Editing</h1>
        ),
    },
    {
      icon: <IoCloseOutline size={16} className="scale-125" />,
      text: "remove",
      callback: () => onRemove(cardId),
    },
  ];

  return <OptionsMenu options={options} id={menuId} />;
};

export default CardOptionsMenu;
