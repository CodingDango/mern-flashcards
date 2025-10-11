import _ from 'lodash'

const OptionsMenuItem = ({icon, text, callback}) => {
  return (
    <button 
      onClick={callback}
      className='
        bg-transparent border-transparent p-my-xs 
        hover:bg-black-md rounded-lg cursor-pointer'
    >
      <span className="flex items-center gap-my-xs">
        {icon}
        {_.capitalize(text)}
      </span> 
    </button>
  );
}

export default OptionsMenuItem;