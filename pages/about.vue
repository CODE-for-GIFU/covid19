<template>
  <div class="About">
    <h2 class="About-Heading">
      {{ $t('当サイトについて')}}
    </h2>
    <TextCard>
      {{ $t('当サイトは新型コロナウイルス感染症（COVID-19）に関する最新情報を提供するために、岐阜県が公開しているデータをもとに有志が開設したものです。')}}<br />
      <br/>
      {{ $t('2020/05/09より岐阜県の公認サイトとなりました。運営は引き続き有志が行っています。')}}<br />
      <br/>
      {{ $t('岐阜県による公式情報と客観的な数値をわかりやすく伝えることで、岐阜県にお住まいの方や、岐阜県内に拠点を持つ企業の方、岐阜県を訪れる方が、現状を把握して適切な対策を取れるようにすることを目的としています。')}}<br/>
      <br/>
      {{ $t('※ 当サイトは複製・改変が許されたオープンソースライセンスの下で公開されている、東京都新型コロナウイルス感染症対策サイトの仕組みを利用しています。')}}<br/>
    </TextCard>
    <TextCard title="ブラウザ環境について">
      {{ $t('当サイトは以下の環境でご覧いただくことを推奨いたします。')}}<br />
      <ul class="About-Browser-List">
        <li>Microsoft Edge {{ $t('最新版')}}</li>
        <li>Mozilla Firefox {{ $t('最新版')}}</li>
        <li>Google Chrome {{ $t('最新版 (Windows 10以上)')}}</li>
        <li>Safari (macOS) {{ $t('最新版')}}</li>
        <li>Opera {{ $t('最新版')}}</li>
      </ul>
      ※
      {{ $t('推奨環境以外で利用された場合や、推奨環境下でもご利用のブラウザの設定等によっては、正しく表示されない場合がありますのでご了承ください。')}}
    </TextCard>
    <TextCard title="当サイトへのリンクについて">
      {{ $t('当サイトへのリンクは自由です。')}}
    </TextCard>
    <TextCard title="JavaScriptについて">
      {{ $t('当サイトではJavaScriptを使用しております。')}}<br />
      {{ $t('JavaScriptを無効にして使用された場合、各ページが正常に動作しない、または、表示されない場合がございます。')}}<br />
      {{ $t('当サイトをご利用の際には、JavaScriptを有効にして頂きますようお願いいたします。')}}
    </TextCard>
    <TextCard title="クッキー (Cookie) について">
      {{ $t('当サイトの一部ではクッキーを使用しています。')}}<br />
      {{ $t('クッキーとは、Webコンテンツからの要求で利用者の手元の端末に一時的に保存されるデータのことで、当サイトでは利用状況の把握のためにクッキーを使用する場合があります。')}}<br />
      <br />
      {{ $t('ブラウザに関する情報の収集を希望しない場合は、インターネット閲覧ソフト（ブラウザ）をご自身で設定することにより、クッキーの機能が働かないようにすることも可能です。')}}<br />
      <br />
      {{ $t('ただし、クッキーを受け入れない設定をされている場合は、当サイトの機能が正常に動作しない場合がございます。')}}
    </TextCard>
    <TextCard title="Google Analyticsの利用について">
      {{ $t('当サイトでは、サービス向上やWebサイトの改善のためにGoogle LLCの提供するアクセス分析のツールであるGoogle Analyticsを利用した計測を行っております。')}}<br />
      {{ $t('Google Analyticsは、当サイトが発行するクッキー(Cookie)を利用して、個人を特定する情報を含まずにWebサイトの利用データ（アクセス状況、トラフィック、閲覧環境など）を収集しております。')}}
      {{ $t('クッキー(Cookie)の利用に関してはGoogleのプライバシーポリシーと規約に基づいております。')}}<br />
      {{ $t('取得したデータはWebサイト利用状況の分析、サイト運営者へのレポートの作成、その他のサービスの提供に関わる目的に限り、これを使用します。')}}<br />
      <br />
      {{ $t('Google Analyticsの利用規約及びプライバシーポリシーに関する説明については、Google Analyticsのサイトをご覧ください。')}}<br />
      <ul>
        <li>
          <a
            href="https://marketingplatform.google.com/about/analytics/terms/jp"
            target="_blank"
            rel="noopener"
          >
            {{ $t('Google Analytics利用規約')}}
          </a>
        </li>
        <li>
          <a
            href="https://policies.google.com/privacy?hl=ja"
            target="_blank"
            rel="noopener"
          >
            {{ $t('Googleのプライバシーポリシー')}}
          </a>
        </li>
        <li>
          <a
            href="https://support.google.com/analytics/answer/6004245"
            target="_blank"
            rel="noopener"
          >
            {{ $t('Google Analyticsに関する詳細情報')}}
          </a>
        </li>
      </ul>
    </TextCard>
    <TextCard title="免責事項">
      {{ $t('当サイトに掲載されている情報の正確性については万全を期していますが、利用者が当サイトの情報を用いて行う一切の行為について責任を負うものではありません。')}}<br />
      <br />
      {{ $t('また、利用者が当サイトを利用したことにより発生した利用者の損害及び利用者が第三者に与えた損害に対して、責任を負うものではありません。')}}<br />
      <br />
      {{ $t('当サイトに掲載されている情報は、予告なしに変更又は削除することがあります。')}}
    </TextCard>
    <TextCard title="データについて">
      {{ $t('当サイトで公開しているデータは県内の行政が公開したデータをもとに作成しています。')}}<br/>
      {{ $t('各行政のサイトについては')}} <nuxt-link :to="localePath('/municipalities')">{{ $t('岐阜県自治体コロナ対策情報一覧')}}</nuxt-link> {{ $t('をご覧ください。')}}
    </TextCard>
    <TextCard title="ソースコードについて">
      {{ $t('当サイトのソースコードはMITライセンスで公開されており、誰でも自由に利用することができます。')}}
      {{ $t('詳しくは、')}}<a
        href="https://github.com/CODE-for-GIFU/covid19"
        target="_blank"
        rel="noopener"
        >{{ $t('GitHub リポジトリ')}}</a
      >{{ $t('をご確認ください。')}}
    </TextCard>
    <TextCard title="お問い合わせについて">
      <p>{{ $t('過去にいただいたご質問等の内容は、次のURLにてご確認いただけます。')}}<br/>
      {{ $t('お問い合わせの前にご確認ください。')}}<br/>
        <a
          href="https://github.com/CODE-for-GIFU/covid19/issues?q=label%3Acontact"
          target="_blank"
          rel="noopener"
        >
          {{ $t('お問い合わせ対応状況')}}
        </a>
      </p>
      {{ $t('当サイトへの改善のご要望・お問い合わせは、こちらのフォームにお願いします。')}}<br/>
      <a
        href="https://forms.gle/VBeVXFY8EQD6uJ6e7"
        target="_blank"
        rel="noopener"
        >{{ $t('お問い合わせフォーム')}}</a
      >
    </TextCard>
  </div>
</template>

<script lang="ts">
import TextCard from '@/components/TextCard.vue'

export default {
  components: {
    TextCard
  },
  head() {
    return {
      title: '当サイトについて'
    }
  }
}
</script>

<style lang="scss">
.About {
  &-Heading {
    @include font-size(30);
    font-weight: normal;
    color: $gray-2;
    margin-bottom: 12px;
  }
}
</style>
