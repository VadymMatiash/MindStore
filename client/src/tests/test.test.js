import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import {initual,c,initSub, initMul} from '../lib/forTesting';
import {sum,ac,sub, mul} from '../lib/forTesting1.js';
jest.mock('../lib/forTesting.js');
initual.mockImplementation(() => 1);
c.mockImplementation(() => 'c');
initSub.mockImplementation(() => 3);
initMul.mockImplementation(() => 3);


 describe('sum', () => {
    it('should return 4 for arguments 1 and 2', () => {
       expect(sum(1, 2)).toBe(4);
    });
 }); 

 describe('ac', () => {
    it(`should returt 'ac'`, () => {
       expect(ac()).toBe('ac');
    });
 }); 

 describe('sub', () => {
    it('should return 5', () => {
       expect(sub()).toBe(5);
    });
 }); 

 describe('mul', () => {
    it('should return 15', () => {
       expect(mul()).toBe(15);
    });
 }); 


