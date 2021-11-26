import { Interaction } from "detritus-client";
import { MessageFlags } from "detritus-client/lib/constants";
import Tags from "../../../utils/tags";

import { BaseCommandOption } from "../../basecommand";

export interface CommandArgs {
	name: string;
	content: string;
}

export class TagCreateCommand extends BaseCommandOption {
	description = "Create a new tag";
	name = "create";

	constructor() {
		super({
			options: [
				{
					name: "name",
					description: "The name of the tag to be created",
					required: true,
				},
				{
					name: "content",
					description: "The content of the tag to be created",
					required: true,
				},
			],
		});
	}

	async run(context: Interaction.InteractionContext, args: CommandArgs) {
		if (args.name.length > 32) {
			return context.editOrRespond({
				content: "Tag names may only be upto 32 characters long.",
				flags: MessageFlags.EPHEMERAL,
			});
		}

		if (args.content.length > 2000) {
			return context.editOrRespond({
				content: "Tag content may only be upto 2000 characters long.",
				flags: MessageFlags.EPHEMERAL,
			});
		}

		let errored = false;
		try {
			await Tags.create(
				args.name,
				args.content,
				context.guildId as string,
				context.userId
			);
		} catch (e) {
			errored = true;
		}

		if (errored) {
			return context.editOrRespond({
				content:
					"Failed to create tag... maybe that name is already taken..?",
				flags: MessageFlags.EPHEMERAL,
			});
		}

		return context.editOrRespond({
			content: `Created ${args.name} tag.`,
			flags: MessageFlags.EPHEMERAL,
		});
	}
}
