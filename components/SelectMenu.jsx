const SelectMenu = ({ setQuery }) => {
  return (
    <>
      <select
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
        className="filter-by-region"
      >
        <option hidden>Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </>
  );
};
export default SelectMenu;
