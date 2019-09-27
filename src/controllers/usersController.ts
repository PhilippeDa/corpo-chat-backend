import express = require('express');
import {userRepository} from '../repositories/usersRepository';

export class UsersController {
    public async getUsers(req: express.Request, res: express.Response, next: express.NextFunction){
        const users = await userRepository.getUsers(null,0,20);
        res.send(users);
    }
}

export let usersController = new UsersController();