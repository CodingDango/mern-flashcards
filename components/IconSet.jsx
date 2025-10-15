import { FaReact } from 'react-icons/fa6';
import { forwardRef } from 'react';
import { deckIcons } from '@/libs/config';

const IconSet = forwardRef(({ icons, name, ...rest }, ref) => {
  return (
    <div className="grid grid-cols-8 p-my-sm gap-y-my-sm border border-black-md bg-black-xl rounded-lg">
      {icons.map((iconName, idx) => {
        const Icon =deckIcons[iconName];

        return (
          <label
            key={idx}
            className="
              relative
              flex justify-center items-center
              cursor-pointer
              outline-2 outline-offset-2 outline-transparent
              has-[>input:focus-visible]:outline-white
              has-[>input:checked]:bg-black-xs
              has-[>input:checked]:outline-black-xs
              w-[40px] h-[40px] rounded-full justify-self-center"
          >
            <div className='cursor-pointer'>
              <Icon size={30}/>
            </div>
            <input
              {...rest} // Pass along onChange, onBlur etc.
              type="radio"
              name={name} // Use the name prop for all radios
              value={iconName}
              className="absolute opacity-0"
              // 2. Attach the forwarded ref to the FIRST input.
              //    RHF only needs the ref on one of the inputs in a radio group.
              ref={ref}
            />
          </label>
      )})}
    </div>
  );
});

export default IconSet;