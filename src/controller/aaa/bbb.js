import { BaseContext } from "koa";
import { dealCatchError } from "@plugin/resProcessor";
import { controller, apiInfo, reqBody, resSucc, resFail } from "@api-agg-decorator";
import { Api_NodeAaa_BbbParams } from "@agg/Api_NodeAaa_BbbParams";
import { Api_NodeAaa_BbbResponse } from "@agg/Api_NodeAaa_BbbResponse";
import { Api_NodeAaa_BbbError } from "@agg/Api_NodeAaa_BbbError";
import $axios from "@plugin/axios";

@controller("node_aaa.bbb")
class node_aaa {
  @apiInfo({
    description: "XXX",
    methodOwner: "XXX",
    securityLevel: "Anonym",
    mt: ""
  })
  @reqBody(Api_NodeAaa_BbbParams)
  @resSucc(Api_NodeAaa_BbbResponse)
  @resFail(Api_NodeAaa_BbbError)
  static async bbb(ctx: BaseContext) {
    try {
      const result = await $axios(ctx, {
        url: "node_aaa.bbb",
        data: ctx.request.body
      });
      ctx.send({ content: result.content[0] });
    } catch (err) {
      dealCatchError(ctx, err);
    }
  }
}

export default node_aaa;
