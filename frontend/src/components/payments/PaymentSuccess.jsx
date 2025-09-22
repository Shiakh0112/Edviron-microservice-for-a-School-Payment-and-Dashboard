// src/components/PaymentSuccess.js
const PaymentSuccess = ({ paymentResponse, formData }) => {
  // Function to safely render payment details
  const renderPaymentDetails = () => {
    if (!paymentResponse) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
            Payment Details
          </h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-sm font-medium text-green-700 dark:text-green-300 w-40">
                Amount:
              </span>
              <span className="text-sm font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-800/50 px-3 py-1 rounded-md">
                ₹{paymentResponse.amount || formData.amount || "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-green-700 dark:text-green-300 w-40">
                Status:
              </span>
              <span
                className={`text-sm font-bold px-3 py-1 rounded-md ${
                  paymentResponse.status === "SUCCESS"
                    ? "bg-green-100 text-green-800 dark:bg-green-800/50 dark:text-green-200"
                    : paymentResponse.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/50 dark:text-yellow-200"
                    : paymentResponse.status === "FAILED"
                    ? "bg-red-100 text-red-800 dark:bg-red-800/50 dark:text-red-200"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-800/50 dark:text-blue-200"
                }`}
              >
                {paymentResponse.status || "PENDING"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
            Student Information
          </h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-sm font-medium text-green-700 dark:text-green-300 w-40">
                Student Name:
              </span>
              <span className="text-sm text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-800/50 px-3 py-1 rounded-md">
                {paymentResponse.student_info?.name ||
                  formData.student_info.name ||
                  "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-green-700 dark:text-green-300 w-40">
                Student ID:
              </span>
              <span className="text-sm text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-800/50 px-3 py-1 rounded-md">
                {paymentResponse.student_info?.id ||
                  formData.student_info.id ||
                  "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-green-700 dark:text-green-300 w-40">
                Student Email:
              </span>
              <span className="text-sm text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-800/50 px-3 py-1 rounded-md">
                {paymentResponse.student_info?.email ||
                  formData.student_info.email ||
                  "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-green-700 dark:text-green-300 w-40">
                School ID:
              </span>
              <span className="text-sm text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-800/50 px-3 py-1 rounded-md">
                {paymentResponse.school_id || formData.school_id || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-10 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-8 rounded-2xl dark:from-green-900/30 dark:to-emerald-900/30 dark:border-green-700 shadow-xl">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-800">
            <svg
              className="h-6 w-6 text-green-600 dark:text-green-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-3">
            Payment Created Successfully!
          </h3>

          {renderPaymentDetails()}

          <div className="mt-4">
            <span className="text-sm font-medium text-green-700 dark:text-green-300 block mb-2">
              Payment URL:
            </span>
            <a
              href={paymentResponse.collect_request_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-800 transition-all duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
              Proceed to Payment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
