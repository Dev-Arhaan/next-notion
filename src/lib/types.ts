import * as z from 'zod'

export const FormSchema = z.object({ email: z.string().describe('Email').email({message: 'Invalid email' }), 
password: z.string().describe('Password').min(1, 'password is required')

})