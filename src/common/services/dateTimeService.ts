const pluralize = (number: number, one: string, two: string, many: string) => {
  if (number % 10 === 1 && number % 100 !== 11) {
    return one;
  } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
    return two;
  } else {
    return many;
  }
}

export const timeAgo = (dateString: string) => {
  const currentDate = new Date();
  const date = new Date(dateString);

  const timeDifference = +currentDate - +date;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} ${pluralize(days, 'день', 'дня', 'дней')} назад`;
  } else if (hours > 0) {
    return `${hours} ${pluralize(hours, 'час', 'часа', 'часов')} назад`;
  } else if (minutes > 0) {
    return `${minutes} ${pluralize(minutes, 'минута', 'минуты', 'минут')} назад`;
  } else {
    return 'Только что';
  }
}
