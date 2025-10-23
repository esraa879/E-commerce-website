"use client"
import { Button } from "@/components/ui/button";
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, RegisterSchemaType } from '@/schema/register.schema'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


const Register = () => {

  const router = useRouter()
  const form = useForm <RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    resolver:zodResolver(registerSchema)
  })

  async function handleRegister(values:RegisterSchemaType) {

    try {
      
      const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)

      console.log(data);
      
      toast.success(data.message,{
        position: 'top-center',
        duration: 3000
      })


      router.push("/login")

    } catch (error : any) {
         
      toast.error(error.response.data.message,{
        position: 'top-center',
        duration: 3000
      })
      
      
    }
  }

  return (
    < div >
    <div className=' mx-auto px-5 md:px-0 w-full md:w-1/2'>
      <h1 className='text-3xl text-center my-10 font-bold'>Register Form</h1>

      <Form  {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)}>
          <FormField 
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className='my-2' type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className='my-2' type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

                    <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input className='my-2' type="password" {...field} />
                </FormControl>
               
                <FormMessage />
              </FormItem>
            )}
          />


                    <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input className='my-2' type="password" {...field} />
                </FormControl>
              
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input className='my-2' type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-4 px-4 py-2 bg-black text-white rounded-4xl">
           Register Now
          </Button>
        </form>
      </Form>
    </div>
    </div>
  )
}

export default Register
