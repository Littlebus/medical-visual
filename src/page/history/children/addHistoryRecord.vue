 <template>
  <div class="history_detail_page">
    <head-top head-title="上传体检记录" go-back="true"></head-top>

    <form class="history_list_ul">
      <li class="history_list_li" v-for="(item, index) in inputKeys" :key="item">
        <section class="history_item_right">
          <header class="history_item_right_header">
            <section class="history_header">
              <label>
                <span class="ellipsis">{{index}}</span>
              </label>
            </section>
            <template v-if="item.type=='select'">
              <select class="history_status" style="direction:rtl" v-bind:name="item.name">
                <option v-for="option in item.options" :key="option">{{option}}</option>
              </select>
            </template>
            <input class="history_status" v-bind:value="item.value" v-bind:type="text" v-else>
          </header>
        </section>
      </li>
    </form>
    <!-- <transition name="loading">
            <loading v-if="showLoading"></loading>
    </transition>-->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import headTop from "src/components/header/head";
import { getImgPath } from "src/components/common/mixin";
import {
  getbodyrecord,
  makepepredict,
  getpepredict
} from "src/service/getData";
import loading from "src/components/common/loading";
import BScroll from "better-scroll";
import { imgBaseUrl } from "src/config/env";

export default {
  data() {
    return {
      inputKeys: {
        出生日期: {
          value: "1991/01/01"
        },
        性别: {
          type: "select",
          options: ["男", "女"]
        },
        "身高（cm）": {
          value: "175"
        },
        "体重（Kg）": {
          value: "60"
        },
        BMI: {
          value: "19.6"
        },
        "血压(mmHg)": {
          value: "133/93"
        },
        是否吸烟: {
          type: "select",
          options: ["吸烟", "不吸烟", "曾经吸烟"]
        },
        早发心血管病家族史: {
          value: "175"
        },
        内科病史: {
          value: "无"
        },
        胸廓: {
          value: "未见异常"
        },
        呼吸音: {
          value: "未见异常"
        },
        心率: {
          value: "72"
        },
        甲状腺: {
          value: "未见异常"
        },
        乳腺: {
          value: "未见异常"
        },
        "眼底(右)": {
          value: "未见异常"
        },
        "眼底(左)": {
          value: "未见异常"
        },
        鼻: {
          value: "未见异常"
        },
        中性粒细胞百分比: {
          value: "64.8"
        },
        中性粒细胞计数: {
          value: "4.5"
        },
        亚硝酸盐: {
          value: "阴性"
        },
        低密度脂蛋白: {
          value: "2.5"
        },
        单核细胞百分比: {
          value: "4.8"
        },
        单核细胞计数: {
          value: "0.4"
        },
        嗜碱性粒细胞百分比: {
          value: "1.1"
        },
        嗜碱性粒细胞计数: {
          value: "0.1"
        },
        嗜酸性粒细胞百分比: {
          value: "2.9"
        },
        嗜酸性粒细胞计数: {
          value: "0.2"
        },
        尿糖: {
          value: "阴性"
        },
        尿素: {
          value: "3.18"
        },
        尿胆原: {
          value: "阴性"
        },
        尿酸: {
          value: "294"
        },
        平均RBC血红蛋白含量: {
          value: "32.2"
        },
        平均RBC血红蛋白浓度: {
          value: "330"
        },
        平均红细胞体积: {
          value: "97.6"
        },
        平均血小板体积: {
          value: "8.9"
        },
        总胆固醇: {
          value: "4.27"
        },
        比重: {
          value: "1.023"
        },
        淋巴细胞百分比: {
          value: "17.2"
        },
        淋巴细胞计数: {
          value: "1.4"
        },
        甘油三酯: {
          value: "2"
        },
        甲胎蛋白: {
          value: "1.58"
        },
        癌胚抗原: {
          value: "2.8"
        },
        白细胞: {
          value: "阴性"
        },
        白细胞计数: {
          value: "7.9"
        },
        "糖类抗原19-9": {
          value: "<0.60"
        },
        红细胞体积分布宽度: {
          value: "13"
        },
        红细胞计数: {
          value: "4.91"
        },
        胆红素: {
          value: "阴性"
        },
        葡萄糖: {
          value: "4.71"
        },
        蛋白质: {
          value: "阴性"
        },
        血小板体积分布宽度: {
          value: "16.4"
        },
        血小板比容: {
          value: "0.23"
        },
        血小板计数: {
          value: "255"
        },
        血红蛋白浓度: {
          value: "158"
        },
        血细胞比容: {
          value: "48"
        },
        谷丙转氨酶: {
          value: "10"
        },
        谷氨酰转肽酶: {
          value: "13"
        },
        谷草转氨酶: {
          value: "13"
        },
        透明度: {
          value: "澄清"
        },
        酮体: {
          value: "阴性"
        },
        酸碱度: {
          value: "5.5"
        },
        隐血或红细胞: {
          value: "阴性"
        },
        颜色: {
          type: "select",
          options: ["黄色", "浅黄色", "微黄色"]
        },
        高密度脂蛋白: {
          value: "1.1"
        }
      },
      recordDetail: null,
      showLoading: true, //显示加载动画
      imgBaseUrl,
      predictRes: null
    };
  },
  mounted() {
    // this.initData();
    // makepepredict(this.historyRecordDetail);
    // this.predict();
  },
  mixins: [getImgPath],
  components: {
    headTop,
    loading
  },
  computed: {
    ...mapState(["historyRecordDetail", "userInfo"]),
    // 处理过的recordDetail
    recordDetail_: function() {
      let obj = this.recordDetail;
      let ret = {};
      for (let key in obj) {
        if (key === "id" || key === "_time") continue;
        ret[key] = obj[key];
      }
      return ret;
    }
  },
  methods: {
    async initData() {
      if (this.userInfo && this.userInfo.id) {
        let obj = await getbodyrecord(this.historyRecordDetail);
        console.log(this.historyRecordDetail);
        if (obj.success) {
          // if(this.recordDetail)
          //     this.recordDetail = {...obj.data, ...this.recordDetail};
          // else
          this.recordDetail = obj.data;
        }
        this.showLoading = false;
      }
    },
    async predict() {
      if (this.userInfo && this.userInfo.id) {
        let obj = await getpepredict(this.historyRecordDetail);
        console.log(obj);
        if (obj.success) {
          let res = eval(
            `(${obj.data})`
              .replace(/\[|]/g, "")
              .replace("LDLC", "低密度脂蛋白")
              .replace("GYSZ", "甘油三酯")
              .replace("NS", "尿酸")
          );
          for (let key in res) {
            if (res[key] == 1) res[key] = "偏高";
            else res[key] = "正常";
          }
          this.predictRes = res;
          // if(this.recordDetail)
          //     this.recordDetail = {...this.recordDetail, ...res};
          // else
          //     this.recordDetail = res;
        } else {
          if (obj.data != "400") setTimeout(this.predict, 500);
        }
      }
    }
  },
  watch: {
    userInfo: function(value) {
      if (value && value.id) {
        this.initData();
      }
    }
  }
};
</script>
  
<style lang="scss" scoped>
@import "src/style/mixin";

.input_form {
  input {
    float: left;
  }
}
.history_detail_page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f1f1f1;
  z-index: 202;
  padding-top: 1.95rem;
  p,
  span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
}
.scroll_container {
  // position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 1.95rem;
}
.scroll_insert {
  padding-bottom: 3rem;
}
.history_titel {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.7rem;
  background-color: #fff;
  margin-bottom: 0.5rem;
  img {
    border: 0.05rem solid $blue;
    border-radius: 50%;
    @include wh(3rem, 3rem);
  }
  p:nth-of-type(1) {
    @include sc(0.9rem, #333);
    font-weight: bold;
    margin-top: 0.4rem;
  }
  p:nth-of-type(2) {
    @include sc(0.55rem, #999);
    width: 10rem;
    margin-top: 0.3rem;
    text-align: center;
  }
  .order_again {
    @include sc(0.6rem, $blue);
    margin-top: 0.5rem;
    border: 0.025rem solid $blue;
    padding: 0.15rem 0.4rem;
    border-radius: 0.1rem;
  }
}
.history_list_ul {
  .history_list_li {
    background-color: #fff;
    display: flex;
    // margin-bottom: 0.5rem;
    padding: 0.6rem 0.6rem 0;
    .history_item_right {
      flex: 5;
      .history_item_right_header {
        border-bottom: 0.025rem solid #f5f5f5;
        padding-bottom: 0.3rem;
        @include fj;
        .history_header {
          label {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            @include sc(0.75rem, #333);
            line-height: 1.1rem;
            margin-left: 1rem;
          }
        }
        .history_status {
          background-color: #fff;
          direction: rtl;
          width: 6em;
          margin-right: 1rem;
          text-align: right;
          line-height: 1.1rem;
          @include sc(0.75rem, #333);
        }
      }
    }
  }
}
.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.7s;
}
.loading-enter,
.loading-leave-active {
  opacity: 0;
}
.home_today_container {
  padding-top: 0.3rem;
  border-bottom: 0.025rem solid $bc;
  height: 10.6rem;
  .home_today {
    background-color: #fff;
    @include wh(100%, auto);
    padding-bottom: 0.6rem;
  }
  .fl_back {
    @include wh(100%, 100%);
  }
}
</style>
