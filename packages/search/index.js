import DynamicSearch from "./dynamic-search.vue";

DynamicSearch.install = (App) => {
  App.component(DynamicSearch.__name, DynamicSearch)
}

export default DynamicSearch;
