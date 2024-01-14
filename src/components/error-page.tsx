import { Bot } from "lucide-react";

const ServiceNotFound = () => {
  return (
    <div className="container flex min-h-[75vh] items-center justify-center">
      <div className="flex flex-col items-center gap-2 text-center">
        <Bot size={250} className="text-custom-blue" />
        <p className="text-2xl">เกิดข้อผิดพลาดกับเซิฟเวอร์</p>
        <button
          onClick={() => window.location.reload()}
          className="my-4 rounded-md border-[1px] border-custom-yellow px-4 py-2"
        >
          ลองเชื่อมต่ออีกครั้ง
        </button>
      </div>
    </div>
  );
};

export default ServiceNotFound;
