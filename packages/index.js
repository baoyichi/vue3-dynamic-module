import DynamicTable from "./table/dynamic-table.vue";

export { DynamicTable }
const components = [DynamicTable]
const install = (App) => {
  components.forEach((item) => {
    App.component(item.__name, item)
  })
}

export default {
  install
}
