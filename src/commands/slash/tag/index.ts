import { BaseSlashCommand } from "../../basecommand";

import { TagCreateCommand } from "./create";
import { TagDeleteCommand } from "./delete";
import { TagInfoCommand } from "./info";
import { TagShowCommand } from "./show";

export interface CommandArgs {
	name: string;
}

export default class TagGroupCommand extends BaseSlashCommand {
	description = ".";
	name = "tag";
	disableDm = true;

	constructor() {
		super({
			options: [
				new TagCreateCommand(),
				new TagShowCommand(),
				new TagInfoCommand(),
				new TagDeleteCommand(),
			],
		});
	}
}
