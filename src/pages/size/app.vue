<template>
  <div
    class="self-size"
  >
    <Test />
    <Menu />
    <h1 class="txt-center ft40 ls1 fwb mb60 tt-up lh50">
      Size & Fit
    </h1>
    <div class="self-size-content">
      <p class="c333 ft14 ffl self-size-intro fw300 lh21 mb60">
        {{ introduce }}
      </p>
      <h2
        class="ft30 ffb fwb c333 ls2 lh38 pchide"
        style="justify-content: center;"
      >
        HOW TO MEASURE
      </h2>
      <figure class="self-size-measure mb100">
        <div>
          <img
            v-if="isMobile"
            src="../../assets/size_pc.png"
            alt=""
            width="295"
            height="370"
            style="padding: 0 24px;"
          >
          <img
            v-else
            src="../../assets/size_pc.png"
            alt=""
            width="364"
            height="408"
          >
        </div>
        <div>
          <h2
            class="ft30 ffb fwb c333 ls2 lh38 mhide"
          >
            HOW TO MEASURE
          </h2>
          <ul>
            <li v-for="rmd in recommends">
              <h3 class="ft18 ffb mb12 self-size-point ls1">
                {{ rmd.title }}
              </h3>
              <p class="ft14 c333 fw300 ffl mb40 lh28">
                {{ rmd.content }}
              </p>
            </li>
          </ul>
        </div>
      </figure>
      <h2 class="txt-center ft30 c333 ffb fwb lh38 ls2 mb40">
        SIZE GUIDE (IN)
      </h2>
      <div class="mb100">
        <div class="self-size-tabs mb16">
          <a
            class="ffl c333 ls1 lh23 fw300 ft18 mr40 self-size-tab"
            :class="{'self-size-tab self-size-tab_active': tabIndex === 0}"
            @click="tabIndex = 0"
          >STANDARD SIZE</a>
          <a
            class="ffl c333 ls1 lh23 fw300 ft18 self-size-tab"
            :class="{'self-size-tab_active': tabIndex === 1}"
            @click="tabIndex = 1"
          >PLUS SIZE</a>
        </div>
        <div class="self-size-tables">
          <div v-if="tabIndex === 0">
            <Table
              :columns="STANDARD_SIZE_COLUMNS"
              :data-source="STANDARD_SIZE_DATA"
              class="mb40"
            />
            <p class="mb16 c333 ffl ft14 lh18 fw300">
              Cup Size Guide
            </p>
            <Table
              :columns="STANDARD_CUP_SIZE_COLUMNS"
              :data-source="STANDARD_CUP_SIZE_DATA"
            />
          </div>
          <div v-if="tabIndex === 1">
            <Table
              :columns="PLUS_SIZE_COLUMNS"
              :data-source="PLUS_SIZE_DATA"
              class="mb40"
            />
            <p class="mb16 c333 ffl ft14 lh18 fw300">
              Cup Size Guide
            </p>
            <Table
              :columns="PLUS_CUP_SIZE_COLUMNS"
              :data-source="PLUS_CUP_SIZE_DATA"
            />
          </div>
        </div>
      </div>
      <h2 class="txt-center ft30 mb72">
        SIZE & FIT FAQS
      </h2>
      <div class="self-size-faqs mb100">
        <Tabs
          v-model:activeKeys="activeKeys"
          :is-vertical="isVertical"
        >
          <TabPane
            key="1"
            tab="1. How do I find the right size?"
          >
            <p class="ffl c333 lh28 fw300 ft14">
              Use our <a>Size Guide</a> tool to find the best size based on your measurements.
            </p>
            <p class="ffl c333 lh28 fw300 ft14 mb22">
              For more specific sizing information,please feel free to reach out to our 
              <a
                href="/pages/contact-us"
                class="c333"
              ><strong>Customer Care Team</strong></a> and we'd be happy to help you find the perfect fit!
            </p>
            <img
              v-if="!isMobile"
              src="../../assets/pdp_pc.png"
              alt=""
              width="480"
            >
            <img
              v-if="isMobile"
              src="../../assets/pdp_m.png"
              alt=""
              width="120"
            >
          </TabPane>
          <TabPane
            key="2"
            tab="2. Can I purchase different sizes for tops and bottoms？"
          >
            <p class="ffl c333 lh28 fw300 ft14">
              Yes, you can view separates that you can mix and match <a
                href="https://www.cupshe.com/collections/swim-separates"
                class="c333"
              >here</a>. Although we do also have plenty of cute swimsuits that are sold in sets, we're working on developing more mix and match silhouettes, so stay tuned!
            </p>
          </TabPane>
          <TabPane
            key="3"
            tab="3. Is everything true to size?"
          >
            <p class="ffl c333 lh28 fw300 ft14">
              At Cupshe, we take pride in our dedication to making sure that all of our pieces are true to size. The best way to choose the right size for you is to take your measurements according to our 'How to Measure' guide above.
            </p>
          </TabPane>
        </Tabs>
      </div>
      <h2 class="txt-center ft30 mb60">
        NEED MORE HELP? LET US KNOW!
      </h2>
      <div class="self-size-contact">
        <a
          class="pointer mr200"
          href="mailto:service@cupshe.com"
        >
          <div class="self-size-contact_icon">
            <MyIcon
              type="icon_email"
              class="ft40"
            />
          </div>

          <p class="ft18 ffb fwb c333 lh23 mb8">
            E-MAIL
          </p>
          <p class="ft14 ffl fw300 c333 lh18">
            We will get back to you within 24hrs
          </p>
        </a>
        <a
          class="pointer"
          onclick="openLiveChart();"
        >
          <div class="self-size-contact_icon">
            <MyIcon
              type="icon_chat"
              class="ft40"
            />
          </div>
          <p class="ft18 ffb fwb c333 lh23 mb8">
            CHAT
          </p>
          <p class="ft14 ffl fw300 c333 lh18">
            24/7 Support
          </p>
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';
import Table, { Column } from './components/table.vue';
import { Tabs, TabPane } from '../../components/tabs';
import { createFromIconfontCN } from '../../components/icon';
const Test = defineAsyncComponent(() => import('importShopifyUI/Test'));
const Menu = defineAsyncComponent(() => import('importShopifyUI/Menu'));
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2489304_8wiabwvtlgf.js', // 在 iconfont.cn 上生成
});

