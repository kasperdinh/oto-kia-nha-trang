"use client";

import { useState } from "react";
import { Button } from "../ui/Button";

const CAR_MODELS = [
  "KIA Morning",
  "KIA Soluto",
  "KIA K3",
  "KIA K5",
  "KIA Sonet",
  "KIA Seltos",
  "KIA Sportage",
  "KIA Sorento",
  "KIA Carnival",
];

export function TestDriveForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    carModel: "",
    date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(
      "Đăng ký lái thử thành công. Chúng tôi sẽ liên hệ để xác nhận lịch hẹn!"
    );
    setIsSubmitting(false);
    setFormData({ name: "", phone: "", email: "", carModel: "", date: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
    >
      <h3 className="text-xl font-bold text-kia-dark mb-6">Đăng Ký Lái Thử</h3>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="carModel"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Dòng xe muốn lái thử *
          </label>
          <div className="mt-2">
            <select
              id="carModel"
              name="carModel"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-kia-red sm:text-sm sm:leading-6"
              value={formData.carModel}
              onChange={handleChange}
            >
              <option value="">Chọn dòng xe</option>
              {CAR_MODELS.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Họ và tên *
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="name"
              id="name"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kia-red sm:text-sm sm:leading-6"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Số điện thoại *
          </label>
          <div className="mt-2">
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kia-red sm:text-sm sm:leading-6"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="mt-2">
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kia-red sm:text-sm sm:leading-6"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Ngày dự kiến lái thử
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="date"
              id="date"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kia-red sm:text-sm sm:leading-6"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        isLoading={isSubmitting}
        className="w-full"
      >
        Đăng Ký Lái Thử
      </Button>
    </form>
  );
}
