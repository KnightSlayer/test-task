import { useState, useEffect } from "react";
import { desktopMediaQuery } from "../styles";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = () => {
      setMatches(mediaQuery.matches);
    };

    // Добавляем слушателя изменения медиа-запроса
    mediaQuery.addListener(handleChange);

    // Очистка слушателя при размонтировании компонента
    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, [query]);

  return matches;
}
export const useIsDesktop = () => useMediaQuery(desktopMediaQuery.replace(/@media */, ''));
