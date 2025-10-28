"use client";

import { useMemo, useState } from "react";
import FilterButton from "./FilterButton";
import OptionsMenu from "./OptionsMenu";

const FilterDropdown = ({
  id,
  name,
  handleFilterChange,
  icon: Icon,
  options,
  chosenOptionValue
}) => {
  const [chosenOptionIdx, setChosenOptionIdx] = useState(0);

  useMemo(() => {
    const idx = options.findIndex((option) => option.value === chosenOptionValue);
    setChosenOptionIdx(idx);
  }, [chosenOptionValue]);

  return (
    <div className="flex-1">
      <OptionsMenu
        id={id}
        mode={"dropdown"}
        options={options}
        button={<FilterButton text={options[chosenOptionIdx].text} icon={Icon} />}
        onSelect={(option, idx) => {
          handleFilterChange(name, option.value);
          setChosenOptionIdx(idx);
        }}
      />
    </div>
  );
};

export default FilterDropdown;
