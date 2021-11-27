import { Interaction } from "detritus-client";
import {
	ApplicationCommandOptionTypes,
	MessageFlags,
	Permissions,
} from "detritus-client/lib/constants";
import { Role } from "detritus-client/lib/structures";
import IAmRoles from "../../../utils/iamroles";

import { BaseCommandOption } from "../../basecommand";

export interface CommandArgs {
	name: string;
	description: string;
	role: Role;
}

export class IAmAddCommand extends BaseCommandOption {
	description = "Create a new iam role";
	name = "create";
	permissions = [Permissions.MANAGE_GUILD];

	constructor() {
		super({
			options: [
				{
					name: "name",
					description:
						"The name of the iam role, used when users self add the role.",
					required: true,
				},
				{
					name: "description",
					description: "The description for the iam role",
					required: true,
				},
				{
					name: "role",
					description: "The role for the iam role",
					type: ApplicationCommandOptionTypes.ROLE,
					required: true,
				},
			],
		});
	}

	async run(context: Interaction.InteractionContext, args: CommandArgs) {
		if (args.name.length >= 32) {
			return context.editOrRespond({
				content: "Iam role names must be less than 32 characters.",
				flags: MessageFlags.EPHEMERAL,
			});
		}

		if (args.description.length >= 100) {
			return context.editOrRespond({
				content:
					"Iam role descriptions must be less than 100 characters.",
				flags: MessageFlags.EPHEMERAL,
			});
		}

		const roles = await IAmRoles.getAll(context.guildId as string);

		if (
			!!roles.find((val) => {
				return val.name == args.name;
			})
		) {
			return context.editOrRespond({
				content: "That iam role name already exists.",
				flags: MessageFlags.EPHEMERAL,
			});
		}

		if (roles.length >= 25) {
			return context.editOrRespond({
				content: "You may only have 25 iam roles.",
				flags: MessageFlags.EPHEMERAL,
			});
		}

		let errored = false;
		try {
			await IAmRoles.create(
				args.role.id,
				context.guildId as string,
				args.name,
				args.description
			);
		} catch (e) {
			errored = true;
		}

		if (errored) {
			return context.editOrRespond({
				content: "Failed to create iam role.",
				flags: MessageFlags.EPHEMERAL,
			});
		}

		return context.editOrRespond({
			content: `Created ${args.name} iam role.`,
			flags: MessageFlags.EPHEMERAL,
		});
	}
}
