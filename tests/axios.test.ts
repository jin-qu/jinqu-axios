import axios, { AxiosRequestConfig } from "axios";
import MockAdapter from "axios-mock-adapter";
import { AxiosAjaxProvider } from "../index";

const axiosMock = new MockAdapter(axios);

describe("Fetch tests", () => {

    it("should return null", async () => {
        axiosMock.onGet("Companies").replyOnce(200, null);

        const ajaxProvider = new AxiosAjaxProvider();
        const r = await ajaxProvider.ajax({
            url: "Companies"
        });

        expect(r.value).toBe(null);
    });

    it("should set url", async () => {
        const params = [
            { key: "$orderBy", value: "o => o.id" },
            { key: "$skip", value: "10" },
            { key: "$take", value: "10" },
            { key: "$where", value: "o => o.id > 5" },
        ];
        const axiosParams = {
            "$where": "o => o.id > 5",
            "$orderBy": "o => o.id",
            "$skip": "10",
            "$take": "10"
        }

        axiosMock.onGet("Companies", { params: axiosParams }).replyOnce(200, {});

        const ajaxProvider = new AxiosAjaxProvider();
        const r = await ajaxProvider.ajax({
            url: "Companies",
            params
        });

        expect(r.value).toEqual({});
    });

    // it("should throw when timeout elapsed", async () => {
    //     axiosMock.mockReturnValue(() => new Promise(r => setTimeout(() => r(null as never), 10)));

    //     const ajaxProvider = new AxiosAjaxProvider();

    //     try {
    //         await ajaxProvider.ajax({
    //             url: "Companies",
    //             timeout: 1
    //         });

    //         fail("Should have failed because of timeout");
    //     }
    //     catch (e) {
    //         expect(e).toHaveProperty("message", "Request timed out");
    //     }
    // });
});
