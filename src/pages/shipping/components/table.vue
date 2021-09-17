<template>
  <div
    class="ship-table"
    :class="[isVertical ? 'ship-table-m' : 'ship-table-pc']"
    :style="titleColor"
  >
    <div class="ship-table-title">
      <span
        style="white-space: pre;"
        v-html="title"
      />
    </div>
    <div
      class="ship-table-content"
      :style="borderColor"
    >
      <div
        class="ship-table-head"
        :style="headColor"
      >
        <span
          v-for="col in columns"
          :style="headColor"
        >{{ col.title }}</span>
      </div>
      <div
        v-if="dataSource?.costDTO?.tr?.length"
        class="ship-table-body"
      >
        <div 
          v-for="row in dataSource.costDTO.tr" 
          class="ship-table-row" 
          :style="borderColor"
        >
          <span
            v-for="col in columns"
            class="ft-light"
            :style="borderColor"
            v-html="row[col.key]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import PropTypes from 'vue-types';
export interface Column {
  title: string,
  key: string
}

export interface DataSource {
  shippingMethod: string,
  deliveryTime: string,
  costDTO: Cost
}

export interface Cost {
  th: { title: string, key: string }[],
  tr: { cost: string, name: string, id: number, [key: string]: any }[]
}

export interface SiteInfo {
  tabColor: string,
  titleColor: string,
  headColor: string,
  borderColor: string
}


export default defineComponent({
  name: 'ShippingTable',
  props: {
    isVertical: PropTypes.bool.def(false),
    siteInfo: {
      type: Object as PropType<SiteInfo>
    },
    columns: {
      type: Array as PropType<Column[]>
    },
    dataSource: {
      type: Object as PropType<DataSource>
    },
  },
  setup (props) {
    const contentNode = ref(null);
    const titleNode = ref(null);
    const titleColor = computed(() => {
      const { siteInfo } = props;
      return {
        backgroundColor: siteInfo?.titleColor, 
        borderColor: siteInfo?.borderColor
      };
    });
  
    const headColor = computed(() => {
      const { siteInfo } = props;
      return {
        backgroundColor: siteInfo?.headColor, 
        borderColor: siteInfo?.borderColor
      };
    });
    const borderColor = computed(() => {
      const { siteInfo } = props;
      return {
        borderColor: siteInfo?.borderColor
      };
    });

    const title = computed(() => {
      let { dataSource } = props;
      return (dataSource?.shippingMethod || '') + (dataSource?.deliveryTime || '');
    });
    return {
      titleColor,
      headColor,
      borderColor,
      titleNode,
      contentNode,
      title
    };
  }
});
</script>
<style lang="less" scoped>
@ft-bold: Muli-Bold, Muli;
@ft-light: Muli-Light, Muli;
@bd-1: 1px solid;

.ft-light {
  font-family: Muli-Light, Muli, sans-serif;
}

.ft-bold {
  font-family: Muli-Bold, Muli, sans-serif;
}

.ship-table {
  display: flex;
  border: @bd-1;
  line-height: 38px;

  span {
    font-size: 12px;
    word-break: break-all;
    color: #333;
  }

  &-head,
  &-row {
    display: flex;
    border-color: inherit;
    border-bottom: @bd-1;
    font-family: @ft-light;
    line-height: 38px;
    white-space: pre-line;

    span {
      flex: 1;
      border-color: inherit;
      text-align: center;
    }
  }

  &-head {
    font-weight: bold;
    font-family: @ft-bold;
  }

  &-row {
    font-weight: 300;
  }

  &-title {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    align-self: center;
    height: 38px;
    padding: 0 18px;
    font-weight: 800;
    font-family: @ft-bold;
    line-height: 18px;
  }

  &-content {
    display: flex;
    flex: 1;
    flex-flow: column;
    background: #fff;
  }

  &-pc {
    flex-flow: row wrap;

    .ship-table {
      &-title {
        width: 277px;
      }

      &-row span {
        width: 51px;
      }

      &-head,
      &-row {
        span {
          border-color: inherit;
          border-left: @bd-1;

          &:first-child {
            border-left: none;
          }
        }
      }

      &-content {
        border-left: @bd-1;
      }

      // &-head {
      //   font-weight: 800;
      // }
    }
  }

  &-m {
    flex-flow: column;
    line-height: 18px;

    .ship-table {
      &-head {
        border-top: @bd-1;
        font-weight: bold;
      }

      &-head,
      &-row {
        border-color: inherit;

        span:first-child {
          border-color: inherit;
          border-right: @bd-1;
        }
      }
    }
  }

  &-row:last-child {
    border: none;
  }
}
</style>
