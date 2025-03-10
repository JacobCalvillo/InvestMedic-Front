import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const errorMessage = "Something went wrong.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-5xl font-bold text-red-500 mb-4">Oops! Something went wrong.</h1>
      <p className="text-lg mb-6 text-gray-600">Sorry, an unexpected error has occurred. Please try again later.</p>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 text-left">
        <p className="text-sm text-gray-500 mb-2">
          <strong className="text-gray-700">Error Code:</strong> {"Unknown"}
        </p>
        <p className="text-sm text-gray-500">
          <strong className="text-gray-700">Message:</strong> {errorMessage}
        </p>
      </div>
    </div>
  );
}
