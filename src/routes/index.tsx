import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Sparkles,
  Brain,
  MessageCircleQuestion,
  Palette,
  Film,
  Code2,
  Rocket,
  Play,
  Star,
  Cloud,
  ChevronLeft,
  ChevronRight,
  X,
  PlayCircle,
  Wand2,
  Music,
  VolumeX,
  Volume2,
  Pause,
  Maximize,
} from "lucide-react";
import robot1 from "@/assets/robot1.png";
import robot2 from "@/assets/robot2.png";
import imgCatSpace from "@/assets/ex-cat-space.jpg";
import imgCastle from "@/assets/ex-castle.jpg";
import imgRobotArtist from "@/assets/ex-robot-artist.jpg";
import imgDragon from "@/assets/ex-dragon.jpg";
import imgIcecreamCity from "@/assets/ex-icecream-city.jpg";
import imgRobotPuppy from "@/assets/ex-robot-puppy.jpg";
import imgKidsAi from "@/assets/ex-kids-ai.jpg";
const ngCatSpace = { url: "/videos/ng-cat-space-v2.mp4" };
const ngCastle = { url: "/videos/ng-castle-v2.mp4" };
const ngRobotArtist = { url: "/videos/ng-robot-artist-v2.mp4" };
const ngDragon = { url: "/videos/ng-dragon-v2.mp4" };
const eduWhatIsAi = { url: "/videos/edu-what-is-ai-v5.mp4" };
const eduHowToAsk = { url: "/videos/edu-how-to-ask-v6.mp4" };
const eduImage = { url: "/videos/edu-image-v5.mp4" };
const eduVideoSite = { url: "/videos/edu-video-site-v5.mp4" };
import {
  playClick,
  startMusic,
  duckMusic,
  setMusicMuted,
  isMusicMuted,
} from "@/lib/sound";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Мастер-класс по нейросетям для детей 8–10 лет" },
      {
        name: "description",
        content:
          "Яркая интерактивная презентация: что такое нейросеть, как писать промпты, нейрокреатор, нейровидеограф и вайб-кодер.",
      },
    ],
  }),
  component: Index,
});

type ExampleItem =
  | { kind: "video"; src: string; poster?: string; caption: string }
  | { kind: "image"; src: string; caption: string; motion?: string; decor?: "castle" | "space" | "paint" | "wings" };

type Block = {
  id: string;
  title: string;
  emoji: string;
  icon: typeof Brain;
  gradient: string;
  intro: string;
  sections: { heading: string; body?: string; bullets?: string[] }[];
  outro: string;
  cta: string;
  examplesTitle: string;
  examples: ExampleItem[];
};

// Local Russian-language kids videos (with music)
const LV = (name: string) => `/videos/${name}`;

// Public website screenshot service
const SHOT = (url: string) =>
  `https://image.thum.io/get/width/900/crop/700/noanimate/${url}`;

