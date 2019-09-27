// import {IUser} from '../models/user';
import { roles } from '../models/roles';
import { IUser } from '../models/user';
import _ = require('lodash');

export class UsersRepository {

    // mocked bd for now...
    users = [     
            {
                id: 0,
                email: 'philippe.dagenais@secretCorp.com',
                role: roles.CONSULTANT,
                firstName: 'Philippe',
                lastName: '',
                userName: 'meowz0r',
                password: '1234lol0'
            },
            {
                id: 1,
                email: 'roger@secretCorp.com',
                role: roles.CONSULTANT,
                firstName: 'Jean-Roger',
                lastName: '',
                userName: 'JRB',
                password: '1234lol1'
            },
            {
                id: 2,
                email: 'marc-andre@secretCorp.com',
                role: roles.CONSULTANT,
                firstName: 'Marc-Andre',
                lastName: '',
                userName: 'corpoMan',
                password: '1234lol2'
            },
            {
                id: 3,
                email: 'vivianne@secretCorp.com',
                role: roles.CONSULTANT,
                firstName: 'Vivianne',
                lastName: '',
                userName: 'VVVVvvvv',
                password: '1234lol3'
            },
            {
                id: 4,
                email: 'brice@secretCorp.com',
                role: roles.CONSULTANT,
                firstName: 'Brice',
                lastName: '',
                userName: 'bmwLyfe',
                password: '1234lol4'
            },
            {
                id: 5,
                email: 'pascal@secretCorp.com',
                role: roles.SENIOR_CONSULTANT,
                firstName: 'Pascal',
                lastName: '',
                userName: 'notMrPotato',
                password: '1234lol5'
            },
            {
                id: 6,
                email: 'pierre-luc@secretCorp.com',
                role: roles.DIRECTOR,
                firstName: 'Pier-Luc',
                lastName: '',
                userName: 'feuilleDeTemps',
                password: '1234lol6'
            },
            {
                id:7,
                email: 'jean-francois@secretCorp.com',
                role: roles.CONSULTANT,
                firstName: 'Jean-Francois',
                lastName: '',
                userName: 'carteGraphique',
                password: '1234lol7'
            }
        ];

    public async getUsers(){
        return this.users;    
    }

    public async createUser(newUser: IUser){
        
        try{
            
            const alreadyExistingUser = this.users.find((user) => {
                user.email === newUser.email;
            })
            if(!_.isNil(alreadyExistingUser)){
                throw 'problem creating new user. ';
            } else {
                console.log(newUser);
                return this.users.push(newUser);
            }

        }catch(err){
            throw 'problem creating new user. ';
        }
        

    }
}

export let userRepository = new UsersRepository();