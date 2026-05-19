import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sparkles, Brain, MessageCircleQuestion, Palette, Film, Code2, Rocket, Play, Star, Cloud } from "lucide-react";
import robot1 from "@/assets/robot1.png";
import robot2 from "@/assets/robot2.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Мастер-класс по нейросетям для детей 8–10 лет" },
      { name: "description", content: "Яркая интерактивная презентация: что такое нейросеть, как писать промпты, нейрокреатор, нейровидеограф и вайб-кодер." },
    ],
  }),
  component: Index,
});

type Block = {
  id: string;
  title: string;
  emoji: string;
  icon: typeof Brain;
  gradient: string;
  shadowColor: string;
  intro: string;
  sections: { heading: string; body?: string; bullets?: string[] }[];
  outro: string;
  cta: string;
  example: { type: "video" | "image"; label: string; note: string };
};

const BLOCKS: Block[] = [
  {
    id: "what",
    title: "Что такое нейросеть",
    emoji: "🧠",
    icon: Brain,
    gradient: "bg-gradient-pink",
    shadowColor: "oklch(0.55 0.2 340 / 0.35)",
    intro: "Нейросеть — это умный помощник в компьютере. Она училась на огромном количестве книг, картинок и видео, и теперь умеет отвечать на вопросы, рисовать и придумывать истории!",
    sections: [
      {
        heading: "Если коротко 🤖",
        body: "Представь робота-друга, который прочитал миллион книг и посмотрел миллион мультиков. Он может помочь тебе с домашкой, нарисовать дракона или придумать сказку!",
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
    example: { type: "video", label: "Видео про нейросети", note: "Здесь будет короткий ролик-объяснялка" },
  },
  {
    id: "prompt",
    title: "Как правильно попросить",
    emoji: "💬",
    icon: MessageCircleQuestion,
    gradient: "bg-gradient-blue",
    shadowColor: "oklch(0.55 0.18 230 / 0.35)",
    intro: "Запрос к нейросети называется ПРОМПТ. Это как заказ в кафе: чем подробнее расскажешь, тем вкуснее будет результат!",
    sections: [
      {
        heading: "Промпт — это…",
        body: "Твоя просьба или вопрос, который ты пишешь нейросети. Например: «Нарисуй кота-космонавта на радуге».",
      },
      {
        heading: "🏆 Правило золотого промпта",
        bullets: [
          "1. КТО — опиши героя (кот, робот, единорог)",
          "2. ЧТО ДЕЛАЕТ — действие (летит, танцует, ест)",
          "3. ГДЕ — место (на луне, в лесу, под водой)",
          "4. КАК — стиль (мультяшный, как Pixar, акварель)",
          "5. ДЕТАЛИ — цвета, настроение, освещение ✨",
        ],
      },
    ],
    outro: "Чем больше деталей — тем круче результат. Не бойся фантазировать!",
    cta: "Посмотреть пример промпта",
    example: { type: "image", label: "Пример идеального промпта", note: "Сравним: плохой промпт vs золотой промпт" },
  },
  {
    id: "creator",
    title: "Нейрокреатор",
    emoji: "🎨",
    icon: Palette,
    gradient: "bg-gradient-sun",
    shadowColor: "oklch(0.6 0.2 60 / 0.35)",
    intro: "Нейрокреатор — это художник будущего! Он создаёт картинки с помощью нейросети: от плакатов до обложек книг.",
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
        body: "В рекламе, мультфильмах, в играх, в школе для проектов, при оформлении дня рождения, для иллюстраций к своей книжке!",
      },
    ],
    outro: "Если любишь рисовать и придумывать — это твоя суперсила!",
    cta: "Посмотреть картинки",
    example: { type: "image", label: "Галерея работ нейрокреатора", note: "Покажем 5 крутых картинок из нейросети" },
  },
  {
    id: "videograph",
    title: "Нейровидеограф",
    emoji: "🎬",
    icon: Film,
    gradient: "bg-gradient-purple",
    shadowColor: "oklch(0.55 0.2 290 / 0.35)",
    intro: "Нейровидеограф снимает кино без камеры! Он пишет промпт — и нейросеть оживляет картинку в настоящий мультфильм.",
    sections: [
      {
        heading: "Что он делает?",
        bullets: [
          "🎞️ Создаёт короткие видео и ролики",
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
    cta: "Посмотреть нейровидео",
    example: { type: "video", label: "Видео, сделанное нейросетью", note: "Короткий ролик-мультик" },
  },
  {
    id: "vibe",
    title: "Вайб-кодер",
    emoji: "💻",
    icon: Code2,
    gradient: "bg-gradient-green",
    shadowColor: "oklch(0.55 0.18 160 / 0.35)",
    intro: "Вайб-кодер делает сайты и игры… разговаривая с нейросетью! Он не пишет тысячи строк кода — он объясняет идею, а нейросеть всё собирает.",
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
        body: "Сделай сайт про своего питомца, игру для друзей, открытку маме на 8 марта — всё, что придумаешь!",
      },
    ],
    outro: "Если умеешь объяснять — ты уже почти программист!",
    cta: "Посмотреть готовый сайт",
    example: { type: "image", label: "Пример сайта от вайб-кодера", note: "Этот сайт тоже сделан так!" },
  },
  {
    id: "outro",
    title: "Заключение",
    emoji: "🚀",
    icon: Rocket,
    gradient: "bg-gradient-candy",
    shadowColor: "oklch(0.6 0.2 30 / 0.35)",
    intro: "Сегодня ты узнал, что нейросети — это не страшно, а очень круто! Это новый мир, где твоя фантазия — главная суперсила.",
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
    cta: "Финальное видео",
    example: { type: "video", label: "Напутствие от мастера", note: "Короткое вдохновляющее видео" },
  },
];

function Index() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [exampleOpen, setExampleOpen] = useState(false);
  const active = BLOCKS.find((b) => b.id === openId) ?? null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Decorative clouds & stars */}
      <DecorBackground />

      {/* Characters */}
      <img
        src={robot1}
        alt="Робот-помощник"
        width={768}
        height={768}
        className="pointer-events-none absolute left-2 top-[18%] z-10 w-28 sm:w-40 md:w-56 lg:w-72 animate-float drop-shadow-2xl"
      />
      <img
        src={robot2}
        alt="Волшебная помощница"
        width={768}
        height={768}
        loading="lazy"
        className="pointer-events-none absolute right-2 top-[14%] z-10 w-28 sm:w-40 md:w-56 lg:w-72 animate-float-2 drop-shadow-2xl"
      />

      <main className="relative z-20 mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        {/* Hero / Title */}
        <header className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 backdrop-blur-sm shadow-pop animate-pop">
            <Sparkles className="h-4 w-4 text-kid-pink" />
            <span className="text-sm font-bold text-kid-purple">Мастер-класс для ребят 8–10 лет</span>
            <Sparkles className="h-4 w-4 text-kid-pink" />
          </div>
          <h1 className="mt-6 text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
            <span className="block bg-gradient-pink bg-clip-text text-transparent">Привет, друг!</span>
            <span className="mt-2 block bg-gradient-purple bg-clip-text text-transparent">Знакомься —</span>
            <span className="mt-2 block bg-gradient-sun bg-clip-text text-transparent">мир нейросетей! 🚀</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-foreground/80 sm:text-xl">
            Сегодня ты узнаешь, кто такие нейрокреаторы, нейровидеографы и вайб-кодеры —
            и как самому стать волшебником с помощью нейросетей ✨
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white/80 px-5 py-3 shadow-toy backdrop-blur-sm">
            <span className="text-2xl">👇</span>
            <span className="font-bold text-kid-purple">Нажимай на кнопки и узнавай!</span>
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

      {/* Block details dialog */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent className="max-w-2xl border-0 bg-white/95 p-0 sm:rounded-3xl overflow-hidden">
          {active && (
            <div>
              <div className={`${active.gradient} px-6 py-8 sm:px-10 sm:py-10`}>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-5xl drop-shadow-lg">{active.emoji}</span>
                    <DialogTitle className="text-3xl text-white drop-shadow-md sm:text-4xl">
                      {active.title}
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <p className="mt-4 text-lg font-medium text-white/95 drop-shadow">
                  {active.intro}
                </p>
              </div>
              <div className="space-y-6 px-6 py-8 sm:px-10">
                {active.sections.map((s, idx) => (
                  <div key={idx}>
                    <h3 className="text-2xl text-kid-purple">{s.heading}</h3>
                    {s.body && <p className="mt-2 text-base text-foreground/85">{s.body}</p>}
                    {s.bullets && (
                      <ul className="mt-3 space-y-2">
                        {s.bullets.map((bl, i) => (
                          <li
                            key={i}
                            className="rounded-2xl bg-muted/60 px-4 py-3 text-base font-medium text-foreground/90"
                          >
                            {bl}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
                <div className="rounded-2xl bg-gradient-sky px-5 py-4 text-center">
                  <p className="text-base font-bold text-kid-purple">{active.outro}</p>
                </div>
                <button
                  onClick={() => setExampleOpen(true)}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-candy px-6 py-4 text-lg font-bold text-white shadow-pop transition-transform hover:scale-[1.02] active:scale-95"
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

      {/* Example placeholder dialog */}
      <Dialog open={exampleOpen} onOpenChange={setExampleOpen}>
        <DialogContent className="max-w-xl border-0 bg-white/95 sm:rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-kid-purple">
              {active?.example.label ?? "Пример"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-blue text-center text-white">
            <div className="px-6">
              <Play className="mx-auto mb-3 h-12 w-12 fill-white" />
              <p className="text-lg font-bold">{active?.example.note}</p>
              <p className="mt-2 text-sm opacity-90">
                Здесь можно вставить {active?.example.type === "video" ? "видео" : "картинку"} с примером
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
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
      <div className={`absolute -bottom-10 -left-6 h-24 w-24 rounded-full ${block.gradient} opacity-60 blur-[2px] animate-blob`} style={{ animationDelay: "2s" }} />

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
      {/* Sun */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-sun opacity-50 blur-2xl animate-spin-slow" />
      {/* Clouds */}
      <Cloud className="absolute left-[8%] top-[6%] h-20 w-20 text-white/80 animate-float" />
      <Cloud className="absolute right-[12%] top-[40%] h-16 w-16 text-white/70 animate-float-2" />
      <Cloud className="absolute left-[40%] top-[2%] h-14 w-14 text-white/60 animate-float" style={{ animationDelay: "1.5s" }} />
      {/* Stars */}
      <Star className="absolute left-[20%] top-[30%] h-6 w-6 fill-kid-yellow text-kid-yellow animate-wobble" />
      <Star className="absolute right-[25%] top-[8%] h-5 w-5 fill-kid-pink text-kid-pink animate-wobble" style={{ animationDelay: "0.8s" }} />
      <Star className="absolute left-[60%] top-[20%] h-4 w-4 fill-kid-purple text-kid-purple animate-wobble" style={{ animationDelay: "1.2s" }} />
      {/* Blobs */}
      <div className="absolute -left-24 top-[55%] h-80 w-80 bg-gradient-pink opacity-30 blur-3xl animate-blob" />
      <div className="absolute -right-32 top-[70%] h-96 w-96 bg-gradient-blue opacity-30 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
    </div>
  );
}
