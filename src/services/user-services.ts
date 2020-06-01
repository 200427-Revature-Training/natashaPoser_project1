import { User } from '../models/User';
import * as userDao from '../daos/user-dao';
import { promises } from 'fs';

// Function to retrieve all users
export function getAllUsers(): Promise<User[]> {
    return userDao.getAllUsers();
}

// Function to retrieve users by their id
export function getUserById(ersUserId: number): Promise<User> {
    return userDao.getUserById(ersUserId);
}

// Function to retireve user by their Username
export function getUserByUsername(ersUsername: string): Promise<User> {
    return userDao.getUserByUsername(ersUsername);
}

// Function to retrieve user by their Last Name
export function getUserByLastName(lastName: string): Promise<User> {
    return userDao.getUsersByLastName(lastName);
}

// Function to add a new user to the database
export function saveUser(user: any): Promise<User> {
    const newUser = new User(
        undefined, user.ersUsername, user.ersPassword, user.firstName, user.lastName, user.email, user.ersUserRoleId
    );

    if(user.ersUsername && user.ersPassword && user.firstName && user.lastName && user.email && user.ersUserRoleId) {
        return userDao.saveUser(newUser);
    }else {
        return new Promise((resolve, reject) => reject(422));
    }
}

// Function to update 'Patch' User
export function patchUser(input: any): Promise<User> {
    const user = new User(
        input.ersUserId, input.ersUsername, input.ersPassword,
        input.firstName, input.lastName, input.email,
        input.ersUserRoleId
    );

    if(!user.ersUserId) {
        throw new Error('400');
    }
    return userDao.patchUser(user);
}