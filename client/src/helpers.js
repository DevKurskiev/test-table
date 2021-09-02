import Toastify from 'toastify-js'

export const request = async url => {
  const response = await fetch(url)
  const json = await response.json();

  if (json.status === "error") {
    Toastify({
      text: json.message,
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
      stopOnFocus: true
    }).showToast();
  }

  return json
}

export const generateUrlWithQueryParams = (url, params) => {
  const { pagination, sort, filter } = params
  
  const sortQuery = sort.value ? `sort=${sort.name},${sort.value}&` : ""
  const paginationQuery = `skip=${pagination.skip}&take=${pagination.take}&`
  const filterQuery = filter.value ? `filter=${filter.column},${filter.condition},${filter.value}` : ""
  
  return `${url}?${sortQuery + paginationQuery + filterQuery}`
}