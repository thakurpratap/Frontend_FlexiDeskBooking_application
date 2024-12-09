import { createContext, ReactNode, useContext } from "react";
import { useNewBookingContext } from "./NewBookingContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

interface PaymentSuccess {
  handleDownloadInvoice: () => void;
  handleShareInvoice: () => void;
}
const PaymentSuccessContext = createContext<PaymentSuccess | undefined>(
  undefined
);

export const PaymentSuccessContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { bookingData } = useNewBookingContext();

  const { mutate: handleDownloadInvoice } = useMutation({
    mutationFn: async () => {
      const apiUrl = `https://flexi-desk-booking.onrender.com/api/flexibooking/get-invoice-pdf/${bookingData.booking._id}`;
      const response = await axios.get(apiUrl, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
    onSuccess: () => {
      toast.success("Invoice downloaded successfully");
    },
    onError: (error: Error) => {
      toast.error(
        error?.message || "Failed to download the PDF. Please try again."
      );
    },
  });
  const { mutate: handleShareInvoice } = useMutation({
    mutationFn: async () => {
      const apiUrl = `https://flexi-desk-booking.onrender.com/api/flexibooking/send-invoice-pdf/${bookingData.booking._id}`;
      await axios.post(apiUrl);
    },
    onSuccess: () => {
      toast.success("Share email successfully...");
    },
    onError: () => {
      toast.error("Share email fail");
    },
  });
  return (
    <PaymentSuccessContext.Provider
      value={{ handleDownloadInvoice, handleShareInvoice }}
    >
      {children}
    </PaymentSuccessContext.Provider>
  );
};

export const usePaymentSuccessContext = () => {
  const context = useContext(PaymentSuccessContext);
  if (!context) {
    throw new Error(
      "usePaymentDetailsContext must be used within a PaymentSuccessContextProvider"
    );
  }
  return context;
};
