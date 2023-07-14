<template>
  <Payment
    v-if="refsReady"
    :merchant-data="merchantData"
    :form-params="formParams"
    :styles="styles"
    :google-pay-button-params="googlePayButtonParams"
    :google-pay-container-ref="googleButton"
    :apple-pay-container-ref="appleButton"
    @mounted="log"
  />
  <div>Google Button</div>
  <div ref="googleButton" />
  <div>Apple Button</div>
  <div ref="appleButton" />
  <button @click="toggleTemplate">
    Toggle template
  </button>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { FormType } from '@solidgate/client-sdk-loader'
import Payment, { InitConfig } from '../lib'

let refsReady = ref(false)
const googleButton = ref<HTMLDivElement>()
const appleButton = ref<HTMLDivElement>()

onMounted(() => {
  refsReady.value = true
})

const merchantData: InitConfig['merchantData'] = {
  merchant: 'TEST',
  signature: import.meta.env.VITE_SIGNATURE,
  paymentIntent: import.meta.env.VITE_PAYMENT_INTENT
}

let formParams = reactive<NonNullable<InitConfig['formParams']>>({
  formTypeClass: FormType.Default
})

const styles = {
  card_number: {
    'background-color': 'white'
  }
}

const googlePayButtonParams = {
  containerId: 'test',
  color: 'white'
}

function log (v: unknown) {
  // eslint-disable-next-line no-console
  console.log(v)
}

function toggleTemplate () {
  formParams.formTypeClass =
    formParams.formTypeClass === FormType.Default
      ? FormType.Card
      : FormType.Default
}
</script>
