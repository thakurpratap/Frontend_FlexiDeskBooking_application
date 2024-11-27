import { createContext, useContext } from "react";
import axios from "axios";
import { useMutation, UseMutateFunction } from "@tanstack/react-query";

type NewBookingContextType = {
  createNewBooking: UseMutateFunction<
    any,
    unknown,
    NewBookingContextData,
    unknown
  >;
};

type Invitee = {
  invitee_name?: string;
  invitee_email?: string;
};

type NewBookingContextData = {
  visit_dates: Date[];
  guest_name: string;
  guest_email: string;
  guest_phone: number;
  identification_info: string;
  identification_id: string;
  company_name: string;
  invitee: Invitee[];
};

const NewBookingContext = createContext<NewBookingContextType | null>(null);

export const NewBookingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const mutation = useMutation({
    mutationFn: async (data: NewBookingContextData) => {
      const res = await axios.post(
        `https://flexi-desk-booking.onrender.com/api/flexibooking/add-booking`,
        data
      );
      console.log(res);
      return res.data;
    },
    onSuccess: () => {
      console.log("Booking created successfully!");
    },
    onError: () => {
      console.log("Error creating booking");
    },
  });

  return (
    <NewBookingContext.Provider value={{ createNewBooking: mutation.mutate }}>
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
