import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
interface BookingDetails {
  handleSaveClick: () => void;
  setBookingDetailsRow: (value: any) => void;
  handleDownloadInvoice: () => void;
}

interface BookingDetailsDataRow {
  _id: string;
  booking_type: string;
  visit_dates: string[];
  guest_name: string;
  guest_email: string;
  guest_phone: number;
  guest_checkin_status: boolean;
  guest_assign_desk: string;
  identification_info: string;
  identification_id: string;
  company_name: string;
  invitee: Invitee[];
  special_request: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  bookingId: number;
  __v: number;
  payment_id: Payment;
}

interface Invitee {
  invitee_name: string;
  invitee_email: string;
  invitee_checkin_status: boolean;
  invitee_assign_desk: string;
  _id: string;
}

interface Payment {
  _id: string;
  day_passes: number;
  sub_total_cost: number;
  gst_charges: number;
  discount: number;
  coupon_code: string;
  grand_total: number;
  payment_method: string;
  payment_status: string;
  booking_id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const BookingDetailsContext = createContext<BookingDetails | undefined>(
  undefined
);

export const BookingDetailsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [bookingDetailsRow, setBookingDetailsRow] =
    useState<BookingDetailsDataRow | null>(null);

  const { mutate: handleSaveClick } = useMutation({
    mutationFn: async () => {
      if (!bookingDetailsRow) return;
      const inviteeData = Array.isArray(bookingDetailsRow.invitee)
        ? bookingDetailsRow.invitee.map((invitee) => ({
            invitee_name: invitee.invitee_name,
            invitee_email: invitee.invitee_email,
          }))
        : [];
      const bookingData = {
        booking_type: bookingDetailsRow.booking_type,
        visit_dates: bookingDetailsRow.visit_dates,
        guest_name: bookingDetailsRow.guest_name,
        guest_email: bookingDetailsRow.guest_email,
        guest_phone: bookingDetailsRow.guest_phone,
        identification_id: bookingDetailsRow.identification_id,
        identification_info: bookingDetailsRow.identification_info,
        invitee: inviteeData,
        special_request: bookingDetailsRow.special_request,
      };
      await axios.put(
        `https://flexi-desk-booking.onrender.com/api/flexibooking/update-booking/${bookingDetailsRow._id}`,
        bookingData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await axios.post(
        `https://flexi-desk-booking.onrender.com/api/flexibooking/generate-invoice-pdf/${bookingDetailsRow._id}`
      );
    },
    onSuccess: () => {
      toast.success("Update successfully");
    },
    onError: () => {
      toast.error("Error updating booking");
    },
  });

const downloadInvoice = async (): Promise<void> => {
  if (!bookingDetailsRow) return; 

  const apiUrlgetInvoice = `https://flexi-desk-booking.onrender.com/api/flexibooking/get-invoice-pdf/${bookingDetailsRow._id}`;

  try {
    const response = await axios.get(apiUrlgetInvoice, { responseType: 'blob' });
    console.log('get Invoice', response);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'invoice.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading the PDF:', error);
    throw error; 
  }
};

const { mutate: handleDownloadInvoice } = useMutation({
  mutationFn: downloadInvoice,
  onSuccess: () => {
    toast.success('Invoice downloaded successfully');
  },
  onError: (error) => {
    toast.error(`Error downloading the invoice: ${error.message || 'Please try again later.'}`);
  },
});

  return (
    <BookingDetailsContext.Provider
      value={{ handleSaveClick, setBookingDetailsRow, handleDownloadInvoice }}
    >
      {children}
    </BookingDetailsContext.Provider>
  );
};

export const useBookingDetailsContext = () => {
  const context = useContext(BookingDetailsContext);
  if (!context) {
    throw new Error(
      "useBookingDetailsContext must be used within a BookingDetailsContextProvider"
    );
  }
  return context;
};
