export type fixedType = boolean | 'left' | 'right';
export interface filterOptions {
  text: string;
  value: string;
}
export interface basicColumn {
  label: string;
  value: string;
  // 列宽
  width: string;
  // 列显示/隐藏
  show: boolean;
  // 当设置了“列设置”项时，该属性控制是否可选
  isChecked: boolean;
  // 文本超过宽度是否显示。。。
  showOverflow: boolean;
  // 固定列
  showFixed: fixedType;
  // 显示为图片
  showImage: boolean;
  // 排序
  sortable: boolean;
  // 筛选项
  filters: filterOptions[]
}
export type buttonTypes = 'basic' | 'secondary' | 'threeLevel' | 'text' | 'iconTextBt' | 'iconBt';
export interface tableSetting {
  // v-for的key值
  code: number | string;
  // 按钮类型
  btType: buttonTypes;
  type: string;
  label: string;
  // 自定义icon，图片名称
  icon?: string;
}
export interface rows {
  type: string;
  label: string;
}
export interface paginationProps {
  total?: number;
  currentPage?: number;
  pageSize?: number;
  pageSizeOptions?: string[];
}
export interface TableRowSelection<T = any>{
  /**
   * 在所选行更改时执行的回调
   * @type Function
   * @param selectedRowKeys
   * @param selectedRows
   */
  onChange?: (selectedRowKeys: string[] | number[], selectedRows: T[]) => any;
  
  /**
   * 当选中或取消选中时执行的回调
   * @type Function
   * @param record
   * @param selected
   * @param selectedRows
   * @param nativeEvent
   */
  onSelect?: (record: T, selected: boolean, selectedRows: Object[], nativeEvent: Event) => any;
  
  /**
   * 当选中或取消所有时执行的回调
   * @type Function
   * @param selected
   * @param selectedRows
   * @param changeRows
   */
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => any;
}
export interface BasicTableProps<T = any> {
  // 接口请求对象
  // api?: (...arg: any) => Promise<any>;
  // 列配置
  columns: basicColumn[];
  // 数据源
  dataSource: [];
  // 显示表格设置
  showTableSetting?: boolean;
  tableSetting: tableSetting[];
  // 表格行操作
  tableRowHandlers: rows[];
  showSelection?: boolean;
  // 分页配置
  pagination?: paginationProps | boolean;
  /**
   * 行选择配置
   * @type object
   */
  rowSelection?: TableRowSelection;
  /**
   * 当分页、筛选器或排序器更改时执行的回调
   * @param pagination
   * @param filters
   * @param sorter
   * @param currentDataSource
   */
  onChange?:(pagination: any, filters: any, sorter: any, extra: any) => void;
}
