import { useEffect, useState } from "react";
import useWordDeclensions from "./useWordDeclensions";

let dateCreated = (date) => {
  let shortMonths = [
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

  let secondsWords = ["секунду", "секунды", "секунд"];
  let minutesWords = ["минуту", "минуты", "минут"];
  let hoursWords = ["час", "часа", "часов"];

  let hourWordDecl = (hours, hoursWords) =>
    useWordDeclensions(hours, hoursWords);
  let minuteWordDecl = (minutes, minutesWords) =>
    useWordDeclensions(minutes, minutesWords);
  let secondWordDecl = (seconds, secondsWords) =>
    useWordDeclensions(seconds, secondsWords);

  let currentDate = new Date();
  let dateCreated = new Date(date * 1000);
  let diffDate = currentDate - dateCreated;

  let minuteCreated = dateCreated.getMinutes();
  let hourCreated = dateCreated.getHours();
  let dayCommentCreated = dateCreated.getDate();
  let monthCommentCreated = dateCreated.getMonth();
  let yearCommentCreated = dateCreated.getFullYear();

  let currentDay = currentDate.getDate();
  let yesterDay = currentDay - 1;
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  /* let days = Math.floor(diffDate / 1000 / 60 / 60 / 24); */
  let hours = Math.floor(((diffDate / 1000 / 60 / 60) % 60) % 24);
  let minutes = Math.floor((diffDate / 1000 / 60) % 60);
  let seconds = Math.floor((diffDate / 1000) % 60);

  if (yearCommentCreated !== currentYear) {
    return (
      dayCommentCreated +
      "." +
      (monthCommentCreated + 1 < 10 ? 0 : "") +
      (monthCommentCreated + 1) +
      "." +
      yearCommentCreated
    );
  } else if (yearCommentCreated === currentYear) {
    if (
      dayCommentCreated === currentDay &&
      monthCommentCreated === currentMonth
    ) {
      if (hours > 0) {
        if (hours <= 5) {
          return hours + " " + hourWordDecl(hours, hoursWords);
        } else {
          return (
            (hourCreated < 10 ? 0 : "") +
            hourCreated +
            ":" +
            (minuteCreated < 10 ? 0 : "") +
            minuteCreated
          );
        }
      } else if (minutes > 0 && hours < 1) {
        return minutes + " " + minuteWordDecl(minutes, minutesWords);
      } else if (seconds > 15 && minutes < 1 && hours < 1) {
        return seconds + " " + secondWordDecl(seconds, secondsWords);
      } else if (seconds < 15 && minutes < 1 && hours < 1) {
        return "только что";
      }
    } else if (
      dayCommentCreated === yesterDay &&
      monthCommentCreated === currentMonth
    ) {
      return "вчера";
    } else return dayCommentCreated + " " + shortMonths[monthCommentCreated];
  }
};

const useDate = (date) => {
  const [datePublish, setDatePublish] = useState(dateCreated(date));

  useEffect(() => {
    let interval = setInterval(() => {
      setDatePublish(dateCreated(date));
    }, 20000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return datePublish;
};

export default useDate;
