import { ClientSdkInstance, InitConfig } from '@solidgate/client-sdk-loader'

import ClientSdkEventsProvider from '../types/ClientSdkEventsProvider'

interface PaymentProps extends Partial<ClientSdkEventsProvider> {
  merchantData: InitConfig['merchantData']
  width?: string
  styles?: InitConfig['styles']
  formParams?: InitConfig['formParams']
  googlePayButtonParams?: Omit<
    InitConfig['googlePayButtonParams'],
    'containerId'
  >
  applePayButtonParams?: Omit<InitConfig['applePayButtonParams'], 'containerId'>
  paypalButtonParams?: Omit<InitConfig['paypalButtonParams'], 'containerId'>
  pixButtonParams?: Omit<InitConfig['pixButtonParams'], 'containerId'>
  googlePayContainerRef?: HTMLDivElement
  applePayContainerRef?: HTMLDivElement
  paypalContainerRef?: HTMLDivElement
  pixContainerRef?: HTMLDivElement
  onReadyPaymentInstance?: (paymentInstance: ClientSdkInstance) => void
}

export default PaymentProps
