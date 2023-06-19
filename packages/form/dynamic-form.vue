<template>
  <el-dialog
    v-model="dialogData.dialogVisible"
    :title="dialogData.title"
    :width="dialogData.width"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleClose"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleFormData"
      :label-width="labelWidth"
      class="demo-ruleForm"
      :label-position="labelPosition"
      :size="'default'"
      status-icon
    >
      <el-row>
        <template v-for="(item, index) in formItems" :key="index">
          <el-col>
            <el-form-item
              v-if="!item.disable"
              :label="item.label"
              :prop="item.isRequired ? item.field : ''"
              :rules="item.rule"
              :style="itemStyle"
            >
              <template v-if="item.type === 'input' && !item.showPassword">
                <el-input
                  v-model="ruleFormData[`${item.field}`]"
                  :placeholder="item.placeholder"
                  autocomplete="off"
                  readonly
                  onfocus="this.removeAttribute('readonly')"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'input' && item.showPassword">
                <el-input
                  v-model="ruleFormData[`${item.field}`]"
                  :placeholder="item.placeholder"
                  :show-password="item.showPassword"
                  :disabled="dialogData.title !== '新建'"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-if="dialogData.title === '新建'"
                  v-model="ruleFormData[`${item.field}`]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  />
                </el-select>
                <el-select
                  v-else
                  v-model="ruleFormData[`${item.field}`]"
                  :placeholder="item.placeholder"
                  :disabled="item.disable"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  />
                </el-select>
              </template>
              <template v-else-if="item.type === 'treeselect'">
                <el-tree-select
                  v-model="ruleFormData[`${item.field}`]"
                  :data="item.options"
                  check-strictly
                  :render-after-expand="false"
                  style="width: 100%"
                ></el-tree-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-model="ruleFormData[`${item.field}`]"
                ></el-date-picker>
              </template>
              <template v-else-if="item.type === 'inputnumber'">
                <el-input-number
                  v-model="ruleFormData[`${item.field}`]"
                  :min="0"
                  controls-position="right"
                  style="width: 100%"
                ></el-input-number>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="DynamicForm">
  import { reactive, ref, watch, nextTick, onMounted } from "vue";
  import { FormInstance } from 'element-plus';
  
  const dialogData = reactive({
    dialogVisible: false,
    width: '',
    title: ''
  });
  const ruleFormRef = ref<FormInstance>();
  const ruleFormData = ref({});
  const menuResolve = ref([]);
  const props = defineProps({
    dialogData: {
      type: Object,
      require: false,
      default: () => {}
    },
    formData: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: () => '120px'
    },
    labelPosition: {
      type: undefined,
      default: () => 'left'
    },
    itemStyle: {
      type: Object,
      default: () => ({})
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  });
  const changeFun = defineEmits(['handleFormDialog']);

  watch(
    () => props.dialogData,
    (val: any) => {
      if (val.formVisible) {
        dialogData.title = val.title;
        dialogData.width = val.width;
        nextTick(() => {
          ruleFormData.value = JSON.parse(JSON.stringify(props.formData));
          ruleFormRef.value?.resetFields();
        });
      }
      dialogData.dialogVisible = val.formVisible;
    },
    { deep: true }
  );

  onMounted(() => {
    if (props.formData) {
      ruleFormData.value = props.formData;
    }
  });

  // 提交表单
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        const params = {
          type: 'submit',
          value: ruleFormData.value
        }
        changeFun('handleFormDialog', params);
        ruleFormRef.value?.resetFields();
      } else {
        console.log('error submit!', fields);
      }
    });
  };

  // 重置表单、关闭窗口
  const handleClose = () => {
    ruleFormRef.value?.resetFields();
    changeFun('handleFormDialog', {type: 'form'});
  };
</script>

<style scoped lang="scss">
</style>