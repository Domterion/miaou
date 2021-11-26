import prisma from "../prisma";
import { IAmRole } from "@prisma/client";

export default class IAmRoles {
	/**
	 * Creates a new iam role
	 * @param role The id of the iam role
	 * @param guild The guild that owns the iam role
	 * @param name The name of the iam role
	 */
	static async create(
		role: string,
		guild: string,
		name: string
	): Promise<IAmRole | null> {
		return await prisma.iAmRole.create({
			data: {
				role,
				guild,
				name,
			},
		});
	}

	/**
	 * Gets an iam role by name
	 * @param name The name of the iam role to get
	 * @param guild The guild that owns the iam role
	 */
	static async getByName(
		name: string,
		guild: string
	): Promise<IAmRole | null> {
		return await prisma.iAmRole.findFirst({
			where: {
				name,
				guild,
			},
		});
	}

	/**
	 * Gets all iam roles for a guild
	 * @param guild The guild that owns the iam role
	 */
	static async getAll(guild: string): Promise<IAmRole[]> {
		return await prisma.iAmRole.findMany({
			where: {
				guild,
			},
		});
	}

	/**
	 * Delete an iam role by id
	 * @param id The id of the iam role to delete
	 */
	static async deleteById(id: bigint) {
		await prisma.iAmRole.delete({
			where: {
				id,
			},
		});
	}

	/**
	 * Update an iam role by id
	 * @param id The id of the iam role to update
	 * @param data The args to update with
	 */
	static async updateById(id: bigint, data: Partial<IAmRole>): Promise<void> {
		await prisma.iAmRole.update({
			where: {
				id,
			},
			data,
		});
	}
}
