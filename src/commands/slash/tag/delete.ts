import { Tags } from "@prisma/client";
import { Interaction } from "detritus-client";
import { MessageFlags } from "detritus-client/lib/constants";
import prisma from "../../../prisma";
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
		let tag: Tags | null = null;

		try {
			tag = await prisma.tags.findFirst({
				where: {
					name: args.name,
					guild: context.guildId as string,
					owner: context.member?.id as string,
				},
			});
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

		await prisma.tags.delete({
			where: {
				id: tag!.id,
			},
		});

		return context.editOrRespond(`Deleted tag.`);
	}
}
