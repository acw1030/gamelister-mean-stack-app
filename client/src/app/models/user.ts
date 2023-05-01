export interface User {
    _id: string,
    username: string,
    email: string,
    password: string,
    admin: boolean,
    locked: boolean,
    lists: string[]
} 