import {useFetcher, type FetcherWithComponents} from '@remix-run/react';
import {CartForm, type OptimisticCartLineInput} from '@shopify/hydrogen';
import { useEffect } from 'react';
import { setCartToken, trackCartUpdated } from './Tracking';

export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
}: {
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  lines: Array<OptimisticCartLineInput>;
  onClick?: () => void;
}) {
  // Define a new Fetcher to be used for tracking cart updates 
  const fetcher:any = useFetcher({ key: "cart-fetcher" });
   // Add useEffect hook for tracking cart_updated event and setting cart token alias
   useEffect(() => {
    if(fetcher.state === "idle" && fetcher.data) {
      const cart = fetcher.data.updatedCart;
      const lines = cart?.lines?.nodes || [];
      const lastLine = lines[lines.length - 1];
  
      const merchandise = lastLine?.merchandise;
      const product = merchandise?.product;
      const productTitle = product?.title || merchandise?.title || 'Unknown Product';
      const checkoutUrl = cart.checkoutUrl;
      if (merchandise && product) {
        window.braze.logCustomEvent('product_added_to_cart', {
          product_id: product.id,
          product_title: productTitle,
          variant_id: merchandise.id,
          variant_title: merchandise.title,
          price: merchandise.price.amount,
          quantity: lastLine.quantity,
          checkout_url:cart.checkoutUrl
        });
        window.braze.getUser().setCustomUserAttribute('last_cart_product_name', productTitle);
        window.braze.getUser().incrementCustomUserAttribute('cart_add_count', 1);
      }
      trackCartUpdated(cart, fetcher.data.storefrontUrl);
      setCartToken(cart);
    }
  }, [fetcher.state, fetcher.data])
  return (
    <CartForm route="/cart" inputs={{lines}} fetcherKey="cart-fetcher" action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            type="submit"
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
          >
            {children}
          </button>
        </>
      )}
    </CartForm>
  );
}
