"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoQuote = void 0;
const autoQuote = () => {
    const middleware = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
        const oldCallApi = ctx.telegram.callApi.bind(ctx.telegram);
        // @ts-ignore
        const newCallApi = function newCallApi(method, payload, { signal } = {}) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                if (!("chat_id" in payload)) {
                    return oldCallApi(method, payload, { signal });
                }
                try {
                    // @ts-ignore
                    if (!payload.reply_to_message_id) {
                        return oldCallApi(method, Object.assign(Object.assign({}, payload), { 
                            // @ts-ignore
                            reply_to_message_id: (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.message_id }), { signal });
                    }
                    else {
                        return oldCallApi(method, payload, { signal });
                    }
                }
                catch (e) {
                    throw new Error(`AutoQuoteErr: ${e.message || e}`);
                }
            });
        };
        ctx.telegram.callApi = newCallApi.bind(ctx.telegram);
        yield next();
    });
    return middleware;
};
exports.autoQuote = autoQuote;
exports.default = exports.autoQuote;
