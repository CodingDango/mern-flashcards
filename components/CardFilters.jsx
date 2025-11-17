import { RiResetLeftFill } from "react-icons/ri";
import { FaPlusCircle, FaSearch } from "react-icons/fa";
import { FaSliders } from "react-icons/fa6";
import { BsFilter } from "react-icons/bs";
import { useMemo } from "react";
import FilterDropdown from "./FilterDropdown";
import FilterTab from "./FilterTab";
import Button from "./Button";

const CardFilters = ({
  allCards = [],
  decksAsOptions = [],
  filters,
  onFilterChange,
  onReset,
  onAddCard = null,
  isLoading
}) => {
  return (
    <section>
      <div className="flex flex-col gap-my-sm">
        <ul className="flex gap-my-xs">
          <li>
            <FilterTab
              name={"category"}
              value={"all"}
              label={"All"}
              count={allCards?.length || 0}
              isActive={filters.category === "all"}
              onFilterChange={onFilterChange}
            />
          </li>
          <li>
            <FilterTab
              name={"category"}
              value={"favorites"}
              label={"Favorites"}
              count={allCards?.filter((card) => card?.isFavorite).length || 0} 
              isActive={filters.category === "favorites"}
              onFilterChange={onFilterChange}
            />
          </li>
        </ul>

        <div className="grid grid-rows-[auto_auto] xl:grid-rows-1 xl:grid-cols-[2fr_3fr] gap-my-sm">
          <div className="flex items-center border border-black-md px-4 py-3 rounded-md">
            <div className="pr-4 border-r border-black-xs">
              <FaSearch size={20} className="text-black-light" />
            </div>

            <input
              placeholder="Search for a card by question"
              className="pl-4 flex-1 bg-transparent outline-none"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange("searchQuery", e.target.value)}
            />
          </div>

          <div className="flex items-end gap-my-sm z-10 flex-wrap">
            <div className="flex gap-my-sm flex-1">
              <FilterDropdown
                id={"filters-options"}
                name={"deckId"}
                chosenOptionValue={filters['deckId']}
                handleFilterChange={onFilterChange}
                options={[
                  { text: "All Decks", value: null },
                  ...decksAsOptions
                ]}
                icon={FaSliders}
              />

              <FilterDropdown
                id={"time-filters-options"}
                name={"sortBy"}
                handleFilterChange={onFilterChange} // This prop in FilterDropdown should be onFilterChange
                chosenOptionValue={filters['sortBy']}
                options={[
                  { text: "Newest Created", value: "newestCreated" },
                  { text: "Oldest Created", value: "oldestCreated" },
                ]}
                icon={BsFilter}
              />
            </div>

            <div className="flex gap-my-sm flex-1">
              <button className="button button--white" onClick={onReset}>
                <RiResetLeftFill size={24} />
              </button>
              
              <Button
                onClick={onAddCard}
                classModifiers={'flex-1 2xs:w-auto button--white button--icon'}
                text={'Add Card'}
                isLoading={isLoading}
                icon={<FaPlusCircle />}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardFilters;