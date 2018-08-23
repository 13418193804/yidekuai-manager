<template>
<section style="text-align:-webkit-auto;padding:20px;">
		<!--工具条-->
		<div class="step-panel backBody">
			<el-steps :space="200" :active="handleStatus()">
				<el-step title="用户下单" :description="step.steps[0]"></el-step>
				<el-step title="用户付款" :description="step.steps[1]"></el-step>
				<el-step title="平台发货" description=""></el-step>
				<el-step title="物流运送" description=""></el-step>
				<el-step title="确认收货" description=""></el-step>
			</el-steps>
		</div>
		<div class="step-panel backBody" >
			<h3>客户信息</h3>
			<div style="height:30px;">
				<span style="width:100px;">联系人：</span>
				<span>{{orderDetail.contactName}}</span>
			</div>
			<div style="height:30px;">
				<span style="width:100px;">联系电话：</span>
				<span>{{orderDetail.contactPhone}}</span>
			</div>
			<div style="height:30px;">
				<span style="width:100px;"> 地址：</span>
				<span>{{orderDetail.provinceName}}{{orderDetail.cityName}}{{orderDetail.countryName}}{{orderDetail.address}}</span>
			</div>

			<div>
				<span style="width:100px;">客户留言：</span>
				<span style="color:#999;">
          {{orderDetail.orderRemark}}
        </span>
			</div>

			<div style="height:30px;">
				<span style="width:100px;"> 物流信息：</span>
				<span>{{orderDetail.transportName}} {{orderDetail.transportMobile}}  
           <!-- 运费： {{orderDetail.transportPrice}} -->
            <span style="margin:0 20px;">单号: {{orderDetail.transportNo}}
				<span><el-button type="text" @click="changeModel1">查看详细物流信息</el-button></span>
           </span>
           </span>
          
			</div>

		</div>

			<div class="step-panel backBody">
			<h3>订单信息</h3>
			<div style="height:30px;">
				<span>订单号：</span>
				<span>{{orderDetail.orderId}}</span>
			</div>
			<div style="height:30px;">
				<span>订单状态：</span>
				<span>{{formatOrderStatus(orderDetail.orderStatus)}}</span>
			</div>
			<div style="height:30px;">
				<span>订单创建时间：</span>
				<span>{{orderDetail.createTime}}</span>
			</div>

		</div>

			<div class="step-panel backBody" v-if="orderDetail.detailList[0].refundStatus != 'WITHOUT_REFUND'">
			<h3>退货退款</h3>
      <div v-for="(item,index) in orderDetail.detailList[0].refundOrderList" :key="index">
			<div style="height:30px;">
				<span>类型：</span>
				<span> {{item.refundType=='REFUND' ?'仅退款':"退货退款"}}
        
        
          <el-button type="text" v-if="orderDetail.detailList[0].refundStatus === 'APPLY_REFUND'" @click="refundModel.changeModel(item)" >处理</el-button>
          <el-button type="text" v-if="orderDetail.detailList[0].refundStatus === 'WAIT_RECVGOODS'" @click="refundModel.recvgoods(item)">确认收货</el-button>
        
        </span>
        
			</div>
      	<div style="height:30px;">
				<span>状态：</span>
				<span> {{handlerefundStatus(orderDetail.detailList[0].refundStatus)}}</span>
			</div>
         
        
      
			<div style="height:30px;">
				<span>金额：</span>
				<span> {{item.refundAmount}}</span>
			</div>
				<div style="height:30px;">
				<span>申请原因：</span>
				<span> {{item.refundReason}}</span>
			</div>
  <div >
    <img v-for="(items,index) in item.refundImg ?item.refundImg.split(','):[]" :key="index" :src="items" @click="viewBigIcon(items)" style="width:220px;height:220px;margin:10px;    cursor: pointer;" alt="" >

  </div>
		<div style="height:30px;">
				<span>申请时间：</span>
				<span> {{item.createTime}}</span>
			</div>

  	<div style="height:30px;" v-if="orderDetail.detailList[0].refundStatus == 'FAIL_REFUND'">
				<span>拒绝原因：</span>
				<span> {{orderDetail.detailList[0].refundOrderList[0].merchantRemark}}</span>
			</div>
         	<div style="height:30px;" v-if="orderDetail.detailList[0].refundStatus == 'FAIL_REFUND'">
				<span>更新时间：</span>
				<span> {{orderDetail.detailList[0].refundOrderList[0].updateTime}}</span>
			</div>
         




