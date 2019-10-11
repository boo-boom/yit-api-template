import { BaseContext } from "koa";
import { dealCatchError } from "@plugin/resProcessor";
import { controller, apiInfo, reqBody, resSucc, resFail } from "@api-agg-decorator";
import { Api_NodeAaa_CcccParams } from "@agg/Api_NodeAaa_CcccParams";
import { Api_NodeAaa_CcccResponse } from "@agg/Api_NodeAaa_CcccResponse";
import { Api_NodeAaa_CcccError } from "@agg/Api_NodeAaa_CcccError";
import $axios from "@plugin/axios";

@controller("node_aaa.cccc")
class node_aaa {
  @apiInfo({
    description: "XXX",
    methodOwner: "XXX",
    securityLevel: "Anonym",
    mt: ""
  })
  @reqBody(Api_NodeAaa_CcccParams)
  @resSucc(Api_NodeAaa_CcccResponse)
  @resFail(Api_NodeAaa_CcccError)
  static async cccc(ctx: BaseContext) {
    try {
      const result = await $axios(ctx, {
        url: "node_aaa.cccc",
        data: ctx.request.body
      });
      ctx.send({ content: result.content[0] });
    } catch (err) {
      dealCatchError(ctx, err);
    }
  }
}

export default node_aaa;
