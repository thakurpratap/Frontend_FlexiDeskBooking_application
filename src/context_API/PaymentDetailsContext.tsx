import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { useNewBookingContext } from "./NewBookingContext";

interface PaymentDetails {
  dayPasses: number;
  totalCost: number;
  grandTotal: number;
  setPaymentDetails: (dayPasses: number, totalCost: number) => void;
  submitPaymentDetails: (paymentDetails: PaymentDetailsAPI) => Promise<void>;
  // paymentData: PaymentDataDetails;
}


interface PaymentDetailsAPI {
  dayPasses: number;
  totalCost: number;
  grandTotal: number;
  paymentMethod: string;
}

interface PaymentData {
  paymentId: string;
  status: string;
}


const PaymentDetailsContext = createContext<PaymentDetails | undefined>(undefined);

export const PaymentDetailsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { bookingData } = useNewBookingContext();
  const [dayPasses, setDayPasses] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
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
  }: PaymentDetailsAPI) => {
    try {
      const response = await axios.post(
        `https://flexi-desk-booking.onrender.com/api/flexibooking/payment/${bookingData.booking._id}`,
        {
          day_passes: dayPasses,
          sub_total_cost: totalCost,
          grand_total: grandTotal,
          gst_charges: 1200,
          discount: 10,
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

  return (
    <PaymentDetailsContext.Provider
      value={{
        dayPasses,
        totalCost,
        grandTotal,
        setPaymentDetails,
        submitPaymentDetails,
        // paymentData,
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
