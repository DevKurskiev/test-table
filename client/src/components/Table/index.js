import React from "react"
import { getSortSymbol, normalizeDate } from "./helpers"
import "./index.css"

const Table = ({ sort, data, onSort }) => {
  return (
    <table>
      <thead>
        <tr>
          {
            [
              { name: "date", text: "Дата", disableSort: true },
              { name: "name", text: "Название" },
              { name: "quantity", text: "Количество" },
              { name: "distance", text: "Расстояние" }
            ].map(item => (
              <th key={item.name}>
                <div 
                  className={item.disableSort ? "" : "sort"}
                  onClick={!item.disableSort ? onSort : undefined} 
                  data-name={item.name}
                >
                  <span>{item.text}</span>
                  { !item.disableSort && (
                    <span>{getSortSymbol(sort.name === item.name ? sort.value : 0)}</span>
                  ) }
                </div>
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          data.map((item, i) => (
            <tr key={item.name + i}>
              <td><div>{normalizeDate(item.date)}</div></td>
              <td><div>{item.name}</div></td>
              <td><div>{item.quantity}</div></td>
              <td><div>{item.distance}</div></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default Table