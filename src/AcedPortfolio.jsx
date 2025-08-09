import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Code,
  Smartphone,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function AcedPortfolio() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // Инициализация EmailJS
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    script.async = true;
    script.onload = () => {
      // Используем SMTP сервис вместо Gmail API
      window.emailjs.init("PpmmUYC6XUb90k8T5"); // Ваш Public Key
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.contact || !formData.message) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Если EmailJS настроен, используем его
      if (window.emailjs) {
        await window.emailjs.send(
          "service_mtcrvkt", // Ваш Outlook Service ID
          "template_gsamezk", // Ваш Template ID
          {
            from_name: formData.name,
            from_contact: formData.contact,
            message: formData.message,
            to_email: "levserduk76@gmail.com",
            reply_to: formData.contact, // Добавляем reply_to для ответов
          }
        );
      } else {
        // Fallback - открываем почтовый клиент
        const subject = encodeURIComponent("Новое сообщение с портфолио");
        const body = encodeURIComponent(
          `Имя: ${formData.name}\nКонтакты: ${formData.contact}\n\nСообщение:\n${formData.message}`
        );
        window.open(`mailto:levserduk76@gmail.com?subject=${subject}&body=${body}`);
      }

      setSubmitStatus('success');
      setFormData({ name: "", contact: "", message: "" });
    } catch (error) {
      console.error("Ошибка отправки:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const services = [
    {
      title: "Телеграм-боты",
      desc: "Создаю чат-ботов, админ-панели, интеграции с API и платежами.",
      icon: <Smartphone className="w-6 h-6" />,
    },
    {
      title: "Веб-сайты",
      desc: "Лендинги, бизнес-сайты и админки на React/Next.js.",
      icon: <Code className="w-6 h-6" />,
    },
    {
      title: "Интеграции и автоматизация",
      desc: "Webhook'и, бэкенд на Node.js, базы данных и CI/CD.",
      icon: <Send className="w-6 h-6" />,
    },
  ];

  const projects = [
    {
      name: "Premium Support Bot",
      tags: ["Telegram", "Node.js", "Automation"],
      desc: "Умный бот с системой тикетов, аналитикой и автоответами, повышающий эффективность работы поддержки.",
    },
    {
      name: "Business Landing Pro",
      tags: ["React", "SEO", "Next.js"],
      desc: "Продающий лендинг с высокой конверсией, интеграцией оплаты и адаптивным дизайном.",
    },
    {
      name: "E-commerce Dashboard",
      tags: ["Next.js", "Analytics", "Charts"],
      desc: "Панель аналитики для интернет-магазина с графиками продаж, статистикой клиентов и управлением заказами.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white antialiased">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-full w-12 h-12 bg-white/10 flex items-center justify-center text-xl font-bold">
              A
            </div>
            <div>
              <h1 className="text-2xl font-semibold leading-tight">aced</h1>
              <p className="text-sm text-gray-300">Разработка телеграм-ботов и сайтов</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            <a href="#services" className="text-sm hover:underline">
              Услуги
            </a>
            <a href="#work" className="text-sm hover:underline">
              Портфолио
            </a>
            <a href="#contact" className="text-sm hover:underline">
              Контакты
            </a>
            <div className="flex items-center gap-3 ml-4">
              <a aria-label="github" href="https://github.com/Marionet1clxn" target="_blank" className="p-2 rounded-md hover:bg-white/5">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </nav>
        </header>

        {/* Hero */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase text-gray-400 tracking-wider">Привет, я</p>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mt-2">aced</h2>
            <p className="mt-4 text-gray-300 max-w-xl">
              Я создаю надёжные и удобные телеграм-боты и современные сайты. Люблю минимализм в
              дизайне, простой код и автоматизацию рутины.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="mailto:levserduk76@gmail.com"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
              >
                <Mail className="w-4 h-4" /> Связаться
              </a>

              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
              >
                Портфолио
              </a>
            </div>

            <div className="mt-6 text-xs text-gray-500">Доступен для удалённой работы.</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/3 rounded-2xl p-6 border border-white/6"
          >
            <h3 className="text-lg font-semibold">Быстрая шапка — контакты</h3>
            <ul className="mt-4 text-sm text-gray-200 space-y-3">
              <li>
                <strong>Телеграм:</strong> <a href="https://t.me/zxaced" className="text-gray-100 hover:underline">@zxaced</a>
              </li>
              <li>
                <strong>Почта:</strong> <a href="mailto:levserduk76@gmail.com" className="text-gray-100 hover:underline">levserduk76@gmail.com</a>
              </li>
              <li>
                <strong>GitHub:</strong> <a href="https://github.com/Marionet1clxn" target="_blank" className="text-gray-100 hover:underline">Marionet1clxn</a>
              </li>
              <li>
                <strong>Локация:</strong> Удалённо
              </li>
            </ul>
          </motion.div>
        </section>

        {/* Services */}
        <section id="services" className="mt-14">
          <h3 className="text-2xl font-semibold">Что я делаю</h3>
          <p className="text-gray-400 mt-2">Основные направления работы.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {services.map((s) => (
              <motion.div
                key={s.title}
                whileHover={{ y: -6 }}
                className="bg-white/3 border border-white/6 rounded-2xl p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-md bg-white/6">{s.icon}</div>
                  <div>
                    <h4 className="font-semibold">{s.title}</h4>
                    <p className="text-sm text-gray-300 mt-1">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Work */}
        <section id="work" className="mt-14">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Портфолио</h3>
            <a href="#contact" className="text-sm hover:underline">
              Заказать похожее
            </a>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((p) => (
              <motion.a
                key={p.name}
                whileHover={{ scale: 1.01 }}
                className="block bg-white/3 border border-white/6 rounded-2xl p-5"
                href="#"
              >
                <h4 className="font-semibold">{p.name}</h4>
                <p className="text-sm text-gray-300 mt-2">{p.desc}</p>
                <div className="mt-3 text-xs text-gray-400 flex gap-2 flex-wrap">
                  {p.tags.map((t) => (
                    <span key={t} className="px-2 py-1 rounded-md border border-white/6">{t}</span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-14 mb-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/3 rounded-2xl p-6 border border-white/6"
          >
            <h3 className="text-xl font-semibold">Свяжитесь со мной</h3>
            <p className="text-gray-300 mt-2">Напишите задачу или оставьте контакты — ответ поступит в Telegram.</p>

            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-white/6 px-3 py-2 rounded-md text-white text-sm placeholder-gray-500"
                placeholder="Имя"
                required
              />
              <input
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-white/6 px-3 py-2 rounded-md text-white text-sm placeholder-gray-500"
                placeholder="Email или Telegram"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-white/6 px-3 py-2 rounded-md text-white text-sm placeholder-gray-500"
                rows={4}
                placeholder="Коротко о задаче"
                required
              />

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-400 text-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  Сообщение отправлено! Спасибо за обращение.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  Ошибка отправки. Попробуйте еще раз или напишите на почту.
                </motion.div>
              )}

              <div className="flex items-center gap-3">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-2 text-sm hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> 
                      Отправить
                    </>
                  )}
                </button>
                <a href="mailto:levserduk76@gmail.com" className="text-sm text-gray-300 hover:underline">Или напишите на почту</a>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="bg-white/3 p-5 rounded-2xl border border-white/6">
              <h4 className="font-semibold">Готов обсудить</h4>
              <p className="text-sm text-gray-300 mt-2">Удалённая работа, фриланс, долгосрочные проекты.</p>
            </div>

            <div className="bg-white/3 p-5 rounded-2xl border border-white/6">
              <h4 className="font-semibold">Коротко обо мне</h4>
              <p className="text-sm text-gray-300 mt-2">Опыт в Node.js, Telegram Bot API, React и Next.js. Пишу чистый код, создаю UX, который продаёт.</p>
            </div>

            <div className="flex items-center gap-3">
              <a href="https://github.com/Marionet1clxn" target="_blank" className="p-3 rounded-md hover:bg-white/5" aria-label="github">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:levserduk76@gmail.com" className="p-3 rounded-md hover:bg-white/5" aria-label="email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="mt-8 border-t border-white/6 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} aced — Разработка ботов и сайтов • Доступен для удалённой работы
        </footer>
      </div>
    </div>
  );
} 