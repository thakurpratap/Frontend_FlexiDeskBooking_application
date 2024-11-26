import React, { createContext, useContext, ReactNode, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Invitee {
    invitee_name: string;
  }

interface Booking {
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
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const fetchBookings = async () => {
  const response = await axios.get("https://flexi-desk-booking.onrender.com/api/flexibooking/");
  console.log(response.data)
  return response.data;
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

  // Search function for guest name
  const searchBookings = async (guestName: string) => {
    setIsSearching(true);
    setSearchError(null);
    try {
      const response = await axios.get(
        `https://flexi-desk-booking.onrender.com/api/flexibooking/search-by-guest-name`,
        { params: { guestName } }
      );
      setSearchResults(response.data);
      console.log(response.data)
    } catch (err: any) {
      setSearchError(err.message || "Failed to search bookings");
      setSearchResults(null);
    } finally {
      setIsSearching(false);
    }
  };

  const bookings = data || [];

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


















// import React, { createContext, useContext, ReactNode } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// interface Booking {
//   id: string;
//   name: string;
//   email: string;
//   type: string;
//   invitees: string;
//   date: string;
//   status: string;
// }

// interface DataContextType {
//   bookings: Booking[];
//   isLoading: boolean;
//   error: string | null;
// }

// const DataContext = createContext<DataContextType | undefined>(undefined);

// const fetchBookings = async () => {
//   const response = await axios.get("https://flexi-desk-booking.onrender.com/api/flexibooking/");
//   return response.data;
// };

// export const DataProvider = ({ children }: { children: ReactNode }) => {
//   const { data, isLoading, error } = useQuery<Booking[], Error>({
//     queryKey: ["bookings"],
//     queryFn: fetchBookings,
//     initialData: [], // Provide an empty array as a fallback
//   });

//   const bookings = data || [];

//   return (
//     <DataContext.Provider value={{ bookings, isLoading, error: error ? error.message : null }}>
//       {children}
//     </DataContext.Provider>
//   );
// };

// export const useDataContext = () => {
//   const context = useContext(DataContext);
//   if (!context) {
//     throw new Error("useDataContext must be used within a DataProvider");
//   }
//   return context;
// };

