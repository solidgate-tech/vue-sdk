import {
  ClientSdkInstance,
  ResignFormConfig,
  ResignRequest,
  SdkLoader
} from '@solidgate/client-sdk-loader'

import { IFRAME_CONTAINER_ID } from '../constants'

const initResignForm = async (config: {
  resignRequest: ResignRequest
  appearance?: ResignFormConfig['appearance']
  container?: ResignFormConfig['container']
  styles?: ResignFormConfig['styles']
}): Promise<ClientSdkInstance> => {
  if (!config.resignRequest) {
    throw new Error("Attribute 'resignRequest' is required")
  }

  const clientSdk = await SdkLoader.load()

  const { appearance, styles, container } = config

  const formConfig: ResignFormConfig = {
    container: {
      ...container,
      id: IFRAME_CONTAINER_ID
    }
  }

  if (appearance) {
    formConfig.appearance = appearance
  }
  if (styles) {
    formConfig.styles = styles
  }

  return clientSdk.resign(config.resignRequest, formConfig)
}

export default initResignForm
