import { Request, Response } from 'express';
import { TaskService } from '../service/task';

export class TaskController {
    static async getAllTasks(req: Request, res: Response) {
        try {
            const tasks = await TaskService.getAllTasks();
            res.status(200).json({ data: tasks });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getTaskById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const task = await TaskService.getTaskById(Number(id));
            if (!task) {
                res.status(404).json({ error: 'Task not found' });
                return;
            }
            res.status(200).json({ data: task });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async createTask(req: Request, res: Response) {
        try {
            const { title, content, location, lat, lon } = req.body;
            const userId = req.userId;
            const task = await TaskService.createTask(title, content, location, lat, lon, userId);
            res.status(201).json(task);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateTask(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title, content, location, lat, lon } = req.body;
            const task = await TaskService.updateTask(Number(id), title, content, location, lat, lon);
            res.status(200).json(task);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteTask(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await TaskService.deleteTask(Number(id));
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
