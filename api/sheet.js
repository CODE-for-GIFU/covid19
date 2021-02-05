import axios from 'axios'
import dayjs from 'dayjs'

class SheetApi {
  constructor() {
    this.apiBase = 'https://spreadsheets.google.com/feeds/list'
    this.macroApiBase = 'https://script.googleusercontent.com/macros/echo'
    this.cache = {}
  }

  // データのキャッシュ用
  cache = {}

  getNewsData() {
    if (this.cache.newsData) return this.loadCache(this.cache.newsData)
    return axios
      .get(
        `${this.apiBase}/1iQaK7yERA2tIfcz2Tl1OHibjoq4ZRZXqK-EYx7pj-e0/1/public/values?alt=json`
      )
      .then(res => {
        const num = 2
        const items = []
        const values = Object.values(res.data.feed.entry)
        for (let i = 0; i < num; i++) {
          const item = {
            text: values[i].gsx$title.$t,
            url: values[i].gsx$url.$t,
            date: values[i].gsx$date.$t
          }
          items.push(item)
        }
        this.cache.newsData = items // cacheへ格納
        return items
      })
      .catch(e => ({ error: e }))
  }

  graphMainSummary() {
    // cacheに存在すれば、cacheからloadする
    if (this.cache.graphMainSummary)
      return this.loadCache(this.cache.graphMainSummary)
    return axios
      .get(
        `${this.apiBase}/1iQaK7yERA2tIfcz2Tl1OHibjoq4ZRZXqK-EYx7pj-e0/9/public/values?alt=json`
      )
      .then(res => {
        const items = {
          陽性患者数: 0,
          入院中: 0,
          '軽症・中等症': 0,
          重症: 0,
          退院: 0,
          死亡: 0
        }
        const values = Object.values(res.data.feed.entry)
        values.forEach(value => {
          items['陽性患者数'] = Number(value.gsx$陽性患者数.$t)
          items['入院中'] = Number(value.gsx$入院中.$t)
          items['軽症・中等症'] = Number(value.gsx$軽症中等症.$t)
          items['重症'] = Number(value.gsx$重症.$t)
          items['退院'] = Number(value.gsx$退院.$t)
          items['死亡'] = Number(value.gsx$死亡.$t)
        })

        const mainSummary = {
          data: {
            children: [
              {
                attr: '陽性患者数',
                value: items['陽性患者数'],
                children: [
                  {
                    attr: '入院中',
                    value: items['入院中'],
                    children: [
                      {
                        attr: '軽症・中等症',
                        value: items['軽症・中等症']
                      },
                      {
                        attr: '重症',
                        value: items['重症']
                      }
                    ]
                  },
                  {
                    attr: '退院',
                    value: items['退院']
                  },
                  {
                    attr: '死亡',
                    value: items['死亡']
                  }
                ]
              }
            ]
          },
          last_update: dayjs(values[values.length - 1].updated.$t).format(
            'YYYY/MM/DD HH:mm'
          )
        }
        this.cache.graphMainSummary = mainSummary // cacheへ格納
        return mainSummary
      })
      .catch(e => ({ error: e }))
  }

  // graphMainSummary(inspections_sum) {
  //   //cacheに存在すれば、cacheからloadする
  //   if (this.cache.graphMainSummary) return this.loadCache(this.cache.graphMainSummary);
  //   return axios.get(`${this.apiBase}/1iQaK7yERA2tIfcz2Tl1OHibjoq4ZRZXqK-EYx7pj-e0/2/public/values?alt=json`)
  //     .then((res) => {
  //       const items = { '検査実施件数': inspections_sum, '陽性患者数': 0, '入院中': 0, '軽症・中等症': 0, '重症': 0, '退院': 0, '死亡': 0 }
  //       const values = Object.values(res.data.feed.entry)
  //       values.forEach((value) => {
  //         if (value.gsx$退院済フラグ.$t == 1) {
  //           if (value.gsx$患者状態.$t == '死亡') {
  //             items['死亡']++;
  //           }
  //           else {
  //             items['退院']++;
  //           }
  //         }
  //         else {
  //           if (value.gsx$患者状態.$t == '重症') {
  //             items['重症']++;
  //           }
  //           else {
  //             items['軽症・中等症']++;
  //           }
  //         }
  //       });
  //       items['入院中'] = items['軽症・中等症'] + items['重症'];
  //       items['陽性患者数'] = items['入院中'] + items['退院'] + items['死亡'];

