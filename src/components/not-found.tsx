import Link from "next/link";
export default async function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <span className="text-[190px] text-blue-600 font-bold drop-shadow-lg ">
        404
      </span>
      <span className="text-[25px] font-bold">Oops page not found!</span>
      <p className="btn btn-primary mt-2">
        <Link href="/">Go Back</Link>
      </p>
    </div>
  );
}
