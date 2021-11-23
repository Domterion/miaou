import { Tag } from "@prisma/client";
import { Interaction } from "detritus-client";
import { MessageFlags } from "detritus-client/lib/constants";
import Tags from "../../../utils/tags";
import { BaseCommandOption } from "../../basecommand";

export interface CommandArgs {
	name: string;
}

export class TagDeleteCommand extends BaseCommandOption {
	description = "Delete a tag";
	name = "delete";

	constructor() {
		super({
			options: [
				{
					name: "name",
					description: "The name of the tag that will be deleted",
					required: true,
				},
			],
		});
	}

	async run(context: Interaction.InteractionContext, args: CommandArgs) {
		let errored = false;
		let tag: Tag | null = null;

		try {
			tag = await Tags.getByName(
				args.name,
				context.guildId as string,
				context.userId
			);
		} catch (e) {
			errored = true;
		}

		if (errored) {
			return context.editOrRespond({
				content: "Unknown error occurred.",
				flags: MessageFlags.EPHEMERAL,
			});
		}

		if (!tag) {
			return context.editOrRespond({
				content: "Tag not found, maybe you dont own it.",
				flags: MessageFlags.EPHEMERAL,
			});
		}

		await Tags.deleteById(tag!.id);

		return context.editOrRespond(`Deleted tag.`);
	}
}
