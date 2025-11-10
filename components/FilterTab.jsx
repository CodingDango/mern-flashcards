import { startCase } from "lodash"

const FilterTab = ({name, value, label, count, isActive, onFilterChange}) => {
  const parentClass = `
    button 
    ${isActive ? 'button--white' : 'button--dark'}
  `;                   

  return (
    <button 
      onClick={() => onFilterChange(name, value)}
      className={parentClass}>
      <div className="w-full flex justify-between items-center gap-my-xs font-normal">
        <span>{startCase(label)}</span>
        <span className="px-3 bg-black-xs/30 rounded-md">{count}</span>
      </div>
    </button>
  );
}

export default FilterTab;