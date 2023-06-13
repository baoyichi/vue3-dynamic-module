<template>
  <DynamicTable :table-items="tableItems" :pagination="pagination"></DynamicTable>
</template>

<script setup lang="ts">
  import DynamicTable from "../../packages/table/dynamic-table.vue";
  import { reactive } from "vue";
  
  const tableItems = reactive({
    header: [
      {
        label: '名称',
        value: 'name',
        width: '120',
        show: true,
        showOverflow: true,
        showFixed: true
      },
      {
        label: '年龄',
        value: 'age',
        width: '',
        show: true,
        showOverflow: true,
        showFixed: true
      },
      {
        label: '工作',
        value: 'job',
        width: '120',
        show: true,
        showOverflow: true,
        showFixed: true
      },
      {
        label: '操作',
        value: 'control',
        width: 'auto',
        show: true,
        showOverflow: false,
        showFixed: false
      }
    ],
    tableData: [
      {name: 'Leo', age: 28, job: 'develop'}
    ],
    tableOperations: [
      {
        type: 'edit',
        label: '编辑'
      }
    ]
  })
  const pagination = reactive({
    currentPage: 1,
    pageSize: 10
  })
</script>

<style scoped lang="scss">
</style>
