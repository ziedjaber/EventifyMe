import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t" id="footer">
      <div className="wrapper flex-center flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href='/'>
          <div className="flex-center">
            <Image
              id="footer-logo"
              src="/assets/images/logo.png"
              alt="logo"
              width={128}
              height={38}
            />
          </div>
        </Link>

        <p>2023 Evently. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
