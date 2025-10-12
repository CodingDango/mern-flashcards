const ColorPalletePicker = ({ colors, setPickedColor, register}) => {
  return (
    <div className="grid grid-cols-8 p-my-sm gap-y-my-sm bg-black-md rounded-lg">
      {colors.map((colorHex, idx) => (
        <div
          key={idx}
          onClick={() => setPickedColor(colorHex)} 
          style={{backgroundColor: colorHex}} 
          className="hover:outline-2 w-[40px] h-[40px] rounded-full justify-self-center cursor-pointer"
        ></div>
      ))}
    </div>
  );
}

export default ColorPalletePicker;