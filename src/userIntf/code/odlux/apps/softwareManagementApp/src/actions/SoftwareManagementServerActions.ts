
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

import { Action } from '../../../../framework/src/flux/action';

/** Represents the base action. */
export class BaseAction extends Action { }

export class SetsoftwaremanagementServerBusy extends BaseAction {
  constructor(public isBusy: boolean) {
    super();
  }
}

export class SetsoftwaremanagementServerInfo extends BaseAction {
  /**
   * Initializes a new instance of this class.
   */
  constructor(public PNFID: string | null, public IP_ADDRESS: string | null, public PORT_NUMBER: string | null) {
    super();

  }
}
