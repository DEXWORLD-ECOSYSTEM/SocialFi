import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { CenteredVerifyView } from 'src/auth/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Verify | Layout centered - ${CONFIG.appName}` };

export default function Page() {
  return <CenteredVerifyView />;
}
