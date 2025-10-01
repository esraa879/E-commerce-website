"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginSchema, LoginSchemaType } from "@/schema/login.schema";
import {signIn} from "next-auth/react"


const Login = () => {
  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(values: LoginSchemaType) {
    

   const res = await  signIn("credentials",{
    email: values.email,
    password: values.password,
    redirect:false ,
    callbackUrl:"/"
   
  })
 
  if (res?.ok){
    toast.success("login success",{
      position: 'top-center',
      duration: 1000
    })

window.location.href=res.url || "/"
  }
  else{
    toast.error(res?.error,{
      position: 'top-center',
      duration: 1000
    })

  }


  
  }

  return (
    <div>
      <div className=" mx-auto px-5 md:px-0 w-full md:w-1/2">
        <h1 className="text-3xl text-center my-10 font-bold">Login Form</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="my-2" type="email" {...field} />
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
                    <Input className="my-2" type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full mt-4 px-4 py-2 bg-black text-white rounded-4xl"
            >
              Login Now
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default Login;
