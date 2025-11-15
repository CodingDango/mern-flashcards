import { forwardRef } from 'react';

const ColorPalletePicker = forwardRef(({ colors, name, defaultValue, ...rest }, ref) => {
  return (
    <div className="grid grid-cols-5 2xs:grid-cols-6 sm:grid-cols-8 p-my-sm gap-my-sm border border-black-md bg-black rounded-lg">
      {colors.map((colorHex, idx) => (
        <label
          key={idx}
          style={{ backgroundColor: colorHex }}
          className="
            border-1 border-transparent
            outline-2 outline-offset-2 outline-transparent
            has-[>input:focus-visible]:border-black
            has-[>input:focus-visible]:outline-white
            has-[>input:checked]:border-black
            has-[>input:checked]:outline-white
            w-[40px] h-[40px] rounded-full justify-self-center cursor-pointer"
        >
          <input
            {...{...rest, id : `color-${idx}`}} // Pass along onChange, onBlur etc.
            type="radio"
            name={name} // Use the name prop for all radios
            value={idx}
            className="absolute opacity-0"
            // 2. Attach the forwarded ref to the FIRST input.
            //    RHF only needs the ref on one of the inputs in a radio group.
            ref={ref}
            defaultChecked={defaultValue === idx ? true : null}
          />
        </label>
      ))}
    </div>
  );
});

export default ColorPalletePicker;