'use server';
import { getPost } from '@/app/actions';
import { PageIntro } from '@/components/Page/PageIntro';

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(parseInt(params.id));
  try {
    const cache = await caches.open('posts');
    const response = new Response(JSON.stringify({ post }));
    await cache.put('post', response);
  } catch (error) {
    console.error(error);
  }

  return (
    <PageIntro
      title={post!.title}
      content={post!.content}
      created_at={post!.created_at}
      centered={true}
    />
  );
}
