import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { AxiosAjaxProvider } from "../index";
import { AjaxOptions } from "jinqu";

const axiosMock = new MockAdapter(axios);

describe("Fetch tests", () => {

    it("should return null", async () => {
        axiosMock.onGet("Companies").replyOnce(200, null);

        const ajaxProvider = new AxiosAjaxProvider();
        const r = await ajaxProvider.ajax({
            $url: "Companies"
        });

        expect(r.value).toBe(null);
    });

    it("should set url", async () => {
        const $params = [
            { key: "$orderBy", value: "o => o.id" },
            { key: "$skip", value: "10" },
            { key: "$take", value: "10" },
            { key: "$where", value: "o => o.id > 5" },
        ];
        const $options: AjaxOptions = {
            $url: "Companies",
            $params,
            $data: { },
            $headers: { "Requested-With": "Jest" },
        };
        const params = {
            $orderBy: "o => o.id",
            $skip: "10",
            $take: "10",
            $where: "o => o.id > 5",
        };
        const result = {
            $d: [{ id: 1, name: "Microsoft" }],
        };

        axiosMock
            .onGet("Companies", { params })
            .reply(200, result);

        const ajaxProvider = new AxiosAjaxProvider();
        ajaxProvider
            .ajax($options)
            .then(r => {
                expect(r.value).toStrictEqual(result);
            });
    });
});
