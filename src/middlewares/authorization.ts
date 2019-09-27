import express = require('express');
import * as _ from 'lodash'
import * as HttpStatusCodes from 'http-status-codes';
import { userRepository } from '../repositories/usersRepository';
import * as jwt from 'jsonwebtoken';
import { secret } from '../configs/var';


class Authorization {

    public async login(req: express.Request, res: express.Response, next: express.NextFunction){
        const allUsers = await userRepository.getUsers();
        let response = {};
        await allUsers.forEach( async (user) => {
            if(req.body.email === user.email && req.body.password === user.password){
                const token = jwt.sign({ email: user.email }, secret);
                response = {user:user.email,token: token}
            }   
        })

        if(!_.isEmpty(response)){
            res.send(response);
        } else {
            res.sendStatus(HttpStatusCodes.UNAUTHORIZED);
        }  
    }

    public async isUserAuthorized (req: express.Request, res: express.Response, next: express.NextFunction){
        const token = req.headers['authorization'];
        if(!_.isNil(token)) {
            req['token'] = token;
            const decoded = jwt.verify(token, secret);

            const allUsers = await userRepository.getUsers();

            const foundUser = await allUsers.find( async (user) => {
                return decoded['email'] === user.email;
            })
            
            if(!_.isNil(foundUser)){
                next();
            } else {
                res.sendStatus(HttpStatusCodes.UNAUTHORIZED);
            }
            
        } else {
            res.sendStatus(HttpStatusCodes.UNAUTHORIZED);
        }
    }
}

export let authorization = new Authorization();
