import { ClientSdkInstance, MessageType } from '@solidgate/client-sdk-loader'

import ClientSdkEventsProvider from '../types/ClientSdkEventsProvider'

const onSubscribe = (
  sdkInstanceValue: ClientSdkInstance,
  callbacks: Partial<ClientSdkEventsProvider>
): void => {
  const {
    onMounted = () => {},
    onError = () => {},
    onSuccess = () => {},
    onFail = () => {},
    onSubmit = () => {},
    onVerify = () => {},
    onCustomStylesAppended = () => {},
    onFormRedirect = () => {},
    onInteraction = () => {},
    onOrderStatus = () => {},
    onResize = () => {},
    onCard = () => {}
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
  sdkInstanceValue.on(MessageType.Redirect, (e) => onFormRedirect(e.data))
  sdkInstanceValue.on(MessageType.Interaction, (e) => onInteraction(e.data))
  sdkInstanceValue.on(MessageType.OrderStatus, (e) => onOrderStatus(e.data))
  sdkInstanceValue.on(MessageType.Resize, (e) => onResize(e.data))
  sdkInstanceValue.on(MessageType.Card, (e) => onCard(e.data))
}

export default onSubscribe
