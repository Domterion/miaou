import { Collections } from "detritus-client";
import { BaseSlashCommand } from "../../basecommand";
import { OwnerScreenshotCommand } from "./screenshot";

export default class OwnerGroupCommand extends BaseSlashCommand {
	description = ".";
	name = "owner";
	guildIds = new Collections.BaseSet<string>(["897619857187676210"]);
	disableDm = true;

	constructor() {
		super({
			options: [new OwnerScreenshotCommand()],
		});
	}
}
