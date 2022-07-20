import { User, Session } from "@prisma/client";
import prisma from "../config/database.js";

export type UserSignUpData = Omit<User, "id" | "createdAt">
export type UserSignInData = Omit<User, "id" | "createdAt">
export type UserSignUpDataReptPass = UserSignUpData & { repeatPassword: string }
export type SessionCreateData = Omit<Session, "id" | "createdAt">

export async function getUserByEmail(email:string) {
    const user = await prisma.user.findUnique({where: {email}});
    return user;
}

export async function insertSignUp(user:UserSignUpData) {
    return await prisma.user.create({data: user});
}

export async function insertSignIn(session:SessionCreateData) {
    return await prisma.session.create({data: session});
}