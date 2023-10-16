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


export const eventSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    date: z.coerce.date(),
    status: z.enum(["PLANNED", "ONGOING", "COMPLETED","CANCELLED"])
})

export type TeventSchema = z.infer<typeof eventSchema>

export const employeeSchema = z.object({
    id: z.number().optional(),
    lastName: z.string().min(3, "lastName must be atleast 3 characters"),
    firstName: z.string(),
    extName: z.string().optional(),
    middleName: z.string(),
    position: z.string(),
    office: z.string(),
    officeAssignment: z.string(),
    detailed: z.enum(["true", "false"]),
    role: z.string()
})

export type TEmployeeSchema = z.infer<typeof employeeSchema>