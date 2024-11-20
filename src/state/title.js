import { atom } from 'jotai';

const titleState = atom({
  key: 'titleState',
  default: 'LuckyByte',
});

export default titleState;
