# Solidgate Vue3 SDK

This is a wrapper for Solidgate Client SDK

## Installation

Run inside Vue3 project

```
npm i @solidagate/vue-sdk
``` 

## Usage
Render a payment component in your vue3 project

Component inputs and outputs are similar to described in the docs https://dev.solidgate.cm/developers/d
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

In order to render google/apple button in custom container define Payment as async component and pass l
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

## Development server (Vue3 + Typescript + Vite)

1. cd vue-sdk
2. npm i
3. npm run start
4. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the 

## Build

1. cd vue-sdk
2. npm run build
3. cd dist
4. solid-payment.es.js is a js bundle.


