import { useEffect, useState } from "react";

let months = [
  "янв",
  "фев",
  "мар",
  "апр",
  "мая",
  "июн",
  "июл",
  "авг",
  "сен",
  "окт",
  "ноя",
  "дек",
];

let hoursWords = ["час", "часа", "часов"];
let minutesWords = ["минуту", "минуты", "минут"];
let secondsWords = ["секунду", "секунды", "секунд"];

const declWords = (number, words) => {
  let value = number % 100;
  let num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num === 1) return words[0];
  return words[2];
};

let dateCreated = (date, isMobile = false, isEntry = false) => {
  let currentDate = new Date();
  let dateCreated = new Date(date * 1000);
  let diffDate = currentDate - dateCreated;

  let dayCreated = dateCreated.getDate();
  let monthCreated = dateCreated.getMonth();
  let yearCreated = dateCreated.getFullYear();

  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();

  let days = Math.floor(diffDate / 1000 / 60 / 60 / 24);
  let hours = Math.floor(((diffDate / 1000 / 60 / 60) % 60) % 24);
  let minutes = Math.floor((diffDate / 1000 / 60) % 60);
  let seconds = Math.floor((diffDate / 1000) % 60);

  if (days > 0 && days < 2) {
    return "вчера";
  } else if (days > 1) {
    if (monthCreated === currentMonth && yearCreated === currentYear) {
      return dayCreated + " " + months[dayCreated];
    } else if (monthCreated === currentMonth && yearCreated !== currentYear) {
      return dayCreated + "." + (monthCreated + 1) + "." + yearCreated;
    }
  } else if (hours > 0 && days < 1) {
    return hours + " " + declWords(hours, hoursWords);
  } else if (minutes > 0 && hours < 1 && days < 1) {
    if (isMobile && isEntry) {
      return minutes + " мин";
    } else if (!isMobile && isEntry) {
      return minutes + " " + declWords(minutes, minutesWords) + " назад";
    } else if (!isMobile && !isEntry) {
      return minutes + " м";
    }
  } else if (seconds > 15 && minutes < 1 && hours < 1 && days < 1) {
    if (isMobile && isEntry) {
      return seconds + " сек";
    } else if (!isMobile && isEntry) {
      return seconds + " " + declWords(seconds, secondsWords) + " назад";
    } else if (!isMobile && !isEntry) {
      return seconds + " с";
    }
  } else if (seconds < 15 && minutes < 1 && hours < 1 && days < 1) {
    return "только что";
  }
};

const EntryDatePublish = ({
  date,
  updateInterval = 20000,
  isMobile,
  isEntry,
}) => {
  const [datePublish, setDatePublish] = useState(
    dateCreated(date, isMobile, isEntry)
  );

  useEffect(() => {
    let interval = setInterval(() => {
      setDatePublish(dateCreated(date, isMobile, isEntry));
    }, updateInterval);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return datePublish;
};

export default EntryDatePublish;
