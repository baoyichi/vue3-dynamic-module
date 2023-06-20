<template>
  <div class="search-bar">
    <div v-for="item in props.searchItem" :key="item.code" class="search-item">
      <p>{{ item.label }}</p>
      <!--   下拉框   -->
      <el-select
        v-if="item.isSelect"
        v-model="item.value"
        placeholder="请选择"
        :multiple="item.isMultiple"
        collapse-tags
        collapse-tags-tooltip
        @change="handleClick(item.label, item.value)"
      >
        <!--    分组    -->
        <template v-if="item.isGroup">
          <el-option-group v-for="group in item.options" :key="group.label" :label="group.label">
            <el-option
              v-for="val in group.options"
              :key="val.value"
              :label="val.label"
              :value="val.value"
            />
          </el-option-group>
        </template>
        <!--    常规    -->
        <template v-if="!item.isGroup">
          <el-option
            v-for="time in item.options"
            :key="time.value"
            :label="time.label"
            :value="time.value"
          />
        </template>
      </el-select>
      <!--   输入框   -->
      <el-input v-if="item.isInput" v-model="item.value" placeholder="请输入"></el-input>
      <!--   搜索重置按钮   -->
      <div v-if="item.isBt" class="search-bt">
        <div v-for="(val, on) in item.options" :key="on" class="search-item">
          <el-button :type="val.type" @click="searchClick(val.label)">
            {{ val.label }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="DynamicSearch">
  const changeFun = defineEmits(['handleSearch']);
  const props = defineProps({
    searchItem: {
      type: Array,
      default: () => {
        return [];
      }
    }
  });

  /**
   * 下拉框选中事件
   * @param type：下拉选项名称
   * @param value：选中的值
   */
  const handleClick = (type: string, value: any) => {
    const params = {
      type: type,
      value: value
    };
    changeFun('handleSearch', params);
  };
  /**
   * 全局按钮
   * @param type：按钮的名称
   */
  const searchClick = (type: string) => {
    const params = {
      type: type
    };
    changeFun('handleSearch', params);
  };
</script>

<style scoped>
.search-bar {
  background: #ffffff;
  padding: 1rem 12px;
  display: flex;
}

.search-bar .search-item {
  flex: 0 1 auto;
  margin-right: 40px;
  display: flex;
  place-items: center;
}

.search-bar .search-item p {
  margin-right: 8px;
  flex: none;
}

.search-bar .search-item p:last-child {
  flex: 1;
  margin-right: 0;
}

.search-bt {
  gap: 8px;
  display: flex;
}

.search-bt .search-item {
  margin-right: 0;
}
</style>