const PLUS_CUP_SIZE_COLUMNS: Column [] = [{
  title: '0X',
  key: '0X'
}, {
  title: '1X',
  key: '1X'
}, {
  title: '2X',
  key: '2X'
}, {
  title: '3X',
  key: '3X'
}, {
  title: '4X',
  key: '4X'
}];

const PLUS_SIZE_COLUMNS = [{
  title: '',
  key: 'X'
}, 
...PLUS_CUP_SIZE_COLUMNS
];

const PLUS_SIZE_DATA = [{
  'X': 'US',
  '0X': '16/18',
  '1X': '18/20',
  '2X': '20/22',
  '3X': '22/24',
  '4X': '24/26'
},{
  'X': 'BUST',
  '0X': '41-43.25',
  '1X': '43.25-45.5',
  '2X': '45.5-48',
  '3X': '48-52',
  '4X': '52-56'
},{
  'X': 'WAIST',
  '0X': '33.75-36.75',
  '1X': '36.75-38.5',
  '2X': '38.5-41.25',
  '3X': '41.25-44.75',
  '4X': '44.75-48.75'
}, {
  'X': 'HIP',
  '0X': '44.5-45.25',
  '1X': '45.25-47.5',
  '2X': '47.5-50.25',
  '3X': '50.25-54.75',
  '4X': '54.75-58.75'
}];

const PLUS_CUP_SIZE_DATA = [{
  '0X': '36D',
  '1X': '36DD',
  '2X': '38DD',
  '3X': '40DDD',
  '4X': '44DD'
},{
  '0X': '36DD',
  '1X': '36DDD',
  '2X': '40D',
  '3X': '42DD',
  '4X': '44DDD'
},{
  '0X': '38C',
  '1X': '38D',
  '2X': '40DD',
  '3X': '42DDD',
  '4X': '46D'
}, {
  '0X': '38D',
  '1X': '38DD',
  '2X': '42C',
  '3X': '44D',
  '4X': '46DD'
},{
  '0X': '40B',
  '1X': '40C',
  '2X': '42D',
  '3X': '44DD',
  '4X': '46DDD'
},{
  '0X': '/',
  '1X': '40D',
  '2X': '/',
  '3X': '/',
  '4X': '/'
}];

const STANDARD_CUP_SIZE_COLUMNS:Column [] = [{
  title: 'XS',
  key: 'XS'
}, {
  title: 'S',
  key: 'S'
}, {
  title: 'M',
  key: 'M'
}, {
  title: 'L',
  key: 'L'
}, {
  title: 'XL',
  key: 'XL'
}, {
  title: 'XXL',
  key: 'XXL'
}];

const STANDARD_SIZE_COLUMNS:Column [] = [{
  title: '',
  key: ''
}, ...STANDARD_CUP_SIZE_COLUMNS];

const STANDARD_SIZE_DATA = [{
  '': 'US',
  'XS': '2/4',
  'S': '4/6',
  'M': '6/8',
  'L': '8/10',
  'XL': '10/12',
  'XXL': '12/14',
},{
  '': 'BUST',
  'XS': '32.5-34.5',
  'S': '34.5-36.5',
  'M': '36.5-38.5',
  'L': '38.5-40.5',
  'XL': '40.5-42.5',
  'XXL': '42.5-44.5',
},{
  '': 'WAIST',
  'XS': '24.5-26.5',
  'S': '26.5-28.5',
  'M': '28.5-30.5',
  'L': '30.5-32.5',
  'XL': '32.5-34.5',
  'XXL': '34.5-36.5',
},{
  '': 'HIP',
  'XS': '34.5-36.5',
  'S': '36.5-38.5',
  'M': '38.5-39.5',
  'L': '39.5-41.5',
  'XL': '41.5-43.5',
  'XXL': '43.5-45.5',
}];

const STANDARD_CUP_SIZE_DATA = [{
  'XS': '30A',
  'S': '32C',
  'M': '34C',
  'L': '36C',
  'XL': '38D',
  'XXL': '38DD',
},{
  'XS': '30B',
  'S': '32D',
  'M': '34D',
  'L': '36D',
  'XL': '40B',
  'XXL': '40C',
},{
  'XS': '32A',
  'S': '34A',
  'M': '36A',
  'L': '38A',
  'XL': '40C',
  'XXL': '40D',
},{
  'XS': '32B',
  'S': '34B',
  'M': '36B',
  'L': '38B',
  'XL': '40D',
  'XXL': '40DD',
}, {
  'XS': '/',
  'S': '/',
  'M': '/',
  'L': '38C',
  'XL': '/',
  'XXL': '/',
}];


export default defineComponent({
  components: {
    Table,
    Tabs,
    TabPane,
    MyIcon,
    Test,
    Menu
  },
  data () {
    return {
      PLUS_SIZE_COLUMNS,
      PLUS_CUP_SIZE_COLUMNS,
      PLUS_CUP_SIZE_DATA,
      PLUS_SIZE_DATA,
      STANDARD_CUP_SIZE_COLUMNS,
      STANDARD_SIZE_COLUMNS,
      STANDARD_SIZE_DATA,
      STANDARD_CUP_SIZE_DATA,
      tabIndex: 0,
      activeKeys: [],
      isVertical: true,
      introduce: 'We strive to create pieces that fit like a glove and have created this guide to help you find the right size. Please note that this guide provides general sizing information, which can vary depending on style and silhouette.',
      recommends: [{
        title: 'BUST',
        content: 'Use a tape measure to measure around the fullest part of your bust. For a more accurate measurement, please wear an unlined / unpaded bra when measuring.'
      }, {
        title: 'UNDER BUST',
        content: 'Measure directly under your bust and straight around your back.'
      }, {
        title: 'WAIST',
        content: 'Your waist is the narrowest part of your torso. Wrap your tape measure around this area, which is usually on or close to your navel. Make sure the tape is snug but not digging into your skin.'
      }, {
        title: 'HIP',
        content: 'Find the widest part of your hips. Generally, it’s 8 inches below your waist.'
      }]
    };
  },
  computed: {
    isMobile () {
      return window.innerWidth <= 640;
    }
  }
});
</script>

<style lang="less" scoped>
h1,
h2,
h3 {
  margin: 0;
}

p {
  margin: 0;
}

ul {
  margin: 0;
}

li {
  list-style: none;
}
// sadfasdfasdf
.self-size {
  /deep/ .shopify-tabs-label {
    cursor: pointer;

    span {
      white-space: normal !important;
    }
  }

  /deep/ .shopify-tabs-tabpane {
    cursor: default;
  }

  h1 {
    flex: 1;
    padding: 25px;
    border-bottom: 1px solid #f2f2f2;
  }

  &-point {
    position: relative;
    display: flex;
    align-items: center;
  }

  &-point::before {
    width: 4px;
    height: 4px;
    margin-right: 8px;
    border-radius: 50%;
    background: #333;
    content: '';
  }

  &-measure {
    display: flex;
    align-items: center;
    margin-top: 40px;
    margin-right: 0;
    margin-left: 0;

    img {
      display: inline-block;
      margin: 0 auto;
    }

    h2 {
      margin-bottom: 40px;
      margin-left: 70px;
    }

    ul {
      padding: 0;
      margin-left: 70px;
    }
  }

  &-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  &-tabs {
    display: flex;
    flex-direction: row;
  }

  &-tab {
    position: relative;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }

  &-tab_active {
    font-weight: bold;
    font-family: Muli-Bold, Muli, sans-serif;
  }

  &-tab_active::after {
    width: 100%;
    height: 4px;
    margin-top: 8px;
    background: #333;
    content: '';
  }

  &-faqs {
    a {
      text-decoration: underline;
    }

    /deep/ .shopify-tabs-label {
      background: #f7f7f7;
    }
  }

  &-contact {
    display: flex;
    justify-content: center;

    a {
      text-decoration: none;
      color: #000;
    }

    p {
      text-align: center;
    }
  }

  &-contact_icon {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    margin-bottom: 16px;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
  }

  v-deep .shopify-tabs-label {
    background: #f7f7f7;

    span {
      font-weight: bold;
      font-size: 14px;
      font-family: Muli-Bold, Muli, sans-serif;
      line-height: 18px;
      white-space: normal !important;
      color: #333;
    }
  }

  v-deep .shopify-tabs-tabpane {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.pchide {
  display: none;
}

.mhide {
  display: flex;
}

@import '../../style/common.less';

@media screen and (max-width: 820px) {
  .pchide {
    display: flex;
  }

  .mhide {
    display: none;
  }

  .self-size-content {
    padding: 0 16px;

    .self-size-intro {
      margin-bottom: 40px;
      line-height: 28px;
    }

    h2 {
      font-size: 18px;
      line-height: 23px;
      letter-spacing: 1px;
    }

    h3 {
      margin-bottom: 24px;
      letter-spacing: 0;
    }
  }

  .self-size-faqs p {
    line-height: 28px;
  }

  .self-size h1 {
    padding: 28px 0 22px 0;
    font-size: 24px;
  }

  .mb40,
  .mb60,
  .mb72 {
    margin-bottom: 24px;
  }

  .mr200 {
    margin-right: 0;
  }

  v-deep .self-size-table .ft14 {
    font-size: 12px;
  }

  v-deep .thead,
  v-deep .tbody {
    span {
      min-height: 36px;
      line-height: 36px;
    }
  }

  .ft30 {
    font-size: 18px;
  }

  .self-size-tab_active::after {
    height: 3px;
    margin-top: 4px;
  }

  .self-size-tables .mb40 {
    margin-bottom: 15px;
  }

  .self-size-measure {
    flex-direction: column;
    margin-top: 24px;

    img {
      display: block;
      margin: 0 auto;
    }

    ul {
      padding: 0 12px;
      margin: 0;
      margin-top: 24px;
    }

    .mb12 {
      margin-bottom: 6px;
    }
  }

  .self-size-contact_icon {
    width: 80px;
    height: 80px;
  }

  .self-size-contact {
    a {
      flex: 1;
    }
  }

  .mb16 {
    margin-bottom: 12px;
  }

  .mb100 {
    margin-bottom: 40px;
  }

  .ft18 {
    font-size: 14px;
  }

  .lh23 {
    line-height: 18px;
  }

  .lh38 {
    font-size: 23px;
  }

  .lh50 {
    line-height: 30px;
  }

  .mr133 {
    margin-right: 19px;
  }

  .ml442 {
    margin-left: 0;
    text-align: center;
  }
}

</style>