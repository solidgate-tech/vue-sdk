import { InitConfig } from '@solidgate/client-sdk-loader'

import {
  GOOGLE_PAY_BUTTON_CONTAINER_ID,
  APPLE_PAY_BUTTON_CONTAINER_ID,
  PAYPAL_BUTTON_CONTAINER_ID
} from '../constants'

const payButtonIds = {
  googlePayButtonParams: {
    title: 'GooglePay',
    id: GOOGLE_PAY_BUTTON_CONTAINER_ID
  },
  applePayButtonParams: {
    title: 'ApplePay',
    id: APPLE_PAY_BUTTON_CONTAINER_ID
  },
  paypalButtonParams: {
    title: 'PayPal',
    id: PAYPAL_BUTTON_CONTAINER_ID
  }
}

function getPayButtonParams<
  T extends
    | 'googlePayButtonParams'
    | 'applePayButtonParams'
    | 'paypalButtonParams'
> (config: InitConfig, key: T, container: HTMLElement | undefined) {
  const payParams = {
    ...(config[key] || {})
  } as NonNullable<InitConfig[T]>

  if (payParams.containerId) {
    delete payParams.containerId
  }

  const syntheticId = payButtonIds[key].id

  if (container) {
    if (container.id && container.id !== syntheticId) {
      console.warn(
        `Id attribute "${container.id}" of ${payButtonIds[key].title} container will be overridden`
      )
    }

    payParams.containerId = syntheticId
    container.id = syntheticId
  }

  if (Object.keys(payParams).length) {
    return payParams
  }
}

export default getPayButtonParams
