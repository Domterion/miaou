import { IAmRole } from "@prisma/client";
import { Interaction } from "detritus-client";
import {
	ApplicationCommandOptionTypes,
	InteractionCallbackTypes,
	MessageFlags,
	Permissions,
} from "detritus-client/lib/constants";
import { FailedPermissions } from "detritus-client/lib/interaction";
import { Role } from "detritus-client/lib/structures";
import {
	ComponentContext,
	ComponentOnError,
	Components,
	ComponentSelectMenu,
	ComponentSelectMenuOption,
	ComponentSelectMenuOptionData,
} from "detritus-client/lib/utils";
import IAmRoles from "../../../utils/iamroles";

import { BaseCommandOption } from "../../basecommand";

export class IAmSelectCommand extends BaseCommandOption {
	description = "Select an iam role";
	name = "select";
	permissions = [Permissions.MANAGE_GUILD];

	constructor() {
		super();
	}

	async run(context: Interaction.InteractionContext) {
		let roles: IAmRole[] | null = null;

		let errored = false;
		try {
			roles = await IAmRoles.getAll(context.guildId as string);
		} catch (e) {
			errored = true;
		}

		if (errored) {
			return context.editOrRespond({
				content: "Failed to get iam roles.",
				flags: MessageFlags.EPHEMERAL,
			});
		}

		if (roles!.length == 0) {
			return context.editOrRespond({
				content: "This server has no iam roles.",
				flags: MessageFlags.EPHEMERAL,
			});
		}

		const components = new Components();
		/*
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
			},
		});
        */

		components.createSelectMenu({
			options: roles!.map((val, _) => {
				return {
					label: val.name,
					// TODO: Maybe iam role descriptions?? :eyes:
					description: `IAmRole: ${val.name}`,
					value: val.name,
				};
			}),
			placeholder: "Select an iam role",
			run: async (ctx: ComponentContext) => {
				console.log(ctx);
			},
		});

		return context.editOrRespond({
			components,
			content: "The servers i am roles are",
		});
	}
}
