import { ClientSdkInstance, MessageType } from '@solidgate/client-sdk-loader'

import ClientSdkEventsProvider from '../types/ClientSdkEventsProvider'

const onSubscribe = (
  sdkInstanceValue: ClientSdkInstance,
  props: ClientSdkEventsProvider
): void => {
  sdkInstanceValue.on(MessageType.Mounted, (e) => props.onMounted(e.data))
  sdkInstanceValue.on(MessageType.Success, (e) => props.onSuccess(e.data))
  sdkInstanceValue.on(MessageType.Error, (e) => props.onError(e.data))
  sdkInstanceValue.on(MessageType.Fail, (e) => props.onFail(e.data))
  sdkInstanceValue.on(MessageType.Submit, (e) => props.onSubmit(e.data))
  sdkInstanceValue.on(MessageType.Verify, (e) => props.onVerify(e.data))
  sdkInstanceValue.on(MessageType.CustomStylesAppended, (e) =>
    props.onCustomStylesAppended(e.data)
  )
  sdkInstanceValue.on(MessageType.Redirect, (e) => props.onFormRedirect(e.data))
  sdkInstanceValue.on(MessageType.Interaction, (e) =>
    props.onInteraction(e.data)
  )
  sdkInstanceValue.on(MessageType.OrderStatus, (e) =>
    props.onOrderStatus(e.data)
  )
  sdkInstanceValue.on(MessageType.Resize, (e) => props.onResize(e.data))
  sdkInstanceValue.on(MessageType.Card, (e) => props.onCard(e.data))
}

export default onSubscribe
