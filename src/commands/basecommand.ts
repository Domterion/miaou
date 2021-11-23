import { Constants, Interaction, Structures, Utils } from "detritus-client";
import { FailedPermissions } from "detritus-client/lib/interaction";
const { ApplicationCommandTypes, ApplicationCommandOptionTypes, MessageFlags } =
	Constants;
const { Embed, Markup } = Utils;

export class BaseInteractionCommand<
	ParsedArgsFinished = Interaction.ParsedArgs
> extends Interaction.InteractionCommand<ParsedArgsFinished> {
	error = "Command";

	onDmBlocked(context: Interaction.InteractionContext) {
		const command = Markup.codestring(context.name);
		return context.editOrRespond({
			content: `⚠ ${this.error} ${command} cannot be used in a DM.`,
			flags: MessageFlags.EPHEMERAL,
		});
	}

	/* eslint-disable @typescript-eslint/no-explicit-any */
	onRunError(
		context: Interaction.InteractionContext,
		args: ParsedArgsFinished,
		error: any
	) {
		const embed = new Embed();
		embed.setTitle(`⚠ ${this.error} Error`);
		embed.setDescription(Markup.codestring(String(error)));

		return context.editOrRespond({
			embed,
			flags: MessageFlags.EPHEMERAL,
		});
	}

	onPermissionsFail(
		context: Interaction.InteractionContext,
		permissions: FailedPermissions
	) {
		// TODO: This should be more verbose and tell the user which permissions are missing

		return context.editOrRespond({
			content: "Missing permissions...",
			flags: MessageFlags.EPHEMERAL,
		});
	}

	onValueError(
		context: Interaction.InteractionContext,
		args: Interaction.ParsedArgs,
		errors: Interaction.ParsedErrors
	) {
		const embed = new Embed();
		embed.setTitle(`⚠ ${this.error} Argument Error`);

		const store: { [key: string]: string } = {};

		const description: Array<string> = ["Invalid Arguments" + "\n"];
		for (const key in errors) {
			const message = errors[key].message;
			if (message in store) {
				description.push(
					`**${key}**: Same error as **${store[message]}**`
				);
			} else {
				description.push(`**${key}**: ${message}`);
			}
			store[message] = key;
		}

		embed.setDescription(description.join("\n"));
		return context.editOrRespond({
			embed,
			flags: MessageFlags.EPHEMERAL,
		});
	}
}

export class BaseCommandOption<
	ParsedArgsFinished = Interaction.ParsedArgs
> extends Interaction.InteractionCommandOption<ParsedArgsFinished> {
	type = ApplicationCommandOptionTypes.SUB_COMMAND;
}

export class BaseCommandOptionGroup<
	ParsedArgsFinished = Interaction.ParsedArgs
> extends Interaction.InteractionCommandOption<ParsedArgsFinished> {
	type = ApplicationCommandOptionTypes.SUB_COMMAND_GROUP;
}

export class BaseSlashCommand<
	ParsedArgsFinished = Interaction.ParsedArgs
> extends BaseInteractionCommand<ParsedArgsFinished> {
	error = "Slash Command";
	type = ApplicationCommandTypes.CHAT_INPUT;
}

export interface ContextMenuMessageArgs {
	message: Structures.Message;
}

export class BaseContextMenuMessageCommand extends BaseInteractionCommand<ContextMenuMessageArgs> {
	error = "Message Context Menu";
	type = ApplicationCommandTypes.MESSAGE;
}

export interface ContextMenuUserArgs {
	member?: Structures.Member;
	user: Structures.User;
}

export class BaseContextMenuUserCommand extends BaseInteractionCommand<ContextMenuUserArgs> {
	error = "User Context Menu";
	type = ApplicationCommandTypes.USER;
}
