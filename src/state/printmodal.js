import { atom } from 'jotai';

const printModalState = atom({
    key: "printModalState",
    default: false,
});

export default printModalState;