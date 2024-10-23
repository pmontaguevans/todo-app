import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages === 0) return null;

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span className="pagination-info">
        {currentPage} of {totalPages}
      </span>

      <button
        className="pagination-button"
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
