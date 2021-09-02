export const createPagination = ({ count, take, skip }) => {
  const allPages = Math.ceil(count / take)
  const currentPage = !skip ? 1 : skip / take + 1
  return { current: currentPage, all: allPages }
}