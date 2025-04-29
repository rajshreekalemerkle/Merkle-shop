// types/contentful.ts
// export interface BlogPost {
//     title: string;
//     slug: string;
//     body: {
//       json: any; // or better typing if you're parsing rich text
//     };
//   }
export interface BlogPost {
    title: string;
    content: string;
    imageUrl?: string;
     // plain string (or HTML from a Rich Text field)
  }
  
  export interface BlogPostResponse {
    blogPostCollection: {
      items: BlogPost[];
    };
  }
  