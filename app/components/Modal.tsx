import React, { useState } from "react";
import { useWalletContext } from "../context/WalletContext";
import { validate } from "uuid";
import { useRouter } from "next/navigation";

type ModalProps = {
  isOpen: number;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const walletContext = useWalletContext();
  if (!isOpen) return null;

  return (
    <div>
      {isOpen === 2 ? (
        <>
          <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Please notice here
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="default-modal"
                    onClick={onClose}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5 space-y-4">
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your UUID
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="f17f8ef7-427a-4929-bffd-4c4cb6a44c1a"
                      required
                      onChange={(e) => {
                        walletContext.setImportUUID(e.target.value);
                      }}
                    />
                  </div>
                  <p className="text-base leading-relaxed text-proTextLight dark:text-gray-400">
                    Note: Your <b>UUID</b> provides{" "}
                    <b>full access to your wallet and funds.</b> <br></br>{" "}
                    <b>Do not share this with anyone.</b> And please <b>note</b>{" "}
                    this in your private textbook.
                  </p>
                </div>
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-hide="default-modal"
                    onClick={() => {
                      if (!validate(walletContext.importUUID!)) {
                        walletContext.setToastrState("uuidError");
                        walletContext.setShowToastr(false); // Reset the toastr to hide, allowing re-trigger
                        setTimeout(() => {
                          walletContext.setShowToastr(true);
                        }, 100); // Short delay before showing it again
                      } else {
                        localStorage.setItem(
                          "reference",
                          walletContext.importUUID!
                        );
                        router.push("/walletManagement");
                      }
                    }}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Import
                  </button>
                  <button
                    data-modal-hide="default-modal"
                    type="button"
                    onClick={onClose}
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-600 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-10 justify-center items-center w-full md:inset-0 max-h-full opacity-50"></div>
        </>
      ) : (
        <>
          <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Please notice here
                  </h3>
                </div>
                <div className="p-4 md:p-5 space-y-4">
                  <div className="mb-6">
                    <p className="text-base leading-relaxed text-proText dark:text-gray-400">
                      <b>Your UUID:</b> {localStorage.getItem("reference")}
                    </p>
                  </div>
                  <p className="text-base leading-relaxed text-proTextLight dark:text-gray-400">
                    Note: Your <b>UUID</b> provides{" "}
                    <b>full access to your wallet and funds.</b> <br></br>{" "}
                    <b>Do not share this with anyone.</b> And please <b>note</b>{" "}
                    this in your private textbook.
                  </p>
                </div>
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-hide="default-modal"
                    onClick={() => {
                      router.push("/walletManagement");
                    }}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    I got it
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-600 flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-10 justify-center items-center w-full md:inset-0 max-h-full opacity-50"></div>
        </>
      )}
    </div>
  );
};

export default Modal;
