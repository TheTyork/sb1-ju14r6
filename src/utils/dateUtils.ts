export function getNextDay(date: string): string {
  if (!date) return '';
  
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  
  return nextDay.toISOString().split('T')[0];
}