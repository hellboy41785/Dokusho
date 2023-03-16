import { Home, Search } from "lucide-react";
import React from "react";
import Link from "next/link";
import { useNovelUpStore } from "@/store/useStore";
import { useState } from "react";
import { BookBookmark, House, User } from "phosphor-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter()
  const setSearchToggle = useNovelUpStore((state) => state.setSearchToggle);
  const [toggle, setToggle] = useState(false);

  return (
    <div className="fixed z-20 gap-2 bottom-2 inset-x-[88%] lg:inset-x-[96%] space-y-2">
      {toggle && (
        <div className="flex flex-col gap-2">
          {status === "unauthenticated" ? (
            <User
              className="p-2 btn btn-circle"
              size={40}
              weight="fill"
              onClick={()=>router.push("/auth/signin")}
            />
          ) : (
            <User
              className="p-2 btn btn-circle"
              size={40}
              weight="fill"
              color="#d11010"
              onClick={signOut}
            />
          )}

          <Search
            className="p-2 btn btn-circle"
            size={40}
            onClick={() => setSearchToggle()}
          />
          <Link href={`/mylist/`}>
            <BookBookmark
              className="p-2 btn btn-circle"
              size={60}
              color="#d9d9d9"
              weight="fill"
            />
          </Link>
          <Link href={`/`} scroll={false}>
            <House
              className="p-2 btn btn-circle"
              size={60}
              color="#d9d9d9"
              weight="fill"
            />
          </Link>
        </div>
      )}
      <label className="btn btn-circle swap swap-rotate">
        <input type="checkbox" onClick={() => setToggle((prev) => !prev)} />

        <svg
          className="fill-current swap-off"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>

        <svg
          className="fill-current swap-on"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      </label>
    </div>
  );
};

export default Navbar;
