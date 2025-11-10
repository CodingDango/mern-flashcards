import { startCase } from "lodash";
import { FaChevronDown } from "react-icons/fa";

const FilterButton = ({text, icon : Icon, onSelect = () => null, ...rest}) => (
  <button
    {...rest} 
    type="button"
    className="w-full button bg-black-lg border border-black-md"
  >
    <div className="w-full flex justify-between items-center gap-my-md">
      <div className="flex items-center">
        <span className="pr-my-xs md:pr-my-sm text-black-light">
          <Icon size={20}/>
        </span>
        <span className="line-clamp-1">{text}</span>
      </div>
      <FaChevronDown />
    </div>
  </button>
);

export default FilterButton;