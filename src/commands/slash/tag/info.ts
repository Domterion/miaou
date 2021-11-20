import { Tags } from "@prisma/client";

import { Interaction } from "detritus-client";
import { MessageFlags } from "detritus-client/lib/constants";
import { Embed } from "detritus-client/lib/utils";
import prisma from "../../../prisma";
import { BaseCommandOption } from "../../basecommand";

export interface CommandArgs {
	name: string;
}

export class TagInfoCommand extends BaseCommandOption {
	description = "Get info about a tag";
	name = "info";

	constructor() {
		super({
			options: [
				{
					name: "name",
					description: "The name of the tag to get information about",
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
				content: "Tag not found.",
				flags: MessageFlags.EPHEMERAL,
			});
		}

		const embed = new Embed();

		embed.setColor(process.env.EMBED_COLOR);
		embed.setTitle(`Info for ${tag!.name}`);
		embed.setDescription(`
**Owner**: ${tag!.owner}

**Uses**: ${tag!.uses}
**Updoots**: ${tag!.updoots}
**Created**: ${tag!.creation}
                             `);
		embed.setFooter(`ID: ${tag!.id}`);

		return context.editOrRespond({ embed });
	}
}
