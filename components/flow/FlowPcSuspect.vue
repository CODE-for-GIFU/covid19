<template>
  <div :class="$style.FlowComponent">
    <div :class="[$style.SubtleBox, $style.Box1]">
      <img
        :class="$style.Box1Icon"
        src="/flow/flow_arrow.svg"
        aria-hidden="true"
      />
      <div :class="$style.RowItems">
        <div :class="$style.RowItemsHeader">
          <img
            :class="$style.RowItemsHeaderIcon"
            src="/flow/sentiment_very_dissatisfied-24px.svg"
            aria-hidden="true"
          />
          {{ $t('不安に思う方') }}
        </div>
      </div>
      <div :class="$style.RowItems">
        <div :class="$style.CheckBox">
          <img
            :class="$style.CheckBoxIcon"
            src="/flow/check_circle-24px.svg"
            aria-hidden="true"
          />
          {{ $t('微熱') }}
        </div>
        <div :class="$style.CheckBox">
          <img
            :class="$style.CheckBoxIcon"
            src="/flow/check_circle-24px.svg"
            aria-hidden="true"
          />
          {{ $t('軽い咳') }}
        </div>
        <div :class="$style.CheckBox">
          <img
            :class="$style.CheckBoxIcon"
            src="/flow/check_circle-24px.svg"
            aria-hidden="true"
          />
          {{ $t('感染の不安') }}
        </div>
      </div>
    </div>

    <div :class="[$style.SubtleBox, $style.Box2, $style.Center]">
      <div :class="$style.LargerText">
        {{ $t('健康相談窓口') }}
      </div>
      <div :class="$style.SmallerText">
        {{ $t('県庁保健医療課') }}:{{ $t('毎日') }} {{ $t('9:00〜21:00') }}
      </div>
      <div :class="$style.Tel">
        <a :class="$style.TelLink" href="tel:0582728860">
          <img
            :class="$style.TelLinkIcon"
            src="/flow/phone-24px.svg"
            aria-hidden="true"
          />
          058-272-8860<br />
        </a>
      </div>
      <div :class="$style.SmallerText">
        {{ $t('各保健所') }}:{{ $t('平日') }} {{ $t('9:00〜17:00') }}
      </div>
      <div :class="$style.HokenLink">
        <router-link to="/consultations">
          {{ $t('各保健所の電話番号は相談窓口一覧へ') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.FlowComponent {
  color: $gray-2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.Tel {
  @include largerThan($medium) {
    font-size: larger;
  }
}
.TelLink {
  display: flex;
  align-items: center;
  font-weight: bold;
  &:link,
  &:visited,
  &:hover,
  &:active,
  &:focus {
    color: inherit;
    text-decoration: none;
  }
  &Icon {
    display: inline-block;
    margin-right: 5px;
    width: 26px;
    height: 26px;
  }
}
.HokenLink {
    line-height: 22px;
    text-align: center;
    font-weight: bold;
    a {
      color: rgba(0, 0, 0, 0.87);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
}

.CheckBox {
  position: relative;
  border: 2px solid $blue-1;
  border-radius: 4px;
  margin: 8px 0;
  padding: 10px;
  max-width: 200px;
  text-align: center;
  font-weight: bold;
  font-size: calc(0.875rem + ((1vw - 7.68px) * 0.8929));
  @include largerThan($large) {
    font-size: 20px;
  }
  &Icon {
    position: absolute;
    left: -8px;
    top: -8px;
    width: 24px;
    height: 24px;
  }
  &::before {
    position: absolute;
    left: -4px;
    top: -4px;
    width: 20px;
    height: 20px;
    background-color: white;
    content: '';
  }
}
.SubtleBox {
  @include card-container();
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.5em;
}
.Box1 {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 60%;
  flex-direction: row;
  &Icon {
    position: absolute;
    bottom: 40%;
    right: -30px;
    z-index: 1;
    display: block;
    width: 46px;
    height: 46px;
  }
}
.Box2 {
  flex-grow: 0;
  flex-shrink: 0;
  width: 38%;
  flex-direction: column;
  justify-content: center;
  div {
    margin: 0.5em;
  }
}
.RowItems {
  flex-grow: 1;
  text-align: center;
  margin: 0 4px;
  @include largerThan($large) {
    margin: 0 2em;
  }
}
.RowItemsHeader {
  font-size: smaller;
  &Icon {
    display: block;
    margin: auto;
    width: 45px;
    height: 45px;
  }
}
.FlowArrow {
  position: absolute;
  margin: 0 -20px;
  z-index: 1;
}
.LargerText {
  font-size: larger;
  font-weight: bold;
}
.Center {
  text-align: center;
}
.SmallerText {
  font-size: smaller;
}
</style>
