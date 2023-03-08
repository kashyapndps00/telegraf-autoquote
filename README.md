# Telegraf AutoQuote
This plugin can help you to make your bot reply to every message.

### Installation
You can install this plugin in any Telegraf Bot.

Install the NPM Plugin
```bash
npm i telegraf-autoquote
#or
yarn add telegraf-autoquote
```

Import and Use in code

```TS (Node)
import { autoQuote } from "telegraf-autoquote"

bot.use(autoQuote())
```

### Advanced Installation
If you want the bot to do autoquote in a particular filter like `message("photo")` or in any other filter. You can do it by doing :
```TS (Node)
import { autoQuote } from "telegraf-autoquote"
import { message } from "telegraf/filters"

bot.on("photo",autoQuote()); // old style
bot.on(message("photo"),autoQuote()); // recommended
```

### Help
You can open a **Issue** for ressolving your problem

### Contribution
You can contribute to this plugin by just opening a pull request.
