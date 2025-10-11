import _ from 'lodash';

const SidebarItem = ({as = 'a', text, icon, href, onClick}) => {
  const content = (
    <div className="flex gap-my-xs items-center">
      <span aria-hidden='true' >{icon}</span>
      <span>{_.startCase(text)}</span>
    </div>
  );
  
  const parentClass = 'p-my-xs text-start rounded-md hover:bg-black-md cursor-pointer w-full block';

  return (
    <>
      {as === 'a' && (
        
        <a className={parentClass} href={href}>
          {content}
        </a>
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