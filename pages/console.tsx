import { Inter } from 'next/font/google'
import { connect, connectKeyboard, IHostEntity } from '../utils/guacamole'
import { useEffect, useState } from 'react'
import LoadingModal from "../components/elements/LoadingModal"
import ErrorModal from "../components/elements/ErrorModal"
import ConsoleBar from "../components/modules/consolebar"
import Guacamole from 'guacamole-common-js'

const inter = Inter({ subsets: ['latin'] })

export default function Console() {
  // The useEffect hook calls connect() aftech component renders.
  // Otherwise, connect() will be called during SSR, 
  // causes document to be undefined.

  // Hardcoded properties of a connection, should be dynamic
  const host: IHostEntity = {
    name: "Windows 11",
    protocol: "rdp",
    hostname: "10.10.1.11",
    port: 3389,
    username: "Admin",
    password: "Pa$$w0rd",
    ignoreCert: true,
  }

  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);

  var guac: Guacamole.Client | undefined;

  useEffect(() => {
    setOpenLoadingModal(true);

    guac = connect(host)

    // When a display is present, close modal
    guac.onsync = () => {
      setOpenLoadingModal(false);
    }

    // Error handler
    guac.onerror = function (error: any) {
      // throw new Error("Connection failed: ", error);
      console.log("Guac error", error);
      guac!.disconnect();

      setOpenLoadingModal(false);
      setOpenErrorModal(true);
    };

    connectKeyboard(document, guac);

  }, []);
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center dark:bg-slate-900 ${inter.className}`}
    >
      <ConsoleBar />
      <div id="display" className="z-40">
      </div>
      {/* <div className="text-center">
          <button type="button" onClick={() => setOpenModal(true)} className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-danger-alert">
              Open modal
          </button>
      </div> */}
      <LoadingModal open={openLoadingModal} onClose={() => setOpenLoadingModal(false)} />
      <ErrorModal open={openErrorModal} onClose={() => setOpenErrorModal(false)} errorMessage="A connection error has occured." />
    </main>
  )
}