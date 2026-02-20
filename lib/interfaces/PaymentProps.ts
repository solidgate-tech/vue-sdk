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
  bizumButtonParams?: Omit<InitConfig['bizumButtonParams'], 'containerId'>
  blikButtonParams?: Omit<InitConfig['blikButtonParams'], 'containerId'>
  mbwayButtonParams?: Omit<InitConfig['mbwayButtonParams'], 'containerId'>
  pixQrButtonParams?: Omit<InitConfig['pixQrButtonParams'], 'containerId'>
  googlePayContainerRef?: HTMLDivElement
  applePayContainerRef?: HTMLDivElement
  paypalContainerRef?: HTMLDivElement
  pixContainerRef?: HTMLDivElement
  bizumContainerRef?: HTMLDivElement
  blikContainerRef?: HTMLDivElement
  mbwayContainerRef?: HTMLDivElement
  pixQrContainerRef?: HTMLDivElement
  onReadyPaymentInstance?: (paymentInstance: ClientSdkInstance) => void
}

export default PaymentProps
