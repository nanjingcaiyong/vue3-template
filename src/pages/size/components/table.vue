<template>
  <div
    class="self-size-table"
  >
    <div :style="{minWidth: tableWidth}">
      <div class="thead odd-row">
        <span
          v-for="col in columns"
          class="c333 ffb fw600 ft14"
        >{{ col.title }}</span>
      </div>
      <div class="tbody">
        <div
          v-for="(row, index) in dataSource"
          class="tr"
          :class="[(Number(index) + 1) % 2 == 0 ? 'odd-row' : '' ]"
        >
          <span
            v-for="col in columns"
            class="c333 ft14"
            :class="[col.title === '' ? 'ffb fw600' : 'ffl fw300']"
          >
            {{ row[col.key] }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

export interface Column {
  title: string,
  key: string
}

export interface DataSource {
  [key:string]: string
}

export default defineComponent({
  props: {
    columns: {
      type: Array as PropType<Column[]>
    },
    dataSource: {
      type: Array as PropType<DataSource[]>
    },
  },
  computed: {
    tableWidth () {
      const length: number = this.columns?.length || 0;
      return 90 * length + 'px';
    }
  }
});
</script>

<style lang="less" scoped>
@import '../../../style/common.less';

.self-size-table {
  min-width: 343px;
  border: 1px solid #f7f7f7;
  overflow: auto;
}

.self-size-table::-webkit-scrollbar {
  /* 滚动条整体样式 */
  height: 3px;
}

.self-size-table::-webkit-scrollbar-thumb {
  /* 滚动条里面小方块 */
  border-radius: 2px;
  background: #666;
}

.self-size-table::-webkit-scrollbar-track {
  /* 滚动条里面轨道 */
  border-radius: 2px;
  background: #f2f2f2;
}

.odd-row {
  background: #f7f7f7;
}

.thead,
.tbody {
  display: flex;
  align-items: center;

  span {
    display: inline-flex;
    flex: 1;
    flex-shrink: 0;
    flex-basis: 90px;
    justify-content: center;
    min-height: 44px;
    line-height: 44px;
  }
}

.thead {
  flex-direction: row;
}

.tbody {
  flex-direction: column;
}

.tr {
  display: flex;
  align-self: stretch;
}
</style>
