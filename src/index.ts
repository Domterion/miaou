import "dotenv/config";

import { InteractionCommandClient } from "detritus-client";

const interactionClient = new InteractionCommandClient(process.env.TOKEN);

interactionClient.addMultipleIn("./commands");

(async () => {
	const client = await interactionClient.run();
	console.log(`Bot has loaded with a shard count of ${client.shardCount}`);
})();
