import React from 'react'
import Arrow from '../../assets/svg/arrow_black.svg'

const Pagination = ({setPage, page, totalPages}) => {
   const getPages = () => {
    const delta = 2; // koliko stranica prije i poslije aktivne prikazati
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }
  return (
    <div className="pagination">
        <div
          className={`page-arrow ${page === 1 ? "disabled" : ""}`}
          onClick={() => page > 1 && setPage(page - 1)}
        >
          <img className="left-arrow" src={Arrow}></img>
          <img className="left-arrow" src={Arrow}></img>
        </div>
        {getPages(page, totalPages).map((p, i) =>
          p === "..." ? (
            <div key={`dots-${i}`} className="page-dots">
              ...
            </div>
          ) : (
            <div
              key={p}
              className={`page-number ${page === p ? "active" : ""}`}
              onClick={() => setPage(p)}
            >
              {p}
            </div>
          )
        )}
        <div
          className={`page-arrow ${page === totalPages ? "disabled" : ""}`}
          onClick={() => page < totalPages && setPage(page + 1)}
        >
          <img src={Arrow}></img>
          <img src={Arrow}></img>
        </div>
    </div>
  )
}

export default Pagination