export class User {
    ersUserId: number;
    ersUsername: string;
    ersPassword: string;
    firstName: string;
    lastName: string;
    email: string;
    ersUserRoleId: number;

    /*
        The Static function creates a User instance based
        on the structure from the database
    */
    static from(obj: UserRow): User {
        const user = new User(
            obj.ersUserId, obj.ersUsername, obj.ersPassword, obj.firstName, obj.lastName, obj.email, obj.ersUserRoleId
        );
        return user;
    }

    constructor(ersUserId: number, ersUsername: string, ersPassword: string, firstName: string, lastName: string, email: string, ersUserRoleId: number){
        this.ersUserId = ersUserId;
        this.ersUsername = ersUsername;
        this.ersPassword = ersPassword;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.ersUserRoleId = ersUserRoleId;
    }
}

export interface UserRow {
    ersUserId: number;
    ersUsername: string;
    ersPassword: string;
    firstName: string;
    lastName: string;
    email: string;
    ersUserRoleId: number;
}