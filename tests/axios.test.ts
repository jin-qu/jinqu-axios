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

        axiosMock
            .onGet("Companies%3F%24where%3A%20o%20%3D%3E%20o.id%20%3E%205%26orderBy%3A%20o%20%3D%3E%20o.id%26skip%3A%2010%26take%3A%2010")
            .replyOnce(200, {});

        const ajaxProvider = new AxiosAjaxProvider();
        const r = await ajaxProvider.ajax({
            url: "Companies",
            params
        });

        expect(r.value).toEqual({});
    });

    it("should throw when timeout elapsed", async () => {
        axiosMock
            .onGet("Companies")
            .replyOnce(200, new Promise(r => setTimeout(() => r(null as never), 10)));

        const ajaxProvider = new AxiosAjaxProvider();

        try {
            await ajaxProvider.ajax({
                url: "Companies",
                timeout: 1
            });

            fail("Should have failed because of timeout");
        }
        catch (e) {
            expect(e).toHaveProperty("message", "Request timed out");
        }
    });
});
