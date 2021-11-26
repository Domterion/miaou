import { Constants, Interaction, Utils } from "detritus-client";
import { MessageFlags } from "detritus-client/lib/constants";
import { Member, User } from "detritus-client/lib/structures";
const { ApplicationCommandOptionTypes } = Constants;
const { Embed } = Utils;

import { BaseCommandOption } from "../../basecommand";

export interface CommandArgs {
	user: Member | User;
}

export class AvatarCommand extends BaseCommandOption {
	description = "Get the avatar of a user";
	name = "avatar";

	constructor() {
		super({
			options: [
				{
					name: "user",
					description: "The user to get the avatar of",
					default: (context: Interaction.InteractionContext) =>
						context.member || context.user,
					type: ApplicationCommandOptionTypes.USER,
				},
			],
		});
	}

	async run(context: Interaction.InteractionContext, args: CommandArgs) {
		const embed = new Embed();

		embed.setColor(process.env.EMBED_COLOR);
		embed.setTitle(`Avatar for ${args.user}`);
		embed.setImage(args.user.avatarUrl);

		return context.editOrRespond({
			embed,
			flags: MessageFlags.EPHEMERAL,
		});
	}
}