  //       const main_summary = {
  //         data: {
  //           attr: '検査実施件数',
  //           value: items['検査実施件数'],
  //           children: [
  //             {
  //               attr: '陽性患者数',
  //               value: items['陽性患者数'],
  //               children: [
  //                 {
  //                   attr: '入院中',
  //                   value: items['入院中'],
  //                   children: [
  //                     {
  //                       attr: '軽症・中等症',
  //                       value: items['軽症・中等症'],
  //                     },
  //                     {
  //                       attr: '重症',
  //                       value: items['重症'],
  //                     }
  //                   ]
  //                 },
  //                 {
  //                   attr: '退院',
  //                   value: items['退院'],
  //                 },
  //                 {
  //                   attr: '死亡',
  //                   value: items['死亡'],
  //                 }
  //               ]
  //             }
  //           ]
  //         },
  //         last_update: dayjs(values[values.length - 1].updated.$t).format('YYYY/MM/DD HH:mm'),
  //       }
  //       this.cache.graphMainSummary = main_summary;//cacheへ格納
  //       return main_summary;
  //     })
  //     .catch(e => ({ error: e }));
  // }

  getPatients() {
    // cacheに存在すれば、cacheからloadする
    if (this.cache.patients) return this.loadCache(this.cache.patients)
    return axios
      .get(
        `${this.apiBase}/1iQaK7yERA2tIfcz2Tl1OHibjoq4ZRZXqK-EYx7pj-e0/2/public/values?alt=json`
      )
      .then(res => {
        const items = []
        const values = Object.values(res.data.feed.entry)
        values.forEach(value => {
          const item = {
            // No: value.gsx$no.$t,
            リリース日:
              dayjs(value.gsx$公表年月日.$t, 'YYYY-MM-DD').format() ?? '不明',
            // 曜日: value.gsx$曜日.$t,
            居住地: value.gsx$患者居住地.$t,
            年代: value.gsx$患者年代.$t,
            性別: value.gsx$患者性別.$t,
            // 備考: value.gsx$備考.$t,
            退院: value.gsx$退院済フラグ.$t === '1' ? '済' : '',
            検査地: /県外/.test(value.gsx$no.$t) ? '他自治体' : '県内'
          }
          items.push(item)
        })
        const patients = {
          data: items,
          last_update: dayjs(values[values.length - 1].updated.$t).format(
            'YYYY/MM/DD HH:mm'
          ),
          date: dayjs(values[values.length - 1].updated.$t).format('YYYY/MM/DD')
        }
        this.cache.patients = patients // cacheへ格納
        return patients
      })
      .catch(e => ({ error: e }))
  }

  getPatientsSummary() {
    // cacheに存在すれば、cacheからloadする
    if (this.cache.patientsSummary)
      return this.loadCache(this.cache.patientsSummary)
    return axios
      .get(
        `${this.apiBase}/1iQaK7yERA2tIfcz2Tl1OHibjoq4ZRZXqK-EYx7pj-e0/2/public/values?alt=json`
      )
      .then(res => {
        const items = []
        const values = Object.values(res.data.feed.entry)
        values.forEach(value => {
          const item = {
            日付:
              dayjs(value.gsx$公表年月日.$t, 'YYYY-MM-DD').format() ?? '不明'
          }
          items.push(item)
        })

        // 日付ごとに集計
        const group = items.reduce((result, current) => {
          const element = result.find(p => p.日付 === current.日付)
          if (element) {
            element.小計++
          } else {
            result.push({
              日付: current.日付,
              小計: 1
            })
          }
          return result
        }, [])
        const patientsSummary = {
          data: this.addPaddingDay2Summary(group),
          last_update: dayjs(values[values.length - 1].updated.$t).format(
            'YYYY/MM/DD HH:mm'
          )
        }
        this.cache.patientsSummary = patientsSummary // cacheへ格納
        return patientsSummary
      })
      .catch(e => ({ error: e }))
  }

