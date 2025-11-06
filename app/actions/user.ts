"use server";

import { UserService } from "@/modules/users/user.service";
import { createUserSchema, CreateUserInput } from "@/modules/users/user.validator";
import { z } from "zod";
import { revalidatePath } from "next/cache";

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

export async function addStaffAction(payload: CreateUserInput) {
  try{
    const user  = await userService.registerStaffUser(payload);
    revalidatePath('/dashboard/admin/staff');
    return { ok: true, user };
  }catch(err){
    console.error("addStaffAction error:", err);
    return { ok: false, error: "server_error" };
  }
}
