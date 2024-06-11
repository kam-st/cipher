import * as React from 'react';

import { Button } from '@react-email/button';
import { Text } from '@react-email/components';
import { Html } from '@react-email/html';

type EmailProps = {
  email: string;
};

export default function Email(props: EmailProps) {
  const { email } = props;

  return (
    <Html lang='en'>
      <Text>
        Your email {email}, is subscribed to aag innovations newsletter.
      </Text>
    </Html>
  );
}
