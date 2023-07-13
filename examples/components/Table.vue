<template>
  <DynamicSearch :search-item="searchItem" @handle-search="handleSearch"></DynamicSearch>
  <DynamicTable :table-items="tableItems" @handle-table-control="handleTableControl"></DynamicTable>
  <DialogTips :dialog-data="dialogData" @handle-tips-dialog="handleTipsDialog"></DialogTips>
  <DynamicForm
    :dialog-data="dialogData"
    :form-data="formData"
    :form-items="formItems"
    @handle-form-dialog="handleFormDialog"
  ></DynamicForm>
</template>

<script setup lang="ts">
  import DynamicTable from "../../packages/table/dynamic-table.vue";
  import {onMounted, reactive} from "vue";
  import { getJson } from "@/api/bacground-img";
  import {ElMessage} from "element-plus";
  import DialogTips from "../../packages/tips/dialog-tips.vue";
  import DynamicForm from "../../packages/form/dynamic-form.vue";
  import DynamicSearch from "../../packages/search/dynamic-search.vue";
  // import type { BasicTableProps } from "./types/basicTableProps";

  const searchItem = reactive([
    {
      label: '名称',
      value: '',
      isInput: true
    },
    {
      label: '类型',
      value: '',
      isSelect: true,
      options: []
    },
    {
      label: '',
      value: '',
      options: [
        {
          label: '重置',
          type: ''
        },
        {
          label: '查询',
          type: 'primary'
        }
      ],
      isBt: true
    }
  ]);
  const tableItems = reactive({
    loading: true,
    columns: [
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
    tableSetting: [
      {
        code: '3',
        btType: 'iconTextBt',
        type: 'primary',
        label: '新建',
        value: 'add',
        icon: 'Plus'
      },
      {
        code: '4',
        btType: 'iconTextBt',
        type: 'danger',
        label: '删除',
        value: 'del',
        icon: 'delete'
      },
      {
        code: '5',
        btType: 'iconTextBt',
        type: 'danger',
        label: '批量删除',
        value: 'del',
        icon: 'delete'
      },
      {
        code: '6',
        btType: 'iconBt',
        type: 'primary',
        label: '刷新',
        value: 'refresh',
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
    dataSource: [],
    tableRowHandlers: [
      {
        type: 'download',
        label: '下载原图'
      },
      {
        type: 'edit',
        label: '编辑'
      }
    ],
    showSelection: true,
    pagination: {
      total: 0,
      currentPage: 1,
      pageSize: 10
    }
  });
  // 模态框
  const dialogData = reactive({
    tipsVisible: false,
    formVisible: false,
    title: '',
    width: '30%',
    info: ''
  });
  // 密码校验
  const checkPass = (rule: any, value: any, callback: any) => {
    if (value === '') {
      if (dialogData.title === '新增') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };
  // 表单label项
  const formItems = reactive([
    {
      field: 'name',
      label: '名称',
      placeholder: '请输入名称',
      type: 'input',
      isRequired: true,
      rule: [
        {
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }
      ],
      showPassword: false
    },
    {
      field: 'password',
      label: '密码',
      placeholder: '请输入密码',
      type: 'input',
      isRequired: true,
      rule: [
        {
          required: true,
          trigger: 'blur',
          validator: checkPass
        }
      ],
      showPassword: true,
      disable: false
    },
    {
      field: 'category',
      label: '类型',
      placeholder: '请选择类型',
      type: 'select',
      options: [
        {
          label: '风景',
          value: 'view'
        },
        {
          label: '动物',
          value: 'animal'
        }
      ],
      isRequired: false,
      rule: [],
      showPassword: false
    },
    {
      field: 'region',
      label: '地区',
      placeholder: '请选择地区',
      type: 'treeselect',
      options: [
        {
          value: '1',
          label: '四川省',
          children: [
            {
              value: '1-1',
              label: '成都市',
              children: [
                {
                  value: '1-1-1',
                  label: '天府新区',
                },
              ],
            },
          ],
        }
      ],
      isRequired: true,
      rule: [
        {
          required: true,
          message: '请选择地区',
          trigger: 'change'
        }
      ],
      showPassword: false
    },
    {
      field: 'number',
      label: '数量',
      placeholder: '请输入数量',
      type: 'inputnumber',
      isRequired: false,
      rule: [],
      showPassword: false,
      disable: false
    },
    {
      field: 'date',
      label: '日期',
      placeholder: '',
      type: 'datepicker',
      isRequired: false,
      rule: [],
      showPassword: false
    }
  ]);
  // 表单初始值
  const formData = reactive({
    name: '',
    password: '',
    category: '',
    region: '',
    number: 0,
    date: '',
    id: ''
  });
  
  onMounted(() => {
    tableList();
  })
  
  const tableList = async () => {
    const { data: {data, Total} } = await getJson();
    data.map((item) => {
      if (item.url) {
        item.url = 'https://www.bing.com' + item.url
      }
    })
    tableItems.dataSource = data;
    tableItems.pagination.total = Total;
    tableItems.loading = false;
  }
  
  const handleTableControl = (params) => {
    const { type, value } = params;
    switch (type) {
      case 'refresh':
        tableList();
        break;
      case 'add':
        dialogData.title = '新建';
        formData.name = '';
        formData.password = '';
        formData.category = '';
        formData.region = '';
        formData.number = 0;
        formData.date = '';
        formData.id = '';
        dialogData.formVisible = true;
        break;
      case '编辑':
        dialogData.title = '编辑';
        formData.name = value.title;
        formData.password = value.password;
        formData.category = value.category;
        formData.region = value.region;
        formData.number = value.top;
        formData.date = value.date;
        formData.id = value.id;
        dialogData.formVisible = true;
        break;
      case 'pagination':
        tableItems.pagination.currentPage = value;
        break;
      case 'del':
        if (value.length === 0) {
          ElMessage.warning('请选择至少一条数据！')
        } else {
          dialogData.title = '删除';
          dialogData.info = '确定将选择的用户删除?';
          dialogData.tipsVisible = true;
        }
        break;
      default:
        break;
    }
  }
  
  const handleTipsDialog = (type: string) => {
    if (type === 'tips') {
      dialogData.tipsVisible = false;
    } else if (type === 'del') {
      dialogData.tipsVisible = false;
      tableList();
    }
  }
  
  const handleFormDialog = (params) => {
    const { type } = params;
    if (type === 'form') {
      dialogData.formVisible = false;
    } else if (type === 'submit') {
      dialogData.formVisible = false;
    }
  }
  
  const handleSearch = (params) => {
    const { type, value } = params;
  }
</script>

<style scoped lang="scss">
</style>
