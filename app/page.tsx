import { getServerSession } from 'next-auth';
import Book from './components/Book';
import { getAllBooks } from './lib/microcms/client';
import { BookType, User, Purchase } from '@/app/types/types'
import { nextAuthOptions } from './lib/next-auth/options';

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {

  const { contents }  = await getAllBooks(); //ISR
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;

  let purchaseBookIds: string[];
  if(user){
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,
      {cache: "no-store"}
    );
    const purchaseData = await response.json();
    purchaseBookIds = purchaseData.map((purchaseBook: Purchase) => purchaseBook.bookId);
    console.log(purchaseBookIds);
  }

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-indigo-600 text-center w-full font-bold text-3xl mb-2">
          Book List
        </h2>
        {contents.map((book: BookType) => (
          <Book 
            key={book.id}
            book={book}
            isPurchased={purchaseBookIds ? purchaseBookIds.includes(book.id) : false }
            user={user}
            />
        ))}
      </main>
    </>
  );
}