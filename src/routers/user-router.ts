import express from 'express';
import * as userService from '../services/user-services';

export const userRouter = express.Router();

/*
        http://localhost:3002/user
        Retrieves an array of all the users in the database
*/
userRouter.get('', (request, response, next) => {
    userService.getAllUsers().then(user => {
        response.set('content-type', 'application/json')
        response.json(user);
        next();
    }).catch(err => {
        response.sendStatus(500);
    });
});

/*
        http://localhost:3002/user/:id
        Retrieves the user by their ID. If the customer does
        not exist send status of 404
*/

userRouter.get('/:id', (request, response, next) => {
    const ersUserId = +request.params.ersUserId;
    userService.getUserById(ersUserId).then(user => {
        if(!user){
            response.sendStatus(404);
        }else {
            response.json(user);
        }
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    })
})

/*
        http://localhost:3002/user/:username
        Retrieves the user by their Username. If the customer does
        not exist send status of 404
*/

userRouter.get('/:username', (request, response, next) => {
    const ersUsername = request.body;
    userService.getUserByUsername(ersUsername).then(user => {
        if(!user){
            response.sendStatus(404);
        }else {
            response.json(user);
        }
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    })
})

/*
        http://localhost:3002/user/:lastName
        Retrieves the user by their Last Name. If the customer does
        not exist send status of 404
*/

userRouter.get('/:lastName', (request, response, next) => {
    const lastName = request.body;
    userService.getUserByLastName(lastName).then(user => {
        if(!user){
            response.sendStatus(404);
        }else {
            response.json(user);
        }
        next();
    }).catch(err => {
        response.sendStatus(500);
        next();
    })
})

/*
    POST http://localhost:3002/user
    Creates a new user and then saves them into the database.
    Returns the inserted data as Json with a status of 201.
*/
userRouter.post('', (request, response, next) => {
    const user = request.body;
    userService.saveUser(user)
    .then(newUser => {
        response.status(201);
        response.json(newUser);
        next();
    }).catch(err => {
     response.sendStatus(500);
    })
})

/*
    The PATCH method is an HTTP method that serve as a partial replacement
*/
userRouter.patch('', (request, response, next) => {
    const user = request.body;
    userService.patchUser(user)
    .then(updateUser => {
        if (updateUser){
            response.json(updateUser);
        }else {
            response.sendStatus(404);
        }
    }).catch(err => {
        response.sendStatus(500);
    }).finally(() => {
        next();
    })
});