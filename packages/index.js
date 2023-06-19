import DynamicTable from "./table/dynamic-table.vue";
import DialogTips from "./tips/dialog-tips.vue";
import DynamicForm from "./form/dynamic-form.vue";
import DynamicSearch from "./search/dynamic-search.vue";

export { DynamicTable, DialogTips, DynamicForm, DynamicSearch }
const components = [DynamicTable, DialogTips, DynamicForm, DynamicSearch]
const install = (App) => {
  components.forEach((item) => {
    App.component(item.__name, item)
  })
}

export default {
  install
}
