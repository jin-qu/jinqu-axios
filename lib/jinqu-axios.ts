import axios, { AxiosResponse } from "axios";
import { AjaxOptions, AjaxResponse, IAjaxProvider, Value } from "jinqu";

export class AxiosAjaxProvider implements IAjaxProvider {

    public ajax<T>(o: AjaxOptions): PromiseLike<Value<T> & AjaxResponse<AxiosResponse>> {
        return axios.request<T>(o)
            .then((r) => ({ value: r.data, response: r })) as any;
    }
}
