// import {IUser} from '../models/user';
import {roles} from '../models/roles';

export class UsersRepository {
    public async getUsers(orderBy:string,offset:number,limit:number){
        let users = {
            paging:{
                total:8,
                limit:20,
                offset:0
            },
            items:
            [
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
            ]
        };

        return users;
        
    }
}

export let userRepository = new UsersRepository();