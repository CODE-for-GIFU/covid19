<template>
  <div>
    <div :class="$style.title">
      <covid-icon aria-hidden="true" />
      <page-header :title="$t('新型コロナウイルス感染症が心配なときに')" />
    </div>
    <div :class="$style.container">
      <h3 :class="$style.conHeading">
        {{ $t('新型コロナウイルス感染症にかかる相談窓口について') }}
      </h3>
      <p ref="upperTrigger" :class="$style.anchorLead">
        {{ $t('発熱等の症状が生じた場合の受診の流れ') }}
      </p>
      <nav ref="nav" :class="$style.anchor">
        <ul :class="$style.anchorList">
          <li :class="$style.anchorItem">
            <a
              href="#sydr"
              :class="$style.anchorLink"
              @click.prevent="onClickAnchor"
            >
              <span>{{ $t('かかりつけ医等の地域で身近な医療機関がある方') }}</span>
              <fig-cond-sy-dr :class="$style.fig" aria-hidden="true" />
            </a>
          </li>
          <li :class="$style.anchorItem">
            <a
              href="#sy"
              :class="$style.anchorLink"
              @click.prevent="onClickAnchor"
            >
              <span>{{ $t('かかりつけ医を持たない方') }}</span>
              <fig-cond-sy :class="$style.fig" aria-hidden="true" />
            </a>
          </li>
          <li :class="$style.anchorItem">
            <a
              href="#sy"
              :class="$style.anchorLink"
              @click.prevent="onClickAnchor"
            >
              <span>{{ $t('相談先に迷う方') }}</span>
              <fig-cond-anx :class="$style.fig" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </nav>
      <div id="sydr" :class="$style.section">
        <h4 :class="$style.sxnHeading">
          {{ $t('かかりつけ医等の地域で身近な医療機関がある方') }}
        </h4>
        <!--
        <ul :class="$style.boxes">
          <li :class="[$style.box, $style.border]">
            <i18n
              path="発熱や咳などの{minorSymptom}がある"
              :class="$style.boxLead"
            >
              <template v-slot:minorSymptom>
                <span :class="$style.underline">
                  {{ $t('比較的軽い風邪の症状') }}
                </span>
              </template>
            </i18n>
            <span :class="$style.alignLeft">{{
              $t(
                '妊娠中の方、重症化しやすい方（高齢者、糖尿病、心不全、呼吸器疾患（COPD等）等の基礎疾患がある方や透析を受けている方、免疫抑制剤や抗がん剤等を用いている方）はすぐに、それ以外の方は症状が４日以上続いた場合は必ず、相談してください。'
              )
            }}</span>
          </li>
          <li :class="[$style.box, $style.border]">
            <i18n
              path="息苦しさ（呼吸困難）、強いだるさ（倦怠感）、高熱等の{majorSymptom}がある"
              :class="$style.boxLead"
            >
              <template v-slot:majorSymptom>
                <span :class="$style.underline">
                  {{ $t('強い症状') }}
                </span>
              </template>
            </i18n>
            <span :class="$style.alignLeft">{{
              $t(
                '症状には個人差がありますので、強い症状と思う場合にはすぐに相談してください。解熱剤などを飲み続けなければならない方も同様です。'
              )
            }}</span>
          </li>
        </ul>
        -->
        <p :class="[$style.box, $style.bgYellow]">
          <span :class="$style.large">{{
            $t('日ごろ受診されている医療機関に電話でご相談ください。')
          }}</span>
          <span :class="$style.small">{{
            $t(
              '（上記の症状がない場合も、不安に思う方は、日ごろ受診されている医療機関に電話でご相談ください。）'
            )
          }}</span>
        </p>
      </div>
      <div id="sy" :class="$style.section">
        <h4 :class="$style.sxnHeading">
          {{ $t('かかりつけ医を持たない方')}} {{ $t('相談先に迷う方') }}
        </h4>
        <!--
        <ul :class="$style.boxes">
          <li :class="[$style.box, $style.border]">
            <i18n
              path="発熱や咳などの{minorSymptom}がある"
              :class="$style.boxLead"
            >
              <template v-slot:minorSymptom>
                <span :class="$style.underline">
                  {{ $t('比較的軽い風邪の症状') }}
                </span>
              </template>
            </i18n>
            <span :class="$style.alignLeft">{{
              $t(
                '妊娠中の方、重症化しやすい方（高齢者、糖尿病、心不全、呼吸器疾患（COPD等）等の基礎疾患がある方や透析を受けている方、免疫抑制剤や抗がん剤等を用いている方）はすぐに、それ以外の方は症状が４日以上続いた場合は必ず、相談してください。'
              )
            }}</span>
          </li>
          <li :class="[$style.box, $style.border]">
            <i18n
              path="息苦しさ（呼吸困難）、強いだるさ（倦怠感）、高熱等の{majorSymptom}がある"
              :class="$style.boxLead"
            >
              <template v-slot:majorSymptom>
                <span :class="$style.underline">
                  {{ $t('強い症状') }}
                </span>
              </template>
            </i18n>
            <span :class="$style.alignLeft">{{
              $t(
                '症状には個人差がありますので、強い症状と思う場合にはすぐに相談してください。解熱剤などを飲み続けなければならない方も同様です。'
              )
            }}</span>
          </li>
        </ul>
        -->
        <div :class="[$style.box, $style.bgGray]">
          <h5 :class="$style.boxHeading">
            {{ $t('「受診・相談センター」に相談してください。受診可能な医療機関をご案内します。') }}
          </h5>
          <dl :class="$style.contact">
            <div>
              <dt>{{ $t('平日') }} 9:00 - 17:00：{{$t('受診・相談センター(各保健所)の電話番号は')}} </dt>
              <dd>
                <router-link to="/consultations">
                  <div :class="$style.tel">
                    <icon-phone :class="$style.icon" aria-hidden="true" />
                    {{ $t('相談窓口一覧へ') }}
                  </div>
                </router-link>
              </dd>
            </div>

            <div>
              <dt>
                {{ $t('平日（夜間）')}}{{$t('17:00 - 翌9:00') }}・{{$t('土日祝日')}}：{{ $t('受診・相談センター休日夜間窓口へ') }}
              </dt>
              <dd>
                <a :class="$style.tel" href="tel:058-272-8860">
                  <icon-phone :class="$style.icon" aria-hidden="true" />
                  058-272-8860</a
                >
              </dd>

            </div>

            <div>
              <dt>
                {{ $t('在住外国人 平日と日曜 9 AM - 6 PM') }}：{{ $t('岐阜県外国人相談センター') }}
              </dt>
              <dd>
                <a :class="$style.tel" href="tel:058-263-8066">
                  <icon-phone :class="$style.icon" aria-hidden="true" />
                  058-263-8066</a
                >
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div :class="[$style.section, $style.yellow]">
        <!--
        <h4 :class="$style.sxnHeadingSmall">
          {{
            $t(
              'かかりつけ医、または受診・相談センターによって新型コロナ外来（帰国者・接触者外来）またはPCR検査センターの受診が必要だと判断された方'
            )
          }}
        </h4>
        <p :class="[$style.box, $style.bgGray]">
          <span :class="$style.large">{{
            $t('医師が検査の必要性を判断いたします。')
          }}</span>
          <span>{{
            $t(
              'マスクをして公共交通機関をできるだけ使わずに受診をしてください。'
            )
          }}</span>
        </p>
        -->
        <h4 :class="[$style.sxnHeadingSmall]">
          {{
            $t(
              '医師により検査が必要だと判断されPCR検査等を受けた結果'
            )
          }}
        </h4>
        <div :class="$style.boxes">
          <div :class="[$style.box, $style.border]">
            <h5 :class="$style.boxLead">{{ $t('陽性の場合') }}</h5>
            <p>
              {{
                $t(
                  '感染症指定医療機関等への入院、又は宿泊施設等での療養となります'
                )
              }}
            </p>
            <div :class="$style.grow" aria-hidden="true">
              <icon-bed :class="[$style.iconBed]" />
            </div>
          </div>
          <div :class="[$style.box, $style.border]">
            <h5 :class="$style.boxLead">{{ $t('陰性の場合') }}</h5>
            <p>
              {{
                $t('自宅で安静に過ごし、必要に応じて医療機関を受診してください')
              }}
            </p>
            <p :class="[$style.small, $style.grow]">
              {{
                $t(
                  'ただし、症状が良くならない場合は再度受診相談窓口またはかかりつけ医に相談してください'
                )
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.detail">
      <app-link
        to="https://www.pref.gifu.lg.jp/site/covid19/25920.html"
        :icon-size="20"
        :icon-class="$style.icon"
        :class="$style.detailButton"
        >{{ $t('詳細を見る(岐阜県公式ホームページ)') }}
      </app-link>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TranslateResult } from 'vue-i18n'
import VueScrollTo from 'vue-scrollto'
import AppLink from '@/components/AppLink.vue'
import PageHeader from '@/components/PageHeader.vue'
import PrinterButton from '@/components/PrinterButton.vue'
import CovidIcon from '@/static/covid.svg'
import IconBed from '@/static/flow2/bed.svg'
import FigCondAnx from '@/static/flow2/cond_anx.svg'
import FigCondSy from '@/static/flow2/cond_sy.svg'
import FigCondSyDr from '@/static/flow2/cond_sydr.svg'
import IconPhone from '@/static/flow2/phone.svg'
type LocalData = {
  nav: HTMLElement | null // アンカーリンクコンテナ（フローティング対象）
  upperTrigger: HTMLElement | null // フローティング判定上側トリガ（代替余白付与対象）
  lowerTrigger: HTMLElement | null // フローティング判定下側トリガ
  buttons: HTMLElement[] | null // アンカーリンクボタン
  sections: HTMLElement[] | null // アンカーリンクの飛び先
  navW: number // アンカーリンクコンテナの幅（upperTriggerの幅を使用）
  navH: number // アンカーリンクコンテナの高さ（navW指定後のnavの高さ）
  navOffsetTop: number // アンカーリンクコンテナ上端の表示領域上端からのオフセット量
  upperTriggerOffsetTop: number // upperTrigger要素下端の表示領域上端からのオフセット量
  lowerTriggerOffsetTop: number // lowerTrigger要素下端の表示領域上端からのオフセット量
  timerId: number // scrollイベントのdebounce用タイマーID
}
export default Vue.extend({
  components: {
    CovidIcon,
    PrinterButton,
    PageHeader,
    AppLink,
    FigCondSyDr,
    FigCondSy,
    FigCondAnx,
    IconPhone,
    IconBed,
  },
  data(): LocalData {
    const nav = null
    const upperTrigger = null
    const lowerTrigger = null
    const buttons = null
    const sections = null
    const navW = 0
    const navH = 0
    const navOffsetTop = 0
    const upperTriggerOffsetTop = 0
    const lowerTriggerOffsetTop = 0
    const timerId = 0
    return {
      nav,
      upperTrigger,
      lowerTrigger,
      buttons,
      sections,
      navW,
      navH,
      navOffsetTop,
      upperTriggerOffsetTop,
      lowerTriggerOffsetTop,
      timerId,
    }
  },
  mounted() {
  },
  methods: {
    onClickAnchor(event: Event): void {
      const self = this
      const target = event.target as HTMLAnchorElement
      const hash = target.hash
      VueScrollTo.scrollTo(hash, 1000, {
        onDone() {
        },
        onCancel() {
        },
      })
    },
  },
  head() {
    return {
      title: '新型コロナウイルス感染症が心配なときに'
    }
  }
})
</script>

<style lang="scss" module>
/* stylelint-disable no-descending-specificity */
$fzSmall: 14;
$fzRegular: 16;
$fzMedium: 18;
$fzLarge: 20;
$fzHuge: 22;
$fzHeading: 24;
$fzHeadingL: 26;
$padding: 20;
$margin: 20;
.title {
  display: flex;
  align-items: center;
  margin-bottom: $margin * 1px;
  > svg {
    width: 30px;
    height: 30px;
    > path:not(:first-of-type) {
      fill: $gray-2;
    }
  }
  .text {
    margin-left: 8px;
  }
  .printerButton {
    margin: 0 0 0 auto;
  }
}
.container {
  background-color: $white;
  box-shadow: $shadow;
  border: 0.5px solid $gray-4 !important;
  border-radius: 4px;
  padding: $padding * 1px;
  line-height: 1.35;
  color: $gray-2;
  @include font-size($fzRegular);
  > .conHeading {
    @include font-size($fzHeading);
  }
  > .anchorLead {
    margin-top: $margin * 1.5px;
    color: $blue-1;
    font-weight: bold;
    text-align: center;
    @include font-size($fzHuge);
  }
  ul {
    padding-left: 0; // override Vuetify style
  }
  p {
    margin-bottom: 0; // override Vuetify style
  }
}
.anchor {
  padding-top: $margin * 1px;
  padding-bottom: $margin * 1px;
  background-color: $white;
  position: relative;
  .anchorList {
    margin: 0 -6px;
    display: flex;
  }
  .anchorItem {
    display: flex;
    width: (100% / 3);
    padding: 0 6px;
    flex: 0 0 auto;
  }
  .anchorLink {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1 0 auto;
    position: relative;
    padding: 20px 20px 40px;
    width: 100%;
    border: 4px solid $blue-1;
    border-radius: 10px;
    text-align: center;
    font-weight: bold;
    text-decoration: none;
    font-size: inherit;
    color: $gray-2;
    transition: color 0.2s;
    z-index: 2;
    > * {
      display: block;
      max-width: 100%;
      pointer-events: none;
    }
    > span {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1 0 auto;
    }
    > svg {
      flex: 0 0 auto;
      margin-top: 20px;
      max-width: 120px;
      max-height: 120px;
      width: 100%;
    }
    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 50%;
      bottom: 20px;
      transform: translate(-50%, 50%);
      width: 0;
      height: 0;
      border-width: 9.5px 6.3px 0 6.3px;
      border-style: solid;
      border-color: $blue-1 transparent transparent transparent;
      transition: border-color 0.2s;
    }
    &.active,
    &:hover {
      background-color: $blue-1;
      color: $white;
      > svg path {
        fill: $white;
      }
    }
    &.active {
      &::after {
        bottom: -1px;
        transform: translate(-50%, 100%);
        border-width: 19.5px 12.99px 0 12.99px;
        transition: none;
      }
    }
    &:not(.active) {
      &:hover {
        &::after {
          border-top-color: $white;
        }
      }
    }
  }
  &.floating {
    position: fixed;
    top: 0;
    z-index: 1;
    .fig {
      display: none;
    }
  }
}
.section {
  margin-top: $margin * 1.5px;
  padding: $padding * 1px;
  border: 3px solid $gray-3;
  border-radius: 10px;
  background-color: $white;
  &.yellow {
    border-width: 4px;
    border-color: $emergency;
  }
  > * {
    line-height: 1.5;
    &:not(.box):not(.boxes):not(:first-child) {
      margin-top: $margin * 1px;
    }
  }
  > .sxnHeading {
    text-align: center;
    font-weight: bold;
    @include font-size($fzHeadingL);
  }
  > .sxnHeadingSmall {
    text-align: center;
    font-weight: bold;
    @include font-size($fzHuge);
  }
  > .sxnText {
    margin-top: 20px;
    text-align: center;
    font-weight: bold;
    @include font-size($fzMedium);
  }
  > .hr {
    margin-top: $margin * 1px;
    padding-top: $margin * 1.5px;
    border-top: 1px solid $gray-2;
  }
}
.anchor + .section {
  margin-top: 0;
}
.boxes {
  display: flex;
  justify-content: space-between;
}
.box {
  margin-top: $margin * 1px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  border-radius: 4px;
  padding: $padding * 1px;
  text-align: center;
  line-height: 1.65;
  &.border {
    border: 2px solid $gray-3;
  }
  &.bgGray {
    background-color: $gray-2;
    color: $white;
    .icon path {
      fill: $white; // 内包するアイコンの色を変更
    }
  }
  &.bgYellow {
    background-color: $emergency;
  }
  > .boxHeading {
    font-weight: bold;
    @include font-size($fzLarge);
  }
  > .boxLead {
    font-weight: bold;
    @include font-size($fzMedium);
  }
  > .large {
    font-weight: bold;
    @include font-size($fzHuge);
  }
  > .small {
    @include font-size($fzSmall);
  }
  > .alignLeft {
    text-align: left;
  }
  > .grow {
    flex: 1 0 auto;
  }
  > * {
    max-width: 100%;
  }
  > *:not(:first-child) {
    margin-top: $margin * 0.75px;
  }
  > .notice {
    width: 100%;
    padding: $margin * 1px;
    border-radius: 4px;
    background-color: $white;
    color: #a00000;
    text-align: center;
    font-weight: bold;
    line-height: 1.35;
    @include font-size($fzSmall);
  }
  > .contact {
    > div {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: flex-end;
      flex-wrap: wrap;
      > dt {
        margin-right: 0.5em;
      }
      > dd {
        text-align: left;
      }
    }
    > *:not(:first-child) {
      margin-top: $margin * 1px;
    }
  }
  li {
    list-style-type: none;
  }
  a {
    color: inherit;
    text-decoration: none;
    &:not(.tel) {
      > i {
        vertical-align: baseline;
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .underline {
    text-decoration: underline;
  }
}
.container .box a {
  color: inherit; // for IE11
}
.boxes > .box {
  width: calc(50% - 10px);
}
.iconBed {
  max-width: 37px;
  max-height: 37px; // for IE11
  width: 100%;
}
.overrideExternalLink {
  i {
    font-size: 1em !important;
    &::before {
      color: $white;
      margin-right: 0.2em;
    }
  }
}
.tel {
  font-weight: bold;
  vertical-align: baseline;
  white-space: nowrap;
  line-height: 1px * $fzHuge * 1.35;
  padding: 0 0.25em;
  @include font-size($fzHuge);
  > svg {
    vertical-align: baseline;
    max-width: 0.7em;
    max-height: 0.7em; // for IE11
    width: 100%;
  }
  &:visited,
  &:hover,
  &:active,
  &:focus {
    outline: 1px dotted $white;
  }
}
.detail {
  text-align: center;
  .detailButton {
    @include button-text('md');
    @include font-size(20);
    margin: ($margin * 1.5px) auto 0;
    font-weight: bold;
    text-decoration: none;
    color: $blue-1 !important;
    &:hover {
      color: $white !important;
    }
    .icon {
      margin-left: 2px;
      color: $blue-1 !important;
    }
  }
}
// 960
@include lessThan(960) {
  .anchor {
    padding-top: 2px;
    .anchorLink {
      padding: 10px 10px 20px;
      > svg {
        margin-top: 1px;
        max-width: 80px;
        max-height: 80px;
      }
      &::after {
        bottom: 5px;
      }
    }
  }
  .boxes {
    display: block;
  }
  .boxes > .box {
    width: auto;
  }
}
// 600
@function px2vw($px, $vw: 600) {
  @return $px / $vw * 100vw;
}
@include lessThan($small) {
  .title {
    margin-bottom: px2vw($margin);
  }
  .container {
    padding: px2vw($padding);
    font-size: px2vw($fzRegular);
    > .conHeading {
      font-size: px2vw($fzHeading);
    }
    > .anchorLead {
      margin-top: px2vw($margin * 1.5);
      font-size: px2vw($fzHuge);
    }
  }
  .anchor {
    padding-top: px2vw($margin);
    .anchorLink {
      padding: px2vw(20) px2vw(20) px2vw(40);
      border-width: px2vw(4);
      border-radius: px2vw(10);
      > svg {
        margin-top: px2vw(20);
      }
      &::after {
        bottom: px2vw(20);
        border-width: px2vw(9.5) px2vw(6.3) 0 px2vw(6.3);
      }
      &.active {
        &::after {
          border-width: px2vw(19.5) px2vw(12.99) 0 px2vw(12.99);
        }
      }
    }
    &.floating {
      top: 64px; // NOTE: nuxt.config.tsのoffsetから余白を抜いたもの
    }
  }
  .section {
    //margin-top: px2vw($margin * 1.5);
    margin-top: 20px; // フローティングの都合で固定
    padding: px2vw($padding);
    border-width: px2vw(3);
    border-radius: px2vw(10);
    &.yellow {
      border-width: px2vw(3);
    }
    > * {
      &:not(.box):not(.boxes):not(:first-child) {
        margin-top: px2vw($margin);
      }
    }
    > .sxnHeading {
      font-size: px2vw($fzHeadingL);
    }
    > .sxnHeadingSmall {
      font-size: px2vw($fzHuge);
    }
    > .sxnText {
      font-size: px2vw($fzMedium);
    }
    > .hr {
      margin-top: px2vw($margin);
      padding-top: px2vw($margin * 1.5);
    }
  }
  .box {
    margin-top: px2vw($margin);
    padding: px2vw($padding);
    border-radius: px2vw(4);
    &.border {
      border-width: px2vw(2);
    }
    > .boxHeading {
      font-size: px2vw($fzLarge);
    }
    > .boxLead {
      font-size: px2vw($fzMedium);
    }
    > .large {
      font-size: px2vw($fzHuge);
    }
    > .small {
      font-size: px2vw($fzSmall);
    }
    > *:not(:first-child) {
      margin-top: px2vw($margin * 0.75);
    }
    > .notice {
      padding: px2vw($margin);
      border-radius: px2vw(4);
      font-size: px2vw($fzSmall);
    }
    > .contact {
      > *:not(:first-child) {
        margin-top: px2vw($margin);
      }
    }
  }
  .tel {
    font-size: px2vw($fzHuge);
  }
  .detail {
    .button {
      padding: px2vw(24) px2vw(36);
      margin: px2vw($margin * 1.5) auto 0;
      font-size: px2vw(20);
    }
  }
}
</style>