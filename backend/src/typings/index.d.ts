import { Types, Document } from 'mongoose';
import { Context } from 'koa';

/**
|--------------------------------------------------
| Interface definition for the config object
|--------------------------------------------------
*/
export interface IConfig {
    port: number;
}

/**
|--------------------------------------------------
| Interface definition for the user object
|--------------------------------------------------
*/
type Location = {
    longitude: number,
    latitude: number
}


export interface IDriver {
    firstName: string,
    lastName: string,
    email: string,
}

export interface IDriverModel extends IDriver, Document {
    fullName(): string;
}

/**
|--------------------------------------------------
| Interface definition for the company object
|--------------------------------------------------
*/
export interface ICompany {
    name: string,
    location: Location,
    industryType: string,
    email: string,
    password: string,
    user: Types.ObjectId
}

/**
|--------------------------------------------------
| Interface definition implementation for the user object
|--------------------------------------------------
*/
export interface IDriverDao {
    createUser(ctx: any): Promise<IDriver>,
    getUser(ctx: string | Object): Promise<IDriver>,
    getUsers(): Promise<Array<IDriver>>,
    updateUser(ctx: any): Promise<IDriver>,
    deleteUser(userId: string): Promise<IDriver>
}

/**
|--------------------------------------------------
| Interface definition implementation for the user services
|--------------------------------------------------
*/
export interface IDriverService {
   
}

/**
|--------------------------------------------------
| Interface definition implementation for the driver routes
|--------------------------------------------------
*/
export interface IDriverRoute {
    initialize(server: any): void
    createUser(ctx: Context): any,
    getUser(ctx: Context): any,
    getUsers(ctx: Context): any,
    updateUser(ctx: Context): any,
    deleteUser(ctx: Context): any,
    resetPassword(ctx: Context): any,
    getAllOTP(ctx: Context): any
}


/**
|--------------------------------------------------
| Interface definition implementation for the company object
|--------------------------------------------------
*/
export interface ICompanyDao {
    createCompany(ctx: any): Promise<ICompany>,
    getCompany(ctx: string | Object): Promise<ICompany>,
    getCompanies(): Promise<Array<ICompany>>,
    updateCompany(ctx: any): Promise<ICompany>,
    deleteCompany(companyId: string): Promise<ICompany>
}

/**
|--------------------------------------------------
| Interface definition implementation for the company services
|--------------------------------------------------
*/
export interface ICompanyService {
    createCompany(ctx: any): Promise<ICompany>,
    getCompany(companyId: string): Promise<ICompany>,
    getCompanies(): Promise<Array<ICompany>>,
    updateCompany(ctx: any): Promise<ICompany>,
    deleteCompany(companyId: string): Promise<ICompany>
}

/**
|--------------------------------------------------
| Interface definition implementation for the auth service
|--------------------------------------------------
*/
export interface IAuthService {
    decodeToken(token: string): Promise<IDriver>,
    encodePayload(ctx: IDriver): Promise<string>,
    filterOutSensitive(ctx: IDriver, filterBy: any): Promise<Object>,
    encryptPassword(password: string): Promise<string>,
    comparePassword(passwordToCheck: string, hash: string): Promise<Boolean>,
    authenticate(email: string, password: string): Promise<IAuth> 
}


/**
|--------------------------------------------------
| Interface definition implementation for the company routes
|--------------------------------------------------
*/
export interface ICompanyRoute {
    initialize(server: any): void
    createCompany(ctx: Context): void,
    getCompany(ctx: Context): any,
    getCompanies(ctx: Context): any,
    updateCompany(ctx: Context): any,
    deleteCompany(ctx: Context): any
}

export type IAuth = {
    token?: string,
    message: string,
    status: number
}




