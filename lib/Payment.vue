<template>
  <theme-provider :theme="{}">
    <styled-payment :id="IFRAME_CONTAINER_ID" />
  </theme-provider>
</template>

<script lang="ts" setup>
import {
  defineProps,
  defineEmits,
  onMounted,
  withDefaults,
  onUnmounted,
  ref,
  watch,
  isReactive
} from 'vue'
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
  CardMessage,
  ClientSdkInstance
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

const emit = defineEmits<{
  (e: 'mounted', event: MountedMessage): void
  (e: 'error', payload: ErrorMessage): void
  (e: 'success', payload: SuccessMessage): void
  (e: 'fail', payload: FailMessage): void
  (e: 'submit', payload: SubmitMessage): void
  (e: 'verify', payload: VerifyMessage): void
  (e: 'customStylesAppended', payload: CustomStylesAppendedMessage): void
  (e: 'formRedirect', payload: RedirectMessage): void
  (e: 'interaction', payload: InteractionMessage): void
  (e: 'orderStatus', payload: OrderStatusMessage): void
  (e: 'resize', payload: ResizeMessage): void
  (e: 'card', payload: CardMessage): void
  (e: 'readyPaymentInstance', payload: ClientSdkInstance): void
}>()

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
  onMounted: (e) => props.onMounted && props.onMounted(e),
  onError: (e) => props.onError && props.onError(e),
  onSuccess: (e) => props.onSuccess && props.onSuccess(e),
  onFail: (e) => props.onFail && props.onFail(e),
  onSubmit: (e) => props.onSubmit && props.onSubmit(e),
  onVerify: (e) => props.onVerify && props.onVerify(e),
  onCustomStylesAppended: (e) =>
    props.onCustomStylesAppended && props.onCustomStylesAppended(e),
  onFormRedirect: (e) => props.onFormRedirect && props.onFormRedirect(e),
  onInteraction: (e) => props.onInteraction && props.onInteraction(e),
  onOrderStatus: (e) => props.onOrderStatus && props.onOrderStatus(e),
  onResize: (e) => props.onResize && props.onResize(e),
  onCard: (e) => props.onCard && props.onCard(e)
}

onMounted(async () => {
  sdkInstance.value = await initClientSdk(config)

  if (sdkInstance.value) {
    onSubscribe(sdkInstance.value, callbacks)
    props.onReadyPaymentInstance?.(sdkInstance.value)
  }
})

onUnmounted(() => {
  sdkInstance?.value?.destroy()
})

watch(
  Object.values(config).map((value) =>
    isReactive(value) ? value : () => value
  ),
  async () => {
    sdkInstance.value = await initClientSdk(config)
  }
)
</script>
