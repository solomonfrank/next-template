import { classNames } from "@/libs/classNames";
import Container from "./Container";

type FeatureProps = {
  children: React.ReactNode;
  color: string;
};

export const Features = ({ children, color }: FeatureProps) => {
  return (
    <div
      style={
        {
          "--rgb": color,
        } as React.CSSProperties
      }
      className="py-[12.8rem] flex flex-col items-center"
    >
      <div className="w-full my-[25.2rem]">{children}</div>
    </div>
  );
};

type MainFeaturesProps = {
  image: string;
  text: string;
  title: React.ReactNode;
};

const MainFeatures = ({ image, text, title }: MainFeaturesProps) => {
  return (
    <>
      <div className="relative before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_center,rgba(var(--rgb),0.15),transparent)]">
        <Container className="w-[78rem] max-w-[90%] relative text-center ">
          <h2 className=" mb-11 mask-hero text-center text-6xl md:text-8xl">
            {title}
          </h2>
          <div className="after:absolute after:rounded-[inherit] after:[mask:linear-gradient(black,transparent)] after:inset-0 after:bg-[rgba(255,_255,_255,_0.15)] before:p-[1px] rounded-[14px] before:rounded-[inherit] relative before:absolute before:inset-0 before:bg-[linear-gradient(rgba(255,_255,_255,_0.3),_rgba(255,_255,_255,_0)_120%)] before:[mask:linear-gradient(black,_black)_content-box_content-box,_linear-gradient(black,_black)] before:[mask-composite:xor]">
            <img src={image} alt="main img" className="w-full h-auto" />
          </div>
        </Container>
      </div>

      <Container className="w-[78rem] max-w-[90%] relative text-center ">
        <p className="my-16 leading-tight text-center text-white mt-[6.4rem] text-[3.2rem] md:w-[80%] mx-auto">
          {text}
        </p>
        <hr className="mb-[7.2rem] h-[1px] border-none bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1)_50%,transparent)]" />
      </Container>
    </>
  );
};

type FeatureGridProps = {
  features: {
    icon: React.FC;
    title: string;
    text: string;
  }[];
};

const FeatureGrid = ({ features }: FeatureGridProps) => {
  return (
    <Container className="place-items-center grid grid-cols-2 md:grid-cols-3 gap-y-9 w-full mb-[14rem]">
      {features.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className=" [&_svg]:inline-block w-[25.6rem] mb-[2px] [&_svg]:mr-[6px]  text-md"
          >
            <Icon /> <span className="text-white">{item.title}</span>{" "}
            <span className="text-secondary">{item.text}</span>
          </div>
        );
      })}
    </Container>
  );
};

type FeatureCardProps = {
  features: {
    image: string;
    title: string;
    text: string;
    imageClassName: string;
  }[];
};

const FeatureCard = ({ features }: FeatureCardProps) => {
  return (
    <Container className="grid grid-cols-2 gap-6 w-full">
      {features.map((feature) => {
        return (
          <div
            className="py-6 px-8 bg-[radial-gradient(ellipse_at_center,rgba(var(--rgb),0.15),transparent)] relative aspect-[1.1/1] overflow-hidden rounded-[2.4rem] border border-white-08"
            key={feature.title}
          >
            <h3 overflow-hidden className="mb-2 text-2xl text-white">
              {feature.title}
            </h3>
            <p className="max-w-[31rem] text-md text-secondary">
              {feature.text}
            </p>
            <img
              src={feature.image}
              alt={feature.title}
              className={classNames(
                "absolute max-w-none",
                feature.imageClassName
              )}
            />
          </div>
        );
      })}
    </Container>
  );
};
Features.Main = MainFeatures;
Features.Grid = FeatureGrid;
Features.Cards = FeatureCard;
