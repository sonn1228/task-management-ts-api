interface ObjectSearch {
  keyword: string;
  regex?: RegExp;
}
const searchHelper = (query: Record<string, any>): ObjectSearch => {
  let objSearch: ObjectSearch = {
    keyword: "",
  };

  if (query.keyword) {
    objSearch.keyword = query.keyword;
    const regex = new RegExp(objSearch.keyword, "i");

    objSearch.regex = regex;
  }
  return objSearch;
};
export default searchHelper;
