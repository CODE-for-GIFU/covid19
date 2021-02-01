<template>
  <data-view class="SvgCard" :title="title" :date="date">
    <slot />
    <ul class="Graph-Desc">
      <li>{{ $t(' 岐阜県外で検査し陽性となった後、岐阜県で受け入れた患者も含む。') }}</li>
      <li>{{ $t(' 空港検疫で陽性が確認された患者は含まれていない。') }}</li>
      <li>{{ $t('「入院中」には、入院調整中、後方施設入所中を含む。') }}</li>
      <li>{{ $t('「退院」には、療養解除を含む。') }}</li>
    </ul>
  </data-view>
</template>

<style lang="scss" scoped>
.SvgCard {
  ::v-deep svg {
    width: 100%;
  }
  .Graph-Desc {
    margin-top: 10px;
    margin-bottom: 0;
    font-size: 12px;
    color: $gray-3;
  }
  li {
    list-style-type: none;
    text-indent: -1em;
  }
  li:before {
    display: inline;
    content: '*';
  }
}
</style>

<script>
import DataView from '@/components/DataView.vue'

export default {
  components: { DataView },
  props: {
    title: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    }
  }
}
</script>
