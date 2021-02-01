<template>
  <div ref="Side" class="SideNavigation" tabindex="-1">
    <header class="SideNavigation-Header">
      <v-icon
        class="SideNavigation-OpenIcon"
        :aria-label="$t('サイドメニュー項目を開く')"
        @click="$emit('openNavi', $event)"
      >mdi-menu</v-icon>
      <h1 class="SideNavigation-Heading">
        <nuxt-link :to="localePath('/')" class="SideNavigation-HeadingLink">
          <div class="SideNavigation-HeaderLogo">
            <img src="/logo.svg" :alt="$t('Gifu Prefectural Government')" />
          </div>
          <div class="SideNavigation-HeaderLogoLinkText">
            {{ $t('Gifu Prefectural Government') }}
            <br />
            {{ $t('COVID-19') }}
            <br />
            {{ $t('Measures site') }}
          </div>
        </nuxt-link>
      </h1>
    </header>
    <div :class="['SideNavigation-Body', { '-opened': isNaviOpen }]">
      <v-icon
        class="SideNavigation-CloseIcon"
        :aria-label="$t('サイドメニュー項目を閉じる')"
        @click="$emit('closeNavi', $event)"
      >mdi-close</v-icon>

      <div class="SideNavigation-Language">
        <label class="SideNavigation-LanguageLabel" for="LanguageSelector">{{ $t('多言語対応選択メニュー') }}</label>
        <LanguageSelector />
      </div>

      <nav class="SideNavigation-Menu">
        <MenuList :items="items" @click="$emit('closeNavi', $event)" />
      </nav>

      <footer class="SideNavigation-Footer">
        <div class="SideNavigation-Social">
          <a
            href="https://twitter.com/gifukenkiki"
            target="_blank"
            rel="noopener"
            class="SideNavigation-SocialLink"
          >
            <img src="/twitter.png" alt="Twitter" />
          </a>
          <a
            href="https://www.facebook.com/minamodayori/"
            target="_blank"
            rel="noopener"
            class="SideNavigation-SocialLink"
          >
            <img src="/facebook.png" alt="Facebook" />
          </a>
          <a
            href="https://github.com/CODE-for-GIFU/covid19"
            target="_blank"
            rel="noopener"
            class="SideNavigation-SocialLink"
          >
            <img src="/github.png" alt="GitHub" />
          </a>
        </div>
        <!-- <small class="SideNavigation-Copyright">
          {{ $t('このサイトの内容物は') }}
          <a
            :href="$t('https://creativecommons.org/licenses/by/4.0/deed.ja')"
            target="_blank"
            rel="license"
            class="SideNavigation-LicenseLink"
          >
            {{ $t('クリエイティブ・コモンズ 表示 4.0 ライセンス') }}
          </a>
          {{ $t('の下に提供されています。') }}
          <br />
          2020 Gifu Prefectural Government
        </small>-->
      </footer>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { TranslateResult } from 'vue-i18n'
import LanguageSelector from '@/components/LanguageSelector.vue'
import MenuList from '@/components/MenuList.vue'

