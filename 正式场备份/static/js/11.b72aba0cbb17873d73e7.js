webpackJsonp([11],{lwTu:function(t,e){},x9BB:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("TToO"),i=n("7+uW"),o=n("c+8m"),l=n.n(o),u=n("RXoh"),a=n("2oAx"),s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.alldrug=0,e}return r.b(e,t),e.prototype.allDrug=function(){var t=this;u.g().then(function(e){e.retCode?(console.log(e.data),t.alldrug=e.data):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.mounted=function(){this.allDrug()},e=r.a([l()({props:{},components:{filterdrug:a.a}})],e)}(i.default),c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{},[e("h3",[this._v("药品库管理\n          ")]),this._v(" "),e("div",{staticStyle:{}},[this._v("\n药品数量统计："+this._s(this.alldrug)+"              \n            ")])]),this._v(" "),e("filterdrug")],1)},staticRenderFns:[]};var d=n("VU/8")(s,c,!1,function(t){n("lwTu")},"data-v-46ce9a8b",null);e.default=d.exports}});
//# sourceMappingURL=11.b72aba0cbb17873d73e7.js.map