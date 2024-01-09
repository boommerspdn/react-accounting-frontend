import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface GithubAccessTokenEmailProps {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
}

export const EmailTemplate = ({
  name,
  email,
  phone,
  company,
  message,
}: GithubAccessTokenEmailProps) => (
  <Html>
    <Head />
    <Preview>
      @fastontimeacct มีผู้ใช้ส่งข้อความหาคุณผ่านเว็บไซท์ fastontime.co.th
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://images.vexels.com/media/users/3/204679/isolated/lists/abc9403594fe735e6139fe3f131b0f05-cat-looking-up-silhouette-cat.png`}
          width="32"
          height="32"
          alt="Github"
        />

        <Text style={title}>
          <strong>@fastontimeacct</strong>, มีผู้ใช้ส่งข้อความหาคุณผ่านเว็บไซท์{" "}
          <Link>fastontime.co.th</Link>
        </Text>

        <Section style={section}>
          <Text style={text}>
            ชื่อผู้ส่ง: <strong>{name}</strong>
          </Text>
          <Text style={text}>
            อีเมลผู้ส่ง: <strong>{email}</strong>
          </Text>
          <Text style={text}>
            เบอร์โทรผู้ส่ง: <strong>{phone}</strong>
          </Text>
          <Text style={text}>
            ชื่อบริษัทผู้ส่ง: <strong>{company}</strong>
          </Text>
          <Text style={text}>{message}</Text>
        </Section>

        <Text style={footer}>
          Copyright © 2023 Fast on Time Co., Ltd. All rights reserved.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  width: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const title = {
  fontSize: "24px",
  lineHeight: 1.25,
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const,
};

const text = {
  margin: "0 0 10px 0",
  textAlign: "left" as const,
};

const button = {
  fontSize: "14px",
  backgroundColor: "#28a745",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
  padding: "0.75em 1.5em",
};

const links = {
  textAlign: "center" as const,
};

const link = {
  color: "#0366d6",
  fontSize: "12px",
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
};
