import axios, { AxiosResponse } from "axios";
import { AjaxOptions, AjaxResponse, IAjaxProvider, Value } from "jinqu";

export class AxiosAjaxProvider implements IAjaxProvider<AxiosResponse> {

    public ajax<T>(o: AjaxOptions): PromiseLike<Value<T> & AjaxResponse<AxiosResponse>> {
        const ao = Object.assign({}, o);

        if (o.params) {
            ao.params = o.params.reduce((p, k) => (p[k.key] = k.value) && p, {}) as any;
        }

        return axios.request<T>(ao)
            .then((r) => ({ value: r.data, response: r })) as any;
    }
}
