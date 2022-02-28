<template>
  <theme-provider :theme="{}">
    <styled-payment :id="IFRAME_CONTAINER_ID" />
  </theme-provider>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, withDefaults, onUnmounted, ref } from 'vue'
import styled, { ThemeProvider } from 'vue3-styled-components'
import {
  OrderStatusMessage,
  InteractionMessage,
  MountedMessage,
  SuccessMessage,
  ResizeMessage,
  SubmitMessage,
  ErrorMessage,
  FailMessage,
  SdkMessage,
  MessageType
} from '@solidgate/client-sdk-loader'

import PaymentProps from './interfaces/PaymentProps'

import { IFRAME_CONTAINER_ID } from './constants'

import initClientSdk from './utils/initClientSdk'
import onSubscribe from './utils/onSubscribe'

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
    onVerify?: (e: SdkMessage[MessageType.Verify]) => void
    onCustomStylesAppended?: (
      e: SdkMessage[MessageType.CustomStylesAppended]
    ) => void
    onFormRedirect?: (e: SdkMessage[MessageType.Redirect]) => void
    onInteraction?: (e: InteractionMessage) => void
    onOrderStatus?: (e: OrderStatusMessage) => void
    onResize?: (e: ResizeMessage) => void
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
    onResize: () => {}
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
const callbacks = {
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
  onResize: props.onResize
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
