import {
  Html,
  Button,
  Head,
  Preview,
  Body,
  Tailwind,
  Section,
  Text,
  Container,
  Hr,
} from "@react-email/components";

export type VerifyEmailTemplateProps = {
  url: string;
  email: string;
};

export const VerifyEmailTemplate = ({
  url,
  email,
}: VerifyEmailTemplateProps) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>Signup verification url</Preview>;
      <Tailwind>
        <Body className="mx-auto my-auto bg-white text-slate-900">
          <Container></Container>
          <Section>
            <Text className="text-sm leading-6 text-black">
              Please click the link below to verify your email.
            </Text>
            <Button href={url} className="bg-[#0069ff] rounded-md">
              Verify
            </Button>
          </Section>
          <Tailwind>
            <Hr className="mx-0 my-6 w-full border border-gray-200" />

            <Text className="text-[12px] leading-6 text-gray-500">
              This email was intended for{" "}
              <span className="text-black">{email}</span>. If you were not
              expecting this email, you can ignore this email. If you dont want
              to receive emails like this in the future, you can{" "}
              <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" className="text-gray-600">
                unsubscribe here
              </a>
              .
            </Text>
          </Tailwind>
        </Body>
      </Tailwind>
    </Html>
  );
};
