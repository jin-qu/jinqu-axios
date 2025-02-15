import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { AjaxOptions, AjaxResponse, IAjaxProvider, Value } from "jinqu";

export type AxiosOptions = AjaxOptions & AxiosRequestConfig;

export class AxiosAjaxProvider implements IAjaxProvider<AxiosResponse> {

    public ajax<T>(o: AxiosOptions): PromiseLike<Value<T> & AjaxResponse<AxiosResponse>> {
        const ao = Object.assign({}, o);

        if (o.params) {
            ao.params = o.params.reduce((p: any, k: any) => (p[k.key] = k.value) && p, ao.params || {});
        }

        return axios.request<T>(ao)
            .then(r => ({ value: r.data, response: r }));
    }
}
