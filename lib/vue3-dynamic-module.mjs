import { defineComponent as N, reactive as f, watch as V, onMounted as j, resolveComponent as i, openBlock as o, createElementBlock as s, createVNode as c, withCtx as m, Fragment as _, renderList as y, createBlock as B, createTextVNode as D, toDisplayString as v, createCommentVNode as E, createElementVNode as F } from "vue";
const I = { class: "container" }, q = { key: 1 }, M = { class: "pagination" }, T = /* @__PURE__ */ N({
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
  emits: ["dataChange"],
  setup(d, { emit: p }) {
    const u = d, r = f({
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
      ],
      operations: []
    }), n = f({
      currentPage: 1,
      pageSize: 10,
      total: 0
    });
    V(
      () => u.tableItems,
      (a) => {
        a && b();
      },
      { deep: !0 }
    ), j(() => {
      b();
    });
    const x = (a) => {
      const { currentPage: t, pageSize: l } = n;
      return a + 1 + (t - 1) * l;
    }, C = (a) => {
      p("dataChange", {
        type: "pagination",
        value: a
      });
    }, b = () => {
      const { header: a, tableData: t, tableOperations: l } = u.tableItems;
      r.headers = a, r.datas = t, r.operations = l;
      const { currentPage: g, pageSize: h } = u.pagination;
      n.currentPage = g, n.pageSize = h, n.total = t.length;
    }, k = (a) => {
      p("dataChange", {
        type: a,
        value: ""
      });
    };
    return (a, t) => {
      const l = i("el-table-column"), g = i("el-button"), h = i("el-table"), z = i("el-pagination");
      return o(), s("div", I, [
        c(h, {
          data: r.datas,
          stripe: "",
          style: { width: "100%" }
        }, {
          default: m(() => [
            c(l, {
              type: "index",
              width: "70",
              label: "序号",
              fixed: "",
              index: x
            }),
            (o(!0), s(_, null, y(r.headers, (e, P) => (o(), s(_, { key: P }, [
              e.show ? (o(), B(l, {
                key: 0,
                prop: e.value,
                label: e.label,
                width: e.width,
                "show-overflow-tooltip": e.showOverflow,
                fixed: e.showFixed
              }, {
                default: m((S) => [
                  e.value === "control" ? (o(!0), s(_, { key: 0 }, y(r.operations, (w, O) => (o(), s("span", { key: O }, [
                    c(g, {
                      link: "",
                      type: "primary",
                      size: "small",
                      onClick: (L) => k(w.type)
                    }, {
                      default: m(() => [
                        D(v(w.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])
                  ]))), 128)) : (o(), s("span", q, v(S.row[`${e.value}`]), 1))
                ]),
                _: 2
              }, 1032, ["prop", "label", "width", "show-overflow-tooltip", "fixed"])) : E("", !0)
            ], 64))), 128))
          ]),
          _: 1
        }, 8, ["data"]),
        F("div", M, [
          c(z, {
            "current-page": n.currentPage,
            "onUpdate:currentPage": t[0] || (t[0] = (e) => n.currentPage = e),
            "page-size": n.pageSize,
            "onUpdate:pageSize": t[1] || (t[1] = (e) => n.pageSize = e),
            small: !0,
            background: !0,
            layout: "total, prev, pager, next, jumper",
            total: n.total,
            onCurrentChange: C
          }, null, 8, ["current-page", "page-size", "total"])
        ])
      ]);
    };
  }
}), U = [T], $ = (d) => {
  U.forEach((p) => {
    d.component(p.__name, p);
  });
}, A = {
  install: $
};
export {
  T as DynamicTable,
  A as default
};
