import { getPosts } from '@/app/actions';
import Navbar from './components/Navbar';
import MD from '@/ui/MD';

export default async function Home() {
  const res = await getPosts();

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {/* {res?.map((post) => (
          <SimpleDoc
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            is_published={post.is_published}
            published_date={post.published_date}
            created_at={post.created_at}
            updated_at={post.updated_at}
            author_id={post.author_id}
          />
        ))} */}
        <MD />
      </main>
    </>
  );
}
