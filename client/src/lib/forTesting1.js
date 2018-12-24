import {initual, c, initSub, initMul} from './forTesting';

export function sum (a,b) {
    return 1+2+initual();
}

export function ac(){
    return `a${c()}`;
}

export function sub () {
    return 10-2-initSub();
}

export function mul(){
    return  5 * initMul();
}