<template>
  <div class="MainPage">
    <page-header
      :icon="headerItem.icon"
      :title="headerItem.title"
      :date="headerItem.date"
    />
    <whats-new :items="newsItems" />
    <static-button :url="'/flow2'" :text="'相談の手順を確認する'" />
    <v-row class="DataBlock">
      <v-col cols="12" md="6" class="DataCard">
        <svg-card
          title="検査陽性者の状況"
          :title-id="'details-of-confirmed-cases'"
          :date="confirmed.last_update"
        >
          <pulse-loader
            v-if="!confirmed.loaded"
            :loading="!confirmed.loaded"
            color="#70C7EA"
          />
          <confirmed-cases-table v-else v-bind="confirmedCases" />
        </svg-card>
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          :loaded="patientsSummary.loaded"
          title="陽性患者数"
          :title-id="'number-of-confirmed-cases'"
          :chart-id="'time-bar-chart-patients'"
          :chart-data="patientsGraph"
          :date="patientsSummary.last_update"
          :unit="$t('人')"
          :url="
            'https://gifu-opendata.pref.gifu.lg.jp/dataset/c11223-001/resource/9c35ee55-a140-4cd8-a266-a74edf60aa80'
          "
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
          :url="
            'https://gifu-opendata.pref.gifu.lg.jp/dataset/c11223-001/resource/9c35ee55-a140-4cd8-a266-a74edf60aa80'
          "
        />
      </v-col>
      <v-col cols="12" md="6" class="DataCard">
        <time-bar-chart
          :loaded="inspections.loaded"
          title="県内の検査実施件数"
          :title-id="'number-of-tested'"
          :chart-id="'time-bar-chart-inspections'"
          :chart-data="inspectionsGraph"
          :date="inspections.last_update"
          :unit="'件'"
          :info="
            '検査件数には、退院に向けての確認検査、疑い例や退院に向けての確認検査以外で医師が必要とした検査を含みます。速報値として公開するものであり、後日、確定データとして修正される場合があります。'
          "
          :url="
            'https://gifu-opendata.pref.gifu.lg.jp/dataset/c11223-001/resource/f2468ba2-efe8-483f-9b1b-ee67755dedb0'
          "
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
          :url="
            'https://gifu-opendata.pref.gifu.lg.jp/dataset/c11223-001/resource/aa3ebb23-5704-470f-a41e-d834d0a51fc0'
          "
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
          :url="
            'https://gifu-opendata.pref.gifu.lg.jp/dataset/c11223-001/resource/b71cdec1-b763-4b67-9ff4-24deaea65a55'
          "
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
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
  data() {
    const data = {
      patients: {
        loaded: false,
        last_update: ''
      },
      patientsSummary: {
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
      await sheetApi.graphMainSummary().then(response => {
        this.getConfirmedData(response)
        this.headerItem.date = response.last_update_summary
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
      // for (const row of patients.data) {
      //   row['居住地'] = this.$t(row['居住地'])
      //   row['年代'] = this.$t(row['年代'])
      //   row['性別'] = this.$t(row['性別'])
      // }

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
    getPatientsData(patientsSummary) {
      this.patientsGraph = formatGraph(patientsSummary.data)
      this.patientsSummary.last_update = patientsSummary.last_update
      this.patientsSummary.loaded = true
    },
    getConfirmedData(mainSummary) {
      this.confirmedCases = formatConfirmedCases(mainSummary.data)
      this.confirmed.last_update = mainSummary.last_update
      this.confirmed.loaded = true
    },
    getInspectionsData(inspectionsSummary) {
      this.inspectionsGraph = formatGraph(inspectionsSummary.data)
      this.inspections.last_update = inspectionsSummary.last_update
      this.inspections.loaded = true
    },
    getCallCenterData(callcenterSummary) {
      this.callcenterGraph = formatGraph(callcenterSummary.data)
      this.callcenter.last_update = callcenterSummary.last_update
      this.callcenter.loaded = true
    },
    getAdviceCenterData(advicecenterSummary) {
      this.advicecenterGraph = formatGraph(advicecenterSummary.data)
      this.advicecenter.last_update = advicecenterSummary.last_update
      this.advicecenter.loaded = true
    }
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
