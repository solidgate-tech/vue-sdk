import { ClientSdkInstance, InitConfig } from '@solidgate/client-sdk-loader'

import ClientSdkEventsProvider, {
  WalletCardTypeCallback
} from '../types/ClientSdkEventsProvider'

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
  upiButtonParams?: Omit<InitConfig['upiButtonParams'], 'containerId'>
  bizumButtonParams?: Omit<InitConfig['bizumButtonParams'], 'containerId'>
  blikButtonParams?: Omit<InitConfig['blikButtonParams'], 'containerId'>
  mbwayButtonParams?: Omit<InitConfig['mbwayButtonParams'], 'containerId'>
  pixQrButtonParams?: Omit<InitConfig['pixQrButtonParams'], 'containerId'>
  cashAppButtonParams?: Omit<InitConfig['cashAppButtonParams'], 'containerId'>
  pixAutomaticoButtonParams?: Omit<
    InitConfig['pixAutomaticoButtonParams'],
    'containerId'
  >
  clickToPayButtonParams?: InitConfig['clickToPayButtonParams']
  googlePayContainerRef?: HTMLDivElement
  applePayContainerRef?: HTMLDivElement
  paypalContainerRef?: HTMLDivElement
  pixContainerRef?: HTMLDivElement
  upiContainerRef?: HTMLDivElement
  bizumContainerRef?: HTMLDivElement
  blikContainerRef?: HTMLDivElement
  mbwayContainerRef?: HTMLDivElement
  pixQrContainerRef?: HTMLDivElement
  cashAppContainerRef?: HTMLDivElement
  pixAutomaticoContainerRef?: HTMLDivElement
  onWalletCardType?: WalletCardTypeCallback
  onReadyPaymentInstance?: (paymentInstance: ClientSdkInstance) => void
}

export default PaymentProps
