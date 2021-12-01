import { Collections } from "detritus-client";
import { BaseSlashCommand } from "../../basecommand";
import { IAmCreateCommand } from "./create";
import { IAmDeleteCommand } from "./delete";
import { IAmSelectCommand } from "./select";

export default class IAmGroupCommand extends BaseSlashCommand {
	description = ".";
	name = "iam";
	guildIds = new Collections.BaseSet<string>(["897619857187676210"]);
	disableDm = true;

	constructor() {
		super({
			options: [
				new IAmCreateCommand(),
				new IAmSelectCommand(),
				new IAmDeleteCommand(),
			],
		});
	}
}
