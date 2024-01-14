import { Link } from "@tanstack/react-router";
import { SearchX } from "lucide-react";

const ServiceNotFound = () => {
  return (
    <div className="container flex min-h-[75vh] items-center justify-center">
      <div className="flex flex-col items-center gap-2 text-center">
        <SearchX size={250} className="text-custom-blue" />
        <p className="text-2xl">ไม่พบการลิงค์ที่คุณตามหา หรือลิงค์ไม่ถูกต้อง</p>
        <Link to={"/"} className="my-4">
          <button className="rounded-md border-[1px] border-custom-yellow px-4 py-2">
            กลับสู่หน้าหลัก
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceNotFound;
