<template>
    <div class="goods">
      <van-nav-bar :title="shopInfo.shopName"
                   left-arrow @click-left="onClickLeft"
      >
      <!--  <template #right>
          <van-icon name="share-o" size="18" />
        </template>-->
      </van-nav-bar>
      <van-tabs v-model="tabactive" sticky @click="onRefresh">
          <van-tab v-for="(comm,index) in comms" :title="comm.name" :key="index">
            </van-tab>
    </van-tabs>
        
            <van-pull-refresh v-model="refreshing" @refresh="onClickTab">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="dealData"
            >
                <van-row  class="goods-row">
                    <van-col span="12" v-for="(gds,index) in list" :key="index">
                    <div class="item" @click="goToGdsInfo(gds.id,gds.shopId)">
                        <div class="pro_img"><img :src="gds.thumb"/></div>
                        <div class="pro_title">{{gds.title}}</div>
                        <div class="pro_txt">{{gds.desc}}</div>
                        <div class="pro_price"><b><span>￥</span>{{gds.price | yuanNoSymbol}}</b></div>
                    </div>
                    </van-col>
                </van-row>
            </van-list>
            </van-pull-refresh>
        
          
        <back-to-top></back-to-top>
      <Footer></Footer>
    </div>
</template>

<script>
  import Footer from '@/components/Footer.vue';
  import BackToTop from '@/components/BackToTop.vue';
  import api from '@/api/api.js'
  import {doPost} from "../../api/commonApi";
  import {setLocalStorage} from '@/requet/local-storage.js';
  import {commTypes} from '@/utils/constants.js';
  import * as constants from '@/utils/constants'

  import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
    NavBar,
    Sticky,
    Tab, Tabs,
    Image as VanImage,
    List,PullRefresh,

} from 'vant';

export default {
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
      [NavBar.name]:NavBar,
      [Sticky.name]:Sticky,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs,
      [VanImage.name]:VanImage,
      [List.name]:List,
      [PullRefresh.name]:PullRefresh,
      [Footer.name]:Footer,
      [BackToTop.name]:BackToTop,
  },

  data() {
    return {
        shopId:"",
        staffId:"",
        shareId:"",
        comms:commTypes,
        loading: false,
        finished: false,
        refreshing: false,
        requersting:false,//是否正在请求服务，避免多次点击，多次请求服务，返回多个重复数据

        list: [
            {
                title: '',
                price: 0,
                desc:"",
                url: '',
                thumb: ''
            }
        ],

        loading: false,
        finished: false,
        count:0,
        page:0,
        pageSize:8,

        tabactive:'0',
        shopInfo:{
            shopName:"我的云店",
        }


    };
  },

    created(){
        let shopId =localStorage.getItem(constants.userKey.shopId);
        let staffId =localStorage.getItem(constants.userKey.staffId);
        let shareId =localStorage.getItem(constants.userKey.ms);
        this.shopId = shopId;
        this.staffId = staffId;
        this.shareId = shareId;
        if(!shopId){
            Toast("未找到店铺id，请通过分享的二维码或链接访问下单~");
            return;
        }
        if(!staffId){
            Toast("未找到店家id，请通过分享的二维码或链接访问下单~");
            return;
        }
        if(!shareId){
            Toast("未找到分享人id，请通过分享的二维码或链接访问下单~");
            return;
        }
        this.findShopInfo();
    },
  methods: {

      goToGdsInfo(gdsId,shopId) {
          this.$router.push({path:'/goods',query:{gdsId:gdsId,shopId:shopId}});
      },
      findShopInfo(){
          if(!this.shopId) {
              Toast("shopId不能为空");
              return;
          }
          if(!this.staffId) {
              Toast("staffId不能为空");
              return;
          }
          doPost(api.findShopInfo,{shopId:this.shopId,staffId:this.staffId})
              .then(res => {
                    if(res && res.shopInfo){
                        this.shopInfo = res.shopInfo;
                        setLocalStorage("shopInfo", JSON.stringify(res.shopInfo));
                        this.onRefresh();
                    }
              });
      },
      findShopComm(){
          if (this.requersting){
              //如果正在请求接口中，则不重复请求
              return;
          }
          this.requersting = true;

          let commType = commTypes[this.tabactive].code;
          doPost(api.findShopComm,{
              commType:commType || '00',
              shopId:this.shopId,
              page:this.page,
              pageSize:10,
          }).then(res => {
              if (this.refreshing) {
                  this.list = [];
                  this.refreshing = false;
              }
              if(res && res.rspCode == '0'){
                    this.count = res.count;
                    let rspData = res.rspData;

                    let datas = rspData.map(item =>{
                        return {
                            title:item.commName,
                            price:item.salePrice,
                            desc:item.commDesc,
                            id:item.id,
                            shopId:item.shopId,
                            thumb:item.mainPic,
                        }
                    });
                    if (this.page  === 1) {
                        this.list = datas
                    } else {
                        this.list=this.list.concat(datas);
                    }
                    this.loading = false;
                    this.requersting = false;

                    if (this.list.length >= this.count || res.datas.length==0) {
                        this.finished = true;
                    }
                    this.page++;

              }
          });
      },
      onLoad() {
          this.findShopComm();
      },
      onClickTab(){
          this.list = [];
          this.onRefresh();

      },
      onRefresh() {

          // 清空列表数据
          this.finished = false;
          // 重新加载数据
          // 将 loading 设置为 true，表示处于加载状态
          this.loading = false;
          this.page=1;
          this.onLoad();
      },
      dealData() {

      },
      onClickLeft() {
          history.back();
      },
      onClickRight() {
          Toast('请在微信中打开，点击右上角进行分享~');
      },
    formatPrice() {
      return '¥' + (this.goods.price / 100).toFixed(2);
    },

    onClickCart() {
      this.$router.push('cart');
    },

    sorry() {
      Toast('暂无后续逻辑~');
    }
  }
};
</script>

<style scoped lang="less" >



  .van-list{
      padding:10px;
      .goods-row{
          column-count: 2;
          width: 100%;
          column-gap: 10px;
          .van-col{
              break-inside: avoid;
              width:100%;
              background: #fff;
              margin-bottom:10px;
              column-gap: 0;
              border-radius: 6px;
              overflow: hidden;
              .item{
                  .pro_img{
                      width:100%;
                      img{
                          width:100%;
                      }
                  }
                  .pro_title{
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      font-size:14px;
                      line-height:1.5;
                      padding:5px 5px 0;
                  }
                  .pro_txt{
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      color:@gray;
                      font-size:12px;
                      line-height:1.5;
                      padding:0 5px;
                  }
                  .pro_price{
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      font-size:12px;
                      padding:0 5px 5px;
                      line-height:1.5;
                      color:@gray;
                      b{
                          color:@red;
                          font-size:14px;
                          samll{
                              font-size:8px;
                              font-weight:normal;
                          }
                      }
                  }
              }
          }
      }
  }

  .van-list { min-height: calc(100vh - 100px); overflow: hidden; }

</style>
