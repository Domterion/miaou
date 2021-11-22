import "dotenv/config";

import { InteractionCommandClient } from "detritus-client";
import ts from 'typescript';
import { execSync } from "child_process";

const interactionClient = new InteractionCommandClient(process.env.TOKEN);

interactionClient.addMultipleIn("./commands");

(async () => {
	const client = await interactionClient.run();

	const commit_hash = execSync("git rev-parse --short HEAD", { encoding: 'utf8' }).trim();

	console.log(`Bot started~
	Bot:
	: Shard Count : ${client.shardCount}

	Env:
	: TypeScript  : v${ts.version}
	: NodeJS      : ${process.version}	
	: Commit Hash : ${commit_hash}
	: Env         : ${process.env.ENV}
`)
})();
