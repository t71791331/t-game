import { useState } from "react";

const STEPS = ["Реальность", "Зеркало", "Тень", "Выбор", "Ресурс", "Действие"];

const CARDS: Record<string, string[]> = {
  Реальность: [
    "Что сейчас происходит на самом деле?",
    "В чём главная сложность?",
    "Что ты игнорируешь?",
  ],
  Зеркало: [
    "Что это говорит о тебе?",
    "Какие эмоции стоят за этим?",
    "Что ты не хочешь признавать?",
  ],
  Тень: [
    "Чего ты боишься больше всего?",
    "Что будет, если ничего не изменится?",
    "Где ты себя саботируешь?",
  ],
  Выбор: [
    "Какие есть варианты?",
    "Какой самый маленький шаг?",
    "Что ты можешь изменить прямо сейчас?",
  ],
  Ресурс: [
    "Когда ты уже справлялся(ась)?",
    "В чём твоя сила?",
    "Что тебя поддерживает?",
  ],
  Действие: [
    "Какой 1 шаг ты сделаешь сегодня?",
    "Что ты начнёшь прямо сейчас?",
    "Что ты прекратишь откладывать?",
  ],
};

function aiRespond(text: string): string {
  const t = text.toLowerCase();

  let base = "Я вижу, что в этом есть важный внутренний процесс.";

  if (t.includes("страх")) {
    base = "Я слышу, что страх сейчас играет важную роль.";
  } else if (t.includes("не знаю")) {
    base = "Похоже, ты сейчас в точке неопределённости.";
  } else if (t.includes("не могу")) {
    base = "Ты сталкиваешься с ощущением ограничения.";
  }

  return base + " Что здесь для тебя самое важное? Что это значит глубже?";
}

export default function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [card, setCard] = useState("");
  const [answer, setAnswer] = useState("");
  const [ai, setAi] = useState("");

  const step = STEPS[stepIndex];

  const drawCard = () => {
    const options = CARDS[step];
    const random = options[Math.floor(Math.random() * options.length)];
    setCard(random);
    setAnswer("");
    setAi("");
  };

  const submit = () => {
    setAi(aiRespond(answer));
  };

  const nextStep = () => {
    setStepIndex((prev) => Math.min(prev + 1, STEPS.length - 1));
    setCard("");
    setAnswer("");
    setAi("");
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <h1>🎮 Трансформационная самоигра</h1>

      <h2>Этап: {step}</h2>
      <p>Шаг {stepIndex + 1} из 6</p>

      <button onClick={drawCard}>Вытянуть карту</button>

      {card && (
        <div style={{ border: "1px solid #ccc", padding: 10, marginTop: 10 }}>
          🎴 <b>Карта:</b>
          <p>{card}</p>
        </div>
      )}

      {card && (
        <textarea
          style={{ width: "100%", marginTop: 10 }}
          rows={4}
          placeholder="Твой ответ..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      )}

      {card && <button onClick={submit}>Отправить AI</button>}

      {ai && (
        <div style={{ marginTop: 10, background: "#f5f5f5", padding: 10 }}>
          🧠 <b>AI-ведущий:</b>
          <p>{ai}</p>
        </div>
      )}

      {ai && stepIndex < STEPS.length - 1 && (
        <button onClick={nextStep}>Следующий этап</button>
      )}
    </div>
  );
}
