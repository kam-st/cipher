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


type ResetPassEmailProps = {
  email: string;
 name?: string ;
  inviteLink: string
};

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : '';

export function ResetPassEmail({
  email,
 name,
  inviteLink
}: ResetPassEmailProps) {
  const previewText = `CIPHER reset password link.`;

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
                <strong>Reset password link</strong>
              </Text>
              <Text className='text-black text-[14px] leading-[24px]'>
                Hello {name},
              </Text>
              <Text>
                <p>
                You have seen sent this email becuase reset password on account associated with this email has been requested. If you did not request reset of this password, then you can ignore this email.
                </p>
              </Text>
            </Section>

            <Section className='mt-[2px]'>
              <Text className='text-black text-[16px] font-normal text-center p-0'>
                <strong>To reset your password</strong>
              </Text>
              <Section className="text-center mt-[24px] mb-[24px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={inviteLink}
              >
                Click here
              </Button>
            </Section>
            <Text className="text-black text-[14px] text-center leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink} 
              </Link>
            </Text>
            
              <Text className='text-black text-[12px] font-normal text-center p-0 mt-[24px]'>
              (This link is valid for 10 minutes)
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

export default ResetPassEmail;
