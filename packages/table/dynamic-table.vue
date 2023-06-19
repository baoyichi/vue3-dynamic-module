<template>
  <div class="container">
    <div class="table-control">
      <div v-for="item in controlList" :key="item.code" class="control-item">
        <el-button
          v-if="btIncludes.includes(item.btType)"
          :type="item.type"
          :link="item.btType === 'text'"
          :plain="item.btType === 'secondary'"
          :text="item.btType === 'threeLevel'"
          :bg="item.btType === 'threeLevel'"
          @click.stop="handleTableControl(item.label)"
        >{{ item.label }}</el-button>
        <el-button v-if="item.btType === 'iconTextBt'" :type="item.type"
                   @click.stop="handleTableControl(item.label)">
          <img :src="getAssetsFile(`${item.icon}.png`)" alt="" class="icon-size" />{{ item.label }}
        </el-button>
        <el-tooltip
          v-if="item.btType === 'iconBt'"
          class="box-item"
          :effect="item.effect"
          :content="item.label"
          :placement="item.placement">
          <el-button link @click.stop="handleTableControl(item.label)">
            <img :src="getAssetsFile(`${item.icon}.png`)" alt="" class="icon-size" />
          </el-button>
        </el-tooltip>
        <el-tooltip
          v-if="item.btType === 'listSet'"
          class="box-item"
          :effect="item.effect"
          content="列设置"
          :placement="item.placement"
        >
          <div class="checkbox-box" @click.stop="openPopover">
            <el-popover v-model:visible="listSetting.visible" placement="right" :width="160" trigger="click">
              <template #reference>
                <el-button link>
                  <img :src="getAssetsFile(`${item.icon}.png`)" alt="" class="icon-size" />
                </el-button>
              </template>
              <el-checkbox
                v-model="listSetting.checkAll"
                :indeterminate="listSetting.isIndeterminate"
                @change="handleCheckAllChange"
              >列展示</el-checkbox
              >
              <el-divider />
              <el-checkbox-group v-model="listSetting.checkedColum" @change="handleCheckedChange">
                <el-checkbox
                  v-for="colum in listSetting.columList"
                  :key="colum.code"
                  :label="colum.label"
                  :disabled="colum.isChecked"
                >
                  {{ colum.label }}
                </el-checkbox>
              </el-checkbox-group>
            </el-popover>
          </div>
        </el-tooltip>
      </div>
    </div>
    <div class="table-wrap">
      <el-table
        ref="multipleTableRef"
        :data="tableParams.datas"
        @selection-change="handleSelectionChange"
        stripe style="width: 100%"
      >
        <el-table-column v-if="isMultiple" type="selection" fixed width="55" />
        <el-table-column type="index" width="70" label="序号" fixed :index="indexMethod" />
        <template v-for="(item, index) in tableParams.headers" :key="index">
          <el-table-column
            v-if="item.show && !item.filters"
            :prop="item.value"
            :label="item.label"
            :width="item.width"
            :show-overflow-tooltip="item.showOverflow"
            :fixed="item.showFixed"
            :sortable="item.sortable"
          >
            <template #default="scope">
            <span v-if="item.value === 'control'" v-for="(val, num) in tableParams.operations" :key="num">
              <el-button link type="primary" size="small" @click="handleClick(val.type, scope.row)">{{val.label}}</el-button>
            </span>
              <span v-else-if="item.showImage">
              <el-image :src="`https://www.bing.com${scope.row[`${item.value}`]}`" fit="scale-down" />
            </span>
              <span v-else>{{ scope.row[`${item.value}`] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="item.filters"
            :prop="item.value"
            :label="item.label"
            :width="item.width"
            :show-overflow-tooltip="item.showOverflow"
            :fixed="item.showFixed"
            :filters="item.filters"
            :filter-method="filterHandler">
            <template #default="scope">
              <span>{{ scope.row[`${item.value}`] }}</span>
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
  </div>
</template>

<script setup lang="ts" name="DynamicTable">
  import {onMounted, reactive, ref, watch} from "vue";
  import { TableColumnCtx } from 'element-plus'
  
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
  
  const emit = defineEmits(['handleTableControl', 'dataChange']);
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
    operations: []
  });
  const tablePagination = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0
  });
  const url = 'https://www.bing.com';
  const isMultiple = ref(false);
  const multipleSelection = ref([]);
  const controlList = ref([]);
  const listSetting = reactive({
    visible: false,
    checkAll: true,
    isIndeterminate: false,
    columList: [],
    checkedColum: [] as any
  });
  const btIncludes = ['basic', 'secondary', 'threeLevel', 'text']

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
   * 获取assets静态资源
   * @param url
   */
  const getAssetsFile = (url: string) => {
    return new URL(`../../examples/assets/icons/${url}`, import.meta.url).href;
  }

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
    const { header, tableData, tableOperations, multiple, tableControl } = props.tableItems;
    tableParams.headers = header;
    tableParams.datas = tableData;
    tableParams.operations = tableOperations;
    isMultiple.value = multiple;
    controlList.value = tableControl;
    listSetting.columList = header;
    const {currentPage, pageSize, total} = props.pagination;
    tablePagination.currentPage = currentPage;
    tablePagination.pageSize = pageSize;
    tablePagination.total = total;
    multipleSelection.value = [];
    showAllColum();
  }
  /**
   * 表格操作事件
   * @param type
   */
  const handleTableControl = (type: string) => {
    const params = {
      type: type
    }
    if (type === '删除') {
      params['value'] = multipleSelection.value;
    }
    emit('handleTableControl', params);
  }
  /**
   * 表格数据操作
   * @param type: 操作的类型
   */
  const handleClick = (type: string, row: any) => {
    const params = {
      type: type,
      value: row
    }
    emit('dataChange', params);
  }

  const handleSelectionChange = (val: any) => {
    multipleSelection.value = val;
  }

  const filterHandler = (
    value: string,
    row: any,
    column: TableColumnCtx<any>
  ) => {
    const property = column['property']
    return row[property] === value
  }

  // 展开列设置
  const openPopover = () => {
    listSetting.visible = true;
  };
  const showAllColum = () => {
    listSetting.checkedColum = listSetting.columList.map((item: any) => {
      if (item.show) {
        return item.label;
      }
    });
  };
  /**
   * 列全选
   * @param val
   */
  const handleCheckAllChange = (val: boolean) => {
    if (val) {
      tableParams.headers.map((item: any) => {
        item.show = true;
      });
    } else {
      tableParams.headers.map((item: any) => {
        item.show = false;
      });
    }
    showAllColum();
    listSetting.isIndeterminate =
      tableParams.headers.length > 0 && tableParams.headers.length < listSetting.columList.length;
  };
  /**
   * 列选中
   * @param value
   */
  const handleCheckedChange = (value: string[]) => {
    tableParams.headers.map((item: any) => {
      item.show = value.includes(item.label);
    });
    showAllColum();
    const checkedCount = value.length;
    listSetting.isIndeterminate = checkedCount > 0 && checkedCount < listSetting.columList.length;
  };
</script>

<style scoped>
.container {
  width: 100%;
  background-color: #ffffff;
}

/*
公共样式
*/
.container .control-item {
  margin-right: 8px;
  padding: 0 6px;
}

.container .control-item:last-child {
  margin-right: 0;
}

.container .control-item .icon-size {
  height: 1rem;
  width: 1rem;
  margin-right: 2px;
}

/*
表格操作栏样式
*/
.table-control {
  width: auto;
  display: flex;
  place-items: center;
  justify-content: flex-end;
  margin-bottom: 12px;
}

/**
表格样式
 */
.table-wrap {
  width: auto;
}

.table-wrap .header-style {
  background-color: #f2f2f2;
}

/*
分页样式
 */
.pagination {
  margin-top: 16px;
}

.pagination:after {
  display: block;
  clear: both;
  content: '';
}

.el-pagination > .is-first {
  flex: 1;
}
</style>
