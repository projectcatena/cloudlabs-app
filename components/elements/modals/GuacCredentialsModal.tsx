import ModalTitle from "./partials/ModalTitle";
import { Listbox } from "@headlessui/react";
import { useRef } from "react";
import ModalTextInput from "./partials/ModalTextInput";
import ModalLayout from "@/components/layouts/ModalLayout";

type GuacCredentialsModalProps = {
  username: string,
  password: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  setProtocol: React.Dispatch<React.SetStateAction<string>>,
  open: boolean
  onClose: React.Dispatch<React.SetStateAction<boolean>>
  callback: () => void;
}

// Must convert to lower case
const protocols: string[] = ['RDP', 'VNC', 'SSH'];

export default function GuacCredentialsModal({
  username, password, setUsername, setPassword, setProtocol, open, onClose, callback
}: GuacCredentialsModalProps) {

  const usernameInput = useRef<HTMLInputElement>();
  const passwordInput = useRef<HTMLInputElement>();

  if (!open) return null;

  return (
    <ModalLayout>
      <div className="absolute top-2 right-2">
        <button type="button" onClick={() => onClose(false)} className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-notifications">
          <span className="sr-only">Close</span>
          <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
          </svg>
        </button>
      </div>

      <div className="p-4 sm:p-10">
        <ModalTitle
          className="mb-6 text-center"
          title="Connect to an Instance"
          description="Enter your the OS username and password to connect to the instance."
        />

        <div className="space-y-4">
          {/* Form */}
          <form id="initConnection" method="post" onSubmit={callback}>
            <div className="grid gap-y-4">
              {/* Form Group */}
              <div>
                <label htmlFor="username" className="block text-sm mb-2 dark:text-white">Username</label>

                <div className="relative">
                  <ModalTextInput
                    placeholder="maria.hee@dissy.com"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    ref={usernameInput}
                  />
                  <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                    <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                </div>
                <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
              </div>
              {/* End Form Group */}


              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Password</label>

                <div className="relative">
                  <ModalTextInput
                    id="password"
                    name="password"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    ref={passwordInput}
                  />
                  <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                    <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                  </div>
                </div>
                <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
              </div>
              {/* End Form Group */}

              {/* Form Group */}
              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="protocol" className="block text-sm mb-2 dark:text-white">Protocol</label>
                </div>
                <div className="relative">
                  <Listbox name="protocol" defaultValue={protocols[0]}>
                    <Listbox.Button className="relative cursor-default text-left py-3 px-4 block w-full border rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                      {
                        ({ value }) => {
                          setProtocol(value.toLowerCase())
                          return (
                            <>
                              {value}
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 text-gray-400">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                              </span>

                            </>
                          )
                        }
                      }
                    </Listbox.Button>
                    <Listbox.Options className="border-gray-200 absolute z-[60] mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-800 dark:border-gray-700">
                      {protocols.map((protocol, key) => (
                        <Listbox.Option
                          key={key}
                          value={protocol}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-500 text-white' : 'text-gray-400'
                            }`
                          }
                        >
                          {protocol}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Listbox>
                </div>
              </div>
              {/* End Form Group */}
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-gray-800 dark:border-gray-700">
        <button type="button" onClick={() => onClose(false)} className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-notifications">
          Cancel
        </button>
        <button type="submit" form='initConnection' className="w-24 h-10 py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 disabled:hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
          {/* <svg className={`animate-spin h-4 w-4 text-white ${isCreating ? "" : "hidden"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className={`${isCreating ? "hidden" : ""}`}>
            Create
          </span> */}
          Connect
        </button>
        {/* <button type="submit" form='createVirtualMachineForm' className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                              Create
                          </button> */}
      </div>
    </ModalLayout>
  )
}
