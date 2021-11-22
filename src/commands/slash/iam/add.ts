import { Interaction } from "detritus-client";
import { ApplicationCommandOptionTypes, MessageFlags, Permissions } from "detritus-client/lib/constants";
import { Role } from "detritus-client/lib/structures";
import prisma from "../../../prisma";

import { BaseCommandOption } from "../../basecommand";

export interface CommandArgs {
	name: string;
	role: Role
}

export class IAmAddCommand extends BaseCommandOption {
	description = "Create a new iam role";
	name = "create";
    // TODO: Figure out permission checking with Detritus
    // permissions = [Permissions.MANAGE_GUILD];

	constructor() {
		super({
			options: [
				{
					name: "name",
					description: "The name of the iam role",
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
        console.log(args.role);
		return context.editOrRespond(`Created ${args.name} iam role.`);
	}
}

