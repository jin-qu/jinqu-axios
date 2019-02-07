import { IAjaxProvider, AjaxOptions, Value, AjaxResponse } from 'jinqu';
import axios, { AxiosResponse } from 'axios';

export class AxiosAjaxProvider implements IAjaxProvider {

    ajax<T>(o: AjaxOptions): PromiseLike<Value<T> & AjaxResponse<AxiosResponse>> {
        return <any>axios.request<T>(o)
            .then(r => ({ value: r.data, response: r }));
    }
}
