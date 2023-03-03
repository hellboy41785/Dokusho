import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import Image from "next/image";
import Flower from "../../../public/flower.png"

export default function SignIn({ providers }) {
  return (
    <div className="flex w-full h-full items-center justify-center ">
      <div className="w-full h-full object-cover">
        <Image className="w-full h-full object-cover opacity-80" fill={true} src={Flower} alt="signin"/>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center text-black">
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className="border rounded ">
            <button onClick={() => signIn(provider.id)} className="font-bold text-2xl bg-[rgba(255,255,255,0.49)] w-full p-4">
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
