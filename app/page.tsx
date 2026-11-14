"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, MotionConfig, useScroll, useSpring, useTransform, type Variants } from "framer-motion";

/* ---------- المحتوى: عدّل هنا ---------- */
const PHONE = "0779300046";
const PHONE_INTL = "962779300046";

const body = "text-xl leading-relaxed text-white/90 md:text-3xl";

const tabs = [
  { title: "مهاراتي التقنية", items: ["استخدام أدوات الذكاء الاصطناعي باحترافية", "أساسيات Python", "GitHub", "تطوير مواقع الويب", "البحث التقني وحل المشكلات", "التعامل المتقدم مع الحاسوب", "التعلم الذاتي السريع"] },
  { title: "مهاراتي الشخصية", items: ["سرعة التعلم", "الإبداع وحل المشكلات", "تحمل المسؤولية", "الانضباط والالتزام", "العمل بنظام المهام", "التعلم المستمر"] },
];

const steps = ["الفكرة", "التحدي", "الحل", "النتيجة"];
const projects = [
  {
    name: "جلمود", en: "Jalmoud", url: "https://jalmoud-hoodie-customizer.replit.app/",
    desc: "مشروع ويب يركز على تقديم تجربة رقمية مميزة وتنظيم المحتوى بطريقة احترافية.",
    flow: ["تقديم تجربة رقمية مميزة.", "تنظيم المحتوى بطريقة احترافية.", "بنيته كمشروع ويب يعمل على الإنترنت.", "رابط حيّ تستطيع تجربته بنفسك."],
  },
  {
    name: "المستورد", en: "Al Mustawrad", url: "https://lmstwrd-or-mn-s-lmwrdyn.replit.app",
    desc: "مشروع رقمي لإدارة وعرض المعلومات والمحتوى بصورة منظمة وقابلة للتطوير.",
    flow: ["إدارة المعلومات والمحتوى وعرضها.", "أن تبقى منظمة وقابلة للتطوير.", "بنية رقمية مرتبة تسمح بالتوسّع لاحقًا.", "مشروع حيّ وقابل للتطوير."],
  },
  {
    name: "الجدول", en: "Al Jadwal", url: "https://ljdwl.replit.app",
    desc: "مشروع لتنظيم وإدارة المهام والجداول بطريقة مبسطة وسهلة الاستخدام.",
    flow: ["تنظيم وإدارة المهام والجداول.", "جعلها مبسطة وسهلة الاستخدام.", "واجهة مبسطة تخدم هذا الهدف.", "مشروع حيّ تستطيع تجربته بنفسك."],
  },
];

function Skills() {
  const [t, setT] = useState(0);
  return (
    <div>
      <div role="tablist" className="flex gap-2 rounded-full border border-white/10 p-1">
        {tabs.map((x, i) => (
          <button key={x.title} role="tab" aria-selected={t === i} onClick={() => setT(i)}
            className={`flex-1 rounded-full py-3 text-sm font-medium transition-colors md:text-base ${t === i ? "bg-primary/20 text-glow" : "text-white/60"}`}>
            {x.title}
          </button>
        ))}
      </div>
      <motion.ul key={t} initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.07 } } }} className="mt-8 space-y-5">
        {tabs[t].items.map((k) => (
          <motion.li key={k} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="flex items-center gap-4 text-lg md:text-2xl">
            <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-primary" />{k}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

const links = [
  { label: "اتصال", href: `tel:+${PHONE_INTL}` },
  { label: "واتساب", href: `https://wa.me/${PHONE_INTL}` },
];

/* ---------- الحركة (transform + opacity فقط للحفاظ على 60 إطارًا) ---------- */
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.1, ease } }),
};

function Reveal({ children, i = 0, className }: { children: ReactNode; i?: number; className?: string }) {
  return (
    <motion.div className={className} variants={rise} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }}>
      {children}
    </motion.div>
  );
}

