import { memo } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Pagination = ({
  totalPageCount,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  gotoPage,
  pageIndex,
}) => {
  let startPage = Math.max(pageIndex - 2, 1);
  let endPage = Math.min(startPage + 4, totalPageCount);

  if (endPage - startPage < 4) {
    startPage = Math.max(endPage - 4, 1);
  }
  return (
    <div className="pagination-container">
      <button
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
        className={`pagination-button pagination-ctrl ${
          !canPreviousPage ? "disabled" : ""
        }`}
      >
        <div className="button-content">
          <MdKeyboardArrowLeft className="arrow-icon" />
          <span>Previous</span>
        </div>
      </button>

      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      ).map((number) => (
        <button
          key={number}
          className={`pagination-button ${
            number === pageIndex + 1 ? "active" : ""
          }`}
          onClick={() => gotoPage(number)}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => nextPage()}
        disabled={!canNextPage}
        className={`pagination-button pagination-ctrl ${
          !canNextPage ? "disabled" : ""
        }`}
      >
        <div className="button-content">
          <span>Next</span>
          <MdKeyboardArrowRight className="arrow-icon" />
        </div>
      </button>
    </div>
  );
};

export default memo(Pagination);
