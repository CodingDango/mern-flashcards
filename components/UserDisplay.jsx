import _ from 'lodash';

const UserDisplay = ({name, email}) => {
  return (
    <div className="flex gap-my-xs items-center">
      <div aria-hidden='true' className="shrink-0 w-[40px] h-[40px] rounded-full bg-black-light"></div>
      <div className='overflow-x-hidden'>
        <p>{_.startCase(name)}</p>
        <p className="text-sm text-black-light line-clamp-1">{email}</p>
      </div>
    </div>
  );
}

export default UserDisplay;