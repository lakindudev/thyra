export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  
  const diffInMs = date.getTime() - now.getTime();
  const diffInSeconds = Math.round(diffInMs / 1000);
  
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  
  const absSeconds = Math.abs(diffInSeconds);
  
  if (absSeconds < 60) {
    return rtf.format(diffInSeconds, 'second');
  }
  
  const diffInMinutes = Math.round(diffInSeconds / 60);
  const absMinutes = Math.abs(diffInMinutes);
  if (absMinutes < 60) {
    return rtf.format(diffInMinutes, 'minute');
  }
  
  const diffInHours = Math.round(diffInMinutes / 60);
  const absHours = Math.abs(diffInHours);
  if (absHours < 24) {
    return rtf.format(diffInHours, 'hour');
  }
  
  const diffInDays = Math.round(diffInHours / 24);
  return rtf.format(diffInDays, 'day');
}
