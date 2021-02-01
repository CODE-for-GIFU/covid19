<template>
  <data-view :title="title" :date="date" :url="url">
    <template v-slot:button>
      <span />
    </template>
    <pulse-loader v-if="!loaded" :loading="!loaded" color="#70C7EA" />
    <v-data-table
      v-else
      :headers="chartData.headers"
      :items="chartData.datasets"
      :mobile-breakpoint="0"
      class="cardTable"
      :sort-by="sorting.sortBy"
      :sort-desc="sorting.sortDesc"
    />
    <template v-if="loaded" v-slot:infoPanel>
      <data-view-basic-info-panel :l-text="info.lText" :s-text="info.sText" :unit="info.unit" />
    </template>
  </data-view>
</template>

<style lang="scss">
.cardTable {
  &.v-data-table {
    th {
      padding: 8px 10px;
      height: auto;
      border-bottom: 1px solid $gray-4;
      white-space: nowrap;
      color: $gray-2;
      font-size: 12px;
    }
    tbody {
      tr {
        color: $gray-1;
        td {
          padding: 8px 10px;
          height: auto;
          font-size: 12px;
          white-space: nowrap;
        }
        &:nth-child(odd) {
          td {
            background: rgba($gray-4, 0.3);
          }
        }
        &:not(:last-child) {
          td:not(.v-data-table__mobile-row) {
            border: none;
          }
        }
      }
    }
  }
}
.v-data-footer__select {
  display: none;
}
</style>

<script>
import DataView from '@/components/DataView.vue'
import DataViewBasicInfoPanel from '@/components/DataViewBasicInfoPanel.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  components: { DataView, DataViewBasicInfoPanel, PulseLoader },
  props: {
    title: {
      type: String,
      default: ''
    },
    chartData: {
      type: Object,
      default: () => {}
    },
    date: {
      type: String,
      default: ''
    },
    info: {
      type: Object,
      required: false,
      default: () => {}
    },
    url: {
      type: String,
      required: false,
      default: ''
    },
    loaded: {
      type: Boolean,
      required: true,
      default: false
    },
    sorting: {
      sortBy: '',
      sortDesc: true
    }
  }
}
</script>
