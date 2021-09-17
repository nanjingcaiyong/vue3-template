<template>
  <div
    class="self-shipping"
    :class="[isVertical ? 'self-shipping-ver' : 'self-shipping-hor']"
  >
    <header>
      <h3>{{ siteInfo.title }}</h3>
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
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Tabs, TabPane } from '../../components/tabs';
import Table, { Column, DataSource, SiteInfo } from './components/table.vue';
import Apis from '../../apis';

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
  'au.cupshe.com': {
    shopId: 6,
    title: 'SHIPPING INFORMATION',
    ...yellow,
  },
  'uk.cupshe.com': {
    shopId: 8,
    title: 'SHIPPING INFORMATION',
    ...yellow,
  },
  'mx.cupshe.com': {
    shopId: 9,
    title: 'SHIPPING INFORMATION',
    ...yellow,
  },
};
export default defineComponent({
  components: {
    TabPane,
    Tabs,
    Table,
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
      isVertical: false
    };
  },
  async created () {
    Apis.detail({
      shopId: this.siteInfo.shopId
    }).then(res => {
      if (res.success && res.data) {
        const { explanation, areaDTOS } = res.data;
        this.explanation = explanation || '';
        this.areaDTOS = Array.isArray(areaDTOS) ? areaDTOS : [];
      }
    });
    this.isVertical = window.innerWidth < 1024;
    if (window.innerWidth < 1024) {
      
      this.isVertical = true;
      this.activeKeys = [];
    }
  },
});
</script>