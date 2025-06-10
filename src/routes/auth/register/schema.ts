import { z } from "zod";

export const formSchema = z.object({
    username: z.string().min(3).max(50),
    password: z
        .string()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
            {
                message:
                    "Password harus memiliki 8-10 karakter, mengandung huruf besar, huruf kecil, angka, dan simbol.",
            }
        ),
});

export type FormSchema = typeof formSchema;
