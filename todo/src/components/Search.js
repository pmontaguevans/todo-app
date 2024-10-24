import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      className="search-input"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search todos by title..."
    />
  );
};

export default Search;
