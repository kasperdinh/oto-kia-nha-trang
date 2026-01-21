"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { submitContact } from "@/app/actions/leads";
import { useEffect, useRef } from "react";
import { UserIcon, PhoneIcon } from "@heroicons/react/24/outline";

const initialState = {
  errors: {},
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      alert(state.message);
      formRef.current?.reset();
    } else if (state.message && !state.success) {
      alert(state.message);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="relative">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900 mb-2"
          >
            Họ và tên
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="given-name"
              required
              placeholder="Nguyễn Văn A"
              className="block w-full rounded-md border border-gray-300 py-3 pl-10 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-kia-red focus:ring-0 sm:text-sm sm:leading-6 transition-all duration-200"
            />
          </div>
          {state.errors?.name && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <span className="text-red-500">⚠</span> {state.errors.name[0]}
            </p>
          )}
        </div>

        <div className="relative">
          <label
            htmlFor="phone"
            className="block text-sm font-medium leading-6 text-gray-900 mb-2"
          >
            Số điện thoại
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="tel"
              name="phone"
              id="phone"
              autoComplete="tel"
              required
              placeholder="0909 090 909"
              className="block w-full rounded-md border border-gray-300 py-3 pl-10 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-kia-red focus:ring-0 sm:text-sm sm:leading-6 transition-all duration-200"
            />
          </div>
          {state.errors?.phone && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <span className="text-red-500">⚠</span> {state.errors.phone[0]}
            </p>
          )}
        </div>
        <div className="sm:col-span-2 relative">
          <label
            htmlFor="message"
            className="block text-sm font-medium leading-6 text-gray-900 mb-2"
          >
            Lời nhắn{" "}
            <span className="text-gray-500 font-normal">(Không bắt buộc)</span>
          </label>
          <div className="relative rounded-md shadow-sm">
            <textarea
              name="message"
              id="message"
              rows={4}
              placeholder="Để lại lời nhắn của bạn..."
              className="block w-full rounded-md border border-gray-300 py-3 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-kia-red focus:ring-0 sm:text-sm sm:leading-6 transition-all duration-200 resize-none"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <Button
          type="submit"
          disabled={isPending}
          isLoading={isPending}
          className="w-full sm:h-10 sm:w-auto min-w-full flex items-center justify-center gap-2 text-base py-3"
          size="lg"
        >
          {!isPending && "Gửi Yêu Cầu"}
        </Button>
      </div>
    </form>
  );
}
