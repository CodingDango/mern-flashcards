import _ from 'lodash';

const SidebarLink = ({text, icon, href}) => {
  return (
    <a 
      className="text-start rounded-md hover:bg-black-md inline-block"
      href={href}
    >
      <div className="flex gap-my-xs items-center">
        {icon}
        {_.startCase(text)} 
      </div>
    </a>
  );
}

export default SidebarLink;