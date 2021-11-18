import { Interaction } from "detritus-client";

import { BaseSlashCommand } from "../basecommand";

export default class PingCommand extends BaseSlashCommand {
	description = "Get bots gateway and http ping";
	name = "ping";

	async run(context: Interaction.InteractionContext) {
		const { gateway, rest } = await context.client.ping();
		return context.editOrRespond(
			`pong! gateway: ${gateway}ms, rest: ${rest}ms`
		);
	}
}
