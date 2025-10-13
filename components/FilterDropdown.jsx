'use client'

import { useEffect, useState } from "react"
import FilterButton from "./FilterButton"
import OptionsMenu from "./OptionsMenu"

const FilterDropdown = ({id, name, handleFilterChange, icon : Icon, options}) => {
  const [chosenOption, setChosenOption] = useState(options[0]);

    useEffect(() => {
      handleFilterChange(name, chosenOption.value)
    }, [chosenOption])

  return (
    <div className="flex-1">
      <OptionsMenu
        mode={'dropdown'}
        button={<FilterButton text={chosenOption.text} icon={Icon}/>}
        onSelect={(option) => setChosenOption(option)}
        id={id}
        options={options}
      />
    </div>
  );
}

export default FilterDropdown;