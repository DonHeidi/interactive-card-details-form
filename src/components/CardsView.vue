<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    name: {
      type: String,
      default: 'Janeeeee Appleseed',
    },
    number: {
      type: String,
      default: '0000000000000000',
    },
    cvc: {
      type: String,
      default: '000',
    },
    expirationDate: {
      type: Object,
      default() {
        return { month: '00', year: '00' }
      },
    },
  },
})
</script>
<template>
  <div class="cards-view">
    <div class="card" id="card-background">
      <span id="cvc">{{ cvc }}</span>
    </div>
    <div class="card" id="card-foreground">
      <div></div>
      <span id="number">{{ number.match(/.{1,4}/g)?.join(' ') }}</span>
      <span id="name">{{ name }}</span>
      <span id="expiration-date"
        >{{ expirationDate.month }}/{{ expirationDate.year }}</span
      >
    </div>
  </div>
</template>
<style lang="css" scoped>
.cards-view {
  display: grid;
  color: white;
  font-size: 9px;
  font-weight: 500;
  position: relative;
  background-image: url('@/assets/bg-main-mobile.png');
  background-size: cover;
  width: 100%;
  /* height: 16rem; */
  height: clamp(16rem, calc(0.6 * 100vw), 340px);
  place-content: center;
  filter: drop-shadow(0px 39px 60px rgb(0, 0, 0, 14.25%));
}

#card-foreground {
  background-image: url('@/assets/bg-card-front.png');
  left: 4.27%;
  top: 7.5rem;
}

#card-foreground:after {
  content: '';
  position: absolute;
  height: 30px;
  width: 54px;
  top: 17.6px;
  left: 19px;
  background-image: url('@/assets/card-logo.svg');
  background-size: cover;
}

#card-background {
  background-image: url('@/assets/bg-card-back.png');
  right: 4.27%;
  top: 2rem;
}

#card-foreground > * {
  position: absolute;
  margin-left: 19px;
}

#cvc {
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 1.29px;
  position: absolute;
  top: 50%;
  right: 10%;
  translate: 0 -50%;
}

#number {
  font-size: 18px;
  top: 84.6px;
}

#name {
  top: 124.6px;
}

#expiration-date {
  top: 124.6px;
  left: 232.11px;
}

.card {
  aspect-ratio: 447 / 245;
  width: clamp(286px, 77%, 447px);
  position: absolute;
  background-size: cover;
}
</style>
