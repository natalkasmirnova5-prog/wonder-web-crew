import React from "react";
import { Composition } from "remotion";
import { EduVideo, EduProps } from "./EduVideo";

const FPS = 30;
const STEP_FRAMES = 60; // 2s per step
const INTRO_FRAMES = 60;
const FINALE_FRAMES = 150;
const TOTAL = INTRO_FRAMES + STEP_FRAMES * 5 + FINALE_FRAMES; // 510

const variants: Array<{ id: string; props: EduProps }> = [
  {
    id: "what-is-ai",
    props: {
      title: "Что такое нейросеть?",
      subtitle: "Это умный помощник в компьютере",
      steps: [
        { label: "КТО", value: "Нейросеть — твой друг" },
        { label: "ЧТО", value: "Умеет рисовать и придумывать" },
        { label: "ГДЕ", value: "Живёт в твоём компьютере" },
        { label: "КАК", value: "Слушает твою просьбу" },
        { label: "ДЕТАЛИ", value: "Чем точнее просьба — тем лучше" },
      ],
      finaleText: "Давай попробуем!",
      video: "videos/cat.mp4",
      bgFrom: "#FDE68A",
      bgTo: "#FB923C",
    },
  },
  {
    id: "how-to-ask",
    props: {
      title: "Как правильно просить?",
      subtitle: "Запомни 5 шагов золотого промпта",
      steps: [
        { label: "КТО", value: "Котёнок-космонавт" },
        { label: "ЧТО", value: "Летит к звёздам" },
        { label: "ГДЕ", value: "В открытом космосе" },
        { label: "КАК", value: "Весело и смело" },
        { label: "ДЕТАЛИ", value: "В скафандре, рядом ракета" },
      ],
      finaleText: "Готово!",
      video: "videos/cat.mp4",
      bgFrom: "#A7F3D0",
      bgTo: "#34D399",
    },
  },
  {
    id: "image",
    props: {
      title: "Просим картинку",
      subtitle: "Нарисуй сказочный замок",
      steps: [
        { label: "КТО", value: "Сказочный замок" },
        { label: "ЧТО", value: "Стоит на облаке" },
        { label: "ГДЕ", value: "Высоко в небе" },
        { label: "КАК", value: "Светится золотом" },
        { label: "ДЕТАЛИ", value: "С флажками и радугой" },
      ],
      finaleText: "Картинка готова!",
      video: "videos/castle.mp4",
      bgFrom: "#BFDBFE",
      bgTo: "#60A5FA",
    },
  },
  {
    id: "video-site",
    props: {
      title: "Просим видео",
      subtitle: "Сделай ролик про дракончика",
      steps: [
        { label: "КТО", value: "Добрый дракончик" },
        { label: "ЧТО", value: "Читает книжку" },
        { label: "ГДЕ", value: "В уютной пещере" },
        { label: "КАК", value: "Спокойно и мило" },
        { label: "ДЕТАЛИ", value: "Огоньки свечей вокруг" },
      ],
      finaleText: "Видео готово!",
      video: "videos/dragon.mp4",
      bgFrom: "#FBCFE8",
      bgTo: "#F472B6",
    },
  },
];

export const RemotionRoot: React.FC = () => (
  <>
    {variants.map((v) => (
      <Composition
        key={v.id}
        id={v.id}
        component={EduVideo}
        durationInFrames={TOTAL}
        fps={FPS}
        width={1280}
        height={960}
        defaultProps={v.props}
      />
    ))}
  </>
);