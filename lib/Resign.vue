<template>
  <div
    :id="IFRAME_CONTAINER_ID"
    class="payment-form-container"
  />
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch, isReactive } from 'vue'
import {
  CustomStylesAppendedMessage,
  PaymentDetailsMessage,
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
  ClientSdkInstance
} from '@solidgate/client-sdk-loader'

import ResignProps from './interfaces/ResignProps'

import { IFRAME_CONTAINER_ID } from './constants'

import initResignForm from './utils/initResignForm'
import onSubscribe from './utils/onSubscribe'
import ClientSdkEventsProvider from './types/ClientSdkEventsProvider'

import './boot'

const props = withDefaults(
  defineProps<{
    resignRequest: ResignProps['resignRequest']
    container?: ResignProps['container']
    appearance?: ResignProps['appearance']
    styles?: ResignProps['styles']
    onReadyResignInstance?: ResignProps['onReadyResignInstance']
    onResignInitFailed?: ResignProps['onResignInitFailed']
    onMounted?: (e: MountedMessage) => void
    onError?: (e: ErrorMessage) => void
    onSuccess?: (e: SuccessMessage) => void
    onFail?: (e: FailMessage) => void
    onSubmit?: (e: SubmitMessage) => void
    onVerify?: (e: VerifyMessage) => void
    onCustomStylesAppended?: (e: CustomStylesAppendedMessage) => void
    onPaymentDetails?: (e: PaymentDetailsMessage) => void
    onFormRedirect?: (e: RedirectMessage) => void
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
    onPaymentDetails: () => {},
    onFormRedirect: () => {},
    onInteraction: () => {},
    onOrderStatus: () => {},
    onResize: () => {}
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
  (e: 'paymentDetails', payload: PaymentDetailsMessage): void
  (e: 'formRedirect', payload: RedirectMessage): void
  (e: 'interaction', payload: InteractionMessage): void
  (e: 'orderStatus', payload: OrderStatusMessage): void
  (e: 'resize', payload: ResizeMessage): void
  (e: 'readyResignInstance', payload: ClientSdkInstance): void
  (e: 'resignInitFailed', payload: Error): void
}>()

const sdkInstance = ref()

const resignConfig = {
  resignRequest: props.resignRequest,
  container: props.container,
  appearance: props.appearance,
  styles: props.styles
}

const callbacks: Omit<ClientSdkEventsProvider, 'onCard'> = {
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
  onPaymentDetails: (e) => props.onPaymentDetails && props.onPaymentDetails(e)
}

onMounted(async () => {
  try {
    sdkInstance.value = await initResignForm(resignConfig)

    if (sdkInstance.value) {
      onSubscribe(sdkInstance.value, callbacks)
      props.onReadyResignInstance?.(sdkInstance.value)
    }
  } catch (error) {
    props.onResignInitFailed?.(error as Error)
  }
})

onUnmounted(() => {
  sdkInstance?.value?.destroy()
})

watch(
  Object.values(resignConfig).map((value) =>
    isReactive(value) ? value : () => value
  ),
  async () => {
    try {
      sdkInstance.value = await initResignForm(resignConfig)
    } catch (error) {
      props.onResignInitFailed?.(error as Error)
    }
  }
)
</script>

<style scoped>
.payment-form-container :deep(iframe) {
  border: none;
}
</style>
