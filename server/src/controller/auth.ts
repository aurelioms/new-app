import { Request, Response } from 'express';
import { AuthService } from '../service/auth';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;
      const user = await AuthService.register(email, password, role);
      res.status(200).json({ data: user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const users = await AuthService.getAllUsers();
      res.status(200).json({ data: users });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}
