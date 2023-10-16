import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employees Page",
};

export default function Employees() {
  return (
    <div className="bg-blue-200 h-full">
      <h1>Employees</h1>
    </div>
  );
}
