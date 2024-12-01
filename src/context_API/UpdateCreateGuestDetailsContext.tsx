import React, { createContext, useContext } from "react";
import { useMutation, UseMutateFunction } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNewBookingContext } from "./NewBookingContext";

type UpdateGuestDetailsContextType = {
  updateGuestDetails: UseMutateFunction<
    any,
    unknown,
    GuestDetailsData,
    unknown
  >;
};
type GuestDetailsData = {
  guest_name: string;
  guest_email: string;
  guest_phone: number;
  special_request?: string;
};

const UpdateGuestDetailsContext =
  createContext<UpdateGuestDetailsContextType | null>(null);

export const UpdateGuestDetailsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { bookingData } = useNewBookingContext();

  const updateGuestDetails: UseMutateFunction<
    any,
    unknown,
    GuestDetailsData,
    unknown
  > = useMutation({
    mutationFn: async (data: GuestDetailsData) => {
      const response = await axios.put(
        `https://flexi-desk-booking.onrender.com/api/flexibooking/update-booking/${bookingData.booking._id}`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      // toast.success("Guest details updated successfully!");
    },
    onError: (error: any) => {
      console.error(
        "Error updating guest details:",
        error.response?.data || error
      );
      // toast.error("Failed to update guest details.");
    },
  }).mutate;

  return (
    <UpdateGuestDetailsContext.Provider value={{ updateGuestDetails }}>
      {children}
    </UpdateGuestDetailsContext.Provider>
  );
};

export const useUpdateGuestDetailsContext = () => {
  const context = useContext(UpdateGuestDetailsContext);
  if (!context) {
    throw new Error(
      "useUpdateGuestDetailsContext must be used within an UpdateGuestDetailsContextProvider"
    );
  }
  return context;
};
