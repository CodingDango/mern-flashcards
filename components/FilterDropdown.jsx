import FilterButton from "./FilterButton"
import OptionsMenu from "./OptionsMenu"

const FilterDropdown = ({text, icon : Icon, id, options}) => (
  <div className="flex-1">
    <OptionsMenu
      mode={'dropdown'}
      button={<FilterButton text={text} icon={Icon}/>}
      id={id}
      options={options}
    />
  </div>
)

export default FilterDropdown;