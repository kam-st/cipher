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


type TwoFaEmailProps = {
  email: string;
  name?: string;
  token: string

};

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : '';

export function TwoFaEmail({
  email,
  name,
  token

}: TwoFaEmailProps) {
  const previewText = `CIPHER email verification.`;

  return (
    <Html>
      <Head>
        {' '}
        <title>Verify your email to complete registration.</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className='bg-white my-auto mx-auto font-sans px-2'>
          <Container className='border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]'>
            
            <Section className='mt-[32px]'>
              <Text className='text-black text-[30px] font-normal text-center p-0 my-[30px] mx-0'>
                <strong>CIPHER</strong>
              </Text>
            </Section>
           
            <Section className='text-black text-[14px] leading-[24px]'>
            <Text className='text-black text-[16px] font-normal  p-0  '>
                <strong>Two factor autenication verification code</strong>
              </Text>
              <Text className='text-black text-[14px] leading-[24px]'>
                Hello {name},
              </Text>
              <Text>
                <p>
                Following is your code for completing login with Cipher using Two Factor Authentication.
                </p>
              </Text>
            </Section>

            <Section className='mt-[2px]'>
              <Text className='text-black text-[16px] font-normal text-center p-0'>
                <strong>Verification code</strong>
              </Text>
  
              <Text className='text-black text-[32px] font-normal text-center p-0'>
                <strong>{token}</strong>
              </Text>
              <Text className='text-black text-[12px] font-normal text-center p-0'>
              (This code is valid for 10 minutes)
              </Text>
       
            </Section>

            <Section className='text-black text-[14px] leading-[24px]'>
  
              <Text>
                <p>
                Cipher will never email you and ask you to disclose or verify your password, credit card, or banking account number.
                </p>
              </Text>
            </Section>

            <Hr className='border border-solid border-[#eaeaea] my-[26px] mx-0 w-full' />
            <Text className='text-[#666666] text-[12px] leading-[24px]'>
              This email was intended for{' '}
              <span className='text-black'>{email}</span>. This email was sent
              from <span className='text-black'>Cipher</span>{' '}
              located in <span className='text-black'>Ontario, Canada</span>. If
              you were not expecting this email, you can ignore this email. If
              you are concerned about your account&apos;s safety, please email
              to <span className='text-black'>contact@example.com</span>{' '}
              to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default TwoFaEmail;
