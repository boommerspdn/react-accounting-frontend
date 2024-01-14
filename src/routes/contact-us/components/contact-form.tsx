import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  name: z
    .string()
    .min(1, "ชื่อต้องมีอย่างน้อย 1 ตัวอักษร")
    .max(23, "ชื่อต้องไม่เกิน 23 ตัวอักษร"),
  email: z
    .string()
    .email("อีเมลไม่ถูกต้อง")
    .min(1, "อีเมลต้องมีอย่างน้อย 1 ตัวอักษร")
    .max(50, "อีเมลต้องไม่เกิน 50 ตัวอักษร"),
  phone: z
    .string()
    .min(1, "เบอร์โทรศัพท์ต้องมีอย่างน้อย 1 ตัวอักษร")
    .max(23, "เบอร์โทรศัพท์ต้องไม่เกิน 23 ตัวอักษร"),
  company: z
    .string()
    .max(23, "เบอร์โทรศัพท์ต้องไม่เกิน 23 ตัวอักษร")
    .optional(),
  message: z.string().min(1, "ข้อความต้องมีอย่างน้อย 1 ตัวอักษร"),
});

const ContactForm = ({ emailToRecieve }: { emailToRecieve: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const emailBody = {
      to: emailToRecieve,
      from: "FAST ON TIME ACCOUNTING<contact@fastontime.co.th>",
      subject: "ข้อความใหม่จาก FAST ON TIME ACCOUNTING",
      html: `
      <h1>${data.message}</h1>
      ${data.company ? `<p>${data.company}</p>` : ""}
      <p>ชื่อ : ${data.name}</p>
      <p>อีเมล : ${data.email}</p>
      <p>เบอร์โทรศัพท์ : ${data.phone}</p>
      <hr>
      <p>${data.message}</p>
      `,
    };
    setIsSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_EMAIL_TOKEN}`,
        },
        body: JSON.stringify(emailBody),
      });
      if (!res.ok) {
        throw new Error();
      }
      setIsSubmitting(false);
      form.reset();
      toast.success("ส่งอีเมลสำเร็จ");
    } catch (e) {
      setIsSubmitting(false);
      toast.error("เกิดข้อผิดพลาด! ส่งอีเมลไม่สำเร็จ");
      console.log(e);
    }
  };

  return (
    <>
      <Toaster />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>ชื่อ</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="กรอกชื่อของคุณ"
                      maxLength={23}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>อีเมล</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="กรอกอีเมลของคุณ"
                      maxLength={50}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>เบอร์โทรศัพท์</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      inputMode="numeric"
                      pattern="[0-9]+"
                      placeholder="กรอกเบอร์โทรศัพท์ของคุณ"
                      maxLength={23}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>
                    ชื่อบริษัท{" "}
                    <span className="text-black/60">(*ไม่จำเป็น)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="กรอกชื่อบริษัทของคุณ"
                      maxLength={23}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>ข้อความ</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="กรอกข้อความที่ต้องการส่งหาเรา"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="rounded-full bg-custom-blue px-20 py-2 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "ส่งข้อความ"
              )}
            </button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ContactForm;
