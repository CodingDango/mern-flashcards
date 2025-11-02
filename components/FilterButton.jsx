import { startCase } from "lodash";
import { FaChevronDown } from "react-icons/fa";

const FilterButton = ({text, icon : Icon, onSelect = () => null, ...rest}) => (
  <button
    {...rest} 
    type="button"
    className="w-full h-full button bg-black-lg border border-black-md"
  >
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center">
        <span className="pr-my-sm border-r border-r-black-xs text-black-light">
          <Icon size={20}/>
        </span>
        <span className="pl-my-sm">{text}</span>
      </div>
      <FaChevronDown />
    </div>
  </button>
);

export default FilterButton;