import * as React from 'react';

import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';


type StepType = { id: number; Description: React.JSX.Element };

type ContactFormEmailProps = {
  data: {
    fullname?: string;
    email: string;
    phone?: string;
    services: string[];
    message: string;
  };
};

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : '';

export function ContactFormEmail(props: ContactFormEmailProps) {
  const previewText = `You request for services has been submitted.`;

  return (
    <Html>
      <Head>
        {' '}
        <title>AAG innovations recieved your request.</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className='bg-white my-auto mx-auto font-sans px-2'>
          <Container className='border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]'>
            <Section className='mt-[32px]'>
              {/* <Img
                src={`${baseUrl}/static//email_newsletter.png`}
                width='40'
                height='37'
                alt='AAG Innovations'
                className='my-0 mx-auto'
              /> */}
              <Text className='text-black text-[30px] font-normal text-center p-0 my-[30px] mx-0'>
                <strong>AAG INNOVATIONS</strong>
              </Text>
            </Section>

            <Section className='text-black text-[14px] leading-[24px]'>
              <Text className='text-black text-[14px] leading-[24px]'>
                Hello {props.data.fullname},
              </Text>
              <Text className='text-black text-[14px] leading-[24px]'>
                Thank you for submitting the contact form on our website. We
                appreciate your interest in AAG Innovation and the time
                you&apos;ve taken to reach out to us.
              </Text>
              <Text>
                <p>
                  We are thrilled to have you on board and excited to share with
                  you the latest news, insights, and innovations from our
                  industry.
                </p>
                <p>
                  Should you have any immediate questions or require further
                  assistance, please do not hesitate to contact us directly at
                  contact@aaginnovations.com.
                </p>
                <p>
                  We look forward to speaking with you and exploring the
                  possibilities of how AAG Innovation can support your goals.
                </p>
                Warm regards,
                <br />
                <br />
                The AAG Innovations Team
              </Text>
            </Section>

            <Section className=' text-black text-[14px] leading-[24px]'>
              <Text>
                <strong>
                  Following is copy of information from your form submission.
                </strong>
              </Text>
              <li className='mb-2'>
                <strong>Name:</strong> {props.data.fullname}
              </li>
              <li className='mb-2'>
                <strong>Email:</strong> {props.data.email}
              </li>
              <li className='mb-2'>
                <strong>Phone Number:</strong> {props.data.phone}
              </li>
              <li className='mb-1'>
                <strong>Services:</strong>
                <ul className='mt-0'>
                  {props.data.services?.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </li>
              <li className='mb-2'>
                <strong>Your Message:</strong> {props.data.message}
              </li>
            </Section>

            <Section className='mt-45 text-black text-[14px] leading-[24px]'></Section>

            <Hr className='border border-solid border-[#eaeaea] my-[26px] mx-0 w-full' />
            <Text className='text-[#666666] text-[12px] leading-[24px]'>
              This email was intended for{' '}
              <span className='text-black'>{props.data.email}</span>. This email
              was sent from{' '}
              <span className='text-black'>AAG Innvations Ltd.</span> located in{' '}
              <span className='text-black'>Ontario, Canada</span>. If you were
              not expecting this email, you can ignore this email. If you are
              concerned about your account&apos;s safety, please email to{' '}
              <span className='text-black'>contact@aaginnovations.com</span> to
              this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default ContactFormEmail;


