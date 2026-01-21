"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  ChevronDownIcon,
  UserIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { submitQuote } from "@/app/actions/leads";
import { useEffect, useRef } from "react";
import { PROVINCES } from "@/constants/provinces";

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

const initialState = {
  message: "",
  errors: {},
};

export function QuoteForm() {
  const [state, formAction, isPending] = useActionState(
    submitQuote,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      alert(
        "Yêu cầu báo giá của bạn đã được gửi. Chúng tôi sẽ liên hệ trong ít phút!",
      );
      formRef.current?.reset();
    } else if (state.message && !state.success) {
      alert(state.message);
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-6 bg-white p-8 rounded-xl shadow-lg border-2 border-gray-100"
    >
      <h3 className="text-xl font-bold text-kia-dark mb-6">Yêu Cầu Báo Giá</h3>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Họ và tên *
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <Input
            type="text"
            name="name"
            id="name"
            required
            placeholder="Nguyễn Văn A"
            className="focus-visible:ring-0 focus-visible:border-kia-red pl-10"
          />
          {state.errors?.name && (
            <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Số điện thoại *
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <Input
            type="tel"
            name="phone"
            id="phone"
            required
            placeholder="0909 090 909"
            className="focus-visible:ring-0 focus-visible:border-kia-red pl-10"
          />
          {state.errors?.phone && (
            <p className="mt-1 text-sm text-red-600">{state.errors.phone[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="carModel"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Dòng xe quan tâm *
        </label>
        <div className="relative mt-2">
          <select
            id="carModel"
            name="carModel"
            required
            defaultValue=""
            className="block w-full appearance-none rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-kia-red focus:ring-0 sm:text-sm sm:leading-6"
          >
            <option value="">Chọn dòng xe</option>
            {CAR_MODELS.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
        {state.errors?.carModel && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.carModel[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="installment"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Hình thức mua xe
        </label>
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-x-2">
            <input
              id="cash"
              name="installment"
              type="radio"
              value="no"
              defaultChecked
              className="h-3.5 w-3.5 text-kia-red focus:outline-none focus:ring-kia-red accent-kia-red rounded-full"
            />
            <label
              htmlFor="cash"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Trả thẳng
            </label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              id="installment"
              name="installment"
              type="radio"
              value="yes"
              className="h-3.5 w-3.5 text-kia-red focus:outline-none focus:ring-kia-red accent-kia-red rounded-full"
            />
            <label
              htmlFor="installment"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Trả góp
            </label>
          </div>
        </div>
        {state.errors?.installment && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.installment[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Khu vực (Tỉnh/Thành)
        </label>
        <div className="relative mt-2">
          <select
            id="location"
            name="location"
            required
            defaultValue=""
            className="block w-full appearance-none rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:border-kia-red focus:ring-0 sm:text-sm sm:leading-6"
          >
            <option value="">Chọn khu vực</option>
            {PROVINCES.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        isLoading={isPending}
        className="w-full"
      >
        Nhận Báo Giá & Ưu Đãi
      </Button>
    </form>
  );
}
