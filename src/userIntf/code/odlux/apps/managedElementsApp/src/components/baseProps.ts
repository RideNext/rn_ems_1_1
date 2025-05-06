/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 * =================================================================================================
 * Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
 * =================================================================================================
 */

import { ViewElement } from '../models/uiModels';

export type BaseProps<TValue = string> = { 
  value: ViewElement; 
  inputValue: TValue; 
  readOnly: boolean; 
  disabled: boolean; 
  onChange(newValue: TValue): void;
  isKey?: boolean; 
};
