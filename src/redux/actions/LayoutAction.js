import { ACTIVE_SETTING_LAYOUT, GET_ON_SETTING } from './Types';

export const activeSetting = payload => ({
  type: ACTIVE_SETTING_LAYOUT,
  payload,
});

export const getOnSetting = payload => ({
  type: GET_ON_SETTING,
  payload,
});
