import express = require('express');
import { userRepository } from '../repositories/usersRepository';


export class UsersController {
    public async getUsers(req: express.Request, res: express.Response, next: express.NextFunction){
        const users = await userRepository.getUsers();
        res.send(users);
    }

    public async createUser(req: express.Request, res: express.Response, next: express.NextFunction){
        await userRepository.createUser(req.body.email);
        res.sendStatus(200);
    }
}

export let usersController = new UsersController();