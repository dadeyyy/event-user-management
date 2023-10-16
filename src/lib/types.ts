import {z} from 'zod'

export const userSchema= z.object({
    id: z.number().optional(),
    username: z.string().min(3, "Username must be atleast 3 characters"),
    password: z.string().min(8, "Password must be atleast 8 characters"),
    email: z.string().email(),
    role: z.enum(["USER", "ADMIN", "SCANNER"])
})

export type TUserSchema = z.infer<typeof userSchema>



export const logInSchema = z.object({
    username: z.string().min(3, "Username must be atleast 3 characters"),
    password: z.string().min(8, "Password must be atleast 8 characters"),
})


export type TLogInSchema = z.infer<typeof logInSchema>