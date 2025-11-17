import { ClipLoader } from "react-spinners";

const Button = ({
  isLoading,
  classModifiers,
  onClick,
  icon = null,
  text,
  type = 'button',
}) => {
  return isLoading ? (
    <button
      type="button"
      className={`button button--icon ${classModifiers} button--disabled`}
      disabled
    >
      <ClipLoader size={20} /> {text}
    </button>
  ) : (
    <button
      onClick={onClick}
      type={type}
      className={`button ${classModifiers}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
