import { expect } from 'chai';
import 'mocha';
import { AxiosAjaxProvider } from '..';

describe('AxiosAjaxProvider', () => {

    it('should be instantiated', () => {
        expect(new AxiosAjaxProvider()).not.be.null;
    });
});
