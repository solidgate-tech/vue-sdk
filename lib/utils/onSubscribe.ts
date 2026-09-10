import { ClientSdkInstance, MessageType } from '@solidgate/client-sdk-loader'

import ClientSdkEventsProvider, {
  WalletCardTypeCallback
} from '../types/ClientSdkEventsProvider'

export const WALLET_CARD_TYPE_EVENT = 'walletCardType'

const onSubscribe = (
  sdkInstanceValue: ClientSdkInstance,
  callbacks: Partial<ClientSdkEventsProvider> & {
    onWalletCardType?: WalletCardTypeCallback
  }
): void => {
  const {
    onMounted = () => {},
    onError = () => {},
    onSuccess = () => {},
    onFail = () => {},
    onSubmit = () => {},
    onVerify = () => {},
    onCustomStylesAppended = () => {},
    onPaymentDetails = () => {},
    onFormRedirect = () => {},
    onInteraction = () => {},
    onOrderStatus = () => {},
    onResize = () => {},
    onCard = () => {},
    onInvoicePreview = () => {},
    onWalletCardType = () => {}
  } = callbacks

  sdkInstanceValue.on(MessageType.Mounted, (e) => onMounted(e.data))
  sdkInstanceValue.on(MessageType.Success, (e) => onSuccess(e.data))
  sdkInstanceValue.on(MessageType.Error, (e) => onError(e.data))
  sdkInstanceValue.on(MessageType.Fail, (e) => onFail(e.data))
  sdkInstanceValue.on(MessageType.Submit, (e) => onSubmit(e.data))
  sdkInstanceValue.on(MessageType.Verify, (e) => onVerify(e.data))
  sdkInstanceValue.on(MessageType.CustomStylesAppended, (e) =>
    onCustomStylesAppended(e.data)
  )
  sdkInstanceValue.on(MessageType.PaymentDetails, (e) =>
    onPaymentDetails(e.data)
  )
  sdkInstanceValue.on(MessageType.Redirect, (e) => onFormRedirect(e.data))
  sdkInstanceValue.on(MessageType.Interaction, (e) => onInteraction(e.data))
  sdkInstanceValue.on(MessageType.OrderStatus, (e) => onOrderStatus(e.data))
  sdkInstanceValue.on(MessageType.Resize, (e) => onResize(e.data))
  sdkInstanceValue.on(MessageType.Card, (e) => onCard(e.data))
  sdkInstanceValue.on(MessageType.InvoicePreview, (e) =>
    onInvoicePreview(e.data)
  )
  sdkInstanceValue.on(WALLET_CARD_TYPE_EVENT, (event, pauseUntil) =>
    onWalletCardType(event.data, pauseUntil)
  )
}

export default onSubscribe
