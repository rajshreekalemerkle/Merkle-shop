import { useRouteLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { trackCustomerLogin } from './Tracking';
import { RootLoader } from '~/root';
export default function BrazeProvider() {
  const data:any = useRouteLoaderData<RootLoader>('root');

    useEffect(() => {
      // This will only run in the browser
      import("@braze/web-sdk").then((braze) => {
        braze.initialize("c9235ef7-127a-4f0b-8f10-4a475aa0aeaf", { baseUrl: "sdk.iad-06.braze.com" });
        braze.openSession();
      });
      // Add call to trackCustomerLogin function
      //  console.log( data.isLoggedIn);
      //  console.log(JSON.stringify(data.customerData));
      //  console.log(data.publicStoreDomain);
      // data.isLoggedIn.then((isLoggedIn:any) => {
      //   if(isLoggedIn) {
      //     trackCustomerLogin(data.customerData, data.publicStoreDomain)
      //   }
      // })
    }, []);
  
  return null;
}
