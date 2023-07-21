import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastProps = {
  type: ToastType;
  message: string;
  timeoutValue: number;
  isVisible: boolean;
  onClose: () => void;
  setIsVisible: (isVisible: boolean) => void;
};

/**
 * Toast Component
 * @date 6/18/2023 - 9:17:32 AM
 * @export
 * @param {ToastProps} {
 * type,
 * message,
 * timeoutValue = 5000,
 * isVisible,
 * setIsVisible,
 * onClose
}
 * @returns {JSX.Element}
 * @example
 * const [toastVisible, setToastVisible] = React.useState<boolean>(false);
 * const [toastKey, setToastKey] = React.useState<number>(0);
 * const [toastMessage, setToastMessage] = React.useState<string>('');
 * 
 * const showToast = (message: string) => {
 *  setToastMessage(message);   
 *  setToastKey((oldKey) => oldKey + 1);
 *  setToastVisible(true);
 * };
 * 
 * const hideToast = () => {
 * setToastVisible(false);
 * };
 * 
 * return (
 * <div className="flex flex-col w-full h-full">
 *  <Toast
 *       type="success"
 *       key={toastKey}
 *       message={message}
 *       isVisible={toastVisible}
 *       onClose={hideToast}
 *       setIsVisible={hideToast}
 *       timeoutValue={5000}
 *   />
 * <button onClick={showToast}>Show Toast</button>
 * </div>
 * )
 */
export default function Toast({
  type = 'success',
  message,
  timeoutValue = 5000,
  isVisible,
  setIsVisible,
  onClose,
}: ToastProps): JSX.Element {
  const [progress, setProgress] = React.useState<number>(100);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVisible && progress > 0) {
      timer = setTimeout(() => {
        setProgress((oldProgress) => oldProgress - 100 / (timeoutValue / 100)); // decrease progress based on timeout
      }, 100);
    } else if (isVisible && progress <= 0) {
      onClose();
      setIsVisible(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, progress, onClose, setIsVisible, timeoutValue]);

  switch (type) {
    case 'success':
      return (
        <div className="flex w-full h-full flex-col">
          {isVisible && (
            <ul>
              <AnimatePresence initial={false}>
                <motion.li
                  initial={{ opacity: 0, y: 50, scale: 0.3 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="flex w-full h-full flex-row justify-between items-center text-center bg-green-500 rounded-lg">
                    <p className="m-2 text-gray-800 w-full flex-row">
                      {message}
                    </p>
                    <button
                      className="absolute right-0 top-0 focus:outline-none"
                      onClick={onClose}
                      aria-label="Close"
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex-row w-full h-2 bg-gray-300 rounded-full">
                    <div
                      className="w-full h-full flex-row bg-green-400 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </motion.li>
              </AnimatePresence>
            </ul>
          )}
        </div>
      );

    case 'error':
      return (
        <div className="flex w-full h-full flex-col">
          {isVisible && (
            <ul>
              <AnimatePresence initial={false}>
                <motion.li
                  initial={{ opacity: 0, y: 50, scale: 0.3 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="flex w-full h-full flex-row justify-between items-center text-center bg-red-500 rounded-lg">
                    <p className="m-2 text-gray-800 w-full flex-row">
                      {message}
                    </p>
                    <button
                      className="absolute right-0 top-0 focus:outline-none"
                      onClick={onClose}
                      aria-label="Close"
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex-row w-full h-2 bg-gray-300 rounded-full">
                    <div
                      className="w-full h-full flex-row bg-red-400 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </motion.li>
              </AnimatePresence>
            </ul>
          )}
        </div>
      );

    case 'warning':
      return (
        <div className="flex w-full h-full flex-col">
          {isVisible && (
            <ul>
              <AnimatePresence initial={false}>
                <motion.li
                  initial={{ opacity: 0, y: 50, scale: 0.3 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="flex w-full h-full flex-row justify-between items-center text-center bg-yellow-500 rounded-lg">
                    <p className="m-2 text-gray-800 w-full flex-row">
                      {message}
                    </p>
                    <button
                      className="absolute right-0 top-0 focus:outline-none"
                      onClick={onClose}
                      aria-label="Close"
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex-row w-full h-2 bg-gray-300 rounded-full">
                    <div
                      className="w-full h-full flex-row bg-yellow-400 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </motion.li>
              </AnimatePresence>
            </ul>
          )}
        </div>
      );

    case 'info':
      return (
        <div className="flex w-full h-full flex-col">
          {isVisible && (
            <ul>
              <AnimatePresence initial={false}>
                <motion.li
                  initial={{ opacity: 0, y: 50, scale: 0.3 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="flex w-full h-full flex-row justify-between items-center text-center bg-blue-500 rounded-lg">
                    <p className="m-2 text-gray-800 w-full flex-row">
                      {message}
                    </p>
                    <button
                      className="absolute right-0 top-0 focus:outline-none"
                      onClick={onClose}
                      aria-label="Close"
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex-row w-full h-2 bg-gray-300 rounded-full">
                    <div
                      className="w-full h-full flex-row bg-blue-400 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </motion.li>
              </AnimatePresence>
            </ul>
          )}
        </div>
      );

    default:
      return (
        <div className="flex w-full h-full flex-col">
          {isVisible && (
            <ul>
              <AnimatePresence initial={false}>
                <motion.li
                  initial={{ opacity: 0, y: 50, scale: 0.3 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="flex w-full h-full flex-row justify-between items-center text-center bg-gray-500 rounded-lg">
                    <p className="m-2 text-gray-800 w-full flex-row">
                      {message}
                    </p>
                    <button
                      className="absolute right-0 top-0 focus:outline-none"
                      onClick={onClose}
                      aria-label="Close"
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex-row w-full h-2 bg-gray-300 rounded-full">
                    <div
                      className="w-full h-full flex-row bg-gray-400 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </motion.li>
              </AnimatePresence>
            </ul>
          )}
        </div>
      );
  }
}
