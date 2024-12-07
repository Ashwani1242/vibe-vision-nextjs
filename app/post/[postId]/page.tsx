import PostPage from "@/components/feed/post-page";

interface PageProps {
  params: {
    postId: string;
  };
}

export default async function PostDetailPage({ params }: PageProps) {
  return (
    <main className="flex-1">
      <PostPage postId={params.postId} />
    </main>
  );
}

export async function generateMetadata({ params }: { params: { postId: string } }) {
  // In a real implementation, fetch post metadata here
  return {
    title: `Post ${params.postId}`,
    description: 'Detailed post view'
  };
}