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
}

export class IAmDeleteCommand extends BaseCommandOption {
	description = "Deletes an iam role";
	name = "delete";
	permissions = [Permissions.MANAGE_GUILD];

	constructor() {
		super({
			options: [
				{
					name: "name",
					description: "The name of the iam role to delete",
					required: true,
				},
			],
		});
	}

	async run(context: Interaction.InteractionContext, args: CommandArgs) {
		let errored = false;
		try {
			const role = await IAmRoles.getByName(
				args.name,
				context.guildId as string
			);

			await IAmRoles.deleteById(role!.id);
		} catch (e) {
			errored = true;
		}

		if (errored) {
			return context.editOrRespond({
				content: "Failed to delete iam role, maybe it doesnt exist?",
				flags: MessageFlags.EPHEMERAL,
			});
		}

		return context.editOrRespond({
			content: `Deleted.`,
			flags: MessageFlags.EPHEMERAL,
		});
	}
}
