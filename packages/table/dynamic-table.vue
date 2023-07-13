<template>
  <div class="container">
    <!--  表格操作栏  -->
    <div class="table-control">
      <div v-for="item in tableItems.tableSetting" :key="item.code" class="control-item">
        <!--  不带icon的按钮  -->
        <el-button
          v-if="btIncludes.includes(item.btType)"
          :type="item.type"
          :link="item.btType === 'text'"
          :plain="item.btType === 'secondary'"
          :text="item.btType === 'threeLevel'"
          :bg="item.btType === 'threeLevel'"
          @click.stop="handleTableControl(item.value, item.label)"
        >{{ item.label }}</el-button>
        <!--  带icon且有背景色的按钮  -->
        <el-button v-if="item.btType === 'iconTextBt'" :type="item.type" :icon="item.icon"
                   @click.stop="handleTableControl(item.value, item.label)">{{ item.label }}
        </el-button>
        <!--  纯icon按钮，带tooltips  -->
        <el-tooltip
          v-if="item.btType === 'iconBt'"
          class="box-item"
          :effect="item.effect"
          :content="item.label"
          :placement="item.placement">
          <el-button link :icon="item.icon" @click.stop="handleTableControl(item.value, item.label)" />
        </el-tooltip>
        <!--  列设置按钮  -->
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
                <el-button link :icon="item.icon" />
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
    <!--  表格  -->
    <div class="table-wrap">
      <el-table
        v-loading="tableLoading"
        ref="multipleTableRef"
        :data="tableItems.dataSource"
        @selection-change="handleSelectionChange"
        stripe style="width: 100%"
      >
        <el-table-column v-if="tableItems.showSelection" type="selection" fixed width="55" />
        <el-table-column type="index" width="70" label="序号" fixed :index="indexMethod" />
        <template v-for="(item, index) in tableItems.columns" :key="index">
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
              <!--  表格操作列  -->
              <template v-if="item.value === 'control'">
                <span v-for="(val, num) in tableItems.tableRowHandlers" :key="num">
                <el-button link type="primary" size="small" @click="handleClick(val.label, scope.row)">{{val.label}}</el-button>
              </span>
              </template>
              <!--  显示图片  -->
              <span v-else-if="item.showImage">
                <el-image :src="scope.row[`${item.value}`]" fit="scale-down" />
              </span>
              <span v-else>{{ scope.row[`${item.value}`] }}</span>
            </template>
          </el-table-column>
          <!--  表头筛选  -->
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
          v-model:current-page="tableItems.pagination.currentPage"
          v-model:page-size="tableItems.pagination.pageSize"
          :small="true"
          :background="true"
          layout="total, prev, pager, next, jumper"
          :total="tableItems.pagination.total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="DynamicTable">
  import {onMounted, reactive, ref, watch} from "vue";
  import {TableColumnCtx} from 'element-plus';

  const props = defineProps({
    tableItems: {
      type: Object,
      require: true,
      default: () => {
        return {};
      }
    }
  });
  const emit = defineEmits(['handleTableControl']);
  const tableLoading = ref(false);
  let tableColumns = reactive([]);
  const listSetting = reactive({
    visible: false,
    checkAll: true,
    isIndeterminate: false,
    columList: [],
    checkedColum: [] as any
  });
  const multipleSelection = ref([]);
  const btIncludes = ['basic', 'secondary', 'threeLevel', 'text'];

  watch(
    () => props.tableItems,
    (val: any) => {
      if (val) {
        dataRender();
      }
    },
    { deep: true }
  )
  
  onMounted(() => {
    tableLoading.value = true;
    console.log('children ---- ', tableLoading.value);
  })

  /**
   * 分页后序号连续
   * @param index
   */
  const indexMethod = (index: any) => {
    const { pagination } = props.tableItems;
    return index + 1 + (pagination.currentPage - 1) * pagination.pageSize;
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
    emit('handleTableControl', params);
  }
  // 数据赋值渲染
  const dataRender = () => {
    const { columns, loading } = props.tableItems;
    tableColumns = [ ...columns ];
    listSetting.columList = tableColumns;
    multipleSelection.value = [];
    showAllColum();
    tableLoading.value = loading;
  }
  /**
   * 表格操作栏
   * @param value：按钮类型
   * @param label：按钮名称
   */
  const handleTableControl = (value, label) => {
    const params = {
      type: value,
      label: label
    }
    if (value === 'del') {
      params['value'] = multipleSelection.value;
    }
    emit('handleTableControl', params);
  }
  /**
   * 表格数据操作
   * @param type: 操作的类型
   * @param items：传入的表格行数据
   */
  const handleClick = (type: string, items: any) => {
    const params = {
      type: type,
      value: items
    }
    emit('handleTableControl', params);
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
  // 通过show设置列设置能否勾选
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
      tableColumns.map((item: any) => {
        item.show = true;
      });
    } else {
      tableColumns.map((item: any) => {
        item.show = false;
      });
    }
    showAllColum();
    listSetting.isIndeterminate =
      tableColumns.length > 0 && tableColumns.length < listSetting.columList.length;
  };
  /**
   * 列选中
   * @param value
   */
  const handleCheckedChange = (value: string[]) => {
    tableColumns.map((item: any) => {
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
</style>
