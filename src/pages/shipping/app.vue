<template>
  <div
    class="self-shipping"
    :class="[isVertical ? 'self-shipping-ver' : 'self-shipping-hor']"
  >
    <header class="xxl:p-100px l:p-32px">
      <h3>{{ siteInfo.title }}</h3>
      {{ $t('message') }}
      <div
        class="self-shipping-explanation"
        v-html="explanation"
      />
    </header>
    <Tabs
      v-model:activeKeys="activeKeys"
      :is-vertical="isVertical"
      :tab-color="siteInfo.tabColor"
    >
      <TabPane
        v-for="(area, index) in areaDTOS"
        :key="index"
        :tab="area.name"
      >
        <div class="self-shipping-table">
          <Table 
            v-for="method in area.methodDTOS" 
            :columns="method?.costDTO?.th"
            :data-source="method"
            :site-info="siteInfo"
            :is-vertical="isVertical" 
          />
        </div>
        <div
          class="self-shipping-intro"
          v-html="area.tips"
        />
      </TabPane>
    </Tabs>
  </div>
  <Loading
    :visible="isloading"
    :top="top"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Tabs, TabPane } from '../../components/tabs';
import Table, { Column, DataSource, SiteInfo } from './components/Table.vue';
import Loading from '@/components/loading/loading.vue';

export interface Area {
  name: string;
  methodDTOS: DataSource[];
  tips: string;
}

export interface Site {
  [key: string]: SiteInfo & { shopId: number; title: string };
}

const yellow: SiteInfo = {
  tabColor: '#fdb400',
  titleColor: '#FFF6DF',
  headColor: '#FEF8EA',
  borderColor: '#FFE9C3',
};

const pink: SiteInfo = {
  tabColor: '#FF8178',
  titleColor: '#FEE2D8',
  headColor: '#FEEEE8',
  borderColor: '#FFDFDF',
};

const sites: Site = {
  default: {
    shopId: 1,
    title: 'SHIPPING INFORMATION',
    ...yellow,
  },
  'www.cupshe.com': {
    shopId: 1,
    title: 'SHIPPING INFORMATION',
    ...yellow,
  },
  'de.cupshe.com': {
    shopId: 2,
    title: 'VERSAND INFO',
    ...pink,
  },
  'fr.cupshe.com': {
    shopId: 3,
    title: 'INFORMATIONS DE LA LIVRAISON',
    ...pink,
  },
  'es.cupshe.com': {
    shopId: 4,
    title: 'INFORMACIÓN DE ENVÍO',
    ...yellow,
  },
  'au.cupshe.com': {
    shopId: 6,
    title: 'SHIPPING INFORMATION',
    ...yellow,
  },
  'mx.cupshe.com': {
    shopId: 7,
    title: 'INFORMACIÓN DE ENVÍO',
    ...yellow,
  },
  'uk.cupshe.com': {
    shopId: 8,
    title: 'SHIPPING INFORMATION',
    ...yellow,
  },
  'ca.cupshe.com': {
    shopId: 9,
    title: 'SHIPPING INFORMATION',
    ...yellow,
  },
  'nz.cupshe.com': {
    shopId: 14,
    title: 'SHIPPING INFORMATION',
    ...yellow,
  },
  'br.cupshe.com': {
    shopId: 15,
    title: 'Entrega e Frete',
    ...yellow,
  },
};
export default defineComponent({
  components: {
    TabPane,
    Tabs,
    Table,
    Loading
  },
  data () {
    let columns: Column[] = [];
    let areaDTOS: Area[] = [];
    const siteInfo = sites[window.location.host] || sites['default'];
    return {
      siteInfo,
      areaDTOS,
      columns,
      activeKeys: ['0'], // tab默认选中第一个
      explanation: '',
      isVertical: false,
      isloading: true,
      top: 0
    };
  },
  mounted () {
    const res = $API.SHIPPING_detail({
      shopId: this.siteInfo.shopId,
      channelId: '1',
      brandId: '1',
      terminalId: '1'
    });
    
    res.then(res => {
      if (res.success && res.data) {
        const { explanation, areaDTOS } = res.data;
        this.explanation = explanation || '';
        this.areaDTOS = Array.isArray(areaDTOS) ? areaDTOS : [];
        setTimeout(() => {
          this.isloading = false;
          const rect = document.querySelector('#shopify-section-header')?.getBoundingClientRect() || {top: 0, height: 0};
          this.top = Number(rect.top) + Number(rect.height);
        }, 10);
      }
    });

   
    this.isVertical = window.innerWidth < 1024;
    if (window.innerWidth < 1024) {
      this.isVertical = true;
    }
  },
});
</script>
<style lang="less">
body {
  margin: 0;
}

.self-shipping {
  p {
    margin-top: 0;
    margin-bottom: 0;
  }

  &-table > div {
    margin-bottom: 21px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &-intro a {
    text-decoration: underline;
  }
}
</style>
<style lang="less" scoped>
@introColor: #333;
@introFF: Muli-Light, Muli;
@introWgt: 300;

.self-shipping {
  header {
    h3 {
      margin: 0;
      margin-bottom: 10px;
      font-weight: bold;
      font-size: 30px;
      font-family: Muli-Bold, Muli, sans-serif;
      line-height: 38px;
      text-align: center;
      letter-spacing: 2px;
      color: @introColor;
    }
  }

  &-explanation {
    font-weight: 300;
    font-size: 14px;
    line-height: 21px;
    text-align: center;
    color: #333;
  }

  &-intro {
    margin-top: 16px;
    margin-bottom: -12px;
  }

  &-ver {
    header {
      margin-bottom: 17px;

      h3 {
        margin-bottom: 8px;
        font-size: 18px;
        line-height: 23px;
        letter-spacing: 1px;
      }
    }

    .self-shipping-explanation {
      font-size: 14px;
      line-height: 28px;
      text-align: left;
    }

    .self-shipping-intro {
      font-weight: 300;
      font-size: 12px;
      font-family: Muli-Light, Muli, sans-serif;
      line-height: 24px;
      color: #333;
    }
  }

  &-hor {
    header {
      margin-bottom: 42px;
    }

    .self-shipping-intro {
      font-size: 12px;
      font-family: Muli-Light, Muli, sans-serif;
      line-height: 18px;
      color: #333;
    }
  }
}

.shopify-tabs-pc {
  justify-content: center;
}
</style>
