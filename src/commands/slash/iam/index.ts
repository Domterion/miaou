import { Collections } from "detritus-client";
import { BaseSlashCommand } from "../../basecommand";
import { IAmCreateCommand } from "./create";
import { IAmDeleteCommand } from "./delete";
import { IAmSelectCommand } from "./select";

export default class IAmGroupCommand extends BaseSlashCommand {
	description = ".";
	name = "iam";
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
