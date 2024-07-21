interface ObjectPagination {
  currentPage: number;
  limitItems: number;
  skip: number;
  totalPage?: number;
}

const paginationHelper = (
  objPagination: ObjectPagination,
  query: Record<string, any>,
  countRecords: number
): ObjectPagination => {
  if (query.page) {
    objPagination.currentPage = parseInt(query.page);
  }

  if (query.limit) {
    objPagination.limitItems = parseInt(query.limit);
  }

  objPagination.skip =
    (objPagination.currentPage - 1) * objPagination.limitItems;

  objPagination.totalPage = Math.ceil(countRecords / objPagination.limitItems);
  return objPagination;
};

export default paginationHelper;
