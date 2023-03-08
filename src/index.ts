import { Middleware, Context } from "telegraf";

export const autoQuote = (): Middleware<Context> => {
  const middleware: Middleware<Context> = async (ctx, next) => {
    const oldCallApi = ctx.telegram.callApi.bind(ctx.telegram);
    // @ts-ignore
    const newCallApi: typeof ctx.telegram.callApi = async function newCallApi(
      this: typeof ctx.telegram,
      method,
      payload,
      { signal } = {}
    ) {
      if (!("chat_id" in payload)) {
        return oldCallApi(method, payload, { signal });
      }

      try {
        // @ts-ignore
        if (!payload.reply_to_message_id) {
          return oldCallApi(method, {
            ...payload,
            // @ts-ignore
            reply_to_message_id: ctx.message?.message_id,
          }, { signal });
        }
        else{
            return oldCallApi(method, payload, { signal });
        }
      } catch (e: any) {
        throw new Error(`AutoQuoteErr: ${e.message || e}`);
      }
    };
    ctx.telegram.callApi = newCallApi.bind(ctx.telegram);
    await next();
  };
  return middleware;
};

export default autoQuote;