/** سطر يضيء تدريجيًا مع التمرير */
function Lit({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "start 50%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.18, 1]);
  return <motion.p ref={ref} style={{ opacity }} className={className}>{children}</motion.p>;
}

function Chapter({ id, n, title, children }: { id: string; n: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-3xl px-6 py-28 md:py-44">
      <Reveal><span className="text-sm text-primary/80">{n}</span></Reveal>
      <Reveal i={1}><h2 className="mt-3 text-4xl font-bold leading-tight md:text-6xl">{title}</h2></Reveal>
      <div className="mt-14 space-y-10">{children}</div>
    </section>
  );
}

/* ---------- الخلفية والتقدّم ---------- */
function Backdrop() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "-45vh"]);
  return (
    <>
      <motion.div style={{ scaleX: bar, transformOrigin: "right" }} className="fixed inset-x-0 top-0 z-50 h-0.5 bg-primary" />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 flex justify-center overflow-hidden">
        <motion.div
          style={{ y, background: "radial-gradient(closest-side, rgba(96,165,250,0.2), transparent)" }}
          className="mt-[18vh] h-[min(90vw,75vh)] w-[min(90vw,75vh)] rounded-full will-change-transform"
        />
      </div>
    </>
  );
}

/* ---------- الافتتاحية ---------- */
const opening = ["مرحبًا.", "إذا كنت تبحث عن سيرة ذاتية تقليدية...", "فلن تجدها هنا.", "لأنني قررت أن أبني سيرتي الذاتية.", "بدلًا من كتابتها."];
const openingCls = [
  "mb-8 text-5xl font-bold md:text-7xl",
  "text-lg text-white/70 md:text-2xl",
  "text-lg text-white/70 md:text-2xl",
  "glow-text mt-8 text-2xl font-bold md:text-4xl",
  "glow-text mt-1 text-2xl font-bold md:text-4xl",
];

function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);
  const y = useTransform(scrollY, [0, 450], [0, 60]);
  return (
    <section className="flex min-h-svh items-center justify-center px-6 text-center">
      <motion.div style={{ opacity, y }} className="max-w-2xl">
        {opening.map((t, i) => (
          <motion.p key={t} className={openingCls[i]} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 + i * 0.55, ease }}>{t}</motion.p>
        ))}
        <motion.a href="#who" initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.8, delay: 0.3 + opening.length * 0.55 }}
          className="mt-14 inline-block rounded-full border border-primary/50 bg-primary/10 px-9 py-4 text-lg font-medium text-glow transition-colors hover:bg-primary/20">
          ابدأ الاستكشاف
        </motion.a>
      </motion.div>
    </section>
  );
}

