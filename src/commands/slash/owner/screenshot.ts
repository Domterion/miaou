import { Interaction } from "detritus-client";
import { BaseCommandOption } from "../../basecommand";
import puppeteer from "puppeteer";
import { Embed } from "detritus-client/lib/utils";
import { InteractionCallbackTypes } from "detritus-client/lib/constants";
import { performance } from "perf_hooks";

export interface CommandArgs {
	url: string;
}

export class OwnerScreenshotCommand extends BaseCommandOption {
	description = "Screenshot a website";
	name = "screenshot";

	constructor() {
		super({
			options: [
				{
					name: "url",
					description: "The url of the screenshot to website",
					required: true,
				},
			],
		});
	}

	onBefore(context: Interaction.InteractionContext) {
		return context.user.isClientOwner;
	}

	async run(context: Interaction.InteractionContext, args: CommandArgs) {
		const url = args.url.startsWith("https://") ? args.url : `https://${args.url}`;

		const startTime = performance.now()
			
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(url);
		const buffer = await page.screenshot();

		await browser.close();

		const endTime = performance.now()

		const embed = new Embed();

		embed.setColor(process.env.EMBED_COLOR);
		embed.setAuthor("Screenshot");
		embed.setDescription(`
**URL**: ${url}
**Time to screenshot**: ${(endTime - startTime).toFixed(2)}ms
`)
		embed.setImage("attachment://screenshot.png");

		return context.editOrRespond({
			embed,
			file: {
				filename: "screenshot.png",
				value: buffer,
			},
		});
	}
}
