"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createAccount } from "@/lib/actions/user.actions";

type FormType = "Sign In" | "Sign Up";
const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === "Sign Up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [ loading, setIsLoading ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);
  const [ accountId, setAccountId ] = useState(null);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user = await createAccount({
        fullname: values.fullName || "",
        email: values.email
      });
  
      setAccountId(user.accountId);
    } catch (error) {
      setErrorMessage("Failed to create account please try again");
    } finally{
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
        <h1 className="form-title">
          {type === "Sign In" ? "Sign In" : "Sign Up"}
        </h1>
        {type === "Sign Up" && (
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                <FormLabel className="shad-form-label">Full Name</FormLabel>

                <FormControl>
                  <Input placeholder="John Doe" 
                  className="shad-input"
                  {...field} />
                </FormControl>
                </div>

                <FormMessage className="shad-form-message"/>
              </FormItem>
            )}
          />
        )}
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                <FormLabel className="shad-form-label">Email</FormLabel>

                <FormControl>
                  <Input placeholder="abc@xyz.com" 
                  className="shad-input"
                  {...field} />
                </FormControl>
                </div>

                <FormMessage className="shad-form-message"/>
              </FormItem>
            )}
          />

        <Button 
        type="submit"
        className="form-submit-button"
        disabled={loading}
        >
          {!loading ? type === "Sign In" ? "Sign In" : "Sign Up" : <></>}
          {loading && (
            <Image 
            src="/assets/icons/loader.svg"
            alt="loading"
            width={24}
            height={24}
            className="ml-2 animate-spin"
            />
          )}
        </Button>
        {
          errorMessage && (<p className="error-message">
            *{errorMessage}
          </p>)
        }

        <div className="body-2 flex justify-center">
          <p className="text-light-100">
            {type === "Sign In" ? " Don't have an account?" : "Already have an account?"}
          </p>
          <Link href={type === "Sign In" ? "/sign-up" : "/sign-in"}
          className="ml-1 font-medium text-brand"
          >
          { type === "Sign In" ? " Sign Up" : " Sign In"}
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default AuthForm;
