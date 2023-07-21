'use client';
import { PhoneInputProps } from '@/types/Components';
import React from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  function Phone(
    { phone, setPhone, phoneType, setPhoneType, showErrors }: PhoneInputProps,
    ref,
  ) {
    const [isValid, setIsValid] = React.useState<boolean>(false);
    React.useEffect(() => {
      phone.match(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/)
        ? setIsValid(true)
        : setIsValid(false);
    }, [phone]);
    return (
      <>
        <label
          htmlFor="phone-number"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Phone Number
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <label
              htmlFor="phone-type"
              className="sr-only"
            >
              Phone Type
            </label>
            <select
              id="phone-type"
              name="phone-type"
              value={phoneType}
              onChange={(e) => setPhoneType(e.target.value)}
              autoComplete="phone-type"
              className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            >
              <option>Mobile</option>
              <option>Home</option>
              <option>Work</option>
            </select>
          </div>
          <input
            type="text"
            name="phone-number"
            id="phone-number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="+1 (555) 987-6543"
          />
          {showErrors && !isValid && (
            <>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <AiOutlineExclamationCircle
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
              <p
                className="mt-2 text-sm text-red-600"
                id="email-error"
              >
                Not a valid email address.
              </p>
            </>
          )}
        </div>
      </>
    );
  },
);

export default PhoneInput;
