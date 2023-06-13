<template>
  <div class="container">
    <el-table :data="tableParams.datas" stripe style="width: 100%">
      <el-table-column type="index" width="70" label="序号" fixed :index="indexMethod" />
      <template v-for="(item, index) in tableParams.headers" :key="index">
        <el-table-column
          v-if="item.show"
          :prop="item.value"
          :label="item.label"
          :width="item.width"
          :show-overflow-tooltip="item.showOverflow"
          :fixed="item.showFixed"
        >
          <template #default="scope">
            <span v-if="item.value === 'control'" v-for="(val, num) in tableParams.tableOperations" :key="num">
              <el-button link type="primary" size="small" @click="handleClick(val.type)">{{val.label}}</el-button>
            </span>
            <span v-else>{{ scope.row[`${item.value}`] }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="pagination">
      <el-pagination
        v-model:current-page="tablePagination.currentPage"
        v-model:page-size="tablePagination.pageSize"
        :small="true"
        :background="true"
        layout="total, prev, pager, next, jumper"
        :total="tablePagination.total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="DynamicTable">
  import {onMounted, reactive, watch} from "vue";
  
  const props = defineProps({
    tableItems: {
      type: Object,
      require: true,
      default: () => {
        return {};
      }
    },
    pagination: {
      type: Object,
      require: true,
      default: () => {
        return {};
      }
    }
  });
  
  const emit = defineEmits(['dataChange']);
  const tableParams = reactive({
    datas: [],
    headers: [
      {
        label: '名称',
        value: 'name',
        width: '120',
        show: true,
        showOverflow: true,
        showFixed: true
      }
    ],
    tableOperations: []
  })
  const tablePagination = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0
  })

  watch(
    () => props.tableItems,
    (val) => {
      if (val) {
        dataRender();
      }
    },
    { deep: true }
  )
  onMounted(() => {
    dataRender();
  })

  /**
   * 分页后序号连续
   * @param index
   */
  const indexMethod = (index: any) => {
    const { currentPage, pageSize } = tablePagination;
    return index + 1 + (currentPage - 1) * pageSize;
  }
  /**
   * 分页跳转
   * @param val
   */
  const handleCurrentChange = (val: number) => {
    const params = {
      type: 'pagination',
      value: val
    }
    emit('dataChange', params);
  }
  const dataRender = () => {
    const { header, tableData, tableOperations } = props.tableItems;
    tableParams.headers = header;
    tableParams.datas = tableData;
    tableParams.tableOperations = tableOperations;
    const {currentPage, pageSize} = props.pagination;
    tablePagination.currentPage = currentPage;
    tablePagination.pageSize = pageSize;
    tablePagination.total = tableData.length;
  }
  /**
   * 表格数据操作
   * @param type: 操作的类型
   */
  const handleClick = (type: string) => {
    const params = {
      type: type,
      value: ''
    }
    emit('dataChange', params);
  }
</script>

<style scoped></style>
