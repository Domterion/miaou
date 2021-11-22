import prisma from "../prisma";

export default class Tags {
	/**
	 * Creates a new tag
	 * @param name The name of the tag to create
	 * @param content The content of the tag
	 * @param guild The guild that owns the tag
	 * @param owner The owner of the tag
	 */
	static async create(
		name: string,
		content: string,
		guild: string,
		owner: string
	): Promise<Tags | null> {
		return await prisma.tags.create({
			data: {
				name,
				content,
				guild,
				owner,
			},
		});
	}

	/**
	 * Gets a tag by name
	 * @param name The name of the tag to get
	 * @param guild The guild that owns the tag
	 * @param owner The owner of the tag
	 */
	static async getByName(
		name: string,
		guild: string,
		owner: string
	): Promise<Tags | null> {
		return await prisma.tags.findFirst({
			where: {
				name,
				guild,
				owner,
			},
		});
	}
}
