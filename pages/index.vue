<template>
  <div class="MainPage">
    <page-header :icon="headerItem.icon" :title="headerItem.title" :date="headerItem.date" />
    <whats-new :items="newsItems" />
    <static-button :url="'/flow2'" :text="'相談の手順を確認する'" />
    <v-row class="DataBlock">
      <v-col cols="12" md="6" class="DataCard">
        <svg-card
          title="検査陽性者の状況"
          :title-id="'details-of-confirmed-cases'"
          :date="confirmed.last_update"
        >
          <pulse-loader v-if="!confirmed.loaded" :loading="!confirmed.loaded" color="#70C7EA" />
          <confirmed-cases-table v-else v-bind="confirmedCases" />
        </svg-card>
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          :loaded="patients_summary.loaded"
          title="陽性患者数"
          :title-id="'number-of-confirmed-cases'"
          :chart-id="'time-bar-chart-patients'"
          :chart-data="patientsGraph"
          :date="patients_summary.last_update"
          :unit="$t('人')"
          :url="'https://gifu-opendata.pref.gifu.lg.jp/dataset/c11223-001/resource/9c35ee55-a140-4cd8-a266-a74edf60aa80'"
        />
      </v-col>
      <v-col cols="12" md="12" class="DataCard">
        <data-table
          :loaded="patients.loaded"
          :title="'陽性患者の属性'"
          :title-id="'attributes-of-confirmed-cases'"
          :chart-data="patientsTable"
          :chart-option="{}"
          :date="patients.last_update"
          :info="sumInfoOfPatients"
          :sorting="patientsTableSorting"
          :url="'https://gifu-opendata.pref.gifu.lg.jp/dataset/c11223-001/resource/9c35ee55-a140-4cd8-a266-a74edf60aa80'"
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          :loaded="inspections.loaded"
          title="検査実施件数"
          :title-id="'number-of-tested'"
          :chart-id="'time-bar-chart-inspections'"
          :chart-data="inspectionsGraph"
          :date="inspections.last_update"
          :unit="'件'"
          :info="'陰性確認のための検査、医療機関が保険適用で行った検査を含みます。速報値として公開するものであり、後日、確定データとして修正される場合があります。'"
          :url="'https://gifu-opendata.pref.gifu.lg.jp/dataset/c11223-001/resource/f2468ba2-efe8-483f-9b1b-ee67755dedb0'"
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          :loaded="callcenter.loaded"
          title="健康相談窓口相談件数"
          :title-id="'number-of-callcenter'"
          :chart-id="'time-bar-chart-callcenter'"
          :chart-data="callcenterGraph"
          :date="callcenter.last_update"
          :unit="'件'"
          :info="''"
          :url="'https://gifu-opendata.pref.gifu.lg.jp/dataset/c11223-001/resource/aa3ebb23-5704-470f-a41e-d834d0a51fc0'"
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          :loaded="advicecenter.loaded"
          title="受診・相談センター相談件数"
          :title-id="'number-of-advicecenter'"
          :chart-id="'time-bar-chart-advicecenter'"
          :chart-data="advicecenterGraph"
          :date="advicecenter.last_update"
          :unit="'件'"
          :info="''"
          :url="'https://gifu-opendata.pref.gifu.lg.jp/dataset/c11223-001/resource/b71cdec1-b763-4b67-9ff4-24deaea65a55'"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import TimeBarChart from '@/components/TimeBarChart.vue'
