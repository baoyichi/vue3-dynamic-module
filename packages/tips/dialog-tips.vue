<template>
  <el-dialog
    v-model="dialog.dialogVisible"
    :title="dialog.title"
    :width="dialog.width"
    :before-close="handleClose"
  >
    <span>{{ dialog.info }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitForm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="DialogTips">
  import { reactive, watch } from "vue";
  
  const dialog = reactive({
    dialogVisible: false,
    title: '',
    width: '',
    info: ''
  })
  const props = defineProps({
    dialogInfo: {
      type: Object,
      require: true,
      default: () => {
        return {};
      }
    }
  });
  const changeFun = defineEmits(['handleTipsDialog'])

  watch(
    () => props.dialogInfo,
    (val: {tipsVisible: boolean}) => {
      if (val) {
        dataRender();
      }
      dialog.dialogVisible = val.tipsVisible
    },
    { deep: true }
  )

  const dataRender = () => {
    const { title, width, info } = props.dialogInfo;
    dialog.title = title;
    dialog.width = width;
    dialog.info = info;
  }
  
  const handleClose = () => {
    changeFun('handleTipsDialog', 'tips');
  }
  
  const submitForm = () => {
    changeFun('handleTipsDialog', 'del');
  }
</script>

<style scoped>
</style>
