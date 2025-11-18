
export function formatMyTimeAgo(dateString) {
  if (dateString === null) {
    return 'never';
  }

  const date = new Date(dateString);
  const now = new Date();
  const differenceInSeconds = Math.round((now.getTime() - date.getTime()) / 1000);

  // --- OUR TIME UNITS ---
  const minute = 60;
  const hour = 3600;
  const day = 86400;
  const week = 604800;
  const month = 2592000; // ~30 days
  const year = 31536000; // ~365 days

  if (differenceInSeconds < minute) {
    return 'just now';
  }
  else if (differenceInSeconds < hour) {
    const minutes = Math.floor(differenceInSeconds / minute);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  else if (differenceInSeconds < day) {
    const hours = Math.floor(differenceInSeconds / hour);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  else if (differenceInSeconds < week) {
    const days = Math.floor(differenceInSeconds / day);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  else if (differenceInSeconds < month) {
    const weeks = Math.floor(differenceInSeconds / week);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }
  else if (differenceInSeconds < year) {
    const months = Math.floor(differenceInSeconds / month);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
  else {
    const years = Math.floor(differenceInSeconds / year);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
}
