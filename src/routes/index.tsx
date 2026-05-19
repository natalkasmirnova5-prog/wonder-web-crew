import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
} from "lucide-react";
import robot1 from "@/assets/robot1.png";
import robot2 from "@/assets/robot2.png";

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
  | { kind: "image"; src: string; caption: string };

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

// Public sample videos (Google demo bucket – stable, CORS-friendly)
const V = (name: string) =>
  `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${name}.mp4`;

// Picsum image with stable seed
const P = (seed: string) => `https://picsum.photos/seed/${seed}/800/600`;

// Free public website screenshot service (no auth)
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
      { kind: "image", src: P("neuro-brain-1"), caption: "Картинки от нейросети" },
      { kind: "image", src: P("neuro-brain-2"), caption: "Истории и сказки" },
      { kind: "image", src: P("neuro-brain-3"), caption: "Идеи для уроков" },
      { kind: "image", src: P("neuro-brain-4"), caption: "Помощь в творчестве" },
    ],
  },
  {
    id: "prompt",
    title: "Как правильно попросить",
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
    examplesTitle: "Примеры удачных промптов",
    examples: [
      { kind: "image", src: P("prompt-1"), caption: "«Дракон-повар печёт пиццу»" },
      { kind: "image", src: P("prompt-2"), caption: "«Котёнок-астронавт на радуге»" },
      { kind: "image", src: P("prompt-3"), caption: "«Город из мороженого ночью»" },
      { kind: "image", src: P("prompt-4"), caption: "«Робот играет с щенком в лего»" },
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
    examplesTitle: "Нейроизображения — 4 примера",
    examples: [
      { kind: "image", src: P("ai-art-cat-pixar"), caption: "Котёнок в стиле Pixar" },
      { kind: "image", src: P("ai-art-castle"), caption: "Сказочный замок на облаке" },
      { kind: "image", src: P("ai-art-robot"), caption: "Дружелюбный робот-художник" },
      { kind: "image", src: P("ai-art-dragon"), caption: "Дракончик и волшебный лес" },
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
      { kind: "video", src: V("BigBuckBunny"), caption: "Мультфильм-нейровидео" },
      { kind: "video", src: V("ElephantsDream"), caption: "Анимация с персонажами" },
      { kind: "video", src: V("ForBiggerBlazes"), caption: "Короткий ролик-история" },
      { kind: "video", src: V("ForBiggerJoyrides"), caption: "Динамичная сценка" },
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
      { kind: "image", src: SHOT("https://pbskids.org"), caption: "PBS Kids" },
      { kind: "image", src: SHOT("https://www.nickjr.com"), caption: "Nick Jr." },
      { kind: "image", src: SHOT("https://www.starfall.com"), caption: "Starfall" },
      { kind: "image", src: SHOT("https://www.coolmathgames.com"), caption: "Cool Math Games" },
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
      { kind: "image", src: P("future-1"), caption: "Свою книгу с картинками" },
      { kind: "image", src: P("future-2"), caption: "Свой мультфильм" },
      { kind: "image", src: P("future-3"), caption: "Свою мини-игру" },
      { kind: "image", src: P("future-4"), caption: "Свой сайт-проект" },
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

  if (slideMode) {
    return (
      <SlideShow
        index={slideIdx}
        onPrev={() => setSlideIdx((i) => Math.max(i - 1, 0))}
        onNext={() => setSlideIdx((i) => Math.min(i + 1, BLOCKS.length - 1))}
        onExit={() => setSlideMode(false)}
        onJump={setSlideIdx}
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <DecorBackground />

      {/* Характеры — озорные, прыгают и крутятся */}
      <img
        src={robot1}
        alt="Робот-помощник"
        width={768}
        height={768}
        className="pointer-events-none absolute left-1 top-[16%] z-10 w-24 sm:w-36 md:w-52 lg:w-64 animate-dance drop-shadow-2xl"
      />
      <img
        src={robot2}
        alt="Волшебная помощница"
        width={768}
        height={768}
        loading="lazy"
        className="pointer-events-none absolute right-1 top-[12%] z-10 w-24 sm:w-36 md:w-52 lg:w-64 animate-jiggle drop-shadow-2xl"
      />

      <main className="relative z-20 mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        {/* Hero */}
        <header className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 backdrop-blur-sm shadow-pop animate-pop">
            <Sparkles className="h-4 w-4 text-kid-pink" />
            <span className="text-sm font-bold text-kid-purple">Мастер-класс для ребят 8–10 лет</span>
            <Sparkles className="h-4 w-4 text-kid-pink" />
          </div>

          <h1 className="mx-auto mt-6 max-w-3xl text-4xl leading-[1.05] sm:text-6xl md:text-7xl">
            <span className="block bg-gradient-pink bg-clip-text text-transparent drop-shadow-sm">
              Добро пожаловать в мир нейросетей! 🚀
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base font-medium text-foreground/80 sm:text-xl">
            Сегодня ты узнаешь, кто такие нейрокреаторы, нейровидеографы и вайб-кодеры —
            и как самому стать волшебником с помощью нейросетей ✨
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-2xl bg-white/80 px-5 py-3 shadow-toy backdrop-blur-sm">
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
          </div>
        </header>

        {/* Blocks grid */}
        <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Block details dialog — компактнее */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent className="max-h-[88vh] w-[94vw] max-w-lg overflow-y-auto overflow-x-hidden border-0 bg-white/95 p-0 sm:rounded-3xl">
          {active && (
            <div>
              <div className={`${active.gradient} px-5 py-6 sm:px-7 sm:py-7`}>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl drop-shadow-lg">{active.emoji}</span>
                    <DialogTitle className="text-2xl text-white drop-shadow-md sm:text-3xl">
                      {active.title}
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <p className="mt-3 text-base font-medium text-white/95 drop-shadow">
                  {active.intro}
                </p>
              </div>
              <div className="space-y-5 px-5 py-6 sm:px-7">
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
                <div className="rounded-2xl bg-gradient-sky px-5 py-3 text-center">
                  <p className="text-sm font-bold text-kid-purple sm:text-base">{active.outro}</p>
                </div>
                <button
                  onClick={() => setExampleOpen(true)}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-candy px-6 py-3.5 text-base font-bold text-white shadow-pop transition-transform hover:scale-[1.02] active:scale-95 sm:text-lg"
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
        <DialogContent className="max-h-[90vh] w-[95vw] max-w-3xl overflow-y-auto overflow-x-hidden border-0 bg-white/95 sm:rounded-3xl">
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

function ExamplesGrid({ items }: { items: ExampleItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((it, i) => (
        <figure
          key={i}
          className="overflow-hidden rounded-2xl bg-muted/40 shadow-pop ring-1 ring-foreground/5"
        >
          <div className="relative w-full overflow-hidden bg-gradient-sky" style={{ aspectRatio: "4 / 3" }}>
            {it.kind === "image" ? (
              <img
                src={it.src}
                alt={it.caption}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain"
              />
            ) : (
              <video
                src={it.src}
                controls
                preload="metadata"
                className="absolute inset-0 h-full w-full object-contain bg-black"
              />
            )}
          </div>
          <figcaption className="px-4 py-3 text-sm font-bold text-kid-purple">
            {it.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

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

      {/* Top bar */}
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

      {/* Slide */}
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

          <div className="mt-5 rounded-2xl bg-gradient-sky px-4 py-3 text-center">
            <p className="text-sm font-bold text-kid-purple sm:text-base">{b.outro}</p>
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

      {/* Bottom dots + mobile nav */}
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

      {/* Example dialog */}
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
