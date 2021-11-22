import { Tags as DbTag } from "@prisma/client";
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
	): Promise<DbTag | null> {
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
	): Promise<DbTag | null> {
		return await prisma.tags.findFirst({
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
	static async deleteById(id: bigint) {
		await prisma.tags.delete({
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
	static async updateById(id: bigint, data: Partial<DbTag>) {
		await prisma.tags.update({
			where: {
				id,
			},
			data,
		});
	}
}
