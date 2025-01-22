"use strict";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CartTotal from "../components/CartTotal";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, foodList, cartItem, API_URL } =
    useContext(StoreContext);

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
    },
  });

  async function onSubmit(data) {
    try {
      let orderItems = [];

      foodList.map((item) => {
        if (cartItem[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItem[item._id];
          orderItems.push(itemInfo);
        }
      });

      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 40,
      };

      let res = await axios.post(`${API_URL}/api/order/place`, orderData, {
        headers: { "Content-Type": "application/json", token },
      });

      if (res.data.success) {
        const session_url = res.data.url;
        window.location.replace(session_url);
      } else {
        toast(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/cart')
      else if (getTotalCartAmount() === 0) navigate('/cart')
  }, [token]);

  return (
    <section className="place-order section-margin">
      <div className="container">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="flex flex-col md:flex-row items-start gap-y-6 gap-x-6 justify-between ">
              {/* delivery info form */}
              <div className="max-w-xl w-full">
                <h2 className="heading2">Delivery Information</h2>

                <div className="space-y-4 mt-16">
                  <div className="form-col">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl className="w-full">
                            <Input type="text" placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl className="w-full">
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
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street</FormLabel>
                        <FormControl className="w-full">
                          <Input
                            type="text"
                            placeholder="high street"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="form-col">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl className="w-full">
                            <Input
                              type="text"
                              placeholder="Landon"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl className="w-full">
                            <Input
                              type="text"
                              placeholder="Landon"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="form-col">
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl className="w-full">
                            <Input
                              type="text"
                              placeholder="000000"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl className="w-full">
                            <Input type="text" placeholder="UK" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl className="w-full">
                          <Input
                            type="text"
                            placeholder="0123456789"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* cart total */}
              <div className="max-w-xl w-full">
                <h2 className="heading2">Cart Totals</h2>

                <CartTotal />

                <Button
                  type="submit"
                  className="mt-4 w-full md:w-auto justify-self-end"
                  size="lg"
                >
                  PROCEED TO PAYMENT
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default PlaceOrder;
