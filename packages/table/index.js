import DynamicTable from "./dynamic-table.vue";

DynamicTable.install = (App) => {
  App.component(DynamicTable.__name, DynamicTable)
}

export default DynamicTable;
