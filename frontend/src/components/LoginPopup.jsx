"use strict";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useState } from "react";
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
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

// sign up form schema
const signUpSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 character.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters,",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

// login form schema
const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const LoginPopup = ({ isOpen, onClose }) => {
  const { setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");

  // switch schema dynamically based on currentState
  const formSchema = currentState === "Sign Up" ? signUpSchema : loginSchema;

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  // handle form submission
  async function onSubmit(data) {
    if (currentState === "Sign Up" && !data.terms) {
      toast.error("You must agree to the terms and condition!");
      return;
    }

    try {
      let newUrl = import.meta.env.VITE_BACKEND_URL;
      newUrl +=
        currentState === "Login" ? "/api/user/login" : "/api/user/register";

      const res = await axios.post(newUrl, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        if (currentState === "Login") {
          // Only save token on Login
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          onClose();
        } else {
          form.reset({
            name: "",
            email: "",
            password: "",
            terms: false,
          });
          // If registered successfully, switch to Login page
          setCurrentState("Login");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  }

  const handleformSwitch = (state) => {
    setCurrentState(state);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {currentState === "Sign Up" ? "Create Account" : "Login"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* name field sign up */}
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

            {/* email field */}
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

            {/* password field */}
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

            {/* submit button */}
            <Button type="submit" className="w-full my-4">
              {currentState === "Sign Up" ? "Create Account" : "Login"}
            </Button>

            <div className="flex items-start space-x-2 cursor-pointer">
              {/* Terms and Conditions Checkbox (required for sign up) */}
              {currentState === "Sign Up" && (
                <FormField
                  control={form.control}
                  name="terms"
                  rules={{ required: "You must agree to the terms" }}
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-2 cursor-pointer">
                      <Checkbox
                        id="terms"
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-normal text-textColor-body leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        By continuing, I agree to the terms of use & privacy
                        policy.
                      </label>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {currentState === "Login" ? (
              <p className="body-text text-center">
                Create a new account?{" "}
                <span
                  className="login-switch-link"
                  onClick={() => handleformSwitch("Sign Up")}
                >
                  Create Account.
                </span>
              </p>
            ) : (
              <p className="body-text text-center">
                Already have an account?{" "}
                <span
                  className="login-switch-link"
                  onClick={() => handleformSwitch("Login")}
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
