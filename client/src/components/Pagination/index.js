import React from "react"
import { createPagination } from "./helpers"
import "./index.css"

const Pagination = ({ onPaginate, loading, count, skip, take }) => {
  const { current, all } = createPagination({ count, take, skip })
  console.log('aaa', take, skip, all)

  const onPaginateHandle = (event) => {
    const { direction } = event.currentTarget.dataset
    onPaginate({ 
      take, 
      skip: direction === "right" ? skip + take : skip - take 
    })
  }

  return (
    <div className={`pagination ${loading ? "disabled" : ""}`}>
      <div 
        className={`pagination__arrow-wrapper left ${!all || current === 1 ? "disabled" : ""}`} 
        data-direction="left"
        onClick={onPaginateHandle}
      >
        <div className="pagination__arrow-wrapper__arrow left"/>
      </div>
      <div 
        className={`pagination__arrow-wrapper right ${!all || current === all ? "disabled" : ""}`} 
        data-direction="right"
        onClick={onPaginateHandle}
      >
        <div className="pagination__arrow-wrapper__arrow right"/>
      </div>
      <div className="pagination__in-text">{ all > 1 && <div>{current} из {all}</div> }</div>
    </div>
  )
}

export default Pagination