const BLOCKS: Block[] = [
  {
    id: "what",
    title: "Что такое нейросеть",
    emoji: "🧠",
    icon: Brain,
    gradient: "bg-gradient-pink",
    intro:
      "Нейросеть — это умный помощник в компьютере. Она училась на огромном количестве книг, картинок и видео — и теперь умеет отвечать на вопросы, рисовать и придумывать истории!",
    sections: [
      {
        heading: "Если коротко 🤖",
        body: "Представь робота-друга, который прочитал миллион книг и посмотрел миллион мультиков. Он поможет с домашкой, нарисует дракона или придумает сказку!",
      },
      {
        heading: "Для чего она нужна?",
        bullets: [
          "✍️ Писать тексты и сказки",
          "🎨 Рисовать любые картинки",
          "🎬 Снимать мультики и видео",
          "💻 Делать игры и сайты",
          "❓ Отвечать на сложные вопросы",
        ],
      },
    ],
    outro: "Нейросеть — твой волшебный помощник. Главное — научиться с ней правильно разговаривать!",
    cta: "Смотри, как это работает",
    examplesTitle: "Что умеют нейросети",
    examples: [
      { kind: "image", src: imgKidsAi, caption: "Дети творят с нейросетью" },
      { kind: "image", src: imgRobotArtist, caption: "Робот рисует картину" },
      { kind: "image", src: imgCatSpace, caption: "Котёнок-астронавт на радуге" },
      { kind: "image", src: imgDragon, caption: "Дракончик в волшебном лесу" },
    ],
  },
  {
    id: "prompt",
    title: "Как правильно говорить",
    emoji: "💬",
    icon: MessageCircleQuestion,
    gradient: "bg-gradient-blue",
    intro:
      "Запрос к нейросети называется ПРОМПТ. Это как заказ в кафе: чем подробнее расскажешь — тем вкуснее результат!",
    sections: [
      {
        heading: "Промпт — это…",
        body: "Твоя просьба или вопрос, который ты пишешь нейросети. Например: «Нарисуй кота-космонавта на радуге».",
      },
      {
        heading: "🏆 Правило золотого промпта",
        bullets: [
          "1. КТО — герой (кот, робот, единорог)",
          "2. ЧТО ДЕЛАЕТ — действие (летит, танцует)",
          "3. ГДЕ — место (на луне, в лесу)",
          "4. КАК — стиль (мультяшный, как Pixar)",
          "5. ДЕТАЛИ — цвета, настроение ✨",
        ],
      },
    ],
    outro: "Чем больше деталей — тем круче результат. Не бойся фантазировать!",
    cta: "Посмотреть примеры промптов",
    examplesTitle: "Обучающие видео по всем видам генераций",
    examples: [
      {
        kind: "video",
        src: eduWhatIsAi.url,
        poster: LV("edu-what-is-ai.jpg"),
        caption: "Что такое нейросеть",
      },
      {
        kind: "video",
        src: eduHowToAsk.url,
        poster: LV("edu-how-to-ask.jpg"),
        caption: "5 шагов золотого промпта",
      },
      {
        kind: "video",
        src: eduImage.url,
        poster: LV("edu-image.jpg"),
        caption: "Создаём картинку шаг за шагом",
      },
      {
        kind: "video",
        src: eduVideoSite.url,
        poster: LV("edu-video-site.jpg"),
        caption: "Делаем сайт и видео вместе",
      },
    ],
  },
  {
    id: "creator",
    title: "Нейрокреатор",
    emoji: "🎨",
    icon: Palette,
    gradient: "bg-gradient-sun",
    intro:
      "Нейрокреатор — художник будущего! Он создаёт картинки с помощью нейросети: от плакатов до обложек книг.",
    sections: [
      {
        heading: "Что он делает?",
        bullets: [
          "🖼️ Придумывает идеи для картинок",
          "✍️ Пишет умные промпты",
          "🎨 Выбирает стиль и цвета",
          "✨ Дорабатывает результат до идеала",
        ],
      },
      {
        heading: "Где это пригодится?",
        body: "В рекламе, мультфильмах, играх, в школе для проектов, в оформлении дня рождения, для иллюстраций к своей книжке!",
      },
    ],
    outro: "Если любишь рисовать и придумывать — это твоя суперсила!",
    cta: "Смотреть нейроизображения",
    examplesTitle: "Нейроизображения оживают — 4 видео",
    examples: [
      {
        kind: "image",
        src: imgCatSpace,
        caption: "Котёнок-астронавт",
        motion: "animate-float",
      },
      {
        kind: "image",
        src: imgCastle,
        caption: "Сказочный замок на облаке",
        motion: "animate-float-2",
      },
      {
        kind: "image",
        src: imgRobotArtist,
        caption: "Робот-художник",
        motion: "animate-wobble",
      },
      {
        kind: "image",
        src: imgDragon,
        caption: "Добрый дракончик",
        motion: "animate-wingflap-r",
      },
    ],
  },
  {
    id: "videograph",
    title: "Нейровидеограф",
    emoji: "🎬",
    icon: Film,
    gradient: "bg-gradient-purple",
    intro:
      "Нейровидеограф снимает кино без камеры! Он пишет промпт — и нейросеть оживляет картинку в настоящий мультфильм.",
    sections: [
      {
        heading: "Что он делает?",
        bullets: [
          "🎞️ Создаёт короткие видео",
          "🦖 Оживляет персонажей",
          "🎵 Подбирает музыку и звуки",
          "✂️ Монтирует кадры в историю",
        ],
      },
      {
        heading: "Где это нужно?",
        body: "На YouTube и в TikTok, в рекламе, в мультфильмах, в школьных проектах. Можно снять свой клип за один вечер!",
      },
    ],
    outro: "Один человек + нейросеть = целая киностудия 🎥",
    cta: "Смотреть нейровидео",
    examplesTitle: "Нейровидео — 4 примера",
    examples: [
      {
        kind: "image",
        src: imgDragon,
        caption: "Дракончик машет крылышками",
        decor: "wings",
      },
      {
        kind: "image",
        src: imgRobotArtist,
        caption: "Робот-художник рисует мечту",
        decor: "paint",
      },
      {
        kind: "image",
        src: imgCatSpace,
        caption: "Котик-космонавт в путешествии",
        decor: "space",
      },
      {
        kind: "image",
        src: imgCastle,
        caption: "Волшебный замок оживает",
        decor: "castle",
      },
    ],
  },
  {
    id: "vibe",
    title: "Вайб-кодер",
    emoji: "💻",
    icon: Code2,
    gradient: "bg-gradient-green",
    intro:
      "Вайб-кодер делает сайты и игры… разговаривая с нейросетью! Он не пишет тысячи строк кода — он объясняет идею, а нейросеть всё собирает.",
    sections: [
      {
        heading: "Что он делает?",
        bullets: [
          "🌐 Создаёт сайты",
          "🎮 Программирует мини-игры",
          "🛠️ Делает приложения",
          "🚀 Запускает свои проекты в интернет",
        ],
      },
      {
        heading: "Где это пригодится?",
        body: "Сделай сайт про своего питомца, игру для друзей, открытку маме — всё, что придумаешь!",
      },
    ],
    outro: "Если умеешь объяснять — ты уже почти программист!",
    cta: "Смотреть детские сайты",
    examplesTitle: "Сайты для детей — главные страницы",
    examples: [
      { kind: "image", src: SHOT("https://pbskids.org"), caption: "PBS Kids — игры и мультики" },
      { kind: "image", src: SHOT("https://www.nickjr.com"), caption: "Nick Jr. — для малышей" },
      { kind: "image", src: SHOT("https://www.starfall.com"), caption: "Starfall — учимся читать" },
      { kind: "image", src: SHOT("https://www.coolmathgames.com"), caption: "Cool Math Games — математика" },
    ],
  },
  {
    id: "outro",
    title: "Заключение",
    emoji: "🚀",
    icon: Rocket,
    gradient: "bg-gradient-candy",
    intro:
      "Сегодня ты узнал, что нейросети — это не страшно, а очень круто! Это новый мир, где твоя фантазия — главная суперсила.",
    sections: [
      {
        heading: "Запомни три вещи ✨",
        bullets: [
          "1. Нейросеть — твой помощник, не волшебник",
          "2. Хороший результат = хороший промпт",
          "3. Главное — твоя идея!",
        ],
      },
      {
        heading: "А теперь — практика! 💫",
        body: "Попробуй дома вместе с родителями: придумай героя, опиши его по правилу золотого промпта и посмотри, что получится. Делись результатами с друзьями!",
      },
    ],
    outro: "Ты — будущий нейрокреатор, нейровидеограф или вайб-кодер. Дерзай!",
    cta: "Финальное вдохновение",
    examplesTitle: "Что ты сможешь создать",
    examples: [
      { kind: "image", src: imgKidsAi, caption: "Свою книгу с картинками" },
      { kind: "image", src: imgCastle, caption: "Свой мультфильм-сказку" },
      { kind: "image", src: imgRobotPuppy, caption: "Свою мини-игру" },
      { kind: "image", src: imgIcecreamCity, caption: "Свой сайт-проект" },
    ],
  },
];