<div v-if="orderDetail.detailList[0].refundStatus === 'SUCCEED_REFUND' || orderDetail.detailList[0].refundStatus === 'WAIT_RECVGOODS'">
    <h3>寄回物流信息</h3>
      	<div style="height:30px;">
				
				<span> {{item.transName}}   {{item.transNo}}  <span><el-button type="text" @click="changeModel1(item.transName  ,item.transNo)">查看详细物流信息</el-button></span></span>
			</div>
      <div>更新时间：{{item.updateTime}}</div>
</div>

		</div>

		</div>

<div class="step-panel backBody">
			<h3>发票信息</h3>
      	<div style="height:30px;">
				<span>类型：</span>
				<span>{{orderDetail.invoiceTitleType=='COMPANY'?'单位':'个人'}}</span>
			</div>
	<div style="height:30px;">
				<span>抬头:</span>
				<span>{{orderDetail.invoiceTitle}}</span>
			</div>
	<div style="height:30px;">
				<span>纳税人识别号:</span>
				<span>{{orderDetail.invoiceNo}}</span>
			</div>
		</div>


		<div class="step-panel backBody">
			<h3>商品信息</h3>
			<el-table border:data="orderDetail.detailList" highlight-current-row  style="width: 120%;">

				<el-table-column  align="center" header-align="center" prop="goodsIcon" label="商品图片" width="160">
					<template slot-scope="scope">
						<img :src="scope.row.goodsImg" style="width:80px;height:80px;">
					</template>

				</el-table-column>

				<el-table-column align="center" header-align="center" prop="goodsName" label="商品名字" width="180" sortable>
				</el-table-column>

				<el-table-column align="center" header-align="center" prop="goodsIcon" label="商品sku信息" width="160" >

					<template slot-scope="scope">
						<div v-html='formatSkuContent(scope.row.skuKeyValue)'> </div>
						
					</template>

				</el-table-column>

				<el-table-column align="center" header-align="center" prop="goodsNum" label="数量" width="100" sortable >
				</el-table-column>

				<el-table-column align="center" header-align="center" prop="goodsPrice" label="商品价格" width="120" sortable >
				</el-table-column>

				<el-table-column align="center" header-align="center"  label="小计" width="120" >
					<template slot-scope="scope">

						<div v-html='formatRowPrice(scope.row)'> </div>
					
						
					</template>

				</el-table-column>
		
			</el-table>

			<div style="margin-top:20px;"><span style="font-size:18px;color:black;">订单总金额：</span>
			<span style="font-size:18px;color:red;">{{orderDetail.orderTotalPrice}}元</span>
			</div>
      <div v-if="orderDetail.orderStatus=='ORDER_WAIT_SENDGOODS' "  style="padding:10px">
        <el-button plain="" @click="doSendGoods()" :disabled="orderDetail.detailList[0].refundStatus == 'APPLY_REFUND'">发货</el-button>
      </div>
		
</div>


<div class="backBody" v-if=" (orderDetail['orderStatus'] == 'ORDER_FINISH' ||orderDetail['orderStatus'] == 'ORDER_END_GOODS') &&commentObj.commentId">
  
<h3>
  评价
</h3>
<div style="    display: flex;
    align-items: center;">
 <el-rate
  v-model="commentObj.star"
  disabled
  text-color="#ff9900">
</el-rate>

 <span style="    background-color: #666;
    padding: 10px;font-size:13px;
    color: #fff;
    border-radius: 10px;" :style="commentObj.checkStatus =='SUCCEED_CHECK'?'background-color:#67c23a;':''">
    {{formatCheckStatus(commentObj.checkStatus)}}
  </span>
</div>


<div style="display:flex;padding:10px 0;">
  <div>评价内容： </div>
  <div>{{commentObj.commentContent}}</div>
</div>

<div v-if="commentObj.checkStatus =='UN_CHECK'">
        <el-button @click="checkComment()" >审核</el-button>
</div>
  </div>
	<el-dialog :visible.sync="commentModel" size="small" title="审核" :close-on-click-modal="false">
<h3>
  评价
</h3>
<div style="    display: flex;
    align-items: center;">
 <el-rate
  v-model="commentObj.star"
  disabled
  text-color="#ff9900">
</el-rate>
</div>
<div style="display:flex;padding:10px 0;">
  <div>评价内容： </div>
  <div>{{commentObj.commentContent}}</div>
