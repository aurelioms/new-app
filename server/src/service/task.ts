import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TaskService {
    static async getAllTasks() {
        return prisma.task.findMany();
    }

    static async getTaskById(id: number) {
        return prisma.task.findUnique({
            where: { id },
        });
    }

    static async createTask(title: string, content: string, location: string, lat: number, lon: number, userId: number) {
        return prisma.task.create({
            data: {
                title,
                content,
                location,
                lat,
                lon,
                userId,
            },
        });
    }

    static async updateTask(id: number, title: string, content: string, location: string, lat: number, lon: number) {
        return prisma.task.update({
            where: { id },
            data: { title, content, location, lat, lon },
        });
    }

    static async deleteTask(id: number) {
        return prisma.task.delete({ where: { id } });
    }
}
