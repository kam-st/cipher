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


type NewsletterSubsEmailProps = {
  email: string;
  username?: string;
};

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : '';

export function NewsletterSubsEmail({
  email,
  username,
}: NewsletterSubsEmailProps) {
  const previewText = `You have subscribed to AAG Inoovations newsletter`;

  return (
    <Html>
      <Head>
        {' '}
        <title>Subscribed to AAG Innovation newsletter.</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className='bg-white my-auto mx-auto font-sans px-2'>
          <Container className='border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]'>
            <Section className='mt-[32px]'>
              <Text className='text-black text-[30px] font-normal text-center p-0 my-[30px] mx-0'>
                <strong>AAG INNOVATIONS</strong>
              </Text>
            </Section>

            <Section className='text-black text-[14px] leading-[24px]'>
              <Text className='text-black text-[14px] leading-[24px]'>
                Hello {username},
              </Text>
              <Text className='text-black text-[14px] leading-[24px]'>
                Your email (
                <Link
                  href={`mailto:${email}`}
                  className='text-blue-600 no-underline'
                >
                  {email}
                </Link>
                ) has been sucessfully subscribed to{' '}
                <strong>AAG Innovations</strong> newsletter.
              </Text>
              <Text>
                <p>
                  We are thrilled to have you on board and excited to share with
                  you the latest news, insights, and innovations from our
                  industry.
                </p>
                <p>
                  As a subscriber to our newsletter, you will be the first to
                  know about our new products, exclusive offers, and upcoming
                  events. Our team is dedicated to providing you with valuable
                  content that can help inspire your next big idea.
                </p>
                <p>
                  Thank you for joining our community of innovators. We look
                  forward to embarking on this journey with you.
                </p>
                Warm regards,
                <br />
                <br />
                The AAG Innovations Team
              </Text>
            </Section>

            <Hr className='border border-solid border-[#eaeaea] my-[26px] mx-0 w-full' />
            <Text className='text-[#666666] text-[12px] leading-[24px]'>
              This email was intended for{' '}
              <span className='text-black'>{email}</span>. This email was sent
              from <span className='text-black'>AAG Innvations Ltd.</span>{' '}
              located in <span className='text-black'>Ontario, Canada</span>. If
              you were not expecting this email, you can ignore this email. If
              you are concerned about your account&apos;s safety, please email
              to <span className='text-black'>contact@aaginnovations.com</span>{' '}
              to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default NewsletterSubsEmail;
