import DynamicForm from "./dynamic-form.vue";

DynamicForm.install = (App) => {
  App.component(DynamicForm.__name, DynamicForm)
}

export default DynamicForm;
