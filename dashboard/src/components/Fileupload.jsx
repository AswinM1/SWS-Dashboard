import { useRef } from "react";

export default function App() {
  const inputRef = useRef();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">
        SWS AI Document Hub
      </h1>

      <div
        className="border-2 border-dashed rounded-xl p-20 text-center cursor-pointer"
        onClick={() =>
          inputRef.current.click()
        }
      >
        <h2 className="text-2xl font-semibold">
          Upload files
        </h2>

        <p className="text-gray-500 mt-2">
          Click to browse
        </p>

        <input
          type="file"
          hidden
          ref={inputRef}
        />
      </div>
    </div>
  );
}