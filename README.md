# Solidgate Vue3 SDK

This repository is a Vue 3 wrapper for the Solidgate Client Software Development Kit (SDK).

It supports rendering payment forms and resign forms, including custom container elements for <a href="https://docs.solidgate.com/payments/integrate/payment-form/google-pay-button/" target="_blank">Google Pay</a>, <a href="https://docs.solidgate.com/payments/integrate/payment-form/apple-pay-button/" target="_blank">Apple Pay</a>, or <a href="https://docs.solidgate.com/payments/integrate/payment-form/paypal-button/" target="_blank">PayPal</a> buttons.

Check our
* <a href="https://docs.solidgate.com/" target="_blank">Payment guide</a> to understand business value better
* <a href="https://api-docs.solidgate.com/" target="_blank">API Reference</a> to find more examples of usage

## Structure

<table style="width: 100%; background: transparent;">
  <colgroup>
    <col style="width: 50%;">
    <col style="width: 50%;">
  </colgroup>
  <tr>
    <th>SDK for Vue3 contains</th>
    <th>Table of contents</th>
  </tr>
  <tr>
    <td>
      <code>lib</code> – main Vue 3 SDK source code<br>
      <code>public</code> – assets for example project<br>
      <code>src</code> – entry point for example integration<br>
      <code>package.json</code> – project metadata and dependency definitions
    </td>
    <td>
      <a href="https://github.com/solidgate-tech/vue-sdk?tab=readme-ov-file#installation">Installation</a><br>
      <a href="https://github.com/solidgate-tech/vue-sdk?tab=readme-ov-file#usage">Usage</a><br>
      <a href="https://github.com/solidgate-tech/vue-sdk?tab=readme-ov-file#development-server">Development server</a><br>
      <a href="https://github.com/solidgate-tech/vue-sdk?tab=readme-ov-file#build">Build</a>
    </td>
  </tr>
</table>

<br>

## Installation

Run the following command inside your Vue 3 project:

```
npm i @solidgate/vue-sdk
``` 

<br>

## Usage

### Payment form

Render a <a href="https://docs.solidgate.com/payments/integrate/payment-form/create-your-payment-form/" target="_blank">payment form</a> component in your Vue3 project.


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

#### Custom containers

To render <a href="https://docs.solidgate.com/payments/integrate/payment-form/google-pay-button/" target="_blank">Google Pay</a>, <a href="https://docs.solidgate.com/payments/integrate/payment-form/apple-pay-button/" target="_blank">Apple Pay</a>, or <a href="https://docs.solidgate.com/payments/integrate/payment-form/paypal-button/" target="_blank">PayPal</a> buttons in separate containers, define Payment as an asynchronous component and pass references to the container elements.

```vue
<template>
  <Payment
    :merchan-data="merchantData"
    :google-pay-container-ref="googleButton"
    :apple-pay-container-ref="appleButton"
    :paypal-container-ref="paypalButton"
  />
  <div ref="googleButton" />
  <div ref="appleButton" />
  <div ref="paypalButton" />
</template>

<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue'
import { InitConfig } from '@solidgate/vue-sdk'
const Payment = defineAsyncComponent(() => import('@solidgate/vue-sdk'))

const googleButton = ref<HTMLDivElement>()
const appleButton = ref<HTMLDivElement>()
const paypalButton = ref<HTMLDivElement>()

const merchantData: InitConfig['merchantData'] = {
  merchant: '<<--YOUR MERCHANT ID-->>',
  signature: '<<--YOUR SIGNATURE OF THE REQUEST-->>',
  paymentIntent: '<<--YOUR PAYMENT INTENT-->>'
}
</script>
```

### Resign form

Render a <a href="https://docs.solidgate.com/payments/integrate/payment-form/resign-payment-form/" target="_blank">resign payment form</a> component in your Vue3 project.

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

<br>

## Development server

Vue3 + Typescript + Vite

1. `cd vue-sdk`
2. `npm i`
3. `npm run start`
4. Navigate to http://localhost:3000/

<br>

## Build

1. `cd vue-sdk`
2. `npm run build`
3. `cd dist`
4. solid-payment.es.js is a js bundle