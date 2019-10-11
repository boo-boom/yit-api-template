import { BaseContext } from "koa";
import { dealCatchError } from "@plugin/resProcessor";
import { controller, apiInfo, reqBody, resSucc, resFail } from "@api-agg-decorator";
import { Api_NodeAaa_Bbb2Params } from "@agg/Api_NodeAaa_Bbb2Params";
import { Api_NodeAaa_Bbb2Response } from "@agg/Api_NodeAaa_Bbb2Response";
import { Api_NodeAaa_Bbb2Error } from "@agg/Api_NodeAaa_Bbb2Error";
import $axios from "@plugin/axios";

@controller("node_aaa.bbb2")
class node_aaa {
  @apiInfo({
    description: "XXX",
    methodOwner: "XXX",
    securityLevel: "Anonym",
    mt: ""
  })
  @reqBody(Api_NodeAaa_Bbb2Params)
  @resSucc(Api_NodeAaa_Bbb2Response)
  @resFail(Api_NodeAaa_Bbb2Error)
  static async bbb2(ctx: BaseContext) {
    try {
      const result = await $axios(ctx, {
        url: "node_aaa.bbb2",
        data: ctx.request.body
      });
      ctx.send({ content: result.content[0] });
    } catch (err) {
      dealCatchError(ctx, err);
    }
  }
}

export default node_aaa;
