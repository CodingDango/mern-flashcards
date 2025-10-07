import { IoIosAdd } from "react-icons/io";
import FlashcardList from "./FlashcardList";

const Main = () => {

  const flashcards = [
    {
      topic: 'Web Development',
      question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque perspiciatis quas quisquam quasi cumque dolores. Quibusdam quis debitis alias molestiae?',
      answer: 'I dont know'
    },
    {
      topic: 'Web Development',
      question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque perspiciatis quas quisquam quasi cumque dolores. Quibusdam quis debitis alias molestiae?',
      answer: 'I dont know'
    },
  ];

  return (
    <div className="flex flex-col gap-my-md">
      
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-medium'>Flash Cards Deck</h1>
        <button className='cursor-pointer px-4 py-2 text-black bg-white rounded-md'>
          <span className='flex gap-my-xs items-center font-medium'>
            Add Card
            <IoIosAdd size={24}/>
          </span>
        </button>
      </div>

      <FlashcardList flashcards={flashcards}/>
    </div>
  );
}

export default Main;