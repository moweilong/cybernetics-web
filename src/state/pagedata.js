import { atom } from 'jotai';

const pageDataState = atom({
  key: 'pageState',
  default: {},
});

export default pageDataState;
