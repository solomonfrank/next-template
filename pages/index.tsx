import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { GetServerSidePropsContext } from "next";
import { useInView } from "react-intersection-observer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n } from "@/next-i18next.config";
import { useTranslation } from "next-i18next";
import Logo from "@/components/icons/Logo";
import { Button } from "@/components/ui";
import Container from "@/components/Container";
import ForwardDirection from "@/components/icons/foward";
import { classNames } from "@/libs/classNames";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { t } = useTranslation("common");
  const { ref, inView, entry } = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  return (
    <div className="relative min-h-screen w-full text-primary">
      <header className="fixed w-full top-0 left-0  border-b border-white-08 h-[var(--navigation-height)] backdrop-blur-[12px] z-10 ">
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

      <main className="pt-[var(--navigation-height)] bg-subtleMask ">
        <Container className="py-[6.4rem] ">
          <div className="text-center ">
            <Button
              variant="secondary"
              size="small"
              className="rounded-full"
              // className=" px-3 h-7 text-sm font-medium rounded-full bg-[rgba(255,255,255,0.1)] text-center backdrop-blur-[12px] text-primary border border-white-08"
            >
              Announcing our $35M Series B <ForwardDirection />
            </Button>
          </div>

          <div className="text-center">
            <h1 className="text-8xl my-6 mask-hero font-medium animate-fade-in [--animation-delay:200ms] opacity-0 translate-y-[1rem]">
              Linear is a better way
              <br /> to build products
            </h1>
            <p className="text-lg mb-12 text-[#b4bcc4] animate-fade-in [--animation-delay:400ms] opacity-0 translate-y-[1rem]">
              Meet the new standard for modern software development. <br />
              Streamline issues, sprints, and product roadmaps.
            </p>
          </div>
          <div className="text-center text-xs font-medium backdrop-blur-[12px] animate-fade-in  [--animation-delay:600ms] opacity-0 translate-y-[1rem]">
            <Button
              variant="primary"
              size="large"
              className="rounded-full text-center backdrop-blur-[12px] text-primary border-0 border-[rgba(255,255, 255, 0.05)]"
            >
              Get Started <ForwardDirection />
            </Button>
          </div>

          <div ref={ref} className="[perspective:2000px]  mt-[12.8rem]">
            <div
              className={classNames(
                "relative bg-hero-gradient border border-white-08 bg-white bg-opacity-[0.01] rounded-lg",
                inView ? "animate-rotate-out" : "[transform:rotationX(0)]",
                "before:w-full before:h-full before:absolute before:bg-conic-hero-gradient before:[filter:blur(120px)]  before:opacity-0",
                inView && "before:animate-glow-image"
              )}
              // className={`bg-hero-gradient border border-white-08 bg-white bg-opacity-[0.01] rounded-lg [transform:rotateX(${
              //   inView ? 0 : "25deg"
              // })] `}
            >
              <svg
                width="100%"
                viewBox="0 0 1499 778"
                fill="none"
                className={classNames(
                  "absolute w-full h-full top-0 left-0",
                  "[&_path]:stroke-white [&_path]:[stroke-opacity:0.2] [&_path]:[stroke-dasharray:1] [&_path]:[stroke-dashoffset:1]",
                  inView && "[&_path]:animate-image-stroke"
                )}
              >
                <path pathLength="1" d="M1500 72L220 72"></path>
                <path pathLength="1" d="M1500 128L220 128"></path>
                <path pathLength="1" d="M1500 189L220 189"></path>
                <path pathLength="1" d="M220 777L220 1"></path>
                <path pathLength="1" d="M538 777L538 128"></path>
              </svg>
              <Image
                className={classNames(
                  "z-10 relative transition-opacity delay-[600ms]",
                  inView ? "opacity-100" : "opacity-0"
                )}
                src="/hero.webp"
                alt="hero image"
                width="1100"
                height="600"
                style={{ width: "100%" }}
              />
            </div>
          </div>
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
          <div className="flex hover:[&_a]:text-white [&_a]:transition-colors">
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
