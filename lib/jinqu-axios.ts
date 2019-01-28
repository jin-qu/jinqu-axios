import { IRequestProvider, IAjaxProvider, AjaxOptions, QueryParameter, mergeAjaxOptions } from 'jinqu';
import axios from 'axios';

export const axiosAjaxProvider: IRequestProvider<AjaxOptions> & IAjaxProvider = {

    request<TResult>(prms: QueryParameter[], options: AjaxOptions[]): PromiseLike<TResult> {
        const opt = (options || []).reduce(mergeAjaxOptions, {});
        opt.params.concat(prms);

        return this.ajax(opt);
    },

    ajax<TResult>(o: AjaxOptions): PromiseLike<TResult> {
        return <any>axios.request<TResult>(o);
    }
}
