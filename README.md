## 简介
基于vue3 + vite + Element Plus 的公共组件库，适用于 PC 端表格、表单组件，支持自定义表格、表单，表格的增删改查、数据分页等操作。功能会持续不断的更新......

### 功能点
以下是当前已经支持和正在开发中的功能。
#### 表格

| 功能       | 状态 |
|----------| ---- |
| 自定义表头    | ✅   |
| 列设置      | ✅   |
| 自定义列宽    | ✅   |
| 斑马纹      | ✅   |
| 多选       | ✅   |
| 排序       | ✅   |
| 表头筛选     | ✅   |
| 固定表头     | ✅   |
| 表格内包含图片  | ✅   |
| 分页       | ✅   |
| 加载中      | ✅   |
| 空数据      | ✅   |
| 增删改查     | 🚧   |
| 编辑单元格    | 🚧   |
| 文件导入操作   | 🚧   |
| 导出 EXCEL | 🚧   |
| 国际化      | 🚧   |

#### 表单
| 功能    | 状态 |
|-------| ---- |
| 自定义表单 | 🚧   |

## 安装
版本：[vue](https://www.npmjs.com/package/vue) 3.x，依赖库：[element-plus](https://www.npmjs.com/package/element-plus)

```shell
npm i vue3-dynamic-module
```
### 示例
```javascript
  import DynamicModule from 'vue3-dynamic-module';
  import 'vue3-dynamic-module/lib/style.css';
  // 如果这里引入报错的话，需要手动声明一个模块
  // declare module 'vue3-dynamic-module'

  const app = createApp(App);
  app.use(DynamicModule);
  app.mount('#app');
```

```vue

<template>
  <dynamic-table 
    :table-items="tableItems" 
    :pagination="pagination"
    @handle-table-control="handleTableControl"
    @data-change="tableChange" />
</template>
<script setup>
  import { reactive } from "vue";

  const tableItems = reactive({
    // 表格操作，自定义操作项
    tableControl: [
      {
        // key值，必传
        code: '1',
        /**
         * 按钮类型
         * basic ===> 基础，带背景的按钮
         * secondary  ===>  次要按钮，浅色背景
         * threeLevel ===>  三级按钮，灰色背景，字体带颜色
         * text ===>  文字按钮
         * iconTextBt ===>  带icon和背景的按钮
         * iconBt ===>  带icon的按钮
         */
        btType: 'iconTextBt',
        type: 'primary',
        label: '新建',
        // 带tooltip的按钮提示背景色
        effect: 'dark',
        // tooltip提示方向
        placement: 'top',
        // 自定义icon，存储在assets/icons下,格式为png的图片
        icon: 'add'
      }
    ],
    // 表头
    header: [
      {
        label: '名称',
        value: 'title',
        width: '120',
        // 是否显示
        show: true,
        // 列设置时，选项是否可选,true为不可选
        isChecked: false,
        // 当内容过长被隐藏时显示 tooltip
        showOverflow: true,
        // 列是否固定在左侧或者右侧：true/'left'/'right'，true默认为左侧
        showFixed: true,
        // 是否显示为图片
        showImage: true,
        // 是否排序
        sortable: true,
        // 是否筛选
        filters: [
          { text: '', value: '' }
        ]
      }
    ],
    // 表格数据，属性值需要跟header里的value保持一致
    tableData: [],
    // 如果需要增加表格行操作，需要在header新增一个value为control的对象
    operations: [
      {
        type: 'edit',
        label: '编辑'
      }
    ],
    // 显示多选 true，默认为不显示
    multiple: false
  })
  const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0
  });

  /**
   * 整个表的操作，通过type判断是新增、删除或其他自定义操作
   * @param type
   */
  const handleTableControl = (type: string) => {
    console.log(type);
  }

  /**
   * 表格的操作
   * @param params：传递的对象，包含 type 操作类型和 val 传递的参数
   */
  const tableChange = (params: {val: number}) => {
    const { type } = params;
    if (type === 'pagination') {
      pagination.currentPage = params.val;
    } else if (type === 'edit') {
      //   编辑的接口
    } else {
      //   ...
    }
  }
</script>
```
## 项目源码
🚀[vue3-dynamic-module](https://github.com/baoyichi/vue3-dynamic-module)

## 运行项目
安装依赖
```shell
  npm run install
```

启动本地调试
（💡调试的文件在examples目录下）
```shell
  npm run dev
```
编译打包，生成编译后的目录：lib
```shell
  npm run build
```
## License

[MIT](LICENSE) © 2023-present, Leo Baoyichi
