**1.10.1**

Update Order Status error interface:
- `error.message: string` -> `error.messages: string[]`

***

**1.10.0**

Added package type declarations

***

**1.9.0**

Removed obsolete dependencies, fixed vulnerabilities

***

**1.8.0**

Add `onResignInitFailed` to Resign component to allow handling the case when the resign form initialization failed

***

**1.7.0**

Added new card brands to `formParams.cardBrands` parameter of the `<Payment />`:

- Rupay
- BC Card
- UnionPay
- Dankort
- GPN Card
- Troy
- Thai Payment Network
- MADA
- Bancontact
- Interac
- Bajaj

***

**1.6.0**

- Added resign form
- Updated Payment Form SDK interfaces: update method, resign method, events

***

**1.5.3**

Added labels, placeholders types, fixed error type

***

**1.5.2**

Moved mirror repository to github, fix README.MD link to new documentation

***

**1.5.1**

Declared ready-payment-instance emit in Vue way

***

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
