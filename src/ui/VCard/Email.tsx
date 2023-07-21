'use client';
import { EmailInputProps } from '@/types/Components';
import React from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  function EmailInput(
    { email, setEmail, emailType, setEmailType, showErrors }: EmailInputProps,
    ref,
  ) {
    const [isValid, setIsValid] = React.useState<boolean>(false);

    React.useEffect(() => {
      email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
        ? setIsValid(true)
        : setIsValid(false);
    }, [email]);

    return (
      <>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <label
              htmlFor="email-type"
              className="sr-only"
            >
              Email Type
            </label>
            <select
              id="email-type"
              name="email-type"
              autoComplete="email-type"
              value={emailType}
              onChange={(e) => setEmailType(e.target.value)}
              className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm"
            >
              <option>Work</option>
              <option>Personal</option>
              <option>Other</option>
            </select>
          </div>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-md border-0 py-1.5 pl-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid="true"
            aria-describedby="email-error"
            ref={ref}
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
export default EmailInput;
