import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { Client } from 'guacamole-common-js'
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import GuacCredentialsModal from '@/components/elements/modals/GuacCredentialsModal'
import { ComputeInstance } from './module'
import { IHostEntity, connect } from '@/utils/guacamole'
import ConsoleBar from '@/components/modules/consolebar'
import LoadingModal from '@/components/elements/LoadingModal'
import ErrorModal from '@/components/elements/ErrorModal'

const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps: GetServerSideProps<{
  computeInstance: ComputeInstance
  jwt: string
}> = async (context) => {
  const jwt = context.req.cookies["jwt"];
  const instanceName = context.query.instance;

  if (jwt && instanceName) {
    // list based on VMs that are tied to a module
    const res = await fetch(`http://localhost:8080/api/compute/instance?instanceName=${instanceName}`, {
      credentials: "include", // IMPORTANT: tell fetch to include jwt cookie
      headers: {
        "Authorization": "Bearer " + jwt,
      }
    });
    const computeInstance = await res.json();
    return {
      props: {
        computeInstance,
        jwt,
      }
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: "/dashboard",
    },
  }
}


export default function Console({ computeInstance, jwt }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // The useEffect hook calls connect() aftech component renders.
  // Otherwise, connect() will be called during SSR, 
  // causes document to be undefined.

  // Form State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [protocol, setProtocol] = useState("");

  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openCredentialsModal, setOpenCredentialsModal] = useState(true);

  const host: IHostEntity = {
    name: computeInstance.instanceName,
    protocol: protocol,
    hostname: computeInstance.address?.ipv4Address,
    port: 3389,
    username: username,
    password: password,
    ignoreCert: true,
  }

  const callback = () => {
    setOpenLoadingModal(true);

    connect(host, jwt, (guac: Client) => {
      setOpenCredentialsModal(false);

      // When a display is present, close modal
      guac.onsync = () => {
        setOpenLoadingModal(false);
      }

      // Error handler
      guac.onerror = function(error: any) {
        // throw new Error("Connection failed: ", error);
        console.log("Guac error", error);
        guac!.disconnect();

        setOpenLoadingModal(false);
        setOpenErrorModal(true);
      };
    });

  };

  useEffect(() => {
    if (password) {
      setOpenCredentialsModal(true);
    }
  }, [password])

  /* useEffect(() => {
    setOpenLoadingModal(true);
 
    setGuac(connect(host));
 
    // When a display is present, close modal
    guac!.onsync = () => {
      setOpenLoadingModal(false);
    }
 
    // Error handler
    guac!.onerror = function(error: any) {
      // throw new Error("Connection failed: ", error);
      console.log("Guac error", error);
      guac!.disconnect();
 
      setOpenLoadingModal(false);
      setOpenErrorModal(true);
    };
  }, [guac, host]); */


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
      <GuacCredentialsModal
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        setProtocol={setProtocol}
        open={openCredentialsModal}
        onClose={setOpenCredentialsModal}
        callback={callback}
      />
      <LoadingModal open={openLoadingModal} onClose={() => setOpenLoadingModal(false)} />
      <ErrorModal open={openErrorModal} onClose={() => setOpenErrorModal(false)} errorMessage="A connection error has occured." />
    </main>
  )
}
