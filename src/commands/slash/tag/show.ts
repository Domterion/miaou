import { Tags as DbTag } from "@prisma/client";
import { Collections, Interaction } from "detritus-client";
import {
	InteractionCallbackTypes,
	MessageFlags,
} from "detritus-client/lib/constants";
import { ComponentContext, Components } from "detritus-client/lib/utils";
import prisma from "../../../prisma";
import Tags from "../../../utils/tags";
import { BaseCommandOption } from "../../basecommand";

export interface CommandArgs {
	name: string;
}

export class TagShowCommand extends BaseCommandOption {
	description = "Show a tag";
	name = "show";

	constructor() {
		super({
			options: [
				{
					name: "name",
					description: "The name of the tag to show",
					required: true,
				},
			],
		});
	}

	async run(context: Interaction.InteractionContext, args: CommandArgs) {
		let errored = false;
		let tag: DbTag | null = null;

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
				content: "Tag not found.",
				flags: MessageFlags.EPHEMERAL,
			});
		}

		await prisma.tags.update({
			where: {
				id: tag!.id,
			},
			data: {
				uses: tag!.uses + 1,
			},
		});

		const components = new Components();
		components.createButton({
			label: "Updoot",
			emoji: {
				name: "doot",
				id: "628653580231901214",
			},
			run: async (ctx: ComponentContext) => {
				if (ctx.userId != context.userId) {
					return ctx.respond(
						InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE,
						{
							content: "This isnt meant for you.",
							flags: MessageFlags.EPHEMERAL,
						}
					);
				}

				if (ctx.userId == tag!.owner) {
					return ctx.respond(
						InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE,
						{
							content: "You cant updoot your own tag.",
							flags: MessageFlags.EPHEMERAL,
						}
					);
				}

				await prisma.tags.update({
					where: {
						id: tag!.id,
					},
					data: {
						updoots: tag!.updoots + 1,
					},
				});

				return ctx.respond(
					InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE,
					{
						content: "Updooted!",
						flags: MessageFlags.EPHEMERAL,
					}
				);
			},
		});

		return context.editOrRespond({
			components,
			content: tag!.content.replaceAll("@", "@\u200b"),
		});
	}
}
