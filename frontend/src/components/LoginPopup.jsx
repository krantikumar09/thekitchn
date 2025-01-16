"use strict";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// schema for zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 character.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters,",
  }),
});

const LoginPopup = ({ isOpen, onClose }) => {
  const [currentState, setCurrentState] = useState("Sign Up");

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // handle form submission
  function onSubmit(values) {
    console.log("Form Values:", values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {currentState === "Sign Up" ? "Create Account" : "Login"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form} className="space-y-4">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {currentState === "Sign Up" && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@gmail.com"
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
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full my-4">
              {currentState === "Sign Up" ? "Create Account" : "Login"}
            </Button>

            <div className="flex items-start space-x-2 cursor-pointer">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-normal text-textColor-body leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                By continuing, i agree to the terms of use & privacy policy.
              </label>
            </div>

            {currentState === "Login" ? (
              <p className="body-text text-center">
                Create a new account?{" "}
                <span className="login-switch-link" onClick={() => setCurrentState("Sign Up")}>Create Account.</span>
              </p>
            ) : (
              <p className="body-text text-center">
                Already have an account?{" "}
                <span
                  className="login-switch-link"
                  onClick={() => setCurrentState("Login")}
                >
                  Login.
                </span>
              </p>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPopup;