</div>
			<span slot="footer" class="dialog-footer" >
				<el-button @click="doCheckSubmit('FAIL_REFUND')">不通过</el-button>
				<el-button type="primary" @click="doCheckSubmit('SUCCEED_CHECK')">通过</el-button>
			</span>
		</el-dialog>


		<el-dialog :visible.sync="transportModel.showSendDialog" size="small" title="发货地址">
			 <el-form label-width="120px">
				<el-form-item label="订单号" >
					<el-input v-model="rowObject.orderId" disabled></el-input>
				</el-form-item>

				<el-form-item label="联系人名称">
					<el-input v-model="rowObject.contactName" disabled></el-input>
				</el-form-item>

				<el-form-item label="收货地址">
					<el-input v-model="rowObject.address" disabled></el-input>
				</el-form-item>

				<el-form-item label="物流公司名">

					<el-select v-model="rowObject.transCode" filterable  @change="changeAdd" style="float:left;width:100%;">
						<el-option v-for="(item,index) in transportModel.options" :key="index" :value="index" :label="item.transportName"></el-option>
					</el-select>
				</el-form-item>



	<el-form-item label="快递公司电话">
					<el-input v-model="rowObject.transMobile" :disabled="true"></el-input>
				</el-form-item>

				<el-form-item label="快递订单号">
					<el-input v-model="rowObject.transportNo"></el-input>
				</el-form-item>

			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="transportModel.showSendDialog = false">取 消</el-button>
				<el-button type="primary" @click="updateSendGoodsStatus">确 定</el-button>
			</span>

		</el-dialog>



 <el-dialog :visible.sync="refundModel.model" width="1050px" center size="tiny"  title="处理退款" :close-on-click-modal="false" top="40px">
    
			 <el-form label-width="120px">
  

  			<el-form-item>

  <el-radio v-model="refundModel.refundType" label="accept">接受退款</el-radio>
  <el-radio v-model="refundModel.refundType" label="refuse">拒绝退款</el-radio>
				</el-form-item>

<div v-if="refundModel.item.refundType === 'GOODS_RETURN' && refundModel.refundType == 'accept'"> 
  			<el-form-item>

  <div v-if="!addressList || addressList.length==0">
  <el-button @click="$router.push('/refundaddress')">添加地址</el-button>
</div>
<div  style="max-height:200px;    overflow: auto;"  v-else>
    <div v-for="(n,index) in addressList" :key="index" style="display:flex;line-height: 20px;">
    <div>
      <el-radio v-model="addressId" :label="n.id">
          {{' '}}
      </el-radio>
    </div>
   <div>
 <div>
  {{n.contactName}}
  {{n.contactMobile}}
</div>

<div>
      {{n.provinceName}}
      {{n.cityName}}
      {{n.countryName}}
      {{n.address}}
</div>
    </div>
    </div>
</div>
				</el-form-item>

</div>




 

  			<el-form-item label="拒绝原因" v-if="refundModel.refundType == 'refuse'">
		 <el-input v-model="refundModel.remark" placeholder="拒绝原因" />		
				</el-form-item>
			 </el-form>

    
			<span slot="footer" class="dialog-footer">
				<el-button @click="refundModel.model = false">取 消</el-button>
				<el-button type="primary" @click="saveRefund">确 定</el-button>
			</span>
    </el-dialog>
   <el-dialog v-loading="transLoading" :visible.sync="transport.model" width="1050px" center size="tiny"  title="物流信息" :close-on-click-modal="false" top="40px">
  <div style="height:500px;overflow-y: scroll;">
    <div v-for="(n,index) in transport.transportList" :key="index" style="padding: 10px 0 10px 20px;">
<div style="padding:5px 0">
  {{n.context}}
</div>
              <div>
                {{n.time}}
                </div>
</div>
  </div>
    </el-dialog>


     <el-dialog  :visible.sync="viewBig" width="400px">
      <img :src="bigIcon" style="width:400px;height:400px;margin:-55px -20px -40px" >
    </el-dialog>

		<!-- </div> -->

	</section>
 </template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import * as Api from "../../api/api";
import moment from "moment";
import * as ApiOrder from "../../api/orderapi";
@Component
export default class AddGoods extends Vue {
  viewBigIcon(url) {
    this.bigIcon = url;
    this.viewBig = true;
  }
  bigIcon = "";
  viewBig = false;
  mounted() {
    if ((sessionStorage.orderId || "") != "") {
      this.orderId = sessionStorage.orderId;
    } else {
      this.$alert("找不到该订单");
      this.$router.go(-1);
      return;
    }
    this.loadOrderDetail();
    this.transportModel.queryTransport();
    // if(this.refundModel.item['refundType'] === 'GOODS_RETURN' && this.refundModel['refundType'] == 'accept'){
    this.queryAddress();
    // }
  }
  checkComment() {
    if (!Vue.prototype.dohavePermission("审核评价")) {
      this.$message("没有操作权限");
      return;
    }
    this.commentModel = !this.commentModel;
  }

