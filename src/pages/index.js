import HomePage from "@/components/Home/HomePage" 
import { useRouter } from "next/router"; 
import useScrollRestoration from "@/PreserveScroll/usePreserveScroll";

export default function Home() {
  const router = useRouter();
  useScrollRestoration(router)
  return (
    <>
      <HomePage/> 
    </>
  );
}

