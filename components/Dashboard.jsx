'use client'

import { HiOutlineSquare3Stack3D as StackIcon } from 'react-icons/hi2';
import { PiCards as CardsIcon } from 'react-icons/pi';
import { FaArrowRight as ArrowRight } from "react-icons/fa6";
import { RiProgress2Fill as ProgressIcon } from "react-icons/ri";
import { FaBook } from 'react-icons/fa';
import { TbActivityHeartbeat as HeartBeat } from 'react-icons/tb';
import { FaRegEye as Eye} from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { getAllCardsWithDeck } from '@/libs/actions';
import Main from "./Main";
import Link from 'next/link';
import { useMemo } from 'react';

const calculateTotalProgress = (cards) => {
  if (!cards || cards.length === 0) return 0;

  const totalCompletedCards = cards.filter((card) => card?.answered).length;
  const overallProgress = (totalCompletedCards / cards.length) * 100;
  return overallProgress.toFixed(1);
}

const Dashboard = () => {
  const { data } = useQuery({
    queryFn: getAllCardsWithDeck,
    queryKey: ['decks', 'cards']
  });

  const decks = data?.data?.decks || [];
  const cards = data?.data?.cards || [];

  const totalDeckProgress = useMemo(() => calculateTotalProgress(cards), [cards]);

  return (
    <Main>
      <h2 className="text-3xl font-medium">Dashboard</h2>

      <div className='grid grid-cols-2 gap-my-lg'>

        <div className="flex gap-my-md col-span-2">
          <div className="flex flex-col gap-my-xs  border border-black-md p-my-md rounded-xl ">
            <div className='flex justify-between items-center gap-my-md'>
              <div className='flex gap-my-xs items-center'>
                <StackIcon size={24

                }/>
                <span className='text-lg'>Total Decks</span>  
              </div>
              <Link className='bg-white text-black button button--circle' href={'/decks'}>
                <ArrowRight size={12}/>
              </Link>
            </div>
            <span className='text-xl font-medium'>{decks.length}</span>
          </div>

          <div className="flex flex-col gap-my-xs border border-black-md p-my-md rounded-xl ">
            <div className='flex justify-between items-center gap-my-md'>
              <div className='flex gap-my-xs items-center'>
                <CardsIcon size={24

                }/>
                <span className='text-lg'>Total Cards</span>  
              </div>
              <Link className='bg-white text-black button button--circle' href={'/cards'}>
                <ArrowRight size={12}/>
              </Link>
            </div>
            <span className='text-xl font-medium'>{cards.length}</span>
          </div>

          <div className="flex flex-col gap-my-xs bg-my-primary/75 p-my-md rounded-xl justify-center">
            <div className='flex justify-between items-center gap-my-md'>
              <div className='flex gap-my-xs items-center'>
                <ProgressIcon size={24}/>
                <span className='text-lg'>Progress</span>  
              </div>
            </div>
            <span className='text-xl font-medium'>{totalDeckProgress}%</span>
          </div>
        </div>

        <div className='border border-black-md rounded-xl grid grid-rows-[60px_1fr]'>
          <div className='flex items-center gap-my-sm px-my-md '>
            <HeartBeat size={28}/>
            <h3 className='text-xl font-medium'>Recently Studied</h3>
          </div>

          <div className='grid grid-cols-1 *:p-my-sm border-t border-black-md'>

            <div className='flex justify-between items-center hover:bg-black-lg border-b border-black-md'>
              <div className='flex gap-my-sm items-center'>
                <span className='p-3 rounded-full flex justify-center items-center' style={{background: '#C90078'}}>
                  <FaBook size={20}/>
                </span>
                <div>
                  <div className=''>Precalculus</div>
                  <div className='text-black-light'>Created on October 21, 2025</div>
                </div>
              </div>


            </div>

            <div className='py-my-sm flex justify-between items-center border-b border-black-md hover:bg-black-lg '>
              <div className='flex gap-my-sm items-center'>
                <span className='p-3 rounded-full flex justify-center items-center' style={{background: '#C90078'}}>
                  <FaBook size={20}/>
                </span>
                <div>
                  <div className=''>Precalculus</div>
                  <div className='text-black-light'>Created on October 21, 2025</div>
                </div>
              </div>


            </div>

            <div className='py-my-sm grid grid-cols-2 hover:bg-black-lg cursor-pointer'>
              <div className='flex gap-my-sm items-center'>
                <span className='p-3 rounded-full flex justify-center items-center' style={{background: '#C90078'}}>
                  <FaBook size={20}/>
                </span>
                <div>
                  <div className=''>Precalculus</div>
                  <div className='text-black-light'>Created on October 21, 2025</div>
                </div>
              </div>

            </div>

            {/* <DeckCard title={'idk lol'} color={'#C90078'} Icon={FaBook} options={false}/>
            <DeckCard title={'idk lol'} color={'#C90078'} Icon={FaBook} options={false}/>
            <DeckCard title={'idk lol'} color={'#C90078'} Icon={FaBook} options={false}/> */}
          </div>
        </div>


        <div className='border border-black-md rounded-xl grid grid-rows-[60px_1fr]'>
          <div className='flex items-center gap-my-sm px-my-md '>
            <Eye size={28}/>
            <h3 className='text-xl font-medium'>Needs Review</h3>
          </div>

          <div className='cursor-pointer mt-auto grid grid-cols-1 *:p-my-sm border-t border-black-md'>

            <div className='flex justify-between items-center hover:bg-black-lg border-b border-black-md'>
              <div className='flex gap-my-sm items-center'>
                <span className='p-3 rounded-full flex justify-center items-center' style={{background: '#C90078'}}>
                  <FaBook size={20}/>
                </span>
                <div>
                  <div className=''>Precalculus</div>
                  <div className='text-black-light'>Created on October 21, 2025</div>
                </div>
              </div>


            </div>

            <div className=' py-my-sm flex justify-between items-center border-b border-black-md hover:bg-black-lg '>
              <div className='flex gap-my-sm items-center'>
                <span className='p-3 rounded-full flex justify-center items-center' style={{background: '#C90078'}}>
                  <FaBook size={20}/>
                </span>
                <div>
                  <div className=''>Precalculus</div>
                  <div className='text-black-light'>Created on October 21, 2025</div>
                </div>
              </div>


            </div>

            <div className='py-my-sm grid grid-cols-2 hover:bg-black-lg cursor-pointer'>
              <div className='flex gap-my-sm items-center'>
                <span className='p-3 rounded-full flex justify-center items-center' style={{background: '#C90078'}}>
                  <FaBook size={20}/>
                </span>
                <div>
                  <div className=''>Precalculus</div>
                  <div className='text-black-light'>Created on October 21, 2025</div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </Main>
  );
}

export default Dashboard;