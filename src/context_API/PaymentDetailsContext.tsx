import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { useNewBookingContext } from "./NewBookingContext";
import { toast } from "react-toastify";

interface PaymentDetails {
  dayPasses: number;
  totalCost: number;
  grandTotal: number;
  isBackTracker: boolean;
  setPaymentDetails: (dayPasses: number, totalCost: number) => void;
  submitPaymentDetails: (paymentDetails: PaymentDetailsAPI) => Promise<void>;
  setIsBackTracker: (value: boolean) => void;
  // paymentData: PaymentDataDetails;
  paymentData: PaymentData | null;
  genrateInvoice: any;
}

interface PaymentDetailsAPI {
  dayPasses: number;
  totalCost: number;
  grandTotal: number;
  paymentMethod: string;
  discount: number;

  // paymentData : any;
}

interface PaymentData {
  paymentId: string;
  status: string;
  payment: any;
  booking_id: any;
  _id: any;
  // paymentData : any;
}

const PaymentDetailsContext = createContext<PaymentDetails | undefined>(
  undefined
);

export const PaymentDetailsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { bookingData } = useNewBookingContext();
  const [dayPasses, setDayPasses] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [isBackTracker, setIsBackTracker] = useState<boolean>(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  const setPaymentDetails = (dayPasses: number, totalCost: number) => {
    setDayPasses(dayPasses);
    setTotalCost(totalCost);
  };

  const submitPaymentDetails = async ({
    dayPasses,
    totalCost,
    grandTotal,
    paymentMethod,
    discount,
  }: PaymentDetailsAPI) => {
    try {
      const response = await axios.post(
        `https://flexi-desk-booking.onrender.com/api/flexibooking/payment/${bookingData.booking._id}`,
        {
          day_passes: dayPasses,
          sub_total_cost: totalCost,
          grand_total: grandTotal,
          gst_charges: 18,
          discount: discount,
          coupon_code: "DISCOUNT20",
          payment_method: paymentMethod,
          payment_status: "Paid",
        }
      );
      console.log("Payment API Response:", response.data);
      setPaymentData(response.data);
    } catch (error) {
      console.error("Error submitting payment details:", error);
      throw error;
    }
  };

  const grandTotal = totalCost * 1.18;
  const genrateInvoice = async () => {
    console.log(bookingData.booking._id, "booking id");
    const apiUrl = `https://flexi-desk-booking.onrender.com/api/flexibooking/generate-invoice-pdf/${bookingData.booking._id}`;
    try {
      const response = await axios.post(apiUrl);
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", "invoice.pdf");
      // document.body.appendChild(link);
      // link.click();
      // link.remove();
      // window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the PDF:", error);
      toast.error("Failed to download the PDF. Please try again.");
    }
  };

  //const grandTotal = totalCost * 1.18;

  return (
    <PaymentDetailsContext.Provider
      value={{
        dayPasses,
        totalCost,
        grandTotal,
        setPaymentDetails,
        submitPaymentDetails,
        setIsBackTracker,
        isBackTracker,
        genrateInvoice,
        paymentData,
      }}
    >
      {children}
    </PaymentDetailsContext.Provider>
  );
};

export const usePaymentDetailsContext = (): PaymentDetails => {
  const context = useContext(PaymentDetailsContext);
  if (!context) {
    throw new Error(
      "usePaymentDetailsContext must be used within a PaymentDetailsProvider"
    );
  }
  return context;
};
