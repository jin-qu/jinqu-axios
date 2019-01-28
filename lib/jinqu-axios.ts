import { IAjaxProvider, AjaxOptions } from 'jinqu';
import axios from 'axios';

export class AxiosAjaxProvider implements IAjaxProvider {

    ajax<TResult>(o: AjaxOptions): PromiseLike<TResult> {
        return <any>axios.request<TResult>(o);
    }
}
