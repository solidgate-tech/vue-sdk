<template>
  <Payment
    :merchant-data="merchantData"
    :styles="styles"
    :google-pay-button-params="googlePayButtonParams"
    :google-pay-container-ref="googleButton"
    :apple-pay-container-ref="appleButton"
  />

  <div>Google Button</div>
  <div ref="googleButton" />
  <div>Apple Button</div>
  <div ref="appleButton" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Payment, { InitConfig } from '../lib'

const googleButton = ref<HTMLDivElement>()
const appleButton = ref<HTMLDivElement>()

const merchantData: InitConfig['merchantData'] = {
  merchant: 'TEST',
  signature: import.meta.env.VITE_SIGNATURE,
  paymentIntent: import.meta.env.VITE_PAYMENT_INTENT
}

const styles = {
  card_number: {
    'background-color': 'gray'
  }
}

const googlePayButtonParams = {
  containerId: 'test',
  color: 'white'
}
</script>
