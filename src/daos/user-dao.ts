import { User, UserRow } from "../models/User";
import { db } from "../daos/db";


// Function to get all Users
export function getAllUsers(): Promise<User[]> {

    const sql = 'SELECT * FROM ers_users';

    return db.query<UserRow>(sql, []).then(result => {
        const rows: UserRow[] = result.rows;

        const user: User[] = rows.map(row => User.from(row));
        return user;
    });
}

// Function to get Users by their ERS_User_Id
export function getUserById(ersUserId: number): Promise<User> {
    const sql = 'SELECT * FROM ers_users WHERE ers_user_id=$1';

    return db.query<UserRow>(sql, [ersUserId])
    .then(result => result.rows.map(row => User.from(row))[0]);
}

// Function to get Users by their ERS_Username
export function getUserByUsername(ersUsername: string): Promise<User> {
    const sql = 'SELECT * FROM ers_users WHERE ers_username=$1';

    return db.query<UserRow>(sql, [ersUsername])
    .then(result => result.rows.map(row => User.from(row))[0]);
}

// Function to get users by their Last Names
export function getUsersByLastName(lastName: string): Promise<User> {
    const sql = 'SELECT * FROM ers_users WHERE lastName=$1';

    return db.query<UserRow>(sql, [lastName])
    .then(result => result.rows.map(row => User.from(row))[0]);
}

// Function to save a new user in the database
export function saveUser(user: User): Promise<User> {
    const sql = `INSERT INTO ers_users (ers_username, ers_password, first_name, last_name, email, ers_user_role_id) \
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    return db.query<UserRow>(sql, [
        user.ersUsername,
        user.ersPassword,
        user.firstName,
        user.lastName,
        user.email,
        user.ersUserRoleId
    ]).then(result => result.rows.map(row => User.from(row))[0]);
}

// Function to Patch a user
export function patchUser(user: User): Promise<User> {
    const sql = `UPDATE ers_users SET ers_username = COALESCE($1, ers_username), \
    ers_password = COALESCE($2, ers_password), first_name = COALESCE($3, first_name), \
    last_name = COALESCE($4, last_name), email = COALESCE($5, email), \
    ers_user_role_id = COALESCE($6, ers_usere_role_id) WHERE ers_user_id=$7 RETURNING *`;

    const params = [user.ersUsername, user.ersPassword, user.firstName, user.lastName, user.email, user.ersUserRoleId];

    return db.query<UserRow>(sql, params)
    .then(result => result.rows.map(row => User.from(row))[0]);
}

interface Exists {
    exists: boolean;
}