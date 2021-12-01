import { Interaction } from "detritus-client";
import { BaseCommandOption } from "../../basecommand";
import puppeteer from "puppeteer";
import { Embed } from "detritus-client/lib/utils";

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
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(args.url);
		const buffer = await page.screenshot();

		await browser.close();

		const embed = new Embed();

		embed.setColor(process.env.EMBED_COLOR);
		embed.setAuthor("Screenshot");
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
