import { BaseContext } from "koa";
import { dealCatchError } from "@plugin/resProcessor";
import { controller, apiInfo, reqBody, resSucc, resFail } from "@api-agg-decorator";
import { Api_NodeAaa_VvvParams } from "@agg/Api_NodeAaa_VvvParams";
import { Api_NodeAaa_VvvResponse } from "@agg/Api_NodeAaa_VvvResponse";
import { Api_NodeAaa_VvvError } from "@agg/Api_NodeAaa_VvvError";
import $axios from "@plugin/axios";

@controller("node_aaa.vvv")
class node_aaa {
  @apiInfo({
    description: "XXX",
    methodOwner: "XXX",
    securityLevel: "Anonym",
    mt: ""
  })
  @reqBody(Api_NodeAaa_VvvParams)
  @resSucc(Api_NodeAaa_VvvResponse)
  @resFail(Api_NodeAaa_VvvError)
  static async vvv(ctx: BaseContext) {
    try {
      const result = await $axios(ctx, {
        url: "node_aaa.vvv",
        data: ctx.request.body
      });
      ctx.send({ content: result.content[0] });
    } catch (err) {
      dealCatchError(ctx, err);
    }
  }
}

export default node_aaa;
