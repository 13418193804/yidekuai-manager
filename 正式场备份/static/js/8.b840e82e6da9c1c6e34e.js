webpackJsonp([8],{"80lB":function(t,e){},x9BB:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("TToO"),l=n("7+uW"),i=n("c+8m"),o=n.n(i),a=n("RXoh"),s=n("2oAx"),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.alldrug=0,e}return r.b(e,t),e.prototype.allDrug=function(){var t=this;a.l().then(function(e){e.retCode?(console.log(e.data),t.alldrug=e.data):(e.islogin||t.$alert(e.message),console.error("数据查询错误"))})},e.prototype.mounted=function(){this.allDrug()},e=r.a([o()({props:{},components:{filterdrug:s.a}})],e)}(l.default),c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{},[e("h3",[this._v("药品库管理\n          ")]),this._v(" "),e("div",{staticStyle:{}},[this._v("\n药品数量统计："+this._s(this.alldrug)+"              \n            ")])]),this._v(" "),e("filterdrug",{on:{allDrug:this.allDrug}})],1)},staticRenderFns:[]};var d=n("VU/8")(u,c,!1,function(t){n("80lB")},"data-v-85da5a1e",null);e.default=d.exports}});
//# sourceMappingURL=8.b840e82e6da9c1c6e34e.js.map