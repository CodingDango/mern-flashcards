import { ClipLoader } from "react-spinners";

const defaultMainClass =
  "h-full flex flex-col gap-11 pt-8 pb-7 px-my-sm md:px-my-md xl:pl-10 xl:pr-12";

export default function Main({
  children,
  isLoading = false,
  className = defaultMainClass,
}) {
  return (
    <main className={`${className}`}>
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      ) : (
        children
      )}
    </main>
  );
}
