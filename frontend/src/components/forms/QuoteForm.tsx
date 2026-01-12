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

export function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    carModel: "",
    installment: "no",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(
      "Yêu cầu báo giá của bạn đã được gửi. Chúng tôi sẽ liên hệ trong ít phút!"
    );
    setIsSubmitting(false);
    setFormData({
      name: "",
      phone: "",
      carModel: "",
      installment: "no",
      location: "",
    });
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
      <h3 className="text-xl font-bold text-kia-dark mb-6">Yêu Cầu Báo Giá</h3>

      <div>
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
          htmlFor="carModel"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Dòng xe quan tâm *
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

      <div>
        <label
          htmlFor="installment"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Hình thức mua xe
        </label>
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-x-3">
            <input
              id="cash"
              name="installment"
              type="radio"
              value="no"
              checked={formData.installment === "no"}
              onChange={handleChange}
              className="h-4 w-4 border-gray-300 text-kia-red focus:ring-kia-red"
            />
            <label
              htmlFor="cash"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Trả thẳng
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              id="installment"
              name="installment"
              type="radio"
              value="yes"
              checked={formData.installment === "yes"}
              onChange={handleChange}
              className="h-4 w-4 border-gray-300 text-kia-red focus:ring-kia-red"
            />
            <label
              htmlFor="installment"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Trả góp
            </label>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Khu vực (Tỉnh/Thành)
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="location"
            id="location"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kia-red sm:text-sm sm:leading-6"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        isLoading={isSubmitting}
        className="w-full"
      >
        Nhận Báo Giá & Ưu Đãi
      </Button>
    </form>
  );
}
