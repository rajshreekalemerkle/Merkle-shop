import { useEffect } from 'react';
import { useRouteLoaderData } from '@remix-run/react';
import { RootLoader } from '~/root';
import { trackCustomerLogin } from './Tracking';

interface LayoutProps {
  children: React.ReactNode;
}
// declare global {
//   interface Window {
//     braze?: any;
//   }
// }
export default function BrazeProvider({ children }: LayoutProps) {
  const data: any = useRouteLoaderData<RootLoader>('root');

  useEffect(() => {
    // Only run in the browser
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://js.appboycdn.com/web-sdk/5.8/braze.min.js';
      script.async = true;
      script.onload = () => {
        if (window.braze) {
          window.braze.initialize('4958ddcc-d057-415d-b602-7f2ba1d5e4d0', {
            baseUrl: 'https://sdk.iad-06.braze.com',
            enableLogging: true,
          });
          window.braze.openSession();
          console.log('Braze initialized successfully.');
          data.isLoggedIn.then((isLoggedIn:any) => {
            if(isLoggedIn) {
              trackCustomerLogin(data.customerData, data.publicStoreDomain,window.braze)
            }
          })
        } else {
          console.error('Braze SDK loaded, but window.braze is undefined.');
        }
      };
      script.onerror = (e) => {
        console.error('Braze SDK failed to load.', e);
      };
      document.body.appendChild(script);
    }
  }, []);

  return <>{children}</>;
}
