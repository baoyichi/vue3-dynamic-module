## 简介
基于vue3 + vite + Element Plus 的公共组件库，适用于 PC 端表格、表单组件，支持自定义表格、表单，表格的增删改查、数据分页等操作。功能会持续不断的更新......

### 功能点
以下是当前已经支持和正在开发中的功能。
#### 表格

| 功能       | 状态 |
|----------| ---- |
| 自定义表头    | ✅   |
| 自定义列宽    | ✅   |
| 自定义固定列   | 🚧   |
| 斑马纹      | ✅   |
| 多选       | 🚧   |
| 全选       | 🚧   |
| 单列排序     | 🚧   |
| 多列排序     | 🚧   |
| 自定义筛选    | 🚧   |
| 固定头      | 🚧   |
| 分页       | ✅   |
| 加载中      | 🚧   |
| 空数据      | ✅   |
| 增删改查     | 🚧   |
| 编辑单元格    | 🚧   |
| 编辑行      | 🚧   |
| 文件导入     | 🚧   |
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
  import DynamicModule from 'dynamic-module';
  // 如果这里引入报错的话，需要手动声明一个模块
  // declare module 'dynamic-module'

  const app = createApp(App);
  app.use(DynamicModule);
  app.mount('#app');
```

```vue

<template>
  <dynamic-table :table-items="tableItems" :pagination="pagination" @data-change="tableChange" />
</template>
<script setup>
  import DynamicTable from "./dynamic-table.vue";
  import {reactive} from "vue";

  const tableItems = reactive({
    // 表头
    header: [
      {
        label: '名称',
        value: 'name',
        width: '120',
        // 是否显示
        show: true,
        // 当内容过长被隐藏时显示 tooltip
        showOverflow: true,
        // 列是否固定在左侧或者右侧：true/'left'/'right'，true默认为左侧
        showFixed: true
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
    ]
  })
  const pagination = reactive({
    currentPage: 1,
    pageSize: 10
  });

  /**
   * 表格的操作
   * @param params：传递的对象，包含 type 操作类型和 val 传递的参数
   */
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
```
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
