import { Collections } from "detritus-client";
import { BaseSlashCommand } from "../../basecommand";
import { IAmAddCommand } from "./add";

export interface CommandArgs {
	name: string;
}

export default class IAmGroupCommand extends BaseSlashCommand {
	description = ".";
	name = "iam";
	guildIds = new Collections.BaseSet<string>(["897619857187676210"]);
	disableDm = true;

	constructor() {
		super({
			options: [
                new IAmAddCommand()
			],
		});
	}
}
