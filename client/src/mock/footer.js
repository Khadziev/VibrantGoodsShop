import { FaLinkedin, FaTwitterSquare, FaTelegramPlane } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

export const footerContent = [
  {
    title: "Карта VibrantGoods",
    subtitles: [
      {
        text: "О нас",
        href: "/about",
      },
      {
        text: "Свяжитесь с нами",
        href: "/blank",
      },
      {
        text: "Продажи в VibrantGoods",
        href: "/blank",
      },
      {
        text: "Вакансии",
        href: "/blank",
      },
    ],
  },
  {
    title: "Служба поддержки",
    subtitles: [
      {
        text: "Общие вопросы",
        href: "/blank",
      },
      {
        text: "Процедура возврата",
        href: "/blank",
      },
      {
        text: "Конфиденциальность",
        href: "/blank",
      },
    ],
  },
  {
    title: "Руководство по покупкам",
    subtitles: [
      {
        text: "Как сделать заказ",
        href: "/blank",
      },
      {
        text: "Процедура подачи заказа",
        href: "/blank",
      },
      {
        text: "Способы оплаты",
        href: "/blank",
      },
    ],
  },
];

export const socialMedia = [
  {
    name: "instagram",
    icon: AiFillInstagram,
    href: "/",
  },
  {
    name: "linkedin",
    icon: FaLinkedin,
    href: "/",
  },
  {
    name: "twitter",
    icon: FaTwitterSquare,
    href: "/",
  },
  {
    name: "telegram",
    icon: FaTelegramPlane,
    href: "/",
  },
];
