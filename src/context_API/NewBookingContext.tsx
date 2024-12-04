import { createContext, useContext } from "react";
import axios from "axios";
import { useMutation, UseMutateFunction } from "@tanstack/react-query";
import { toast } from "react-toastify";
import React, { useState } from "react";
type NewBookingContextType = {
  createNewBooking: UseMutateFunction<
    any,
    unknown,
    NewBookingContextData,
    unknown
  >;
  bookingData: any;
};
type Invitee = {
  invitee_name?: string;
  invitee_email?: string;
};

type NewBookingContextData = {
  booking_type: string;
  visit_dates: Date[];
  guest_name: string;
  guest_email: string;
  guest_phone: number;
  identification_info: string;
  identification_id: string;
  company_name?: string;
  invitee: Invitee[];
};

const NewBookingContext = createContext<NewBookingContextType | null>(null);

export const NewBookingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookingData, setBookingData] = useState<any>(null);
  const mutation = useMutation({
    mutationFn: async (data: NewBookingContextData) => {
      if(data.company_name === "" || data.identification_info==="Aadhar Card / Pan No. / Driver’s Licence / Passport ID"){
        delete data.company_name;  
      }
      const res = await axios.post(
        `https://flexi-desk-booking.onrender.com/api/flexibooking/add-booking`,
        data
      );
      setBookingData(res.data);
      return res.data;
    },
    onSuccess: (data) => {
      // toast.success(data.message || "Booking created successfully!", {
      //   position: "top-right",
      // });
      console.log("Booking created successfully:", data);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Error creating booking", {
        position: "top-right",
      });
      console.log("Error creating booking:", error);
    },
  });

  return (
    <NewBookingContext.Provider
      value={{ createNewBooking: mutation.mutate, bookingData }}
    >
      {children}
    </NewBookingContext.Provider>
  );
};

export const useNewBookingContext = () => {
  const context = useContext(NewBookingContext);
  if (!context) {
    throw new Error(
      "useNewBookingContext must be used within a NewBookingContextProvider"
    );
  }
  return context;
};
