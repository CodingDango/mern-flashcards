  import { useEffect, useRef, useState } from 'react';
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
    const showAnswerBtn = useRef(null);
    const hideAnswerBtn = useRef(null);

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

    useEffect(() => {
      if (isFlipped) {
        hideAnswerBtn.current.focus();
      } else {
        showAnswerBtn.current.focus();
      }
    }, [isFlipped])

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
            className="max-h-[280px] h-full [backface-visibility:hidden]">
            <div className='h-full justify-start flex flex-col gap-my-md p-my-sm rounded-lg border bg-neutral-950 border-neutral-800'>
              <div className='flex justify-between gap-x-my-sm'>
                <h2 className='text-lg font-medium flex-1 min-w-0 break-words '>{topic}</h2>

                {/* Add the stopPropagation handler to the menu's wrapper */}
                <div onClick={handleOptionsClick}>
                  <OptionsMenu
                    id={optionsMenuId}
                    button={
                      <button className='p-my-xs rounded-md hover:bg-neutral-800 cursor-pointer transition-colors duration-200'>
                        <BsThreeDots size={20}/>
                      </button>}
                    options={options}
                  />
                </div>
              </div>

              <p 
                className='overflow-y-scroll flex-1 break-words'
                tabIndex="0"
                onWheel={e => {
                  e.stopPropagation();
                  e.currentTarget.scrollTop += e.deltaY * 0.25; 
                }}
              >{question}</p>
              
              <div className='flex items-end'>
                <button
                  ref={showAnswerBtn} 
                  className='w-full button button--primary font-medium' 
                  onClick={() => setIsFlipped(true)}
                >Show Answer</button>
              </div>
            </div>
          </div>

          {/* === BACK FACE === */}
          <div className="h-full absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div 
              inert={isFlipped ? undefined : true}
              className='flex flex-col h-full gap-my-md p-my-sm rounded-lg border bg-neutral-975 border-neutral-800'>
              {/* You might want a header on the back too */}
              <h2 className='flex justify-between gap-x-my-sm text-lg font-medium'>
                <span className='flex-1 min-w-0 break-words'>{topic}</span> 
                <span>Answer</span>
              </h2>
  
              <p>{answer}</p>
              <div className='flex-1 flex items-end'>
                <button 
                  ref={hideAnswerBtn}
                  className='w-full button button--white font-medium' 
                  onClick={() => setIsFlipped(false)}
                >Hide Answer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Flashcard;