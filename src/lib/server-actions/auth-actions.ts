'use server';

import { FormSchema } from "../types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { z } from "zod";
import { cookies } from "next/headers";

export async function actionLoginuser({
        email, 
        password,
     }: z.infer<typeof FormSchema>) {
        
        const supabase = createRouteHandlerClient({ cookies }); 
        const response = await supabase.auth.signInWithPassword({
            email, 
            password
        });
        return response;

}