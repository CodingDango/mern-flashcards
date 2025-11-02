import { IoCloseOutline } from "react-icons/io5";
import { FaRegEdit, FaRegStar, FaStar } from "react-icons/fa";
import { useMemo } from "react";
import { useModalContext } from "@/context/ModalContext";

import OptionsMenu from "./OptionsMenu";
import { useToggleFavoriteMutation } from "@/hooks/useToggleFavoriteMutation";
import { toggleCardFavorite, removeCard } from "@/libs/actions";
import { useRemoveMutation } from "@/hooks/useRemoveMutation";

const CardOptionsMenu = ({ cardId, isFavorite, card, handleEditCard }) => {
  const menuId = useMemo(() => `${cardId}-options`);
    const { mutate: onToggleFavorite } = useToggleFavoriteMutation(
    ["cards"],
    toggleCardFavorite,
    "cards"
  );

  const { mutate: onRemove } = useRemoveMutation(
    ['cards'],
    removeCard,
    'cards'
  );

  const options = [
    {
      icon: isFavorite ? <FaStar size={16} /> : <FaRegStar size={16} />,
      text: isFavorite ? "Unfavorite" : "Favorite",
      callback: () => onToggleFavorite({ itemId: cardId }),
    },
    {
      icon: <FaRegEdit size={16} />,
      text: "Edit",
      callback: () => handleEditCard({id: cardId, ...card})
    },
    {
      icon: <IoCloseOutline size={16} className="scale-125" />,
      text: "Remove",
      callback: () => onRemove({itemId: cardId}),
    },
  ];

  return <OptionsMenu options={options} id={menuId} />;
};

export default CardOptionsMenu;
