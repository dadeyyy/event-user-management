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
    firstName: z.string().min(1, {message:"Role is required"}),
    extName: z.string().optional(),
    middleName: z.string().min(1, {message:"Middle name is required"}),
    position: z.string().min(1, {message:"position is required"}),
    office: z.string().min(1, {message:"Office is required"}),
    officeAssignment: z.string().min(1, {message:"Office Assignment is required"}),
    detailed: z.enum(["true", "false"]),
    role: z.string().min(1, {message:"Role is required"})
})

export type TEmployeeSchema = z.infer<typeof employeeSchema>


