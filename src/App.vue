<template>
  <template v-if="!isResignForm">
    <Payment
      v-if="refsReady"
      :merchant-data="merchantData"
      :form-params="formParams"
      :styles="styles"
      :google-pay-button-params="googlePayButtonParams"
      :google-pay-container-ref="googleButton"
      :apple-pay-container-ref="appleButton"
      @ready-payment-instance="log"
      @mounted="log"
      @resize="log"
    />
    <div style="margin: 15px 0">
      Google Button
    </div>
    <div ref="googleButton" />
    <div style="margin: 15px 0">
      Apple Button
    </div>
    <div ref="appleButton" />
    <button @click="togglePaymentTemplate">
      Toggle template
    </button>
  </template>
  <template v-if="isResignForm">
    <Resign
      :resign-request="resignRequest"
      :appearance="resignFormAppearance"
      :container="resignFormContainer"
      :styles="resignFormStyles"
      @ready-resign-instance="log"
      @mounted="log"
      @interaction="log"
      @resize="log"
      @resignInitFailed="log"
    />
    <button @click="toggleResignFormConfig">
      Update resign form config
    </button>
  </template>
  <div style="margin-top: 15px">
    <button @click="isResignForm = !isResignForm">
      {{ isResignForm ? 'Init payment form' : 'Init resign form' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { FormType, ResignFormConfig } from '@solidgate/client-sdk-loader'
import Payment, { InitConfig } from '../lib'
import { Resign, ResignRequest } from '../lib'

let refsReady = ref(false)
const googleButton = ref<HTMLDivElement>()
const appleButton = ref<HTMLDivElement>()
let isResignForm = ref(false)

onMounted(() => {
  refsReady.value = true
})

const merchantData: InitConfig['merchantData'] = {
  merchant: 'TEST',
  signature: import.meta.env.VITE_SIGNATURE,
  paymentIntent: import.meta.env.VITE_PAYMENT_INTENT
}

const resignRequest: ResignRequest = {
  merchant: import.meta.env.VITE_RESIGN_MERCHANT,
  signature: import.meta.env.VITE_RESIGN_SIGNATURE,
  resignIntent: import.meta.env.VITE_RESIGN_INTENT
}

let formParams = reactive<NonNullable<InitConfig['formParams']>>({
  formTypeClass: FormType.Default
})

let resignFormAppearance = reactive<
  NonNullable<ResignFormConfig['appearance']>
>({ submitButtonText: 'Pay' })
let resignFormStyles = reactive<NonNullable<ResignFormConfig['styles']>>({})
let resignFormContainer = reactive<NonNullable<ResignFormConfig['container']>>(
  {}
)

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

function togglePaymentTemplate () {
  formParams.formTypeClass =
    formParams.formTypeClass === FormType.Default
      ? FormType.Card
      : FormType.Default
}

function toggleResignFormConfig () {
  resignFormAppearance.submitButtonText = 'Custom submit text'

  if (Object.keys(resignFormStyles).length) {
    delete resignFormStyles['resign-cvv']
  } else {
    resignFormStyles['resign-cvv'] = {
      '.resign-label': {
        display: 'block'
      }
    }
  }

  resignFormContainer.width = resignFormContainer.width ? undefined : '500px'
}
</script>