import WhatsNew from '@/components/WhatsNew.vue'
import StaticButton from '@/components/StaticButton.vue'
import DataTable from '@/components/DataTable.vue'
import SvgCard from '@/components/SvgCard.vue'
import ConfirmedCasesTable from '@/components/ConfirmedCasesTable.vue'
import formatGraph from '@/utils/formatGraph'
import formatTable from '@/utils/formatTable'
import formatConfirmedCases from '@/utils/formatConfirmedCases'
import sheetApi from '@/api/sheet'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  components: {
    PageHeader,
    TimeBarChart,
    WhatsNew,
    StaticButton,
    DataTable,
    SvgCard,
    ConfirmedCasesTable,
    PulseLoader
  },
  created() {
    this.getNews()
    this.getData()
  },
  methods: {
    async getNews() {
      this.newsItems = await sheetApi.getNewsData()
    },
    async getData() {
      await sheetApi.getInspectionsSummary().then(response => {
        this.getInspectionsData(response)
      })
      await sheetApi
        .graphMainSummary(
          this.inspectionsGraph[this.inspectionsGraph.length - 1].cumulative
        )
        .then(response => {
          this.getConfirmedData(response)
          this.headerItem.date = response.last_update
        })
      await sheetApi.getPatientsSummary().then(response => {
        this.getPatientsData(response)
      })
      await sheetApi.getPatients().then(response => {
        this.getPatientsTableData(response)
      })
      await sheetApi.getCallCenterSummary().then(response => {
        this.getCallCenterData(response)
      })
      await sheetApi.getAdviceCenterSummary().then(response => {
        this.getAdviceCenterData(response)
      })
    },
    getPatientsTableData(patients) {
      for (const row of patients.data) {
        row['居住地'] = this.$t(row['居住地'])
        row['年代'] = this.$t(row['年代'])
        row['性別'] = this.$t(row['性別'])
      }

      this.patientsTable = formatTable(patients.data)
      for (const header of this.patientsTable.headers) {
        header.text = this.$t(header.value)
      }
      this.patients.last_update = patients.last_update
      this.patients.loaded = true
      const patientsDate = patients.date
      this.sumInfoOfPatients = {
        lText: patients.data.length,
        sText: this.$t('{patientsDate}の累計', { patientsDate }),
        unit: this.$t('人')
      }
    },
    getPatientsData(patients_summary) {
      this.patientsGraph = formatGraph(patients_summary.data)
      this.patients_summary.last_update = patients_summary.last_update
      this.patients_summary.loaded = true
    },
    getConfirmedData(main_summary) {
      this.confirmedCases = formatConfirmedCases(main_summary.data)
      this.confirmed.last_update = main_summary.last_update
      this.confirmed.loaded = true
    },
    getInspectionsData(inspections_summary) {
      this.inspectionsGraph = formatGraph(inspections_summary.data)
      this.inspections.last_update = inspections_summary.last_update
      this.inspections.loaded = true
    },
    getCallCenterData(callcenter_summary) {
      this.callcenterGraph = formatGraph(callcenter_summary.data)
      this.callcenter.last_update = callcenter_summary.last_update
      this.callcenter.loaded = true
    },
    getAdviceCenterData(advicecenter_summary) {
      this.advicecenterGraph = formatGraph(advicecenter_summary.data)
      this.advicecenter.last_update = advicecenter_summary.last_update
      this.advicecenter.loaded = true
    }
  },
  data() {
    const data = {
      patients: {
        loaded: false,
        last_update: ''
      },
      patients_summary: {
        loaded: false,
        last_update: ''
      },
      confirmed: {
        loaded: false,
        last_update: ''
      },
      inspections: {
        loaded: false,
        last_update: ''
      },
      callcenter: {
        loaded: false,
        last_update: ''
      },
      advicecenter: {
        loaded: false,
        last_update: ''
      },
      /**
       * 全体の最終更新日
       */
      last_update: '',
      /**
       * 各グラフ系のデータ整理後のデータ
       */
      patientsTable: {},
      patientsGraph: [],
      confirmedCases: {},
      inspectionsGraph: [],
      callcenterGraph: [],
      advicecenterGraph: [],
      sumInfoOfPatients: {},
      headerItem: {
        icon: 'mdi-chart-timeline-variant',
        title: '県内の最新感染動向',
        date: ''
      },
      patientsTableSorting: {
        sortBy: 'No',
        sortDesc: true
      },
      newsItems: []
    }
    return data
  },
  head() {
    return {
      title: '県内の最新感染動向'
    }
  }
}
</script>

<style lang="scss" scoped>
.MainPage {
  .DataBlock {
    margin: 20px -8px;
    .DataCard {
      @include largerThan($medium) {
        padding: 10px;
      }
      @include lessThan($small) {
        padding: 4px 8px;
      }
    }
  }
}
</style>
