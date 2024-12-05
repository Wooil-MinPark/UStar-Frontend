export const formatTime = (time: number): string => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return `${formatNumber(hours)} : ${formatNumber(minutes)} : ${formatNumber(seconds)} `;
};
