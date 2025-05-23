import {useNonce, Analytics} from '@shopify/hydrogen';
import {
  Links,
  Meta,
  Scripts,
  useRouteLoaderData,
  ScrollRestoration,
  Outlet,
} from '@remix-run/react';
import resetStyles from '~/styles/reset.css?url';
import appStyles from '~/styles/app.css?url';
import {PageLayout} from '~/components/PageLayout';
import {RootLoader} from './root';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const nonce = useNonce();
  const data:any = useRouteLoaderData<RootLoader>('root');

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" href={resetStyles}></link>
        <link rel="stylesheet" href={appStyles}></link>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet"></link>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"></script>
        <Meta />
        <Links />
      </head>
      <body>
        {data ? (
          <Analytics.Provider
            cart={data.cart}
            shop={data.shop}
            consent={data.consent}
          >
            <PageLayout {...data}>
              <Outlet />
            </PageLayout>
          </Analytics.Provider>
        ) : (
          <Outlet />
        )}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}
