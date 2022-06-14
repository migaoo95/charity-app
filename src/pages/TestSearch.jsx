import {
  InstantSearch,
  SearchBox,
  RefinementList,
  SortBy,
  Stats,
  Pagination,
  Highlight,
  Menu,
  ClearAll,
  Hits,
} from "react-instantsearch/dom";
function TestSearch(props) {
  return (
    <InstantSearch
      apiKey="6be0576ff61c053d5f9a3225e2a90f76"
      appId="latency"
      indexName="instant_search"
    ></InstantSearch>
  );
  //    (
  //     <InstantSearch
  //       apiKey="6be0576ff61c053d5f9a3225e2a90f76"
  //       appId="latency"
  //       indexName="instant_search"
  //     >
  //       <header>
  //         <SearchBox
  //           translations={{ placeholder: "Search for Products" }}
  //         ></SearchBox>
  //       </header>
  //     </InstantSearch>
  //   );
}

export default TestSearch;
