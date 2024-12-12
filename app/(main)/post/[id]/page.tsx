import PostClient from "./post-client";

// This is a server component that can use generateStaticParams
export async function generateStaticParams() {
  return Array.from({ length: 50 }, (_, i) => ({
    id: `${Math.floor(i / 10)}-${i % 10}`,
  }));
}

export default function PostPage({ params }: { params: { id: string } }) {
  return <PostClient params={params} />;
}