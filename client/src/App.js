import React, { useState, useEffect } from 'react'
import Pagination from "./components/Pagination"
import Table from "./components/Table"
import Filter from "./components/Filter"
import { request, generateUrlWithQueryParams } from "./helpers"
import menuIcon from "./icons/menu.svg"
import './App.css'

function App() {
  const [isFilterModalOpen, toggleFilterModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [params, changeParams] = useState({
    pagination: {
      take: 5,
      skip: 0,
    },
    sort: {
      name: "",
      value: ""
    },
    filter: {
      column: "",
      condition: "",
      value: ""
    }
  }) 

  useEffect(() => {
    async function fetchData () {
      setLoading(true)

      const response = await request(
        generateUrlWithQueryParams("/api/table", params)
      )

      if (response.table)
        setData(response)
      setLoading(false)
    }

    fetchData()
  }, [params])

  function onSort (e){
    const { name } = e.currentTarget.dataset

    changeParams(previousParams => {
      const { value } = previousParams.sort

      return {
        ...previousParams,
        sort: {
          name,
          value: !value || name !== params.sort.name ? 1 : value === 1 ? -1 : 0
        }
      }
    })
  }

  const onPaginate = (pagination) => {
    changeParams(previousParams => {
      return {
        ...previousParams,
        pagination
      }
    })
  }

  const onOpenFilterModal = () => {
    toggleFilterModal(true)
  }

  const onFilter = (filter) => {
    changeParams(previousParams => {
      return {
        ...previousParams,
        filter
      }
    })

    toggleFilterModal(false)
  }
  
  return (
    <div className="app">
      <Filter isOpen={isFilterModalOpen} toggleModal={toggleFilterModal} onFilter={onFilter} />
      {
        !data ? <div className="loading">Загрузка...</div> : (
          <div className="wrapper">
            <div className="header">
              <div className={`spinner ${loading ? "show" : ""}`}/>
              <img className="menu" src={menuIcon} onClick={onOpenFilterModal} />
              <Pagination 
                loading={loading}
                onPaginate={onPaginate} 
                count={data.count} 
                {...params.pagination}
              />
            </div>
            <Table sort={params.sort} data={data.table} onSort={onSort} />
          </div>
        )
      }
    </div>
  );
}

export default App;