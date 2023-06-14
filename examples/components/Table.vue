<template>
  <DynamicTable :table-items="tableItems" :pagination="pagination" @data-change="tableChange"></DynamicTable>
</template>

<script setup lang="ts">
  import DynamicTable from "../../packages/table/dynamic-table.vue";
  import { onMounted, reactive } from "vue";
  import { getJson } from "@/api/bacground-img";

  const tableItems = reactive({
    header: [
      {
        label: '名称',
        value: 'title',
        width: '300',
        show: true,
        showOverflow: true,
        showFixed: true,
        filters: [
          { text: '巴洛克风盛宴', value: '巴洛克风盛宴' },
          { text: '大弯的生日', value: '大弯的生日' }
        ]
      },
      {
        label: '图片源',
        value: 'copyright',
        width: '700',
        show: true,
        showOverflow: true,
        showFixed: true
      },
      {
        label: '壁纸',
        value: 'url',
        width: '200',
        show: true,
        showOverflow: false,
        showFixed: false,
        showImage: true
      },
      {
        label: '更新时间',
        value: 'startdate',
        width: '200',
        show: true,
        showOverflow: false,
        showFixed: false,
        sortable: true
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
    tableData: [],
    tableOperations: [
      {
        type: 'download',
        label: '下载原图'
      }
    ],
    multiple: false
  })
  const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0
  })
  
  onMounted(() => {
    tableList();
  })
  
  const tableList = async () => {
    const { data } = await getJson();
    tableItems.tableData = data.data;
    pagination.total = data.Total;
  }
  
  const tableChange = (params: {val: number}) => {
    const { type } = params;
    switch (type) {
      case 'pagination':
        pagination.currentPage = params.val;
        break;
      case 'edit':
        break;
      default:
        break;
    }
  }
</script>

<style scoped lang="scss">
</style>
