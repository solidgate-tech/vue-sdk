import {
  ClientSdkInstance,
  InitConfig,
  SdkLoader
} from '@solidgate/client-sdk-loader'

import PaymentProps from '../interfaces/PaymentProps'

import { IFRAME_CONTAINER_ID } from '../constants'

import getPayButtonParams from './getPayButtonParams'

const initPaymentForm = async (
  props: PaymentProps
): Promise<ClientSdkInstance> => {
  const {
    merchantData,
    width,
    styles,
    formParams,
    googlePayContainerRef,
    applePayContainerRef
  } = props

  if (!merchantData) {
    throw new Error("Attribute 'merchantData' is required")
  }

  const clientSdk = await SdkLoader.load()

  const initConfig: InitConfig = {
    merchantData,
    iframeParams: {
      containerId: IFRAME_CONTAINER_ID,
      ...(width && { width })
    },
    ...(formParams && { formParams }),
    ...(styles && { styles })
  }

  const googleButtonParams = getPayButtonParams(
    props,
    'googlePayButtonParams',
    googlePayContainerRef
  )
  if (googleButtonParams) {
    initConfig.googlePayButtonParams = googleButtonParams
  }

  const appleButtonParams = getPayButtonParams(
    props,
    'applePayButtonParams',
    applePayContainerRef
  )
  if (appleButtonParams) {
    initConfig.applePayButtonParams = appleButtonParams
  }

  return clientSdk.init(initConfig)
}

export default initPaymentForm
