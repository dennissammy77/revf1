"use server";

import { UserService } from "@/modules/users/user.service";
import { CreateUserInput } from "@/modules/users/user.validator";
import { cookies } from "next/headers";

const userService = new UserService();

export async function registerUserAction(payload: CreateUserInput) {
  try{
    const {user,token}  = await userService.registerUser(payload);
    (await cookies()).set({
      name: "revf1_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return { ok: true, user };
  }catch(err){
    console.error("registerUserAction error:", err);
    return { ok: false, error: err };
  }
};

export async function loginUserAction(email: string, password: string) {
  const { user, token } = await userService.loginUser(email, password);

  (await cookies()).set({
    name: "revf1_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return { user };
}