
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/app/lib/next-auth/options';
import { User } from '@/app/types/types';

const Header = async () => {

  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;

  return (
    <header className="bg-gray-700 text-gray-500 shadow-lg">
      <nav className="bg-indigo-900 flex items-center justify-between p-4">
        <Link href={"/"} className="text-xl font-bold">
          <b className="text-indigo-200 hover:text-indigo-400">YIcreate</b>
        </Link>
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="text-indigo-200 hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </Link>
          <Link
            href={user ? "/profile" : "/api/auth/signin"}
            className="text-indigo-200 hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium"
          >
            { user ? "Profile" : "Login"}
          </Link>

          { user ? <Link href="/api/auth/signout"
          // onClick={() => signOut({ callbackUrl: "/login" })} 
          className="text-indigo-200 hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">
            Logout
            </Link>
             : ""}

          <Link href={`/profile`}>
            <Image
              width={50}
              height={50}
              alt="profile_icon"
              src={ user?.image || "/default_icon.png"}
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;