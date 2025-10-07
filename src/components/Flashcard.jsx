  import { useState } from 'react';
  import { BsThreeDots } from 'react-icons/bs';
  import { FaRegEdit } from 'react-icons/fa';
  import { IoCloseOutline } from 'react-icons/io5';
  import { useOptionsMenuManagerContext } from '../context/OptionsMenuManagerContext';
  import OptionsMenu from './OptionsMenu'; // Assuming you have this component

  const Flashcard = ({ topic, question, answer, optionsMenuId, ...rest }) => {
    // 1. State to control the flip
    const [isFlipped, setIsFlipped] = useState(false);
    const optionsMenuContext = useOptionsMenuManagerContext();
    const isOptionsMenuOpen = optionsMenuContext.openOptionsMenuId === optionsMenuId;

    const options = [
      <span key="edit" className="flex items-center gap-my-xs">
        <FaRegEdit size={16} />
        Edit
      </span>,
      <span key="remove" className="flex items-center gap-my-xs">
        <IoCloseOutline size={16} className="scale-125" />
        Remove
      </span>,
    ];

    // 4. Handler to stop the click from bubbling up to the card
    const handleOptionsClick = (e) => {
      e.stopPropagation();
    };

    return (
      // The "Stage" container. It sets up the 3D perspective.
      // Its dimensions define the clickable area, which never changes.
      <div
        className={`group h-full w-full rounded-lg [perspective:1000px] ${isOptionsMenuOpen ? 'z-5' : 'z-0'}`}
        {...rest}
      >
        {/* The Inner container that actually flips. */}
        <div
          className={`
            relative w-full h-full rounded-lg transition-transform duration-400 
            [transform-style:preserve-3d] 
            ${isFlipped ? 'rotate-y-180' : ''}
          `}
        >
          {/* === FRONT FACE === */}
          <div 
            inert={isFlipped ? true : undefined}
            className="h-full [backface-visibility:hidden]">
            <div className='h-full justify-start flex flex-col gap-my-md p-my-sm rounded-lg border bg-neutral-950 border-neutral-800'>
              <div className='flex justify-between items-center'>
                <h2 className='text-lg font-medium'>{topic}</h2>

                {/* Add the stopPropagation handler to the menu's wrapper */}
                <div onClick={handleOptionsClick}>
                  <OptionsMenu
                    id={optionsMenuId}
                    button={
                      <button className='p-my-xs rounded-md hover:bg-neutral-800 cursor-pointer'>
                        <BsThreeDots size={20}/>
                      </button>}
                    options={options}
                  />
                </div>
              </div>
              <p>{question}</p>
              <div className='flex-1 flex items-end'>
                <button className='w-full px-4 py-2 bg-my-primary/75 rounded-lg font-medium cursor-pointer' onClick={() => setIsFlipped(true)} >Show Answer</button>
              </div>
            </div>
          </div>

          {/* === BACK FACE === */}
          <div className="h-full absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className='flex flex-col h-full gap-my-md p-my-sm rounded-lg border bg-neutral-975 border-neutral-800'>
              {/* You might want a header on the back too */}
              <h2 className='text-lg font-medium flex justify-between items-center'>
                <span>{topic}</span> 
                <span>Answer</span>
              </h2>
  
              <p>{answer}</p>
              <div className='flex-1 flex items-end'>
                <button className='w-full px-4 py-2 bg-white text-black rounded-lg font-medium cursor-pointer' onClick={() => setIsFlipped(false)}>Hide Answer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Flashcard;