  changeAdd(e) {
    this.rowObject["transMobile"] = this.transportModel.options[
      e
    ].transportMobile;
  }
  doCheckSubmit(checkStatus) {
    ApiOrder.checkComment(this.commentObj.commentId, checkStatus).then(res => {
      if (res.retCode) {
        console.log("审核");
        this.$message("保存成功");
        this.commentModel = !this.commentModel;
        this.loadOrderDetail();
      }
    });
  }
  commentObj = {
    commentId: "",
    star: 0,
    commentContent: ""
  };
  formatCheckStatus(checkStatus) {
    switch (checkStatus) {
      case "UN_CHECK":
        return "待审核";
      case "FAIL_REFUND":
        return "未通过";
      case "SUCCEED_CHECK":
        return "审核通过";
      default:
        return "";
    }
  }
  commentModel = false;
  queryComment(orderDetailId) {
    ApiOrder.queryComment(orderDetailId).then(res => {
      if (res.retCode) {
        console.log("查询评价");
        this.commentObj = res.data;
      }
    });
  }
  queryAddress() {
    ApiOrder.queryAddress().then(res => {
      console.log("地址", res.data);
      this.addressList = res.data;
      this.addressList.forEach((item, index) => {
        if (item.isdefault) {
          this.addressId = item.id;
        }
      });
    });
  }
  addressList = [];
  rowObject = {};
  transportModel = {
    showSendDialog: false,
    queryTransport: () => {
      ApiOrder.queryTransport().then(res => {
        this.transportModel.options = res.data;
      });
    },
    options: []
  };
  addressId = "";
  saveRefund() {
    if (this.refundModel.refundType == "accept") {
      let address = "";
      if (this.refundModel.item["refundType"] === "GOODS_RETURN") {
        if ((this.addressId || "") == "") {
          this.$alert("请选择一个地址");
          return;
        }
        address = this.addressId;
      }

      ApiOrder.acceptRefund(
        this.refundModel.item["refundId"],
        address,
        this.refundModel.remark
      ).then(res => {
        if (res.retCode) {
          console.log("同意退款");
          this.loadOrderDetail();
          this.refundModel.model = false;
        } else {
          this.$message(res.message);
        }
      });
    } else {
      ApiOrder.refuseRefund(
        this.refundModel.item["refundId"],
        this.refundModel.remark
      ).then(res => {
        if (res.retCode) {
          console.log("拒绝退款");
          this.loadOrderDetail();
          this.refundModel.model = false;
        }
      });
    }
  }
  refundModel = {
    recvgoods: item => {
      Api.doConfirm(this, "是否已收到该订单寄回的商品？确认收货？").then(
        res => {
          if (res) {
            ApiOrder.recvgoodsRefund(item["refundId"]).then(res => {
              if (res.retCode) {
                this.loadOrderDetail();
              } else {
                if(!res['islogin']){this.$alert(res["message"]);}
              }
            });
          }
        }
      );
    },
    model: false,
    refundType: "accept",
    item: {},
    remark: "",

    changeModel: item => {
      if (!Vue.prototype.dohavePermission("处理退款/退货地址")) {
        this.$message("没有操作权限");
        return;
      }
      this.refundModel.item = item;
      this.refundModel.model = true;
    }
  };
  transLoading = false;
  changeModel1(transCode, transNo) {
    this.transLoading = true;
    transCode || this.orderDetail["transportCode"];
    transNo || this.orderDetail["transportNo"];
    this.transport.model = !this.transport.model;
    ApiOrder.querytransport(transCode, transNo).then(res => {
      this.transLoading = false;

      if (res.retCode) {
        console.log("物流信息", res.data);
        this.transport.transportList = res.data;
      } else {
        this.$message("查询失败");
      }
    });
  }

  transport = {
    model: false,
    remark: "",

    transportList: []
  };
  step = {
    activeStep: 2,
    steps: ["步骤1", "步骤2", "步骤3", "步骤4"]
  };
  orderDetail = {};
  orderId = "";

  editFormRules = {
    name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
  };

