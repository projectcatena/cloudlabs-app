import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'

const role = [
{ role: "USER" },
{ role: "TUTOR" },
{ role: "ADMIN" },
]
/* async function to populate dropdownlist (server side props) that preloads */

export default function RoleDropdownList() {
const [selected, setSelected] = useState(role[0])

return (
    <div className="">
    <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
        <Listbox.Label>Role :</Listbox.Label>
        <div className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200 pl-2">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-black py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.role}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
            />
            </span>
        </Listbox.Button>
        </div>
        <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {role.map((Role, RoleIdx) => (
                <Listbox.Option
                key={RoleIdx}
                className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                }
                value={Role}
                >
                {({ selected }) => (
                    <>
                    <span
                        className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                        }`}
                    >
                        {Role.role}
                    </span>
                    {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                    ) : null}
                    </>
                )}
                </Listbox.Option>
            ))}
            </Listbox.Options>
        </Transition>
        </div>
    </Listbox>
    </div>
)
}
