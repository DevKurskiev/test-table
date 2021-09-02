export const getSortSymbol = value => {
  return value === 1 ? " ↓" : value === -1 ? " ↑" : "⇅"
}

export const normalizeDate = date => 
  new Date(date).toISOString().substr(0, 10).replace('T', ' ')