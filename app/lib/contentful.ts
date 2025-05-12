import { languageMap } from "./languageMapping";


  export async function fetchContentfulData<T>({
    query,
    language
  }: any): Promise<T> {
    const spaceId = 'll66snvweeb7';
    const accessToken = 'mErSxsEkpOUs_56fRjR21_mwLSkEBtld2ue8arOImNo';
  

    if (!spaceId || !accessToken) {
      throw new Error("Contentful credentials are not set in environment variables.");
    }

    let locale = languageMap[language];
  
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/master`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            query: `{
              blogPageCollection(locale: "${locale}") {
                items {
                  title,
                  content
                  imageUrl
                }
              }
            }`,
          }),
      }
    );
  
    const json = (await response.json()) as any;
  
    if (json.errors) {
      console.error("Contentful GraphQL errors:", json.errors);
      throw new Error("Failed to fetch data from Contentful");
    }
  
    return json.data;
  }
 export async function fetchProductTabsByHandle(shopifyHandle: string) {
  const spaceId = 'll66snvweeb7';
  const accessToken = 'mErSxsEkpOUs_56fRjR21_mwLSkEBtld2ue8arOImNo';
console.log('to check handle',shopifyHandle);
  const query = `
    query GetProductTabs($handle: String!) {
      productTabsCollection(where: { shopifyHandle: $handle }, limit: 1) {
        items {
         
          tabs 
          }
        }
      }
    
  `;

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/master`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query,
        variables: { handle: shopifyHandle },
      }),
    }
  );
  

  const json = await response.json() as any;

  

  

  return json.data;
}


  
  