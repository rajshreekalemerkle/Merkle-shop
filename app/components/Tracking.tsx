declare global {
  interface Window {
    braze: any;
  }
}
export function trackCustomerLogin(customerData: any, storefrontUrl: any,  braze: any) {
  console.log('trackcustomerLogin');
  const customerId = customerData.id.substring(customerData.id.lastIndexOf('/') + 1)
  const customerSessionKey = `ab.shopify.shopify_customer_${customerId}`;
  const alreadySetCustomerInfo = sessionStorage.getItem(customerSessionKey);
  if(!alreadySetCustomerInfo) {
    const user = braze?.getUser();
    // To use Shopify customer ID as Braze External ID, use:
     braze.changeUser(customerId)
    // To use Shopify customer email as Braze External ID, use:
    // braze.changeUser(customerData.emailAddress?.emailAddress)
    // To use hashing for email addresses, apply hashing before calling changeUser
    user?.setFirstName(customerData.firstName);
    user?.setLastName(customerData.lastName);
    if(customerData.emailAddress.emailAddress) {
      user?.setEmail(customerData.emailAddress?.emailAddress);
    }
    if(customerData.phoneNumber?.phoneNumber) {
      user?.setPhoneNumber(customerData.phoneNumber?.phoneNumber);
    }
    braze.logCustomEvent(
      "shopify_account_login",
      { source: storefrontUrl }
    )
    sessionStorage.setItem(customerSessionKey, customerId);
  }
}
export function trackProductViewed(product: any, storefrontUrl: any) {
  console.log('trackProductViewed')
  console.log(product);
  const eventData = {
    product_id: product.id.substring(product.id.lastIndexOf('/') + 1),
    product_name: product.title,
    variant_id: product.selectedOrFirstAvailableVariant.id.substring(product.selectedOrFirstAvailableVariant.id.lastIndexOf('/') + 1),
    image_url: product.selectedOrFirstAvailableVariant.image?.url,
    product_url: `${storefrontUrl}/products/${product.handle}`,
    price: product.selectedOrFirstAvailableVariant.price.amount,
    currency: product.selectedOrFirstAvailableVariant.price.currencyCode,
    source: storefrontUrl,
    type: ["price_drop", "back_in_stock"],
    metadata: {
      sku: product.selectedOrFirstAvailableVariant.sku,
    },
  };
  const viewKey = `view_count_${eventData.product_id}`;
  console.log(viewKey);
  window.braze?.getUser().incrementCustomUserAttribute(viewKey, 1);
  //window.braze.changeUser(customerId);
  window.braze?.logCustomEvent?.("ecommerce.product_viewed", eventData);
  console.log(eventData)
}

export function trackCartUpdated(cart: any, storefrontUrl: any) {
  console.log('trackCartUpdated')
  const eventData = {
    cart_id: cart.id,
    total_value: cart.cost.totalAmount.amount,
    currency: cart.cost.totalAmount.currencyCode,
    products: cart.lines.nodes.map((line: any) => ({
      product_id: line.merchandise.product.id.toString(),
      product_name: line.merchandise.product.title,
      variant_id: line.merchandise.id.toString(),
      image_url: line.merchandise.image.url,
      product_url: `${storefrontUrl}/products/${line.merchandise.product.handle}`,
      quantity: Number(line.quantity),
      price: Number(line.cost.totalAmount.amount / Number(line.quantity)),
    })),
    source: storefrontUrl,
    metadata: {},
  };
  window?.braze.logCustomEvent("ecommerce.cart_updated", eventData);
}
export function setCartToken(cart: any) {
  console.log('setCartToken')
  const cartId = cart.id.substring(cart.id.lastIndexOf('/') + 1);
  const cartToken = cartId.substring(0, cartId.indexOf("?key="));

  if (cartToken) {
    const cartSessionKey = `ab.shopify.shopify_cart_${cartToken}`;
    const alreadySetCartToken = sessionStorage.getItem(cartSessionKey);

    if (!alreadySetCartToken) {
      window?.braze.getUser()?.addAlias("shopify_cart_token", `shopify_cart_${cartToken}`);
      window?.braze.requestImmediateDataFlush();
      sessionStorage.setItem(cartSessionKey, cartToken);
    }
  }
}