<template>
  <theme-provider :theme="{}">
    <styled-payment :id="IFRAME_CONTAINER_ID" />
  </theme-provider>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, withDefaults, onUnmounted, ref } from 'vue'
import styled, { ThemeProvider } from 'vue3-styled-components'
import {
  CustomStylesAppendedMessage,
  OrderStatusMessage,
  InteractionMessage,
  RedirectMessage,
  MountedMessage,
  SuccessMessage,
  ResizeMessage,
  VerifyMessage,
  SubmitMessage,
  ErrorMessage,
  FailMessage,
  CardMessage
} from '@solidgate/client-sdk-loader'

import PaymentProps from './interfaces/PaymentProps'

import { IFRAME_CONTAINER_ID } from './constants'

import initClientSdk from './utils/initClientSdk'
import onSubscribe from './utils/onSubscribe'
import ClientSdkEventsProvider from './types/ClientSdkEventsProvider'

import './boot'

const StyledPayment = styled.div`
  iframe {
    border: none;
  }
`

const props = withDefaults(
  defineProps<{
    merchantData: PaymentProps['merchantData']
    width?: PaymentProps['width']
    styles?: PaymentProps['styles']
    formParams?: PaymentProps['formParams']
    googlePayButtonParams?: PaymentProps['googlePayButtonParams']
    applePayButtonParams?: PaymentProps['applePayButtonParams']
    googlePayContainerRef?: PaymentProps['googlePayContainerRef']
    applePayContainerRef?: PaymentProps['applePayContainerRef']
    onReadyPaymentInstance?: PaymentProps['onReadyPaymentInstance']
    onMounted?: (e: MountedMessage) => void
    onError?: (e: ErrorMessage) => void
    onSuccess?: (e: SuccessMessage) => void
    onFail?: (e: FailMessage) => void
    onSubmit?: (e: SubmitMessage) => void
    onVerify?: (e: VerifyMessage) => void
    onCustomStylesAppended?: (e: CustomStylesAppendedMessage) => void
    onFormRedirect?: (e: RedirectMessage) => void
    onInteraction?: (e: InteractionMessage) => void
    onOrderStatus?: (e: OrderStatusMessage) => void
    onResize?: (e: ResizeMessage) => void
    onCard?: (e: CardMessage) => void
  }>(),
  {
    onMounted: () => {},
    onError: () => {},
    onSuccess: () => {},
    onFail: () => {},
    onSubmit: () => {},
    onVerify: () => {},
    onCustomStylesAppended: () => {},
    onFormRedirect: () => {},
    onInteraction: () => {},
    onOrderStatus: () => {},
    onResize: () => {},
    onCard: () => {}
  }
)

const sdkInstance = ref()
const config = {
  merchantData: props.merchantData,
  width: props.width,
  styles: props.styles,
  formParams: props.formParams,
  googlePayButtonParams: props.googlePayButtonParams,
  applePayButtonParams: props.applePayButtonParams,
  googlePayContainerRef: props.googlePayContainerRef,
  applePayContainerRef: props.applePayContainerRef
}
const callbacks: ClientSdkEventsProvider = {
  onMounted: props.onMounted,
  onError: props.onError,
  onSuccess: props.onSuccess,
  onFail: props.onFail,
  onSubmit: props.onSubmit,
  onVerify: props.onVerify,
  onCustomStylesAppended: props.onCustomStylesAppended,
  onFormRedirect: props.onFormRedirect,
  onInteraction: props.onInteraction,
  onOrderStatus: props.onOrderStatus,
  onResize: props.onResize,
  onCard: props.onCard
}

onMounted(async () => {
  sdkInstance.value = await initClientSdk(config)

  if (sdkInstance.value) {
    onSubscribe(sdkInstance.value, callbacks)
    props.onReadyPaymentInstance?.(sdkInstance.value)
  }
})

onUnmounted(() => {
  sdkInstance?.value.destroy()
})
</script>
