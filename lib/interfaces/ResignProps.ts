import {
  ClientSdkInstance,
  ResignFormConfig,
  ResignRequest
} from '@solidgate/client-sdk-loader'
import ClientSdkEventsProvider from '../types/ClientSdkEventsProvider'

interface ResignProps extends Partial<Omit<ClientSdkEventsProvider, 'onCard'>> {
  resignRequest: ResignRequest
  container?: ResignFormConfig['container']
  appearance?: ResignFormConfig['appearance']
  styles?: ResignFormConfig['styles']
  onReadyResignInstance?: (resignInstance: ClientSdkInstance) => void
  onResignInitFailed?: (error: Error) => void
}

export default ResignProps