  updateSendGoodsStatus() {
    if (
      (this.transportModel.options[this.rowObject["transCode"]][
        "transportId"
      ] || "") == ""
    ) {
      this.$alert("物流公司名字为空");
      return;
    }

    if ((this.rowObject["transportNo"] || "") == "") {
      this.$alert("订单号为空");
      return;
    }

    let transportName = this.transportModel.options.filter((item, index) => {
      return (
        this.transportModel.options[this.rowObject["transCode"]][
          "transportId"
        ] === item.transportId
      );
    });
    this.rowObject["transportName"] = transportName[0].transportName;

    Api.doConfirm(this, "是否确认发货？").then(res => {
      if (res) {
        ApiOrder.requestSendGoods(
          this.rowObject["orderId"],
          this.rowObject["transportName"],
          this.transportModel.options[this.rowObject["transCode"]][
            "transportId"
          ],
          this.rowObject["transportNo"],
          this.rowObject["transMobile"]
        ).then(ret => {
          if (ret.retCode == false) {
            this.$alert("发送货物操作错误，请检查数据！");
            return;
          }

          this.transportModel.showSendDialog = false;
          this.loadOrderDetail();

          this.$message("商品发送成功");
        });
      }
    });
  }

  doSendGoods(row) {
    if (!Vue.prototype.dohavePermission("发货")) {
      this.$message("没有操作权限");
      return;
    }
    this.loadOrderDetail();
    this.rowObject = Object.assign({}, this.orderDetail);
    this.transportModel.showSendDialog = true;
  }
  handlerefundStatus(status) {
    switch (status) {
      case "APPLY_REFUND": // 卖家 点击 同意 、 拒绝
        return "申请退款中";
      case "WAIT_GOODS_BACK": //
        return "等待商品寄回";
      case "WAIT_RECVGOODS":
        return "等待卖家确认收货";
      case "WAIT_REFUND":
        return "卖家退款中";
      case "SUCCEED_REFUND":
        return "退款完成";
      case "FAIL_REFUND":
        return "卖家拒绝退款";
      default:
        return status;
    }
  }
  handleStatus() {
    switch (this.orderDetail["orderStatus"]) {
      case "ORDER_WAIT_SENDGOODS":
        return 2;
      case "ORDER_WAIT_RECVGOODS":
        return 3;
      case "ORDER_CANCEL_PAY":
        return 0;
      case "ORDER_WAIT_PAY":
        return 1;
      case "ORDER_WAIT_REVIEW":
        return 5;
      case "ORDER_FINISH":
        return 5;
      case "ORDER_END_GOODS":
        return 5;
      default:
        return 1;
    }
  }

  formatRowPrice(data) {
    console.log("row data");

    return "<font color='red'>" + data.goodsNum * data.goodsPrice + "元</font>";
  }

  formatSkuContent(data) {
    data = JSON.parse(data);
    let content = "";
    for (let i in data) {
      let o = data[i];
      content = content + o["key"] + ":" + o["value"] + "<br/>";
    }
    return content;
  }

  loadOrderDetail() {
    ApiOrder.requestOrderDetail(this.orderId).then(res => {
      if (res["retCode"]) {
        console.log("商品详情");
        this.orderDetail = res["data"];
        if (
          this.orderDetail["orderStatus"] == "ORDER_FINISH" ||
          this.orderDetail["orderStatus"] == "ORDER_END_GOODS"
        ) {
          this.queryComment(this.orderDetail["detailList"][0].id);
          //       case "ORDER_FINISH":
        }
        //   return 5;
        // case "ORDER_END_GOODS":
      }
    });
  }

  doViewDetail() {
    this.$alert("点击了详情");
  }

  formatOrderStatus(orderStatus) {
    if (orderStatus == "ORDER_WAIT_SENDGOODS") {
      return "等待发货";
    }
    if (orderStatus == "ORDER_WAIT_PAY") {
      return "等待支付";
    }

    if (orderStatus == "ORDER_WAIT_PAY") {
      return "等待支付";
    }

    if (orderStatus == "ORDER_WAIT_RECVGOODS") {
      return "等待收货";
    }

    if (orderStatus == "ORDER_CONFIRM_RECVGOODS") {
      return "已经确认收货";
    }

    if (orderStatus == "ORDER_END_GOODS") {
      return "订单已评价";
    }

    if (orderStatus == "ORDER_CANCEL_PAY") {
      return "订单已经被取消";
    }
    if (orderStatus == "ORDER_WAIT_REVIEW") {
      return "订单待评价";
    }
    if (orderStatus == "ORDER_FINISH") {
      return "订单已完成";
    }
    return "其他";
  }

  doListProduct() {}
}
</script>

<style  scoped>
.backBody {
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
}
</style>