export default {
  components: {
    LanguageSelector,
    MenuList
  },
  props: {
    isNaviOpen: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    items() {
      return [
        {
          icon: 'mdi-chart-timeline-variant',
          title: this.$t('The latest updates'),
          link: this.localePath('/')
        },
        {
          icon: 'CovidIcon',
          title: this.$t('If you have any symptoms'),
          link: this.localePath('/flow2')
        },
        {
          icon: 'mdi-city',
          title: this.$t('岐阜県自治体コロナ対策情報一覧'),
          link: this.localePath('/municipalities')
        },
        {
          icon: 'mdi-phone',
          title: this.$t('岐阜県コロナ相談窓口一覧'),
          link: this.localePath('/consultations')
        },
        {
          icon: 'mdi-hand-water',
          title: this.$t('新型コロナウイルス感染症の予防について'),
          link: this.localePath('/precaution'),
          divider: true
        },
        {
          icon: 'mdi-domain',
          title: this.$t('for Business person'),
          link: this.localePath('/worker')
        },
        {
          icon: 'mdi-home-city',
          title: this.$t('for Lodging business'),
          link: this.localePath('/lodging'),
          divider: true
        },
        {
          title: this.$t('About COVID-19 countermeasure information'),
          link:
            'https://www.pref.gifu.lg.jp/site/covid19/'
        },
        {
          title: this.$t('Cancelled public events'),
          link: 'https://www.pref.gifu.lg.jp/site/covid19/26717.html'
        },
        {
          title: this.$t('Government official website'),
          link: 'https://www.pref.gifu.lg.jp/',
          divider: true
        },
        {
          title: this.$t('Other local Government'),
          link:
            'https://github.com/tokyo-metropolitan-gov/covid19/blob/development/FORKED_SITES.md'
        },
        {
          title: this.$t('About us'),
          link: this.localePath('/about')
        }
      ]
    }
  },
  watch: {
    $route: 'handleChageRoute'
  },
  methods: {
    handleChageRoute() {
      // nuxt-link で遷移するとフォーカスが残り続けるので $route を監視して SideNavigation にフォーカスする
      return this.$nextTick().then(() => {
        const $Side = this.$refs.Side
        if ($Side) {
          $Side.focus()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.SideNavigation {
  position: relative;
  height: 100%;
  background: $white;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
  &:focus {
    outline: none;
  }
}

.SideNavigation-Header {
  padding: 1.25em 0 1.25em 1.25em;
  @include lessThan($small) {
    display: flex;
    padding: 7px 0 7px 20px;
  }
}

.SideNavigation-Heading {
  font-size: 13px;
  color: $gray-3;
}

.SideNavigation-HeadingLink {
  display: flex;
  width: 100%;
  color: $gray-3;
  &:link,
  &:hover,
  &:focus,
  &:visited,
  &:active {
    color: inherit;
    text-decoration: none;
  }
  &:hover,
  &:focus {
    font-weight: bold;
  }
  &:focus {
    outline: 1px dotted $gray-3;
  }

  @include lessThan($small) {
    align-items: center;
  }
  @include largerThan($small) {
    flex-direction: column;
  }
}

/* .SideNavigation-HeaderLogo {
  @include lessThan($tiny) {
    width: 90px;
  }
} */

.SideNavigation-HeaderLogo {
  margin: 20px 16px 0 0;
  width: 110px;
  @include lessThan($small) {
    margin-top: 0;
  }
}

.SideNavigation-HeaderLogoLinkText {
  margin-top: 8px;
  font-size: 13px;
  color: #898989;
  padding: 0.5em 0;
  text-decoration: none;
  @include lessThan($small) {
    flex-grow: auto;
    margin-left: 10px;
  }
  /* @include lessThan($tiny) {
    margin-left: 10px;
  } */
  @include largerThan($small) {
    margin-top: 10px;
  }
}

.SideNavigation-OpenIcon {
  margin-right: 20px;
  /* @include lessThan($tiny) {
    margin-right: 10px;
  } */
  @include largerThan($small) {
    display: none;
  }
}

.SideNavigation-CloseIcon {
  width: 21px;
  margin-top: 20px;
  @include largerThan($small) {
    display: none;
  }
}

.SideNavigation-Body {
  padding: 0 20px 20px;
  @include lessThan($small) {
    display: none;
    &.-opened {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      display: block !important;
      width: 100%;
      z-index: 1000;
      background-color: $white;
      height: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
}

.SideNavigation-Menu {
  padding-top: 0;
}

.SideNavigation-Language {
  padding-top: 20px;
}

.SideNavigation-LanguageLabel {
  display: block;
  margin-bottom: 5px;
  font-size: 0.85rem;
}

.SideNavigation-Footer {
  padding-top: 20px;
  background-color: $white;
}

.SideNavigation-Social {
  display: flex;
}

.SideNavigation-SocialLink {
  border: 1px dotted transparent;
  border-radius: 30px;
  color: $gray-3;
  &:link,
  &:hover,
  &:focus,
  &:visited,
  &:active {
    color: inherit;
    text-decoration: none;
  }
  &:focus {
    border-color: $gray-3;
    outline: none;
  }

  & + & {
    margin-left: 10px;
  }

  img {
    width: 30px;
  }
}

.SideNavigation-Copyright {
  display: block;
  margin-top: 10px;
  color: $gray-1;
  font-size: 10px;
  line-height: 1.2;
  font-weight: bold;
}

.SideNavigation-LicenseLink {
  &:focus {
    outline: 1px dotted $gray-3;
  }
}
</style>