  addPaddingDay2Summary(summaryData) {
    const items = []
    let pos = 0
    const dayDiff = dayjs(dayjs()).diff(summaryData[0]['日付'], 'days', false)

    for (let i = 0; i <= dayDiff; i++) {
      const currentDay = dayjs(summaryData[0]['日付'], 'YYYY-MM-DD').add(
        i,
        'days'
      )
      const itemPadding = {
        日付: currentDay,
        小計: 0
      }

      if (pos >= summaryData.length) {
        break
      }

      if (dayjs(summaryData[pos]['日付']).isSame(currentDay)) {
        items.push(summaryData[pos])
        pos++
      } else {
        items.push(itemPadding)
      }
    }
    return items
  }

  getInspectionsSummary() {
    // cacheに存在すれば、cacheからloadする
    if (this.cache.inspectionsSummary)
      return this.loadCache(this.cache.inspectionsSummary)
    return axios
      .get(
        `${this.apiBase}/1iQaK7yERA2tIfcz2Tl1OHibjoq4ZRZXqK-EYx7pj-e0/3/public/values?alt=json`
      )
      .then(res => {
        const items = []
        const values = Object.values(res.data.feed.entry)
        values.forEach(value => {
          const item = {
            日付:
              dayjs(value.gsx$実施年月日.$t, 'YYYY/MM/DD').format() ?? '不明',
            小計: Number(value.gsx$検査実施件数.$t)
          }
          items.push(item)
        })
        const inspectionsSummary = {
          data: items,
          last_update: dayjs(values[values.length - 1].updated.$t).format(
            'YYYY/MM/DD HH:mm'
          )
        }
        this.cache.inspectionsSummary = inspectionsSummary // cacheへ格納
        return inspectionsSummary
      })
      .catch(e => ({ error: e }))
  }

  getCallCenterSummary() {
    // cacheに存在すれば、cacheからloadする
    if (this.cache.callcenterSummary)
      return this.loadCache(this.cache.callcenterSummary)
    return axios
      .get(
        `${this.apiBase}/1iQaK7yERA2tIfcz2Tl1OHibjoq4ZRZXqK-EYx7pj-e0/4/public/values?alt=json`
      )
      .then(res => {
        const items = []
        const values = Object.values(res.data.feed.entry)
        values.forEach(value => {
          const item = {
            日付:
              dayjs(value.gsx$受付年月日.$t, 'YYYY/MM/DD').format() ?? '不明',
            小計: Number(value.gsx$相談件数.$t)
          }
          items.push(item)
        })
        const callcenterSummary = {
          data: items,
          last_update: dayjs(values[values.length - 1].updated.$t).format(
            'YYYY/MM/DD HH:mm'
          )
        }
        this.cache.callcenterSummary = callcenterSummary // cacheへ格納
        return callcenterSummary
      })
      .catch(e => ({ error: e }))
  }