/* ---------- الصفحة ---------- */
export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <Backdrop />
      <main>
        <Hero />

        <Chapter id="who" n="01" title="من أنا؟">
          <Lit className="text-2xl font-medium leading-relaxed md:text-4xl">
            أنا <span className="glow-text">هزاع معتصم عيسى المجالي</span>، طالب توجيهي من عمّان، الأردن.
          </Lit>
          <Lit className={body}>شغوف بالتقنية، وبالذكاء الاصطناعي، وبتطوير الويب.</Lit>
          <Lit className={body}>أمتلك مهارات قوية في استخدام الحاسوب وأدوات الذكاء الاصطناعي.</Lit>
          <Lit className={body}>وأسعى باستمرار لتعلّم التقنيات الحديثة وتطوير قدراتي البرمجية. أتعلّم حاليًا لغة Python.</Lit>
          <Reveal className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-sm text-primary">التعليم</p>
            <p className="mt-2 text-2xl font-bold">الثانوية العامة (التوجيهي)</p>
            <p className="mt-1 text-white/70 md:text-lg">مدرسة لؤلؤة الطارق — عمّان، الأردن</p>
          </Reveal>
          <Lit className={body}>وخارج الشاشة، أمارس الملاكمة والتايكوندو والسباحة.</Lit>
        </Chapter>

        <Chapter id="learn" n="02" title="كيف أتعلم؟">
          <Lit className={body}>أتعلّم ذاتيًا، وبسرعة.</Lit>
          <Lit className={body}>أبحث تقنيًا، وأحلّ المشكلات، وأتعلّم باستمرار من كل مشروع أبنيه.</Lit>
          <Reveal><Skills /></Reveal>
        </Chapter>

        <Chapter id="built" n="03" title="ماذا بنيت؟">
          <Reveal>
            <p className="leading-relaxed text-white/70 md:text-lg">
              هذه ليست شركات ناشئة ولا منتجات تجارية. هي تجارب تعلّم، تُظهر كيف أفكر وكيف أنفّذ.
            </p>
          </Reveal>
          {projects.map((p) => (
            <Reveal key={p.url}>
              <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-9">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-bold">{p.name}</h3>
                    <p dir="ltr" className="mt-1 text-start text-sm text-white/50">{p.en}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-primary/30 px-3 py-1 text-xs text-primary">تجربة تعلّم</span>
                </div>
                <p className="mt-5 leading-relaxed text-white/70">{p.desc}</p>
                <ol className="mt-8">
                  {steps.map((st, i) => (
                    <li key={st}>
                      <p className="text-sm font-medium text-primary">{st}</p>
                      <p className="mt-1 leading-relaxed text-white/85">{p.flow[i]}</p>
                      {i < steps.length - 1 && <div aria-hidden className="my-4 text-xl text-primary/50">↓</div>}
                    </li>
                  ))}
                </ol>
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  className="mt-8 inline-block rounded-full border border-primary/40 px-6 py-3 text-glow transition-colors hover:bg-primary/15">
                  جرّب المشروع ←
                </a>
              </article>
            </Reveal>
          ))}
        </Chapter>

        <Chapter id="next" n="04" title="إلى أين أريد الوصول؟">
          <Lit className={body}>أريد اكتساب خبرة عملية قوية في المجال التقني.</Lit>
          <Lit className={body}>والمشاركة في بناء مشاريع حقيقية، مع الاستمرار في تطوير مهاراتي البرمجية والتقنية.</Lit>
          <Lit className="glow-text text-xl font-bold leading-relaxed md:text-3xl">أبحث عن فرصة تدريب أكتسب فيها خبرة عملية حقيقية، وأساهم في مشاريع تقنية ذات قيمة.</Lit>
        </Chapter>

        <Chapter id="contact" n="05" title="لماذا موقع كامل بدل سيرة ذاتية؟">
          <Lit className="text-xl leading-relaxed md:text-3xl">لأن أي شخص يستطيع أن يخبرك بما يعرف.</Lit>
          <Lit className="text-xl leading-relaxed md:text-3xl">لكن المبرمج الحقيقي...</Lit>
          <Lit className="glow-text text-2xl font-bold leading-relaxed md:text-4xl">يبني شيئًا يريك ذلك بنفسك.</Lit>

          <Reveal className="!mt-20 rounded-3xl border border-primary/25 bg-primary/[0.06] p-8 text-center">
            <p dir="ltr" className="text-3xl font-bold">Hazaa Al Majali</p>
            <p dir="ltr" className="mt-2 text-white/70">Amman, Jordan</p>
            <a dir="ltr" href={`tel:+${PHONE_INTL}`} className="mt-1 inline-block text-lg text-glow">{PHONE}</a>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {links.map((l) => (
                <motion.a key={l.label} href={l.href} whileTap={{ scale: 0.97 }}
                  target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  className="rounded-full border border-primary/40 py-3 font-medium text-glow transition-colors hover:bg-primary/15">
                  {l.label}
                </motion.a>
              ))}
            </div>
          </Reveal>
        </Chapter>

        <footer className="pb-16 text-center text-sm text-white/40">لم تقرأ سيرة ذاتية. لقد خضت تجربة.</footer>
      </main>
    </MotionConfig>
  );
}
