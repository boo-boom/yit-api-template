import { BaseContext } from "koa";
import { dealCatchError } from "@plugin/resProcessor";
import { controller, apiInfo, reqBody, resSucc, resFail } from "@api-agg-decorator";
import { Api_NodeAaa_BbbcParams } from "@agg/Api_NodeAaa_BbbcParams";
import { Api_NodeAaa_BbbcResponse } from "@agg/Api_NodeAaa_BbbcResponse";
import { Api_NodeAaa_BbbcError } from "@agg/Api_NodeAaa_BbbcError";
import $axios from "@plugin/axios";

@controller("node_aaa.bbbc")
class node_aaa {
  @apiInfo({
    description: "XXX",
    methodOwner: "XXX",
    securityLevel: "Anonym",
    mt: ""
  })
  @reqBody(Api_NodeAaa_BbbcParams)
  @resSucc(Api_NodeAaa_BbbcResponse)
  @resFail(Api_NodeAaa_BbbcError)
  static async bbbc(ctx: BaseContext) {
    try {
      const result = await $axios(ctx, {
        url: "node_aaa.bbbc",
        data: ctx.request.body
      });
      ctx.send({ content: result.content[0] });
    } catch (err) {
      dealCatchError(ctx, err);
    }
  }
}

export default node_aaa;
