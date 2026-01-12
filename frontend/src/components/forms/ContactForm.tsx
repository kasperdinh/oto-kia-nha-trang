"use client";

import { useState } from "react";
import { Button } from "../ui/Button";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất!");
    setIsSubmitting(false);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Họ và tên
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="given-name"
              required
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kia-red sm:text-sm sm:leading-6"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Số điện thoại
          </label>
          <div className="mt-2.5">
            <input
              type="tel"
              name="phone"
              id="phone"
              autoComplete="tel"
              required
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kia-red sm:text-sm sm:leading-6"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="mt-2.5">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kia-red sm:text-sm sm:leading-6"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Nội dung tin nhắn
          </label>
          <div className="mt-2.5">
            <textarea
              name="message"
              id="message"
              rows={4}
              required
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kia-red sm:text-sm sm:leading-6"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="w-full sm:w-auto"
        >
          Gửi tin nhắn
        </Button>
      </div>
    </form>
  );
}
