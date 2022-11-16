<script lang="ts">
import CardForm from './components/CardForm.vue'
import CardsView from './components/CardsView.vue'

export default {
  components: {
    CardForm,
    CardsView,
  },
  data() {
    return {
      name: 'Jane Appleseed',
      cardNumber: '0000000000000000',
      expirationDate: {
        month: '00',
        year: '00',
      },
      cvc: '000',
    }
  },
}
</script>

<template>
  <CardsView :name="name" :cardNumber="cardNumber" :expirationDate="expirationDate" :cvc="cvc" />
  <CardForm
    @cardholderName="(data: string) => (name = data)"
    @cardNumber="(data: string) => (cardNumber = data)"
    @expirationDate="(data: any) => (expirationDate = data)"
    @cvc="(data:string) => (cvc = data)"
  />
</template>

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&display=swap');
*,
*:after,
*:before {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  font-family: 'Space Grotesk', Helvetica, Arial, sans-serif;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  width: 100%;
  height: 100%;
}

@media screen and (min-width: 1440px) {
  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh;
    align-items: center;
  }
}
</style>
