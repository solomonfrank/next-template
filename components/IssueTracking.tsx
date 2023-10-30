import Container from "./Container";
import { Features } from "./Features";
import {
  Template,
  ParentIcon,
  Discussion,
  AutomatedIcon,
  WorkflowIcon,
  FilterIcon,
} from "./icons/features";

export const IssueTracking = () => {
  return (
    <Features color="194,97,254">
      <Features.Main
        title={
          <>
            Issue tracking <br /> you&apos;ll enjoy using
          </>
        }
        image="/img/issues.webp"
        text="Create tasks in seconds, discuss issues in context, and breeze through your work in views tailored to you and&nbsp;your&nbsp;team."
      />
      <Features.Grid
        features={[
          {
            icon: ParentIcon,
            title: "Parent and sub-issues.",
            text: "Break larger tasks into smaller issues.",
          },
          {
            icon: AutomatedIcon,
            title: "Automated backlog.",
            text: " Linear will auto-close and auto-archive issues.",
          },
          {
            icon: WorkflowIcon,
            title: "Custom workflows.",
            text: "Define unique issue states for each team.",
          },
          {
            icon: FilterIcon,
            title: "Filters and custom views.",
            text: "See only what’s relevant for you.",
          },
          {
            icon: Discussion,
            title: "Discussion.",
            text: "Collaborate on issues without losing context.",
          },
          {
            icon: Template,
            title: "Issue templates.",
            text: "Guide your team to write effective issues.",
          },
        ]}
      />
      <Features.Cards
        features={[
          {
            title: "List and board",
            text: "Switch between list and board layout to view work from any angle.",
            image: "/img/card-board.webp",
            imageClassName: "top-[55%] md:top-[40%] w-[200%]",
          },

          {
            title: "Make it yours",
            text: "Quickly apply filters and operators to refine your issue lists and create custom views.",
            image: "/img/card-views.webp",
            imageClassName:
              "top-[45%] left-[12px] md:top-[34%] md:left-[24px] w-[110%]",
          },
        ]}
      />
    </Features>
  );
};
