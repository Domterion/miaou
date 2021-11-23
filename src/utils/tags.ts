import { Tag } from "@prisma/client";
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
	): Promise<Tag | null> {
		return await prisma.tag.create({
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
	): Promise<Tag | null> {
		return await prisma.tag.findFirst({
			where: {
				name,
				guild,
				owner,
			},
		});
	}

	/**
	 * Delete a tag by id
	 * @param id The id of the tag to delete
	 */
	static async deleteById(id: bigint): Promise<void> {
		await prisma.tag.delete({
			where: {
				id,
			},
		});
	}

	/**
	 * Update a tag by id
	 * @param id The id of the tag to update
	 * @param data The args to update with
	 */
	static async updateById(id: bigint, data: Partial<Tag>): Promise<void> {
		await prisma.tag.update({
			where: {
				id,
			},
			data,
		});
	}
}
