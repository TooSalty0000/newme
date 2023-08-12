import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="min-h-screen flex flex-col justifiy-center">
      <div className="flex-1 flex flex-col justify-center text-center">
        <h1 className="text-2xl font-bold">Oops</h1>
        <p>Something is wrong!</p>
      </div>
      <div className="flex-[0.5] flex justify-center content-center">
        <div>
          <Link
            className="bg-highlightColor min-w-fit hover:bg-highlightColorShade text-white font-bold py-2 px-4 rounded"
            to="/Home"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
