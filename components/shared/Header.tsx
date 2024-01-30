import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          {/* Wrap Image with an anchor tag */}
            <Image
              src="/assets/images/logo.png"
              width={128}
              height={38}
              alt="Logo"
              className="imgh"
            />
          
        </Link>
        <SignedIn>
            <nav className="nav">
                <NavItems/>
            </nav>
        </SignedIn>
        <div className="x">
            <SignedIn>
                <UserButton afterSignOutUrl="/"/>
                <MobileNav/>
            </SignedIn>
         <SignedOut>
            <Button  asChild className="rounded-full" size="lg">
                <Link  href="/sign-in">
                    Login
                </Link>
            </Button>
         </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
