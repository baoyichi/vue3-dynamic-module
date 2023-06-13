import { defineComponent as z, reactive as m, watch as P, onMounted as S, resolveComponent as d, openBlock as s, createElementBlock as u, createVNode as g, withCtx as w, Fragment as b, renderList as k, createBlock as O, createElementVNode as _, toDisplayString as j, createCommentVNode as B } from "vue";
const D = { class: "container" }, E = { class: "pagination" }, F = /* @__PURE__ */ z({
  __name: "dynamic-table",
  props: {
    tableItems: {
      type: Object,
      require: !0,
      default: () => ({})
    },
    pagination: {
      type: Object,
      require: !0,
      default: () => ({})
    }
  },
  emits: ["paginationChange"],
  setup(i, { emit: r }) {
    const p = i, l = m({
      datas: [],
      headers: [
        {
          label: "名称",
          value: "name",
          width: "120",
          show: !0,
          showOverflow: !0,
          showFixed: !0
        }
      ]
    }), t = m({
      currentPage: 1,
      pageSize: 10,
      total: 0
    });
    P(
      () => p.tableItems,
      (n) => {
        n && h();
      },
      { deep: !0 }
    ), S(() => {
      h();
    });
    const f = (n) => {
      const { currentPage: a, pageSize: o } = t;
      return n + 1 + (a - 1) * o;
    }, x = (n) => {
      r("paginationChange", n);
    }, h = () => {
      const { header: n, tableData: a } = p.tableItems;
      l.headers = n, l.datas = a;
      const { currentPage: o, pageSize: c } = p.pagination;
      t.currentPage = o, t.pageSize = c, t.total = a.length;
    };
    return (n, a) => {
      const o = d("el-table-column"), c = d("el-table"), v = d("el-pagination");
      return s(), u("div", D, [
        g(c, {
          data: l.datas,
          stripe: "",
          style: { width: "100%" }
        }, {
          default: w(() => [
            g(o, {
              type: "index",
              width: "70",
              label: "序号",
              fixed: "",
              index: f
            }),
            (s(!0), u(b, null, k(l.headers, (e, y) => (s(), u(b, { key: y }, [
              e.show ? (s(), O(o, {
                key: 0,
                prop: e.value,
                label: e.label,
                width: e.width,
                "show-overflow-tooltip": e.showOverflow,
                fixed: e.showFixed
              }, {
                default: w((C) => [
                  _("span", null, j(C.row[`${e.value}`]), 1)
                ]),
                _: 2
              }, 1032, ["prop", "label", "width", "show-overflow-tooltip", "fixed"])) : B("", !0)
            ], 64))), 128))
          ]),
          _: 1
        }, 8, ["data"]),
        _("div", E, [
          g(v, {
            "current-page": t.currentPage,
            "onUpdate:currentPage": a[0] || (a[0] = (e) => t.currentPage = e),
            "page-size": t.pageSize,
            "onUpdate:pageSize": a[1] || (a[1] = (e) => t.pageSize = e),
            small: !0,
            background: !0,
            layout: "total, prev, pager, next, jumper",
            total: t.total,
            onCurrentChange: x
          }, null, 8, ["current-page", "page-size", "total"])
        ])
      ]);
    };
  }
}), I = [F], N = (i) => {
  I.forEach((r) => {
    i.component(r.__name, r);
  });
}, q = {
  install: N
};
export {
  F as DynamicTable,
  q as default
};
