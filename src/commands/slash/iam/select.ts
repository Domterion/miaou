import { IAmRole } from "@prisma/client";
import { Interaction } from "detritus-client";
import {
	InteractionCallbackTypes,
	MessageFlags,
	Permissions,
} from "detritus-client/lib/constants";
import { ComponentContext, Components } from "detritus-client/lib/utils";
import IAmRoles from "../../../utils/iamroles";

import { BaseCommandOption } from "../../basecommand";

export class IAmSelectCommand extends BaseCommandOption {
	description = "Select an iam role";
	name = "select";
	permissionsClient = [Permissions.MANAGE_ROLES];

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

		components.createSelectMenu({
			options: roles!.map((val, _) => {
				return {
					label: val.name,
					description: val.description,
					value: val.name,
				};
			}),
			placeholder: "Select an iam role",
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

				const selected = ctx.data.values![0];

				const role = roles!.find((val) => {
					return val.name == selected;
				});

				// Indicates whether or not we are removing the role
				const removing = ctx.member?.roles.has(role!.role);

				try {
					if (removing) {
						await ctx.member?.removeRole(role!.role);

						return context.editOrRespond({
							components: [],
							content: `Removed ${selected} role.`,
							flags: MessageFlags.EPHEMERAL,
						});
					} else {
						await ctx.member?.addRole(role!.role);

						return context.editOrRespond({
							components: [],
							content: `Gave ${selected} role.`,
							flags: MessageFlags.EPHEMERAL,
						});
					}
				} catch {
					return context.editOrRespond({
						components: [],
						content:
							"Errored, make sure I have permissions to give or remove this role.",
						flags: MessageFlags.EPHEMERAL,
					});
				}
			},
		});

		return context.editOrRespond({
			components,
			content: "The servers i am roles are",
			flags: MessageFlags.EPHEMERAL,
		});
	}
}
