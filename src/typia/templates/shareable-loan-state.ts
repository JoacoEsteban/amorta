import typia from 'typia'

import type { ShareableLoanState } from '../../domain/share'

export const validateShareableLoanState =
  typia.createValidate<ShareableLoanState>()
