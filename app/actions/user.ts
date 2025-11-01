"use server";

import { UserService } from "@/modules/users/user.service";
import { createUserSchema, CreateUserInput } from "@/modules/users/user.validator";
import { z } from "zod";

const userService = new UserService();

export async function registerUserAction(payload: CreateUserInput) {
  try{
    const user  = await userService.registerUser(payload);
    return { ok: true, user };
  }catch(err){
    console.error("registerUserAction error:", err);
    return { ok: false, error: "server_error" };
  }
};