function Index() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [exampleOpen, setExampleOpen] = useState(false);
  const [slideMode, setSlideMode] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const active = BLOCKS.find((b) => b.id === openId) ?? null;

  useEffect(() => {
    if (!slideMode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setSlideIdx((i) => Math.min(i + 1, BLOCKS.length - 1));
      else if (e.key === "ArrowLeft") setSlideIdx((i) => Math.max(i - 1, 0));
      else if (e.key === "Escape") setSlideMode(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slideMode]);

  // Play a cheerful click sound on any button press anywhere on the page
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    const t = e.target as HTMLElement;
    if (t.closest("button, [role='button'], a")) {
      playClick();
      startMusic(); // user-gesture: kick off background music
    }
  };

  if (slideMode) {
    return (
      <div onClickCapture={onClickCapture}>
        <MusicPlayer />
        <SlideShow
          index={slideIdx}
          onPrev={() => setSlideIdx((i) => Math.max(i - 1, 0))}
          onNext={() => setSlideIdx((i) => Math.min(i + 1, BLOCKS.length - 1))}
          onExit={() => setSlideMode(false)}
          onJump={setSlideIdx}
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden" onClickCapture={onClickCapture}>
      <DecorBackground />
      <MusicPlayer />

      {/* Robots — placed lower so they never cover the title; original soft float animations */}
      <img
        src={robot1}
        alt="Робот-помощник"
        width={768}
        height={768}
        className="pointer-events-none absolute left-1 top-[44%] z-10 w-20 sm:left-2 sm:top-[26%] sm:w-32 md:w-48 lg:w-60 animate-float drop-shadow-2xl"
      />
      <img
        src={robot2}
        alt="Волшебная помощница"
        width={768}
        height={768}
        loading="lazy"
        className="pointer-events-none absolute right-1 top-[44%] z-10 w-20 sm:right-2 sm:top-[22%] sm:w-32 md:w-48 lg:w-60 animate-float-2 drop-shadow-2xl"
      />

      <main className="relative z-20 mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        {/* Hero */}
        <header className="relative z-30 mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 backdrop-blur-sm shadow-pop animate-pop">
            <Sparkles className="h-4 w-4 text-kid-pink" />
            <span className="text-sm font-bold text-kid-purple">Мастер-класс для ребят 8–10 лет</span>
            <Sparkles className="h-4 w-4 text-kid-pink" />
          </div>

          {/* Solid color + strong outline so the title is always readable */}
          <h1
            className="mx-auto mt-6 max-w-3xl text-[2rem] leading-[1.05] text-kid-purple sm:text-6xl md:text-7xl"
            style={{
              WebkitTextStroke: "1px white",
              textShadow:
                "0 2px 0 #fff, 0 4px 0 rgba(255,255,255,0.6), 0 10px 25px rgba(120,60,200,0.35)",
            }}
          >
            Добро пожаловать в мир нейросетей! 🚀
          </h1>

          <p className="mx-auto mt-6 max-w-2xl rounded-2xl bg-white/70 px-4 py-3 text-base font-medium text-foreground/80 backdrop-blur-sm sm:text-xl">
            Сегодня ты узнаешь, кто такие нейрокреаторы, нейровидеографы и вайб-кодеры —
            и как самому стать волшебником с помощью нейросетей ✨
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-2xl bg-white/90 px-5 py-3 shadow-toy backdrop-blur-sm">
              <span className="text-2xl">👇</span>
              <span className="font-bold text-kid-purple">Нажимай на кнопки!</span>
            </div>
            <button
              onClick={() => {
                setSlideIdx(0);
                setSlideMode(true);
              }}
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-purple px-5 py-3 font-bold text-white shadow-pop transition-transform hover:scale-105 active:scale-95"
            >
              <PlayCircle className="h-5 w-5" />
              Режим слайдов
            </button>
            <HeroMusicToggle />
          </div>
        </header>

        {/* Blocks grid */}
        <section className="relative z-20 mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOCKS.map((b, i) => (
            <BlockCard key={b.id} block={b} index={i} onOpen={() => setOpenId(b.id)} />
          ))}
        </section>

        <footer className="mt-20 text-center">
          <p className="text-sm font-semibold text-foreground/60">
            Сделано с 💖 для маленьких будущих создателей
          </p>
        </footer>
      </main>

      {/* Block details dialog */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent className="flex max-h-[92vh] w-[94vw] max-w-xl flex-col overflow-hidden border-0 bg-white/95 p-0 sm:rounded-3xl">
          {active && (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className={`${active.gradient} shrink-0 px-5 py-5 sm:px-7 sm:py-6`}>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl drop-shadow-lg">{active.emoji}</span>
                    <DialogTitle className="text-2xl text-white drop-shadow-md sm:text-3xl">
                      {active.title}
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <p className="mt-2 text-sm font-medium text-white/95 drop-shadow sm:text-base">
                  {active.intro}
                </p>
              </div>
              <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-7">
                {active.sections.map((s, idx) => (
                  <div key={idx}>
                    <h3 className="text-xl text-kid-purple">{s.heading}</h3>
                    {s.body && <p className="mt-2 text-sm text-foreground/85 sm:text-base">{s.body}</p>}
                    {s.bullets && (
                      <ul className="mt-3 space-y-2">
                        {s.bullets.map((bl, i) => (
                          <li
                            key={i}
                            className="rounded-2xl bg-muted/60 px-4 py-2.5 text-sm font-medium text-foreground/90 sm:text-base"
                          >
                            {bl}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {active.id === "prompt" && <PromptPractice />}

                <div className="rounded-2xl bg-gradient-sky px-5 py-3 text-center">
                  <p className="text-sm font-bold text-kid-purple sm:text-base">{active.outro}</p>
                  {active.id === "outro" && (
                    <a
                      href="https://chat.qwen.ai"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-extrabold text-kid-purple shadow-pop ring-2 ring-kid-pink/40 transition-transform hover:scale-105 active:scale-95 sm:text-base"
                    >
                      ✨ Открыть chat.qwen.ai →
                    </a>
                  )}
                </div>
              </div>
              {/* Sticky footer so "Пример" button is always visible */}
              <div className="shrink-0 border-t border-foreground/5 bg-white/95 px-5 py-3 sm:px-7">
                <button
                  onClick={() => setExampleOpen(true)}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-candy px-6 py-3 text-base font-bold text-white shadow-pop transition-transform hover:scale-[1.02] active:scale-95 sm:text-lg"
                >
                  <Play className="h-5 w-5 fill-white" />
                  Пример: {active.cta}
                  <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Examples gallery */}
      <Dialog open={exampleOpen} onOpenChange={setExampleOpen}>
        <DialogContent className="no-scrollbar max-h-[92vh] w-[95vw] max-w-3xl overflow-y-auto overflow-x-hidden border-0 bg-white/95 sm:rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-kid-purple">
              {active?.examplesTitle ?? "Примеры"}
            </DialogTitle>
          </DialogHeader>
          {active && <ExamplesGrid items={active.examples} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ─────────────────────── Interactive prompt practice ─────────────────────── */

function PromptPractice() {
  const [hero, setHero] = useState("");
  const [place, setPlace] = useState("");
  const [style, setStyle] = useState("в стиле Pixar");
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const GOAL = 5;
  const made = history.length;
  const progress = Math.min(100, Math.round((made / GOAL) * 100));

  const heroes = ["котёнок-астронавт", "дракончик", "робот-друг", "единорог", "пингвин-пират"];
  const places = ["на радуге", "в волшебном лесу", "на луне", "в городе из мороженого", "под водой"];

  const generate = () => {
    const h = hero.trim() || heroes[Math.floor(Math.random() * heroes.length)];
    const p = place.trim() || places[Math.floor(Math.random() * places.length)];
    const prompt = `Нарисуй ${h}, который весело играет ${p}, ${style}, яркие краски, доброе настроение, большие глаза, мультяшный свет ✨`;
    setResult(prompt);
    setHistory((prev) => (prev[0] === prompt ? prev : [prompt, ...prev].slice(0, 10)));
  };

  const surprise = () => {
    setHero(heroes[Math.floor(Math.random() * heroes.length)]);
    setPlace(places[Math.floor(Math.random() * places.length)]);
  };

  return (
    <div className="rounded-3xl border-2 border-dashed border-kid-pink/40 bg-gradient-to-br from-white to-kid-cream p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <Wand2 className="h-5 w-5 text-kid-pink" />
        <h3 className="text-lg text-kid-purple sm:text-xl">Практика: собери свой промпт!</h3>
      </div>
      <p className="mb-3 text-sm text-foreground/75">
        Впиши героя и место — а мы соберём готовый волшебный промпт для нейросети.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wider text-kid-purple">Герой</span>
          <input
            value={hero}
            onChange={(e) => setHero(e.target.value)}
            placeholder="например: котёнок-астронавт"
            className="mt-1 w-full rounded-xl border-2 border-kid-pink/30 bg-white px-3 py-2 text-sm outline-none focus:border-kid-pink"
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase tracking-wider text-kid-purple">Место</span>
          <input
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="например: на радуге"
            className="mt-1 w-full rounded-xl border-2 border-kid-blue/30 bg-white px-3 py-2 text-sm outline-none focus:border-kid-blue"
          />
        </label>
      </div>

      <div className="mt-3">
        <span className="text-xs font-bold uppercase tracking-wider text-kid-purple">Стиль</span>
        <div className="mt-1 flex flex-wrap gap-2">
          {["в стиле Pixar", "акварель", "мультик", "комикс", "3D-игрушка"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStyle(s)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                style === s
                  ? "bg-kid-purple text-white shadow-pop"
                  : "bg-muted text-kid-purple hover:bg-kid-pink/20"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={generate}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-candy px-5 py-2.5 text-sm font-bold text-white shadow-pop transition-transform hover:scale-105 active:scale-95"
        >
          <Sparkles className="h-4 w-4" /> Создать промпт
        </button>
        <button
          onClick={surprise}
          className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-sm font-bold text-kid-purple shadow-pop ring-2 ring-kid-pink/30 transition-transform hover:scale-105 active:scale-95"
        >
          🎲 Удиви меня
        </button>
      </div>

      {result && (
        <div className="mt-4 animate-pop rounded-2xl bg-white p-4 ring-2 ring-kid-pink/40">
          <div className="mb-1 text-xs font-bold uppercase tracking-wider text-kid-pink">
            Твой промпт ✨
          </div>
          <p className="text-sm font-semibold text-foreground sm:text-base">«{result}»</p>
        </div>
      )}

      <div className="mt-5">
        <div className="mb-1 flex items-center justify-between text-xs font-bold text-kid-purple">
          <span>Твой прогресс: {made}/{GOAL} промптов</span>
          <span>{made >= GOAL ? "Молодец! 🏆" : "Продолжай! ✨"}</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-candy transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-1 flex gap-1">
          {Array.from({ length: GOAL }).map((_, i) => (
            <span
              key={i}
              className={`text-base ${i < made ? "opacity-100" : "opacity-30 grayscale"}`}
              aria-hidden
            >
              ⭐
            </span>
          ))}
        </div>
      </div>

      {history.length > 0 && (
        <div className="mt-4 rounded-2xl bg-white/70 p-3 ring-2 ring-kid-blue/30">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-wider text-kid-blue">
              История промптов ({history.length})
            </div>
            <button
              type="button"
              onClick={() => setHistory([])}
              className="rounded-full bg-muted px-3 py-0.5 text-[11px] font-bold text-kid-purple hover:bg-kid-pink/20"
            >
              Очистить
            </button>
          </div>
          <ol className="max-h-40 space-y-1.5 overflow-y-auto pr-1">
            {history.map((h, i) => (
              <li
                key={i}
                className="rounded-xl bg-white px-3 py-1.5 text-xs text-foreground/85 shadow-sm sm:text-sm"
              >
                <span className="mr-1 font-bold text-kid-pink">#{history.length - i}</span>
                {h}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────────── Examples grid ───────────────────────────── */

function ExamplesGrid({ items }: { items: ExampleItem[] }) {
  const [autoLoop, setAutoLoop] = useState(true);
  const [volume, setVolume] = useState(0.25);
  const [muted, setMuted] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-kid-purple shadow-sm ring-1 ring-foreground/5 sm:text-sm">
          <input
            type="checkbox"
            checked={autoLoop}
            onChange={(e) => setAutoLoop(e.target.checked)}
            className="h-4 w-4 accent-kid-pink"
          />
          🔁 Автоповтор
        </label>
        <label className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-kid-purple shadow-sm ring-1 ring-foreground/5 sm:text-sm">
          🔊
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="h-1 w-24 cursor-pointer accent-kid-pink"
            aria-label="Громкость видео"
          />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((it, i) => (
        <ExampleCard
          key={i}
          item={it}
          autoLoop={autoLoop}
          volume={volume}
          muted={muted}
          onToggleMute={() => setMuted((m) => !m)}
        />
      ))}
      </div>
    </div>
  );
}

function ExampleCard({
  item,
  autoLoop,
  volume,
  muted,
  onToggleMute,
}: {
  item: ExampleItem;
  autoLoop: boolean;
  volume: number;
  muted: boolean;
  onToggleMute: () => void;
}) {
  return <ExampleCardInner item={item} autoLoop={autoLoop} volume={volume} muted={muted} onToggleMute={onToggleMute} />;
}

function AnimatedImage({ src, alt, motion, decor }: { src: string; alt: string; motion?: string; decor?: "castle" | "space" | "paint" | "wings" }) {
  const ref = useRef<HTMLImageElement | null>(null);
  const [boop, setBoop] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <button
      type="button"
      onClick={() => setBoop((n) => n + 1)}
      aria-label={alt}
      className="absolute inset-0 grid place-items-center cursor-pointer select-none focus:outline-none"
    >
      <img
        ref={ref}
        key={`boop-${boop}`}
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"} ${visible && motion ? motion : ""}`}
      />
      {visible && decor === "wings" && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <span className="absolute text-3xl animate-wingflap-l" style={{ top: "38%", left: "6%" }}>🪽</span>
          <span className="absolute text-3xl animate-wingflap-r" style={{ top: "38%", right: "6%" }}>🪽</span>
        </div>
      )}
      {visible && decor === "castle" && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <span className="absolute text-3xl animate-cloud-a" style={{ top: "12%", left: "-10%" }}>☁️</span>
          <span className="absolute text-2xl animate-cloud-b" style={{ top: "28%", left: "-10%" }}>☁️</span>
          <span className="absolute text-xl animate-bird-a" style={{ top: "20%", left: "-10%" }}>🐦</span>
          <span className="absolute text-lg animate-bird-b" style={{ top: "38%", left: "-10%" }}>🕊️</span>
        </div>
      )}
      {visible && decor === "space" && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <span className="absolute text-lg animate-twinkle" style={{ top: "15%", left: "18%" }}>✨</span>
          <span className="absolute text-xl animate-twinkle-2" style={{ top: "30%", right: "15%" }}>⭐</span>
          <span className="absolute text-base animate-twinkle" style={{ bottom: "20%", left: "25%" }}>✨</span>
          <span className="absolute text-lg animate-twinkle-2" style={{ bottom: "30%", right: "20%" }}>💫</span>
        </div>
      )}
      {visible && decor === "paint" && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <span className="absolute text-xl animate-paint-dot" style={{ top: "25%", right: "20%" }}>🎨</span>
          <span className="absolute text-lg animate-paint-dot-2" style={{ top: "45%", right: "30%" }}>🖌️</span>
          <span className="absolute text-base animate-twinkle" style={{ bottom: "25%", left: "22%" }}>✨</span>
        </div>
      )}
    </button>
  );
}

function ExampleCardInner({
  item,
  autoLoop,
  volume,
  muted,
  onToggleMute,
}: {
  item: ExampleItem;
  autoLoop: boolean;
  volume: number;
  muted: boolean;
  onToggleMute: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.volume = volume;
      v.muted = muted;
    }
  }, [volume, muted]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => {});
    else v.pause();
  };

  const goFullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    const anyEl = el as HTMLDivElement & {
      webkitRequestFullscreen?: () => Promise<void>;
    };
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => {});
    } else if (anyEl.requestFullscreen) {
      void anyEl.requestFullscreen().catch(() => {});
    } else if (anyEl.webkitRequestFullscreen) {
      void anyEl.webkitRequestFullscreen();
    }
  };

  return (
    <figure className="flex flex-col overflow-hidden rounded-2xl bg-muted/40 shadow-pop ring-1 ring-foreground/5">
      <div
        ref={wrapRef}
        className="group relative w-full overflow-hidden bg-gradient-sky"
        style={{ aspectRatio: "4 / 3" }}
      >
        {item.kind === "image" ? (
          <AnimatedImage src={item.src} alt={item.caption} motion={item.motion} decor={item.decor} />
        ) : (
          <>
            <video
              key={autoLoop ? "loop" : "once"}
              ref={videoRef}
              src={item.src}
              poster={item.poster}
              controls
              loop={autoLoop}
              playsInline
              preload="metadata"
              muted={muted}
              onClick={togglePlay}
              onLoadedMetadata={(e) => {
                const v = e.currentTarget;
                v.volume = volume;
                v.muted = muted;
              }}
              onPlay={() => {
                setPlaying(true);
                duckMusic(true);
              }}
              onPause={() => {
                setPlaying(false);
                duckMusic(false);
              }}
              onEnded={() => {
                setPlaying(false);
                duckMusic(false);
              }}
              className="absolute inset-0 h-full w-full bg-black object-contain"
            />
            {!playing && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Воспроизвести"
                className="absolute inset-0 grid place-items-center bg-black/20 transition hover:bg-black/30"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-kid-purple shadow-pop ring-2 ring-white">
                  <Play className="h-7 w-7 translate-x-0.5 fill-kid-purple" />
                </span>
              </button>
            )}
            <div className="pointer-events-none absolute right-2 top-2 flex gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                aria-label={playing ? "Пауза" : "Воспроизвести"}
                className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full bg-white/90 text-kid-purple shadow-pop ring-1 ring-foreground/5 hover:bg-white active:scale-95"
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-kid-purple" />}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleMute();
                }}
                aria-label={muted ? "Включить звук" : "Выключить звук"}
                className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full bg-white/90 text-kid-purple shadow-pop ring-1 ring-foreground/5 hover:bg-white active:scale-95"
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goFullscreen();
                }}
                aria-label="Во весь экран"
                className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full bg-white/90 text-kid-purple shadow-pop ring-1 ring-foreground/5 hover:bg-white active:scale-95"
              >
                <Maximize className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>
      <figcaption className="block min-h-[3rem] w-full whitespace-normal break-words px-4 py-3 text-center text-sm font-bold leading-snug text-kid-purple sm:text-base">
        {item.caption}
      </figcaption>
    </figure>
  );
}

/* ───────────────────────────── Block card ───────────────────────────── */

function BlockCard({
  block,
  index,
  onOpen,
}: {
  block: Block;
  index: number;
  onOpen: () => void;
}) {
  const Icon = block.icon;
  return (
    <button
      onClick={onOpen}
      style={{ animationDelay: `${index * 80}ms` }}
      className="card-toy group relative animate-pop overflow-hidden rounded-[2rem] bg-white p-6 text-left shadow-toy outline-none ring-kid-pink/50 focus-visible:ring-4"
    >
      <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full ${block.gradient} opacity-90 blur-[2px] animate-blob`} />
      <div
        className={`absolute -bottom-10 -left-6 h-24 w-24 rounded-full ${block.gradient} opacity-60 blur-[2px] animate-blob`}
        style={{ animationDelay: "2s" }}
      />
      <div className="relative">
        <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${block.gradient} shadow-pop`}>
          <Icon className="h-8 w-8 text-white drop-shadow" strokeWidth={2.5} />
        </div>
        <div className="mt-5 flex items-center gap-2">
          <span className="text-3xl">{block.emoji}</span>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold uppercase tracking-wider text-kid-purple">
            Блок {index + 1}
          </span>
        </div>
        <h2 className="mt-3 text-2xl text-foreground sm:text-[1.7rem]">{block.title}</h2>
        <p className="mt-2 line-clamp-3 text-sm font-medium text-foreground/70">{block.intro}</p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground/5 px-4 py-2 text-sm font-bold text-kid-purple transition-colors group-hover:bg-kid-pink group-hover:text-white">
          Узнать →
        </div>
      </div>
    </button>
  );
}

/* ───────────────────────────── Background decor ───────────────────────────── */

function MusicPlayer() {
  const [muted, setMuted] = useState(false);
  useEffect(() => {
    setMuted(isMusicMuted());
  }, []);
  return (
    <button
      onClick={() => {
        const next = !muted;
        setMuted(next);
        setMusicMuted(next);
        if (!next) startMusic();
      }}
      aria-label={muted ? "Включить музыку" : "Выключить музыку"}
      title={muted ? "Включить музыку" : "Выключить музыку"}
      className="fixed bottom-4 right-4 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-kid-purple shadow-pop ring-2 ring-kid-pink/40 backdrop-blur transition-transform hover:scale-110 active:scale-95"
    >
      {muted ? <VolumeX className="h-6 w-6" /> : <Music className="h-6 w-6" />}
    </button>
  );
}

function HeroMusicToggle() {
  const [muted, setMuted] = useState(false);
  useEffect(() => {
    setMuted(isMusicMuted());
  }, []);
  return (
    <button
      onClick={() => {
        const next = !muted;
        setMuted(next);
        setMusicMuted(next);
        if (!next) startMusic();
      }}
      className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-bold text-kid-purple shadow-pop ring-2 ring-kid-pink/40 transition-transform hover:scale-105 active:scale-95"
    >
      {muted ? <VolumeX className="h-5 w-5" /> : <Music className="h-5 w-5" />}
      {muted ? "Включить звук" : "Выключить звук"}
    </button>
  );
}

function DecorBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-sun opacity-50 blur-2xl animate-spin-slow" />
      <Cloud className="absolute left-[8%] top-[6%] h-20 w-20 text-white/80 animate-float" />
      <Cloud className="absolute right-[12%] top-[40%] h-16 w-16 text-white/70 animate-float-2" />
      <Cloud className="absolute left-[40%] top-[2%] h-14 w-14 text-white/60 animate-float" style={{ animationDelay: "1.5s" }} />
      <Star className="absolute left-[20%] top-[30%] h-6 w-6 fill-kid-yellow text-kid-yellow animate-wobble" />
      <Star className="absolute right-[25%] top-[8%] h-5 w-5 fill-kid-pink text-kid-pink animate-wobble" style={{ animationDelay: "0.8s" }} />
      <Star className="absolute left-[60%] top-[20%] h-4 w-4 fill-kid-purple text-kid-purple animate-wobble" style={{ animationDelay: "1.2s" }} />
      <div className="absolute -left-24 top-[55%] h-80 w-80 bg-gradient-pink opacity-30 blur-3xl animate-blob" />
      <div className="absolute -right-32 top-[70%] h-96 w-96 bg-gradient-blue opacity-30 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
    </div>
  );
}

/* ───────────────────────────── Slide show ───────────────────────────── */

function SlideShow({
  index,
  onPrev,
  onNext,
  onExit,
  onJump,
}: {
  index: number;
  onPrev: () => void;
  onNext: () => void;
  onExit: () => void;
  onJump: (i: number) => void;
}) {
  const b = BLOCKS[index];
  const [exampleOpen, setExampleOpen] = useState(false);
  const Icon = b.icon;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-sky">
      <DecorBackground />

      <div className="relative z-30 flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="rounded-full bg-white/80 px-4 py-1.5 text-sm font-bold text-kid-purple shadow-pop backdrop-blur-sm">
          Слайд {index + 1} из {BLOCKS.length}
        </div>
        <button
          onClick={onExit}
          className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-bold text-kid-purple shadow-pop backdrop-blur-sm transition-transform hover:scale-105 active:scale-95"
        >
          <X className="h-4 w-4" /> Выйти
        </button>
      </div>

      <div className="relative z-20 flex flex-1 items-stretch overflow-hidden px-2 sm:px-4">
        <button
          onClick={onPrev}
          disabled={index === 0}
          aria-label="Назад"
          className="z-30 my-auto hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/90 text-kid-purple shadow-pop transition-transform hover:scale-110 active:scale-95 disabled:opacity-30 sm:flex"
        >
          <ChevronLeft className="h-7 w-7" />
        </button>

        <div className="mx-auto my-2 flex w-full max-w-4xl flex-col overflow-y-auto rounded-[2rem] bg-white/95 p-5 shadow-toy sm:my-4 sm:p-8">
          <div className={`flex items-center gap-4 rounded-2xl ${b.gradient} px-5 py-5 shadow-pop`}>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/30 backdrop-blur-sm">
              <Icon className="h-8 w-8 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white/90">
                Блок {index + 1}
              </div>
              <h2 className="flex items-center gap-2 text-2xl text-white drop-shadow sm:text-4xl">
                <span>{b.emoji}</span> {b.title}
              </h2>
            </div>
          </div>

          <p className="mt-5 text-base font-medium text-foreground/90 sm:text-xl">{b.intro}</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {b.sections.map((s, i) => (
              <div key={i} className="rounded-2xl bg-muted/50 p-4">
                <h3 className="text-lg text-kid-purple sm:text-xl">{s.heading}</h3>
                {s.body && <p className="mt-2 text-sm text-foreground/85 sm:text-base">{s.body}</p>}
                {s.bullets && (
                  <ul className="mt-2 space-y-1.5">
                    {s.bullets.map((bl, j) => (
                      <li key={j} className="text-sm text-foreground/90 sm:text-base">
                        {bl}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {b.id === "prompt" && (
            <div className="mt-5">
              <PromptPractice />
            </div>
          )}

          <div className="mt-5 rounded-2xl bg-gradient-sky px-4 py-3 text-center">
            <p className="text-sm font-bold text-kid-purple sm:text-base">{b.outro}</p>
            {b.id === "outro" && (
              <a
                href="https://chat.qwen.ai"
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-extrabold text-kid-purple shadow-pop ring-2 ring-kid-pink/40 transition-transform hover:scale-105 active:scale-95 sm:text-base"
              >
                ✨ Открыть chat.qwen.ai →
              </a>
            )}
          </div>

          <button
            onClick={() => setExampleOpen(true)}
            className="mt-5 inline-flex items-center justify-center gap-3 self-center rounded-2xl bg-gradient-candy px-6 py-3 text-base font-bold text-white shadow-pop transition-transform hover:scale-[1.03] active:scale-95"
          >
            <Play className="h-5 w-5 fill-white" /> Пример
          </button>
        </div>

        <button
          onClick={onNext}
          disabled={index === BLOCKS.length - 1}
          aria-label="Вперёд"
          className="z-30 my-auto hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/90 text-kid-purple shadow-pop transition-transform hover:scale-110 active:scale-95 disabled:opacity-30 sm:flex"
        >
          <ChevronRight className="h-7 w-7" />
        </button>
      </div>

      <div className="relative z-30 flex flex-col items-center gap-3 px-4 py-3">
        <div className="flex gap-2">
          {BLOCKS.map((_, i) => (
            <button
              key={i}
              onClick={() => onJump(i)}
              aria-label={`Перейти к слайду ${i + 1}`}
              className={`h-3 w-3 rounded-full transition-all ${
                i === index ? "w-8 bg-kid-pink" : "bg-white/80 hover:bg-white"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-3 sm:hidden">
          <button
            onClick={onPrev}
            disabled={index === 0}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-kid-purple shadow-pop disabled:opacity-30"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={onNext}
            disabled={index === BLOCKS.length - 1}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-kid-purple shadow-pop disabled:opacity-30"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      <Dialog open={exampleOpen} onOpenChange={setExampleOpen}>
        <DialogContent className="max-h-[90vh] w-[95vw] max-w-3xl overflow-y-auto overflow-x-hidden border-0 bg-white/95 sm:rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-kid-purple">{b.examplesTitle}</DialogTitle>
          </DialogHeader>
          <ExamplesGrid items={b.examples} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
