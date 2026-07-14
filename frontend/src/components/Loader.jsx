import { Oval } from "react-loader-spinner";

function Loader() {
  return (
    <div className="flex justify-center items-center">
      <Oval height={40} width={40} color="#2563eb" />
    </div>
  );
}

export default Loader;
