import { atom } from "jotai";

const snapshotAtom = atom([]);
const errorAtom = atom(false);
const errorMessageAtom = atom('');

export { errorAtom, errorMessageAtom, snapshotAtom };

