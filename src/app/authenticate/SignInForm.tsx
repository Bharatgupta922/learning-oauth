"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { signIn, signUp } from "./auth.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SighInForm = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
      const res = await signIn(values)
      if (res.success) {
        toast.success('Login Successful')
        router.push('/dashboard')
      } else {
        toast.error(res.error)
      }
    console.log(values);
  }
  return (
    <Card className="min-w-[500px]">
      <CardHeader>WelCome Back!</CardHeader>
      <CardDescription>Sign In to your account to Continue!</CardDescription>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter Your Email"
                      {...field}
                    />
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
                    <Input
                      type="password"
                      placeholder="Enter Your Password"
                      {...field}
                      onChange={(e) => {
                        e.target.value = e.target.value.trim();
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="self-start">Login</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SighInForm;
