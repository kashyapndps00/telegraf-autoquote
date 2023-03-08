import { Telegraf } from "telegraf";
import { autoQuote } from "../src/index";
import dotenv from "dotenv";

dotenv.config();

if(!process.env.BOT_TOKEN){
    throw new Error("BotError: Please Provide BOT_TOKEN")
}
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(autoQuote())

bot.on("message", async (ctx) => {
  ctx.reply("This is a reply message");
});

bot.launch();
