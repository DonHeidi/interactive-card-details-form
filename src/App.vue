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
</style>

<script lang="ts">
import CardForm from './components/CardForm.vue'
import CardsView from './components/CardsView.vue'

export default {
  components: {
    CardForm,
    CardsView,
  },
  data() {
    return { name: 'Jane Appleseed' }
  },
  methods: {
    updateFormData(data: { name: string }) {
      //this.$set('name', data.name)
    },
  },
}
</script>

<template>
  <CardsView :name="name" />
  <CardForm @formDataUpdated="updateFormData" />
</template>
