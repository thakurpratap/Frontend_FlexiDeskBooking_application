import React, { createContext, useContext, ReactNode, useState } from "react";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';

interface Invitee {
    invitee_name: string;
  }

interface Booking {
  bookingId : string;
id: string;
_id: string;
guest_name: string;
guest_email: string;
booking_type: string;
company_name: string;
guest_checkin_status: boolean;
createdAt : string
payment_status : payment[];
invitee: Invitee[];
isActive : boolean;
// clearSearch: () => void;
}
interface payment {
  payment_status : boolean;
}

interface DataContextType {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  searchResults: Booking[] | null;
  searchBookings: (guestName: string) => Promise<void>;
  isSearching: boolean;
  searchError: string | null;
  handleUpdateBooking: (bookingId: string) => Promise<void>; 
  handleResendPaymentEmail: (bookingId: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const fetchBookings = async () => {
  const response = await axios.get("https://flexi-desk-booking.onrender.com/api/flexibooking?guest_name=&visit_dates=");
  console.log(response.data,">>>>>>>>>>>>>>>>>")
  return response.data.data;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, error } = useQuery<Booking[], Error>({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
    initialData: [], 
  });

  const [searchResults, setSearchResults] = useState<Booking[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // const clearSearch = () => setSearchResults(null);

  // Search function for guest name
  const searchBookings = async (guestName: string) => {
    setIsSearching(true);
    setSearchError(null);
    let date = "";
    try {
      const response = await axios.get(
        `https://flexi-desk-booking.onrender.com/api/flexibooking?guest_name=${guestName}&visit_dates=${date}`
      );
      setSearchResults(response.data.data);
      console.log(response.data)
    } catch (err: any) {
      setSearchError(err.message || "Failed to search bookings");
      setSearchResults(null);
    } finally {
      setIsSearching(false);
    }
  };

  const queryClient = useQueryClient();

  const handleUpdateBooking = async (booking: any) => {
    console.log(booking, "booking")
    // booking.isActive = false;
    try {
      const response =
      await axios.put(
        `https://flexi-desk-booking.onrender.com/api/flexibooking/update-booking/${booking}`,
        {isActive:false}
      );
  
      console.log("Booking updated successfully:", response.data);
      // queryClient.invalidateQueries({ queryKey: ["bookings"] });
      fetchBookings();
    } catch (err: any) {
      console.error("Error updating booking:", err);
    }
  };


  const handleResendPaymentEmail = async (bookingId: string) => {
    try {
      const response = await axios.post(
        `https://flexi-desk-booking.onrender.com/api/flexibooking/send-invoice-pdf/${bookingId}`
      );
      console.log("Resend Payment Email Successful:", response.data);
      // alert("Payment email resent successfully!");
      toast.success("Payment email resent successfully!");
    } catch (err: any) {
      console.error("Error resending payment email:", err);
      // alert("Failed to resend payment email. Please try again.");
      toast.success("Failed to resend payment email. Please try again.");
    }
  };

  const bookings = data || [];

 console.log(bookings, ">>>>>>>>>>>>>>bookings")
  return (
    <DataContext.Provider
      value={{
        bookings,
        isLoading,
        error: error ? error.message : null,
        searchResults,
        searchBookings,
        isSearching,
        searchError,
        handleUpdateBooking,
        handleResendPaymentEmail,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};