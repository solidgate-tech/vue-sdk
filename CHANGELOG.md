**1.5.0**

Reinit form in case of init parameters change, declared emits in Vue way

***

**1.4.0**

Added  **Cartes Bancaires** card brand support

***

**1.3.0**

Added **formParams.buttonType** config param

You may use it to set **continue** button type
```typescript
import { FormButtonType } from '@solidgate/vue-sdk'

initConfig.formParams.buttonType = FormButtonType.Continue
```

***

**1.2.0**

Added **formParams.autoFocus** config param

***

**1.1.2**

Added license

***

**1.1.0**


- Added **AdditionalFields** enum
- Fixed types which controlling labels visibility (like **initConfig.formParams.cardNumberLabel**)
- Deprecated **initConfig.allowedAdditionalFields** usage
- Added **CardMessage** event