  getAdviceCenterSummary() {
    // cacheに存在すれば、cacheからloadする
    if (this.cache.advicecenterSummary)
      return this.loadCache(this.cache.advicecenterSummary)
    return axios
      .get(
        `${this.apiBase}/1iQaK7yERA2tIfcz2Tl1OHibjoq4ZRZXqK-EYx7pj-e0/5/public/values?alt=json`
      )
      .then(res => {
        const items = []
        const values = Object.values(res.data.feed.entry)
        values.forEach(value => {
          const item = {
            日付:
              dayjs(value.gsx$受付年月日.$t, 'YYYY/MM/DD').format() ?? '不明',
            小計: Number(value.gsx$帰国者接触者相談センター相談件数.$t)
          }
          items.push(item)
        })
        const advicecenterSummary = {
          data: items,
          last_update: dayjs(values[values.length - 1].updated.$t).format(
            'YYYY/MM/DD HH:mm'
          )
        }
        this.cache.advicecenterSummary = advicecenterSummary // cacheへ格納
        return advicecenterSummary
      })
      .catch(e => ({ error: e }))
  }

  getMunicipalityLink() {
    // cacheに存在すれば、cacheからloadする
    if (this.cache.municipalitylink)
      return this.loadCache(this.cache.municipalitylink)
    return axios
      .get(
        `${this.apiBase}/1iQaK7yERA2tIfcz2Tl1OHibjoq4ZRZXqK-EYx7pj-e0/7/public/values?alt=json`
      )
      .then(res => {
        const items = []
        const values = Object.values(res.data.feed.entry)
        values.forEach(value => {
          const item = {
            自治体名: value.gsx$自治体名.$t,
            庁舎所在地: value.gsx$庁舎所在地.$t,
            ふりがな: value.gsx$ふりがな.$t,
            対策ページ名称: value.gsx$対策ページ名称.$t,
            リンク: value.gsx$リンク.$t,
            電話番号: value.gsx$電話番号.$t
          }
          items.push(item)
        })
        const links = {
          data: items
        }
        this.cache.municipalitylink = links // cacheへ格納
        return links
      })
      .catch(e => ({ error: e }))
  }

  /**
   * 岐阜県相談窓口一覧情報の取得
   */
  getConsultations() {
    // cacheに存在すれば、cacheからloadする
    if (this.cache.consultations)
      return this.loadCache(this.cache.consultations)
    return axios
      .get(
        `${this.apiBase}/1iQaK7yERA2tIfcz2Tl1OHibjoq4ZRZXqK-EYx7pj-e0/8/public/values?alt=json`
      )
      .then(res => {
        const items = []
        const values = Object.values(res.data.feed.entry)
        values.forEach(value => {
          const item = {
            id: items.length,
            consultation: value.gsx$consultation.$t,
            name: value.gsx$name.$t,
            tel1: value.gsx$tel1.$t,
            tel2: value.gsx$tel2.$t,
            ontime: value.gsx$ontime.$t,
            addr: value.gsx$addr.$t,
            locname: value.gsx$locname.$t,
            lon: value.gsx$lon.$t,
            lat: value.gsx$lat.$t,
            classification: value.gsx$classification.$t,
            color: value.gsx$color.$t
          }
          items.push(item)
        })
        const links = {
          data: items
        }
        this.cache.consultations = links // cacheへ格納
        return links
      })
      .catch(e => ({ error: e }))
  }

  graphData() {
    return axios
      .get(
        `${this.macroApiBase}?user_content_key=lttTvfv73JB1_0b3dWmanW_0P9DGkUcm-AfsaNdLi66LA3jZN-2LxoI61hsD1XcvX7wjJPbA-aQMU8fYuYzu_il2z3j02F4um5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnP9k53dGa_9bOh55uXRyK3KuHQRrFP7y3JXXDLFBzyALBHA50y4X5nQTHbX7VSKaSRdIug5zkO6q&lib=MkDaaQ5v_1yAZBU3X6zh8HTFkUrmYniUZ`
      )
      .then(res => {
        return res.data
      })
      .catch(e => ({ error: e }))
  }

  loadCache(data) {
    const links = data
    return new Promise(resolve => {
      resolve(links)
    }).then(data => {
      return data
    })
  }
}

const sheetApi = new SheetApi()

export default sheetApi
