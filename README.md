# Solidgate Vue3 SDK

This is a wrapper for Solidgate Client SDK

## Installation

Run inside Vue3 project

```
npm i @solidagate/vue-sdk
``` 

## Usage

### Payment form

Render a payment component in your vue3 project

Component inputs and outputs are described in the docs 
https://docs.solidgate.com/payments/integrate/payment-form/create-your-payment-form/

```vue
<template>
  <Payment :merchant-data="merchantData" />
</template>

<script lang="ts" setup>
import Payment, { InitConfig } from '@solidgate/vue-sdk'

const merchantData: InitConfig['merchantData'] = {
  merchant: '<<--YOUR MERCHANT ID-->>',
  signature: '<<--YOUR SIGNATURE OF THE REQUEST-->>',
  paymentIntent: '<<--YOUR PAYMENT INTENT-->>'
}
</script>
```

In order to render google/apple button in custom container define Payment as async component and pass link to container element
```vue
<template>
  <Payment
    :merchan-data="merchantData"
    :google-pay-container-ref="googleButton"
    :apple-pay-container-ref="appleButton"
  />
  <div ref="googleButton" />
  <div ref="appleButton" />
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue'
import { InitConfig } from '@solidgate/vue-sdk'
const Payment = defineAsyncComponent(() => import('@solidgate/vue-sdk'))

const googleButton = ref<HTMLDivElement>()
const appleButton = ref<HTMLDivElement>()

const merchantData: InitConfig['merchantData'] = {
  merchant: '<<--YOUR MERCHANT ID-->>',
  signature: '<<--YOUR SIGNATURE OF THE REQUEST-->>',
  paymentIntent: '<<--YOUR PAYMENT INTENT-->>'
}
</script>
```

### Resign form

Render a resign component in your vue3 project

Component inputs and outputs are described in the docs
https://docs.solidgate.com/payments/integrate/payment-form/resign-payment-form/

```vue
<template>
  <Resign :resign-request="resignRequest" />
</template>

<script lang="ts" setup>
import { Resign, ResignRequest } from '@solidgate/vue-sdk'

const resignRequest: ResignRequest = {
  merchant: '<<--YOUR MERCHANT ID-->>',
  signature: '<<--YOUR SIGNATURE OF THE REQUEST-->>',
  resignIntent: '<<--YOUR RESIGN INTENT-->>'
}
</script>
```

## Development server (Vue3 + Typescript + Vite)

1. cd vue-sdk
2. npm i
3. npm run start
4. Navigate to `http://localhost:3000/`. 

## Build

1. cd vue-sdk
2. npm run build
3. cd dist
4. solid-payment.es.js is a js bundle.


