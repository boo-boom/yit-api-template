import { BaseContext } from "koa";
import { dealCatchError } from "@plugin/resProcessor";
import { controller, apiInfo, reqBody, resSucc, resFail } from "@api-agg-decorator";
import { Api_NodeAaa_Bbb3Params } from "@agg/Api_NodeAaa_Bbb3Params";
import { Api_NodeAaa_Bbb3Response } from "@agg/Api_NodeAaa_Bbb3Response";
import { Api_NodeAaa_Bbb3Error } from "@agg/Api_NodeAaa_Bbb3Error";
import $axios from "@plugin/axios";

@controller("node_aaa.bbb3")
class node_aaa {
  @apiInfo({
    description: "XXX",
    methodOwner: "XXX",
    securityLevel: "Anonym",
    mt: ""
  })
  @reqBody(Api_NodeAaa_Bbb3Params)
  @resSucc(Api_NodeAaa_Bbb3Response)
  @resFail(Api_NodeAaa_Bbb3Error)
  static async bbb3(ctx: BaseContext) {
    try {
      const result = await $axios(ctx, {
        url: "node_aaa.bbb3",
        data: ctx.request.body
      });
      ctx.send({ content: result.content[0] });
    } catch (err) {
      dealCatchError(ctx, err);
    }
  }
}

export default node_aaa;
