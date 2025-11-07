import { RiResetLeftFill } from "react-icons/ri";
import { FaPlusCircle, FaSearch } from "react-icons/fa";
import { FaSliders } from "react-icons/fa6";
import { BsFilter } from "react-icons/bs";
import FilterDropdown from "./FilterDropdown";
import FilterTab from "./FilterTab";

const DeckFilters = ({
  allDecks = [],
  filters,
  onFilterChange,
  onReset,
  onAddDeck,
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
              count={allDecks?.length || 0}
              isActive={filters.category === "all"}
              onFilterChange={onFilterChange}
            />
          </li>
          <li>
            <FilterTab
              name={"category"}
              value={"favorites"}
              label={"Favorites"}
              count={allDecks?.filter((deck) => deck.isFavorite).length || 0} 
              isActive={filters.category === "favorites"}
              onFilterChange={onFilterChange}
            />
          </li>
        </ul>

        <div className="grid grid-cols-[2fr_3fr] gap-my-md">
          <div className="flex items-center border border-black-md px-4 py-3 rounded-md">
            <div className="pr-4 border-r border-black-xs">
              <FaSearch size={20} className="text-black-light" />
            </div>

            <input
              placeholder="Search for a deck by topic"
              className="pl-4 flex-1 bg-transparent outline-none"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange("searchQuery", e.target.value)}
            />
          </div>

          <div className="flex gap-my-md z-10">
            <FilterDropdown
              id={"filters-options"}
              name={"status"}
              chosenOptionValue={filters['status']}
              handleFilterChange={onFilterChange}
              options={[
                { text: "All", value: "all" },
                { text: "Unfinished", value: "unfinished" },
                { text: "Not Started", value: "notStarted" },
                { text: "Finished", value: "finished" },
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
                { text: "Newest Reviewed", value: "newestReviewed" },
                { text: "Oldest Reviewed", value: "oldestReviewed" },
              ]}
              icon={BsFilter}
            />

            <button className="button button--white" onClick={onReset}>
              <RiResetLeftFill size={24} />
            </button>

            <button
              onClick={onAddDeck}
              className="flex-1 2xs:w-auto button button--white"
            >
              <span className="flex gap-my-xs items-center">
                <FaPlusCircle />
                Add Deck
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeckFilters;