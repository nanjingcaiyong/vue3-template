<template>
  <div class="press_content">
    <img
      :src="isMobile ? bannermob : bannerpc"
      alt="press_banner"
      srcset=""
    >
    <p class="press_first_title">
      Latest Press
    </p>
    <div class="latest_list">
      <a
        v-for="(item, index) in latestList"
        :key="index"
        :href="item.link"
        class="latest_list_item"
      >
        <img
          :src="item.logo"
          alt=""
          srcset=""
          :class="item.className"
        >
        <p>{{ item.desc }}</p>
      </a>
    </div>
    <div class="more_press">
      <p class="press_second_title">
        more press
      </p>
      <div class="more_press_list">
        <a
          v-for="(item, index) in morePressList"
          :key="index"
          class="more_press_list_item"
          :class="isMobile && index > 2 && showLoadMoreBtn ? 'mobHid': ''"
          :href="item.link"
        >
          <img
            :src="isMobile ? item.mobLogo : item.logo"
            alt=""
            srcset=""
          >
          <p>{{ item.desc }}</p>
        </a>
      </div>
      <div
        v-if="isMobile && showLoadMoreBtn"
        class="load_more"
        @click="showAllList"
      >
        LOAD MORE
      </div>
    </div>
    <div class="press_mail">
      <p>For any press inquiries, please contact <a href="mailto:pr@cupshe.com">pr@cupshe.com</a></p>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, ref, defineComponent } from 'vue';
import {latestList, morePressList} from './pressList';
export default defineComponent({
  setup () {
    const bannerpc = ref(
      'https://cdn.shopifycdn.net/s/files/1/0221/7603/8976/files/banner_2x_6ed222f0-bebd-4637-8860-fd9c2e38d14e.png?v=1625466608'
    );
    const bannermob = ref(
      'https://cdn.shopifycdn.net/s/files/1/0221/7603/8976/files/Banner_2x_1.png?v=1625467568'
    );
    function showAllList () {
      list.showLoadMoreBtn = false;
    }
    const list = reactive({
      showLoadMoreBtn: true,
      latestList,
      morePressList
    });
    return {
      bannerpc,
      bannermob,
      ...toRefs(list),
      showAllList
    };
  },
  computed: {
    isMobile (): boolean {
      return window.innerWidth <= 750;
    },
  },
});
</script>
<style lang="less" scoped>
@import "../../style/common.less";

.press_content img {
  width: 100%;
}

@media screen and (max-width: 750px) {
  .press_mail {
    padding-top: 40px;
    margin: 0 16px -20px 16px;
    border-top: 1px solid #f7f7f7;
    font-weight: 300;
    font-size: 12px;
    font-family: Muli-Light, Muli, sans-serif !important;
    line-height: 15px;
    text-align: center;
    color: #333;

    p {
      margin: 0;
    }

    a {
      font-family: Muli-Bold, Muli, sans-serif !important;
      text-decoration: underline;
      color: #333;
    }
  }

  .load_more {
    width: 216px;
    height: 44px;
    margin: 0 auto 40px auto;
    border: 1px solid #333;
    font-family: Muli-Bold, Muli, sans-serif !important;
    line-height: 44px;
    text-align: center;
    cursor: pointer;
  }

  .press_content {
    .press_first_title {
      margin: 40px auto 60px auto;
      font-weight: bold;
      font-size: 18px;
      font-family: Muli-Bold, Muli, sans-serif !important;
      line-height: 24px;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #000;
    }

    .latest_list {
      display: flex;
      flex-direction: column;

      .latest_list_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;

        p {
          margin-right: 32px;
          margin-bottom: 60px;
          margin-left: 32px;
          font-weight: 300;
          font-size: 14px;
          font-family: Muli-Light, Muli, sans-serif !important;
          line-height: 24px;
          text-align: center;
          color: #333;
        }

        .class01 {
          width: 154px;
          height: auto;
          margin-bottom: 24px;
        }

        .class02 {
          width: 145px;
          height: auto;
          margin-bottom: 24px;
        }

        .class03 {
          width: 217px;
          height: auto;
          margin-bottom: 28px;
        }

        .class04 {
          width: 129px;
          height: auto;
          margin-bottom: 23px;
        }

        .class05 {
          width: 145px;
          height: auto;
          margin-bottom: 23px;
        }

        .class06 {
          width: 189px;
          height: auto;
          margin-bottom: 24px;
        }

        .class07 {
          width: 79px;
          height: auto;
          margin-bottom: 23px;
        }

        .class08 {
          width: 183px;
          height: auto;
          margin-bottom: 25px;
        }

        .class09 {
          width: 217px;
          height: auto;
          margin-bottom: 24px;
        }
      }
    }

    .more_press {
      border-top: 8px solid #f5f5f5;

      .press_second_title {
        margin-top: 40px;
        margin-bottom: 24px;
        font-weight: bold;
        font-size: 18px;
        font-family: Muli-Bold, Muli, sans-serif !important;
        line-height: 24px;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #000;
      }

      .more_press_list {
        display: flex;
        flex-direction: column;

        .mobHid {
          display: none !important;
        }

        .more_press_list_item {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin: 0 16px 48px 16px;
          text-decoration: none;

          img {
            width: 80px;
            margin-right: 24px;
          }

          p {
            margin: 0;
            font-weight: 300;
            font-size: 12px;
            font-family: Muli-Light, Muli, sans-serif !important;
            line-height: 18px;
            color: #333;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 750px) {
  .press_mail {
    margin: 80px auto -40px auto;

    p {
      font-weight: 300;
      font-size: 18px;
      font-family: Muli-Light, Muli, sans-serif !important;
      line-height: 23px;
      text-align: center;
      color: #000;

      a {
        font-family: Muli-Bold, Muli, sans-serif !important;
        text-decoration: underline;
        color: #000;
      }
    }
  }

  .press_content {
    .press_first_title {
      margin-top: 100px;
      margin-bottom: 25px;
      font-weight: bold;
      font-size: 30px;
      font-family: Muli-Bold, Muli, sans-serif !important;
      line-height: 38px;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #000;
    }

    .latest_list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 1390px;
      margin: 0 auto;

      .latest_list_item {
        display: block;
        width: 430px;
        height: 383px;
        margin: 15px;
        border: 1px solid #f2f2f2;
        text-align: center;
        text-decoration: none;
        background: #fff;
        cursor: pointer;

        &:hover {
          box-shadow: 0 2px 16px 0 #eee;
        }

        img {
          width: 50%;
        }

        p {
          margin: 0 50px;
          font-weight: 300;
          font-size: 16px;
          font-family: Muli-Light, Muli, sans-serif !important;
          line-height: 24px;
          color: #333;
        }

        .class01 {
          width: 192px;
          height: auto;
          margin: 78px auto 55px auto;
        }

        .class02 {
          width: 180px;
          height: auto;
          margin: 63px auto 50px auto;
        }

        .class03 {
          width: 362px;
          height: auto;
          margin: 87px auto 73px auto;
        }

        .class04 {
          width: 200px;
          height: auto;
          margin: 73px auto 90px auto;
        }

        .class05 {
          width: 180px;
          height: auto;
          margin: 50px auto 55px auto;
        }

        .class06 {
          width: 260px;
          height: auto;
          margin: 84px auto 89px auto;
        }

        .class07 {
          width: 108px;
          height: auto;
          margin: 50px auto 28px auto;
        }

        .class08 {
          width: 260px;
          height: auto;
          margin: 82px auto 58px auto;
        }

        .class09 {
          width: 308px;
          height: auto;
          margin: 50px auto 38px auto;
        }
      }
    }

    .more_press {
      display: grid;
      margin-top: 65px;
      background: #fafafa;

      .press_second_title {
        margin-top: 80px;
        margin-bottom: 40px;
        font-weight: bold;
        font-size: 30px;
        font-family: Muli-Bold, Muli, sans-serif !important;
        line-height: 38px;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: #000;
      }

      .more_press_list {
        display: flex;
        flex-direction: column;
        width: 1352px;
        margin: 0 auto 60px auto;

        .more_press_list_item {
          display: flex;
          align-items: center;
          width: 100%;
          height: 130px;
          margin-bottom: 20px;
          border: 1px solid #f2f2f2;
          text-decoration: none;
          background: #fff;

          &:hover {
            box-shadow: 0 2px 16px 0 #f0f0f0;
          }

          img {
            width: 130px;
            margin-left: 40px;
          }

          p {
            margin: 0 40px;
            font-weight: 300;
            font-size: 16px;
            font-family: Muli-Light, Muli, sans-serif !important;
            line-height: 24px;
            color: #333;
          }
        }
      }
    }
  }
}
</style>