'use client';
import React from 'react';
import Loading from '@/ui/Loading';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { MarkdownContext } from '@/lib/context/MarkdownProvider';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/db_types';


const MDPreview = React.lazy(() => import('./MDPreview'));

export default function MD() {
  const [, setSession] = React.useState<any>(null);
  const [userId, setUserId] = React.useState<string | undefined>('');
  const { markdown, html, handleMarkdownUpdate } =
    React.useContext(MarkdownContext);
  const [showConfetti, setShowConfetti] = React.useState<boolean>(false);
  const supabase = createClientComponentClient<Database>();

  const handleShowConfetti = React.useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    const getUser = async () => {
      const { data: session, error } = await supabase.auth.getSession();
      if (error) throw error;
      if (session !== null) {
        setSession(session.session);
        setUserId(session.session?.user?.id);
      }
    };
    getUser();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // write regex to get the header from markdown
    const header = markdown.match(/# .*/g);
    const title = header ? header[0].replace('# ', '') : 'Untitled';
    // rest is the body
    const body = markdown.replace(/# .*/g, '');
    // serialize markdown and html
    const serialize = JSON.stringify({ markdown, html });
    const { data, error } = await supabase
      .from('post')
      .insert([
        {
          title: title,
          content: body,
          is_published: true,
          published_date: new Date().toDateString(),
          author_id: userId,
          html: html,
          markdown: serialize,
        },
      ])
      .single();
    if (error) throw error;
    console.log(data);

    handleMarkdownUpdate('');
  };

  return (
    <div className="w-full px-2 sm:px-0">
      <form onSubmit={handleSubmit}>
        <Tab.Group>
          <Tab.List>
            <Tab as={React.Fragment}>
              {({ selected }) => (
                <button
                  type="button"
                  className={clsx(
                    selected
                      ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900',
                    'rounded-md border border-transparent px-3 py-1.5 text-sm font-medium',
                  )}
                >
                  Write
                </button>
              )}
            </Tab>
            <Tab as={React.Fragment}>
              {({ selected }) => (
                <button
                  type="button"
                  className={clsx(
                    selected
                      ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900',
                    'rounded-md border border-transparent px-3 py-1.5 text-sm font-medium mx-2',
                  )}
                >
                  Preview
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
              <label
                htmlFor="comment"
                className="sr-only"
              >
                Comment
              </label>
              <div>
                <textarea
                  rows={20}
                  cols={50}
                  name="comment"
                  id="comment"
                  className="block w-full h-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  placeholder="Add your comment..."
                  value={markdown}
                  onChange={(e) => handleMarkdownUpdate(e.target.value)}
                />
              </div>
            </Tab.Panel>
            <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
              <div className="border-b">
                <div className="mx-px mt-px px-3 pb-12 pt-2 text-sm leading-5 text-gray-800">
                  <React.Suspense fallback={<Loading />}>
                    <MDPreview />
                  </React.Suspense>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none"
          >
            Post Comment
          </button>
        </div>
      </form>
      
    </div>
  );
}
