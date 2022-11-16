<script lang="ts">
import { defineComponent } from 'vue'

const initialState = () => {
  return {
    cardholderName: '',
    cardNumber: '',
    expirationDate: {
      month: '',
      year: '',
    },
    cvc: '',
    submitted: false,
    reset: false,
  }
}

export default defineComponent({
  data() {
    return initialState()
  },
  methods: {
    submit(e: Event) {
      e.preventDefault()
      this.submitted = true
      return false
    },
  },
  watch: {
    cardholderName(newValue: string) {
      this.$emit('cardholderName', newValue)
    },
    cardNumber(newValue: string) {
      this.$emit('cardNumber', newValue)
    },
    expirationDate: {
      deep: true,
      handler(newValue: { month: string; year: string }) {
        this.$emit('expirationDate', newValue)
      },
    },
    cvc(newValue: string) {
      this.$emit('cvc', newValue)
    },
    reset(newValue: boolean) {
      if (newValue) {
        console.log('Hello there')
        Object.assign(this.$data, initialState())
        this.reset = false
      }
    },
  },
})
</script>

<template>
  <section>
    <div v-if="submitted">
      <button
        @click="
          () => {
            submitted = false
            reset = true
          }
        "
      >
        Continue
      </button>
    </div>
    <form ref="cardForm" v-else @submit="submit">
      <label id="lbl-cardholder" class="form-full-row" for="cardholder-name"
        >Cardholder NAme</label
      >
      <input
        type="text"
        class="form-full-row"
        name="cardholder-name"
        id="cardholder-name"
        ref="cardholder-name"
        placeholder="e.g. Jane Appleseed"
        aria-labelledby="lbl-cardholder"
        pattern="(.|\s)*\S(.|\s)*"
        required
        :value="cardholderName"
        maxlength="52"
        @input="(event) => (cardholderName = (event?.target as HTMLInputElement).value)"
      />
      <span class="form-full-row"></span>
      <label class="form-full-row" for="card-number">Card Number</label>
      <input
        class="form-full-row"
        type="text"
        name="card-number"
        id="card-number"
        placeholder="e.g. 1234 5678 9123 0000"
        pattern="^(\d{4,4}\s){3,3}\d{4,4}"
        required
        :value="cardNumber.match(/.{1,4}/g)?.join(' ')"
        maxlength="19"
        @input="(event) => (cardNumber = (event?.target as HTMLInputElement).value.replace(/\s/g, '').trim())"
      />
      <fieldset>
        <legend>Exp. Date (mm/yy)</legend>
        <label id="frmMonth" for="expiration-date-month" hidden
          >Month (MM)</label
        >
        <input
          type="text"
          name="expiration-date-month"
          id="expiration-date-month"
          placeholder="MM"
          aria-labelledby="frmMonth"
          pattern="0[1-9]|1[0-2]"
          :value="expirationDate.month"
          maxlength="2"
          @input="(event) => (expirationDate.month = (event?.target as HTMLInputElement).value)"
        />
        <label id="frmYear" for="expiration-date-year" hidden>Year (YY)</label>
        <input
          type="text"
          name="expiration-date-year"
          id="expiration-date-year"
          ref="expYear"
          placeholder="YY"
          aria-labelledby="frmYear"
          required
          :value="expirationDate.year"
          maxlength="4"
          @input="(event) => (expirationDate.year = (event?.target as HTMLInputElement).value)"
        />
      </fieldset>
      <label id="lbl-cvc" for="cvc">cvc</label>
      <input
        type="text"
        name="cvc"
        id="cvc"
        ref="cvc"
        placeholder="e.g. 123"
        aria-labelledby="lbl-cvc"
        pattern="[0-9]{3}"
        required
        :value="cvc"
        maxlength="3"
        @input="(event) => (cvc = (event?.target as HTMLInputElement).value)"
      />
      <span></span>
      <input class="form-full-row" type="submit" value="Confirm" />
    </form>
  </section>
</template>

<style scoped lang="scss">
$outer-margin: 1.5rem;
$fs--hl: 1.125rem;
$purple: #21092f;

div {
  margin: $outer-margin;
}

label,
legend {
  font-size: 0.75rem;
  font-weight: 500;
  color: $purple;
  letter-spacing: 2px;
  line-height: 15px;
}

input[type='submit'],
button {
  background: $purple;
  color: #fff;
  font-size: 1.125rem;
  /* font-wseight: 100; */
  border-radius: 0.5rem;
  padding-block: 1rem;
  width: 100%;
  margin-top: 28px;
}

input[type='submit'] {
  margin-top: 0.5rem;
}

#expiration-date-month,
#expiration-date-year {
  grid-row: 6 / 7;
  margin-right: 0.5rem;
}

#expiration-date-month {
  grid-column: 1 / 2;
}

#expiration-date-year {
  grid-column: 2 / 3;
}

input[type='text'] {
  color: $purple;
  border-radius: 8px;
  margin-top: 9px;
  margin-bottom: 20px;
  padding: 11px 16px;
  border-color: #dfdee0;
  border-width: 1px;
  height: 45px;
}

::placeholder {
  color: $purple;
  opacity: 0.25;
  font-size: 18px;
  line-height: 23px;
}

#lbl-cvc {
  grid-row: 6 / 7;
  grid-column: 3 / 5;
}

#cvc {
  grid-row: 7 / 8;
  grid-column: 3 / 5;
}

section {
  margin-top: clamp(90px, 24%, 140px);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

form {
  display: grid;
  text-align: left;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(
      0,
      1fr
    );
  text-transform: uppercase;
  margin-inline: 1.5rem;
}

form span {
  display: block;
}

.form-full-row {
  grid-column: 1 / 5;
}

fieldset {
  display: grid;
  border: none;
  grid-column: 1 / 3;
  max-width: 100%;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: subgrid;
  grid-row-start: 6;
  grid-row-end: 8;
}

@media screen and (min-width: 1440px) {
  section {
    margin-top: 0;
    max-width: 100%;
    margin-right: 227px;
  }

  input[type='submit'],
  button {
    margin-top: 14px;
  }

  form,
  div {
    width: 381px;
    margin-inline: 0;
    margin-block: 0;
  }

  input[type='text'] {
    margin-bottom: 26px;
  }
}
</style>
