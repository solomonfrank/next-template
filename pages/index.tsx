import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n } from "@/next-i18next.config";
import { useTranslation } from "next-i18next";
import Logo from "@/components/icons/Logo";
import { Button } from "@/components/ui";
import Container from "@/components/Container";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { t } = useTranslation("common");
  return (
    <div
      className="relative min-h-screen w-full text-primary 
    before:bg-subtleMask
    before:min-h-screen
    before:top-0
     before:left-0 before:w-full before:absolute 
     before:content-['']"
    >
      <header className="fixed w-full top-0 left-0  border-b border-white-08 h-[var(--navigation-height)] backdrop-blur-[12px] ">
        <Container className="h-full">
          <nav className="h-full flex items-center font-medium">
            <div>
              <Link href={"/"}>
                <Logo />
              </Link>
            </div>
            <ul className="flex gap-5 h-full  items-center py-3 [&_a]:text-sm [&_li]:ml-6">
              <li>
                <Link href="/">Features</Link>
              </li>
              <li>
                <Link href="/">Methods</Link>
              </li>
              <li>
                <Link href="/">Customer</Link>
              </li>
              <li>
                <Link href="/">Changelog</Link>
              </li>
              <li>
                <Link href="/">Integration</Link>
              </li>
              <li>
                <Link href="/">Pricing</Link>
              </li>
              <li>
                <Link href="/">Contact</Link>
              </li>
              <li>
                <Link href="/">Company</Link>
              </li>
            </ul>
            <div className="ml-auto flex items-center gap-5">
              <Link className="text-sm" href="/">
                Login
              </Link>
              <Button className="bg-brand-primary-color rounded-full  h-8 px-8 outline-none border-none">
                Sign up
              </Button>
            </div>
          </nav>
        </Container>
      </header>

      <main className="pt-[var(--navigation-height)]">
        <Container>
          <div className="text-center">
            <h1 className="text-5xl my-6 mask-hero font-medium">
              Linear is a better way
              <br /> to build products
            </h1>
            <p className="text-lg mb-12 text-[#b4bcc4]">
              Meet the new standard for modern software development. <br />
              Streamline issues, sprints, and product roadmaps.
            </p>
          </div>
          <div></div>
          <Image src="/hero.webp" alt="hero image" width="1100" height="600" />
        </Container>
      </main>
      <footer className="mt-12 py-9 border-t border-white-08">
        <Container className="flex justify-between">
          <div className="flex flex-col">
            <div>
              <Link
                href="/"
                className="flex items-center gap-1 text-sm font-medium "
              >
                <Logo className="text-textiary" />
                <span className="text-textiary"> - Designed Worldwide</span>
              </Link>
            </div>

            <div className="mt-auto">Social</div>
          </div>
          <div className="flex">
            <div className="min-w-[18rem] min-w-max-[100%] text-sm ">
              <h3 className="mb-[14px] text-secondary font-medium">Product</h3>
              <ul className="[&_li:not(:last-child)]:mb-[14px] [&_a]:text-textiary">
                <li>
                  <Link href="#">Features</Link>
                </li>
                <li>
                  <Link href="#">Integration</Link>
                </li>
                <li>
                  <Link href="#">Pricing</Link>
                </li>

                <li>
                  <Link href="#">Changelogs</Link>
                </li>
                <li>
                  <Link href="#">Docs</Link>
                </li>
                <li>
                  <Link href="#">Features</Link>
                </li>
                <li>
                  <Link href="#">Linear Methods</Link>
                </li>
                <li>
                  <Link href="#">Downloads</Link>
                </li>
              </ul>
            </div>
            <div className="min-w-[18rem] min-w-max-[100%] text-sm ">
              <h3 className="mb-[14px] text-secondary font-medium">Company</h3>
              <ul className="[&_li:not(:last-child)]:mb-[14px] [&_a]:text-textiary">
                <li>
                  <Link href="#">About us </Link>
                </li>
                <li>
                  <Link href="#">Blog</Link>
                </li>
                <li>
                  <Link href="#">Careers</Link>
                </li>

                <li>
                  <Link href="#">Customers</Link>
                </li>
                <li>
                  <Link href="#">Brand</Link>
                </li>
              </ul>
            </div>

            <div className="min-w-[18rem] min-w-max-[100%] text-sm ">
              <h3 className="mb-[14px] text-secondary font-medium">
                Resources
              </h3>
              <ul className="[&_li:not(:last-child)]:mb-[14px] [&_a]:text-textiary">
                <li>
                  <Link href="#">Community</Link>
                </li>
                <li>
                  <Link href="#">Contact</Link>
                </li>
                <li>
                  <Link href="#">DPA</Link>
                </li>

                <li>
                  <Link href="#">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#">Terms of service</Link>
                </li>
                <li>
                  <Link href="#">Report vulnerability</Link>
                </li>
              </ul>
            </div>
            <div className="min-w-[18rem] min-w-max-[100%] text-sm ">
              <h3 className="mb-[14px] text-secondary font-medium">
                Developer
              </h3>
              <ul className="[&_li:not(:last-child)]:mb-[14px] [&_a]:text-textiary">
                <li>
                  <Link href="#">API</Link>
                </li>
                <li>
                  <Link href="#">Status</Link>
                </li>
                <li>
                  <Link href="#">DPA</Link>
                </li>

                <li>
                  <Link href="#">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#">Github</Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale || i18n.defaultLocale, [
        "common",
      ])),
      // Will be passed to the page component as props
    },
  };
};
