<script lang="ts">
import { defineComponent } from 'vue'

const withZerosAsSuffix = (string: string, length: number) => {
  const diff = Math.abs(string.length - length)
  const suffix = [...Array(diff)].map(() => '0').join('')
  return string + suffix
}

export default defineComponent({
  props: {
    name: {
      type: String,
      default: 'Janeeeee Appleseed',
    },
    cardNumber: {
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
  methods: {
    updateNumber: (cardNumber: string) =>
      withZerosAsSuffix(cardNumber, 16)
        .match(/.{1,4}/g)
        ?.join(' '),
    updateExpirationDate: (month: string, year: string) =>
      `${withZerosAsSuffix(month, 2)}/${withZerosAsSuffix(year, 2)}`,
    updateCVC: (cvc: string) => withZerosAsSuffix(cvc, 3),
  },
})
</script>

<template>
  <div class="cards-view">
    <div class="card" id="card-background">
      <span id="cvc">{{ updateCVC(cvc) }}</span>
    </div>
    <div class="card" id="card-foreground">
      <div></div>
      <span id="number">{{ updateNumber(cardNumber) }}</span>
      <span id="name">{{ name }}</span>
      <span id="expiration-date">{{ updateExpirationDate(expirationDate.month, expirationDate.year) }}</span>
    </div>
  </div>
</template>

<style lang="css" scoped>
.cards-view {
  color: white;
  font-size: 9px;
  font-weight: 500;
  position: relative;
  background-image: url('@/assets/bg-main-mobile.png');
  background-size: cover;
  height: clamp(16rem, calc(0.6 * 100vw), 340px);
  filter: drop-shadow(0px 39px 60px rgb(0, 0, 0, 14.25%));
}

#card-foreground {
  background-image: url('@/assets/bg-card-front.png');
  left: calc(50% - 187.5px + 16px);
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
  right: calc(50% - 187.5px + 16px);
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
  line-height: 11px;
  translate: 0 -50%;
}

#number {
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 2.2px;
  top: 84.6px;
}

#name {
  font-weight: 500;
  letter-spacing: 1.29px;
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

@media screen and (min-width: 580px) {
  .card {
    font-size: 14px;
    letter-spacing: 2px;
  }

  #card-foreground:after {
    top: 28px;
    left: 32px;
    height: 47px;
    width: 84px;
  }

  #number {
    left: 32px;
    top: 139px;
    font-size: 1.75rem;
    letter-spacing: 3.42px;
  }

  #name {
    left: 32px;
    top: 200.5px;
  }

  #expiration-date {
    top: 200.5px;
    right: 26.5px;
  }
}

@media screen and (min-width: 1440px) {
  .cards-view {
    background-image: url('@/assets/bg-main-desktop.png');
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
  }

  #card-foreground {
    top: calc(50% - 263px);
    left: 10.25rem;
  }

  #card-background {
    top: calc(50% + 19px);
    left: 258px;
  }
}
</style>
