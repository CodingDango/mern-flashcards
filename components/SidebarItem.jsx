import Link from 'next/link';
import _ from 'lodash';

const SidebarItem = ({as = 'a', text, Icon, href, onClick, isActive}) => {
  const content = (
    <div className="flex gap-my-xs items-center">
      <span aria-hidden='true' >
        {Icon && <Icon size={20}/>}
      </span>
      <span>{_.startCase(text)}</span>
    </div>
  );
  
  const parentClass = `
    p-my-xs text-start rounded-md 
    hover:bg-black-md cursor-pointer w-full 
    block ${isActive ? 'bg-black-lg' : ''}
  `;

  return (
    <>
      {as === 'a' && (
        
        <Link className={parentClass} href={href}>
          {content}
        </Link>
      )}

      {as === 'button' && (
        <button className={parentClass} onClick={onClick}>
          {content}
        </button>
      )}
    </>
  );
}

export default SidebarItem;