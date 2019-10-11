import { BaseContext } from "koa";
import { dealCatchError } from "@plugin/resProcessor";
import { controller, apiInfo, reqBody, resSucc, resFail } from "@api-agg-decorator";
import { Api_NodeAaa_DdddParams } from "@agg/Api_NodeAaa_DdddParams";
import { Api_NodeAaa_DdddResponse } from "@agg/Api_NodeAaa_DdddResponse";
import { Api_NodeAaa_DdddError } from "@agg/Api_NodeAaa_DdddError";
import $axios from "@plugin/axios";

@controller("node_aaa.dddd")
class node_aaa {
  @apiInfo({
    description: "XXX",
    methodOwner: "XXX",
    securityLevel: "Anonym",
    mt: ""
  })
  @reqBody(Api_NodeAaa_DdddParams)
  @resSucc(Api_NodeAaa_DdddResponse)
  @resFail(Api_NodeAaa_DdddError)
  static async dddd(ctx: BaseContext) {
    try {
      const result = await $axios(ctx, {
        url: "node_aaa.dddd",
        data: ctx.request.body
      });
      ctx.send({ content: result.content[0] });
    } catch (err) {
      dealCatchError(ctx, err);
    }
  }
}

export default node_aaa;
