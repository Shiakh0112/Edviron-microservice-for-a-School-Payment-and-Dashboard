// src/components/CreatePayment.js
import { useState } from "react";
import useAxios from "../hooks/useAxios";
import PaymentForm from "../components/payments/PaymentForm";
import PaymentSuccess from "../components/payments/PaymentSuccess";
// import useAxios from "../hooks/useAxios";
// import LoadingSpinner from "./LoadingSpinner";
// import PaymentForm from "./PaymentForm";
// import PaymentSuccess from "./PaymentSuccess";

const CreatePayment = () => {
  const [formData, setFormData] = useState({
    school_id: "",
    amount: "",
    callback_url: "",
    student_info: {
      name: "",
      id: "",
      email: "",
    },
    trustee_id: "",
    gateway_name: "",
  });
  const [paymentResponse, setPaymentResponse] = useState(null);
  const { axios, loading, error } = useAxios();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("student_")) {
      const field = name.replace("student_", "");
      setFormData((prev) => ({
        ...prev,
        student_info: { ...prev.student_info, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/payments/create-payment", formData);
      setPaymentResponse(response.data);
      // Redirect user to payment page
      if (response.data.collect_request_url) {
        window.open(response.data.collect_request_url, "_blank");
      }
    } catch (err) {
      console.error("Error creating payment:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-3">
          Create Payment Request
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Generate a secure payment link for students to complete their school
          fee payments
        </p>
      </div>

      <PaymentForm
        onSubmit={handleSubmit}
        loading={loading}
        formData={formData}
        handleChange={handleChange}
        error={error}
      />

      {paymentResponse && (
        <PaymentSuccess paymentResponse={paymentResponse} formData={formData} />
      )}
    </div>
  );
};

export default CreatePayment;
