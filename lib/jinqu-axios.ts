import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { AjaxOptions, AjaxResponse, IAjaxProvider, Value } from "jinqu";

export type AxiosOptions = AjaxOptions & AxiosRequestConfig;

export class AxiosAjaxProvider implements IAjaxProvider<AxiosResponse, AxiosOptions> {

    public ajax<T>(o: AxiosOptions): PromiseLike<Value<T> & AjaxResponse<AxiosResponse>> {
        const ao: AxiosRequestConfig = Object.assign({}, o);
        ao.url = o.url || o.$url;
        ao.method = ao.method || o.$method;
        if (o.$data != null) {
            ao.data = Object.assign(ao.data || {}, o.$data);
        }
        if (o.$headers != null) {
            ao.headers = Object.assign(ao.headers || {}, o.$headers);
        }
        ao.timeout = ao.timeout || o.$timeout;
        if (o.$params) {
            ao.params = ao.params || {};
            o.$params.forEach(p => ao.params[p.key] = p.value);
        }

        return axios.request<T>(ao)
            .then(r => ({ value: r.data, response: r }));
    }
}
