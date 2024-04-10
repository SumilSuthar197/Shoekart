import { memo } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const AdminPagination = ({
  startPage,
  endPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  gotoPage,
  pageIndex,
}) => {
  return (
    <div className="pagination-container">
      <button
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
        className={`admin-pagination-button pagination-ctrl ${
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
          className={`admin-pagination-button ${
            number === pageIndex + 1 ? "active" : ""
          }`}
          onClick={() => gotoPage(number - 1)}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => nextPage()}
        disabled={!canNextPage}
        className={`admin-pagination-button pagination-ctrl ${
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

export default memo(AdminPagination);
