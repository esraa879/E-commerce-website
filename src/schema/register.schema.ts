import * as z from 'zod';

export const registerSchema = z.object({
      name: z.string().min(4,"min length 4").max(20,"max length 20"),
      email: z.email("invalid email"),
      password: z.string().min(6,"max length 20"),
      rePassword: z.string().min(6,"max length 20"),
      phone: z.string().regex(/^01[0125][0-9]{8}$/,"invalid phone number")
}).refine(function (object) {
    if (object.password === object.rePassword) {
   {
    return true 
}
return false
}

},{
    path: ["rePassword"],
    error:"Passwords doesn't match"

})

export type RegisterSchemaType = z.infer<typeof registerSchema>