

  export async function fetchContentfulData<T>({
    query,
    variables = {},
  }: any): Promise<T> {
    const spaceId = 'll66snvweeb7';
    const accessToken = 'mErSxsEkpOUs_56fRjR21_mwLSkEBtld2ue8arOImNo';
  

    if (!spaceId || !accessToken) {
      throw new Error("Contentful credentials are not set in environment variables.");
    }
  
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
              blogPageCollection {
                items {
                  title
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
  