<template>
  <DynamicTable
    :table-items="tableItems"
    :pagination="pagination"
    @handle-table-control="handleTableControl"
    @data-change="tableChange"
  ></DynamicTable>
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
        isChecked: true,
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
        isChecked: false,
        showOverflow: true,
        showFixed: true
      },
      {
        label: '壁纸',
        value: 'url',
        width: '200',
        show: true,
        isChecked: true,
        showOverflow: false,
        showFixed: false,
        showImage: true
      },
      {
        label: '更新时间',
        value: 'startdate',
        width: '200',
        show: true,
        isChecked: false,
        showOverflow: false,
        showFixed: false,
        sortable: true
      },
      {
        label: '操作',
        value: 'control',
        width: 'auto',
        show: true,
        isChecked: true,
        showOverflow: false,
        showFixed: false
      }
    ],
    tableControl: [
      {
        code: '1',
        btType: 'basic',
        type: 'success',
        label: '成功'
      },
      {
        code: '2',
        btType: 'secondary',
        type: 'warning',
        label: '警告'
      },
      {
        code: '3',
        btType: 'iconTextBt',
        type: 'primary',
        label: '新建',
        icon: 'add'
      },
      {
        code: '4',
        btType: 'iconTextBt',
        type: 'danger',
        label: '删除',
        icon: 'del'
      },
      {
        code: '5',
        btType: 'text',
        type: 'primary',
        label: '点我'
      },
      {
        code: '6',
        btType: 'iconBt',
        type: 'primary',
        label: '刷新',
        effect: 'dark',
        placement: 'top',
        icon: 'refresh'
      },
      {
        code: '7',
        btType: 'listSet',
        type: 'primary',
        label: '列设置',
        effect: 'dark',
        placement: 'top',
        icon: 'set'
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
  
  const handleTableControl = (type: string) => {
    if (type === '刷新') {
      tableList();
    }
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
