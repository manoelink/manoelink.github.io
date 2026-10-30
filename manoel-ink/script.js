/* =========================================================
   CONTEÚDO — edite aqui. Coloque as fotos na pasta img/
   e preencha "photos" com os caminhos (ex.: "img/t01-1.jpg").
   Lista vazia = mostra o placeholder.
   ========================================================= */
const WHATSAPP = "558291471423"; // só números com DDI+DDD, ex.: "5582999999999" — abre o WhatsApp já com a mensagem escrita.
// Link curto do WhatsApp Business (wa.me/message/...). Não aceita texto, então a mensagem é copiada no clique.
const WHATSAPP_LINK = "https://wa.me/message/GXZ2XMQX7ZECF1";
const INSTAGRAM = "manoel.ink";

// post = código do post no Instagram (instagram.com/p/CÓDIGO). Com post, clicar na foto abre o post; sem post, abre a foto ampliada.
// Fotos tiradas do Instagram @manoel.ink (out/2026). Trocar pelos originais em alta quando ele mandar.
const WORKS = [
  { title: "Eevee",              place: "Panturrilha · Fine line",          cat: "geek",      photos: ["img/t14-1.jpg", "img/cicatrizadas/c02.jpg"], featured: true },
  { title: "Blackwork autoral",  place: "Braço · Anime",                    cat: "geek",      photos: ["img/t01-1.jpg", "img/t01-2.jpg"] , post: "DV31Ii9EUGy" },
  { title: "Shenlong",           place: "Antebraço · Anime",                cat: "geek",      photos: ["img/t04-1.jpg"] , post: "DUiZXBIDoiJ" },
  { title: "Dragão",             place: "Antebraço · Blackwork",            cat: "blackwork", photos: ["img/t02-1.jpg"] , post: "DXhLYMLjvkx" },
  { title: "Homenagem",          place: "Braço · Fine line",                cat: "fineline",  photos: ["img/t03-1.jpg", "img/t03-2.jpg"] , post: "DVTr9zVjpz8" },
  { title: "Anjo caído",         place: "Antebraço · Blackwork + vermelho", cat: "blackwork", photos: ["img/t06-1.jpg"] , post: "DXHcC_hkeYZ" },
  { title: "Floral",             place: "Costas · Fine line",               cat: "fineline",  photos: ["img/t07-1.jpg"] , post: "DbBdXBMpjD5" },
  { title: "Kanji",              place: "Antebraço · Lettering",            cat: "fineline",  photos: ["img/t08-1.jpg"] , post: "DaacLWNRIax" },
  { title: "CyberTribal",        place: "Mão · Blackwork",                  cat: "blackwork", photos: ["img/t09-1.jpg"] , post: "DbGezCsJtuM" },
  { title: "Suminagashi",        place: "Antebraço · Blackwork + vermelho", cat: "blackwork", photos: ["img/t10-1.jpg"] , post: "DUrBuS1Ce-n" },
  { title: "Amor",               place: "Antebraço · Lettering",            cat: "fineline",  photos: ["img/t11-1.jpg", "img/t11-2.jpg"] , post: "DUf6nIIkWLi" },
  { title: "Máscara oriental",   place: "Antebraço · Oriental",             cat: "geek",      photos: ["img/t12-1.jpg", "img/t12-2.jpg"] , post: "DUWMxcElLDz" },
  { title: "Homenagem ao BK",    place: "Braço · Retrato",                  cat: "blackwork", photos: ["img/t05-1.jpg"] , post: "DXR4jnFkVd6" },
];

// Do destaque "Cicatrizadas" do Instagram (stories, formato 9:16).
// before: foto do dia da sessão (ex.: "img/cicatrizadas/c02-dia.jpg"). Preenchida = o card vira antes/depois com barra de arrastar.
const HEALED = [
  { name: "Eevee",     place: "Panturrilha",  src: "img/cicatrizadas/c02.jpg", before: "img/cicatrizadas/c02-dia.jpg" },
  { name: "Floral",    place: "Costela",      src: "img/cicatrizadas/c03.jpg", before: "img/cicatrizadas/c03-dia.jpg" },
  { name: "Lucario",   place: "Panturrilha",  src: "img/cicatrizadas/c04.jpg", before: "img/cicatrizadas/c04-dia.jpg" },
  { name: "Kazutora",  place: "Antebraço",    src: "img/cicatrizadas/c06.jpg", before: "img/cicatrizadas/c06-dia.jpg" },
];

// Do destaque "Disponíveis" do Instagram. size/price vazios = não aparece no card.
const FLASHES = [
  { name: "Frieren", from: "Sousou no Frieren", size: "", price: "R$ 250", available: true, img: "img/flashes/frieren.jpg" },
  { name: "Akaza",   from: "Kimetsu no Yaiba",  size: "", price: "",       available: true, img: "img/flashes/akaza.jpg" },
];

/* ========================================================= */

const $ = (s, el = document) => el.querySelector(s);
const CHANNEL = (WHATSAPP || WHATSAPP_LINK) ? "wa" : "ig";
const NEEDS_COPY = !WHATSAPP; // link sem texto pré-preenchido (link curto do WA ou direct do IG)
document.documentElement.classList.add(`ch-${CHANNEL}`);
// WhatsApp aceita texto no link; o direct do Instagram não, então lá a mensagem é copiada no clique.
const waLink = (text) =>
  WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`
  : WHATSAPP_LINK ? WHATSAPP_LINK
  : `https://ig.me/m/${INSTAGRAM}`;
const msgAttr = (text) => `data-msg="${encodeURIComponent(text)}"`;
const media = (src, label) => src
  ? `<img src="${src}" alt="${label}" loading="lazy">`
  : `<div class="ph"><span>${label}</span></div>`;

/* nav mobile */
const burger = $("#burger"), navLinks = $("#navLinks");
burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") { navLinks.classList.remove("open"); burger.setAttribute("aria-expanded", false); }
});

/* trabalhos */
const worksEl = $("#works");
worksEl.innerHTML = WORKS.map((w, i) => `
  <${w.post ? `a href="https://www.instagram.com/p/${w.post}/" target="_blank" rel="noopener" aria-label="${w.title}: ver post no Instagram"` : "button"} class="work reveal${w.featured ? " featured" : ""}${w.post ? " has-post" : ""}" data-cat="${w.cat}" data-i="${i}">
    <div class="work-media">
      ${w.photos.length > 1 ? `<span class="work-count">1/${w.photos.length}</span>` : ""}
      ${w.featured ? `<span class="work-badge">Destaque</span>` : ""}
      ${media(w.photos[0], "Foto")}
    </div>
    <h3>${w.title}</h3>
    <p>${w.place}</p>
  </${w.post ? "a" : "button"}>`).join("");

function updateCount() {
  const n = worksEl.querySelectorAll(".work:not(.hide)").length;
  $("#worksCount").textContent = `Mostrando ${n} trabalho${n === 1 ? "" : "s"} · clique numa foto pra ver o post completo`;
}
updateCount();

$("#filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === btn));
  const f = btn.dataset.filter;
  worksEl.querySelectorAll(".work").forEach((w, i) => {
    const show = f === "all" || w.dataset.cat === f;
    w.classList.toggle("hide", !show);
    w.classList.remove("enter");
    if (show) { void w.offsetWidth; w.style.animationDelay = `${(i % 6) * 40}ms`; w.classList.add("enter"); }
  });
  updateCount();
});

/* lightbox */
const lb = $("#lightbox");
let cur = { work: 0, photo: 0 };
function renderLb() {
  const w = WORKS[cur.work];
  const total = Math.max(w.photos.length, 1);
  $("#lbImg").innerHTML = media(w.photos[cur.photo], `Foto ${cur.photo + 1} do post`);
  $("#lbTitle").textContent = `${w.title} — ${w.place}`;
  $("#lbCount").textContent = `${cur.photo + 1} / ${total}`;
}
function step(d) {
  const w = WORKS[cur.work];
  const next = cur.photo + d;
  if (next >= 0 && next < w.photos.length) { cur.photo = next; }
  else {
    // passa para o próximo/anterior trabalho visível
    const visible = [...worksEl.querySelectorAll(".work:not(.hide)")].map((el) => +el.dataset.i);
    const idx = visible.indexOf(cur.work);
    cur.work = visible[(idx + d + visible.length) % visible.length];
    cur.photo = d > 0 ? 0 : Math.max(WORKS[cur.work].photos.length - 1, 0);
  }
  renderLb();
}
worksEl.addEventListener("click", (e) => {
  const card = e.target.closest(".work");
  if (!card || card.classList.contains("has-post")) return; // com post: o link abre o Instagram
  cur = { work: +card.dataset.i, photo: 0 };
  renderLb();
  lb.hidden = false;
  document.body.style.overflow = "hidden";
  $("#lbClose").focus();
});
function closeLb() { lb.hidden = true; document.body.style.overflow = ""; }
$("#lbClose").onclick = closeLb;
$("#lbPrev").onclick = () => step(-1);
$("#lbNext").onclick = () => step(1);
lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
document.addEventListener("keydown", (e) => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowRight") step(1);
  if (e.key === "ArrowLeft") step(-1);
});

/* cicatrizadas — faixa de stories arrastável */
const strip = $("#healedStrip");
strip.innerHTML = HEALED.map((h, i) => `
  <figure class="story reveal ${h.before ? "has-compare" : ""}" style="transition-delay:${i * 60}ms"${h.before ? ' data-cursor="Arraste"' : ""}>
    <div class="story-bars">${HEALED.map((_, j) => `<i class="${j <= i ? "on" : ""}"></i>`).join("")}</div>
    ${h.before ? `
      <div class="story-compare" style="--pos:50%">
        ${media(h.src, "Cicatrizada")}
        <div class="sc-before">${media(h.before, "No dia da sessão")}</div>
        <span class="sc-tag sc-tag-l">No dia</span><span class="sc-tag sc-tag-r">Cicatrizada</span>
        <div class="sc-handle" aria-hidden="true"></div>
        <input type="range" min="0" max="100" value="50" aria-label="Comparar ${h.name}: no dia e cicatrizada">
      </div>` : media(h.src, "Cicatrizada")}
    <figcaption><b>${h.name}</b><span>${h.place} · ${h.before ? "antes e depois" : "cicatrizada"}</span></figcaption>
  </figure>`).join("");
strip.querySelectorAll(".story-compare").forEach((c) => {
  const r = c.querySelector("input");
  r.addEventListener("input", () => c.style.setProperty("--pos", r.value + "%"));
});
{
  let down = false, startX = 0, startScroll = 0, moved = false;
  strip.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.target.closest(".story-compare")) return;
    down = true; moved = false; startX = e.clientX; startScroll = strip.scrollLeft;
    strip.classList.add("dragging");
  });
  addEventListener("pointermove", (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 3) moved = true;
    strip.scrollLeft = startScroll - dx;
  });
  addEventListener("pointerup", () => { down = false; strip.classList.remove("dragging"); });
  strip.addEventListener("click", (e) => { if (moved) e.preventDefault(); }, true);
  const bar = $("#healedBar");
  const upd = () => {
    const max = strip.scrollWidth - strip.clientWidth;
    bar.style.transform = `scaleX(${max > 0 ? 0.15 + 0.85 * (strip.scrollLeft / max) : 1})`;
  };
  strip.addEventListener("scroll", upd, { passive: true });
  addEventListener("resize", upd);
  upd();
}

/* flashes */
$("#flashGrid").innerHTML = FLASHES.map((f, i) => {
  const n = String(i + 1).padStart(2, "0");
  const msg = `Oi, Manoel! Vi no site e quero reservar o flash ${f.name}${f.from ? ` (${f.from})` : ""}.`;
  const details = [f.size, f.price || "Valor sob consulta"].filter(Boolean).join(" · ");
  return `
  <article class="flash reveal ${f.available ? "" : "reserved"}" style="transition-delay:${i * 70}ms">
    <div class="flash-art">
      <span class="flash-no">Nº ${n}</span>
      ${media(f.img, `Desenho · flash ${n}`)}
    </div>
    <div class="flash-meta">
      <div><h3>${f.name}</h3>${f.from ? `<em>${f.from}</em>` : ""}</div>
      <span class="badge ${f.available ? "" : "off"}">${f.available ? "Disponível" : "Reservado"}</span>
    </div>
    <small>${details}</small>
    ${f.available
      ? `<a class="btn btn-red" href="${waLink(msg)}" ${msgAttr(msg)} target="_blank" rel="noopener">Quero esse</a>`
      : `<span class="btn">Já tem dono</span>`}
  </article>`;
}).join("");
$("#flashGrid").insertAdjacentHTML("beforeend", `
  <a class="flash flash-cta reveal" href="#agendar" style="transition-delay:${FLASHES.length * 70}ms" data-cursor="Bora">
    <span class="flash-no">Nº ${String(FLASHES.length + 1).padStart(2, "0")}</span>
    <p>Nenhum te pegou?</p>
    <strong>O próximo desenho pode ser o seu.</strong>
    <span class="flash-cta-go">Pedir um exclusivo <b>→</b></span>
  </a>`);

/* formulário de orçamento */
const fIdea = $("#fIdea"), fPlace = $("#fPlace"), fSize = $("#fSize"), fFile = $("#fFile");
function buildMsg() {
  const idea = fIdea.value.trim() || "[sua ideia aqui]";
  let msg = `Oi, Manoel! Quero fazer uma tattoo.\nIdeia: ${idea}\nLocal: ${fPlace.value}\nTamanho: ${fSize.value}`;
  if (fFile.files[0]) msg += `\n(Vou mandar a foto de referência aqui no chat)`;
  $("#msgPreview").textContent = msg;
  $("#waBtn").href = waLink(msg);
  $("#waBtn").dataset.msg = encodeURIComponent(msg);
}
[fIdea, fPlace, fSize].forEach((el) => el.addEventListener("input", buildMsg));
fFile.addEventListener("change", () => {
  const f = fFile.files[0];
  $("#uploadText").innerHTML = f
    ? `<b>✓ ${f.name}</b> · anexe essa foto na conversa depois de enviar a mensagem`
    : `<b>UPLOAD</b> · foto de referência (opcional)`;
  buildMsg();
});
buildMsg();
$("#waFooter").href = waLink("Oi, Manoel!");
if (CHANNEL === "wa" && !NEEDS_COPY) {
  $("#waNote").innerHTML = `A mensagem <b>já abre escrita</b> no WhatsApp do Manoel, é só enviar. Prefere o Instagram? <a href="https://ig.me/m/${INSTAGRAM}" target="_blank" rel="noopener">Chama no direct</a>`;
}
{
  const hi = "Oi, Manoel! Vim pelo site e quero fazer uma tattoo.";
  $("#waFloat").href = waLink(hi);
  $("#waFloat").dataset.msg = encodeURIComponent(hi);
}

/* direct do Instagram: copia a mensagem antes de abrir */
function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
  legacyCopy(text);
  return Promise.resolve();
}
function legacyCopy(text) {
  const t = document.createElement("textarea");
  t.value = text; t.setAttribute("readonly", ""); t.style.cssText = "position:fixed;opacity:0;top:0";
  document.body.append(t); t.select();
  try { document.execCommand("copy"); } catch {}
  t.remove();
}
let toastTimer;
function toast(html) {
  const el = $("#toast");
  el.innerHTML = html; el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 4500);
}
document.addEventListener("click", (e) => {
  if (!NEEDS_COPY) return;
  const a = e.target.closest("[data-msg]");
  if (!a) return;
  copyText(decodeURIComponent(a.dataset.msg));
  toast(CHANNEL === "wa"
    ? `<b>Mensagem copiada!</b> Quando abrir a conversa com o Manoel no WhatsApp, é só colar e enviar.`
    : `<b>Mensagem copiada!</b> No direct do @${INSTAGRAM}, é só colar e enviar.`);
});

/* reveal on scroll */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* =========================================================
   CAMADA CRIATIVA
   ========================================================= */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

/* preloader — a palavra vai sendo "tatuada" */
(() => {
  const loader = $("#loader");
  if (reduce || sessionStorageGet("seenLoader")) { loader.remove(); return; }
  document.body.classList.add("loading");
  let n = 0;
  const tick = setInterval(() => {
    n = Math.min(100, n + Math.ceil(Math.random() * 9));
    $("#loaderNum").textContent = n;
    $("#loaderFill").style.clipPath = `inset(0 ${100 - n}% 0 0)`;
    if (n >= 100) {
      clearInterval(tick);
      setTimeout(() => { loader.classList.add("done"); document.body.classList.remove("loading"); }, 250);
      setTimeout(() => loader.remove(), 1300);
      sessionStorageSet("seenLoader", "1");
    }
  }, 45);
})();
function sessionStorageGet(k) { try { return sessionStorage.getItem(k); } catch { return null; } }
function sessionStorageSet(k, v) { try { sessionStorage.setItem(k, v); } catch {} }

/* blur reveal palavra por palavra */
document.querySelectorAll("[data-blur]").forEach((el) => {
  const walk = (node) => {
    [...node.childNodes].forEach((c) => {
      if (c.nodeType === 3) {
        const frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(part); return; }
          const s = document.createElement("span"); s.className = "w"; s.textContent = part; frag.append(s);
        });
        c.replaceWith(frag);
      } else if (c.nodeType === 1) walk(c);
    });
  };
  walk(el);
  el.querySelectorAll(".w").forEach((w, i) => (w.style.transitionDelay = `${i * 25}ms`));
  io.observe(el);
});

/* cursor customizado */
if (finePointer && !reduce) {
  document.body.classList.add("has-cursor");
  const c = $("#cursor"), dot = $("#cursorDot"), label = $("#cursorLabel");
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
  addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; dot.style.transform = `translate(${x}px,${y}px)`; });
  (function loop() { cx += (x - cx) * 0.18; cy += (y - cy) * 0.18; c.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
  document.querySelectorAll(".work").forEach((el) => (el.dataset.cursor = el.classList.contains("has-post") ? "Ver no Insta" : "Ampliar"));
  document.querySelectorAll(".flash:not(.reserved)").forEach((el) => (el.dataset.cursor = "Quero"));
  document.addEventListener("mouseover", (e) => {
    const lab = e.target.closest("[data-cursor]");
    const hov = e.target.closest("a, button, summary, select, textarea, label");
    c.classList.toggle("label", !!lab);
    c.classList.toggle("hover", !lab && !!hov);
    label.textContent = lab ? lab.dataset.cursor : "";
  });
}

/* respingo de tinta no clique */
if (!reduce) {
  addEventListener("pointerdown", (e) => {
    if (e.target.closest("input, textarea, select, canvas")) return;
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 100 100"); s.classList.add("ink");
    const r = () => 30 + Math.random() * 14;
    let d = "";
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2, rr = i % 2 ? r() * .55 : r();
      d += `${i ? "L" : "M"}${50 + Math.cos(a) * rr},${50 + Math.sin(a) * rr}`;
    }
    s.innerHTML = `<path d="${d}Z" fill="${Math.random() > .5 ? "#d4211c" : "#121212"}"/>
      <circle cx="${50 + (Math.random() - .5) * 90}" cy="${50 + (Math.random() - .5) * 90}" r="4" fill="#d4211c"/>
      <circle cx="${50 + (Math.random() - .5) * 90}" cy="${50 + (Math.random() - .5) * 90}" r="2.5" fill="#121212"/>`;
    s.style.left = e.clientX + "px"; s.style.top = e.clientY + "px";
    document.body.append(s);
    setTimeout(() => s.remove(), 750);
  });
}

/* botões magnéticos */
if (finePointer && !reduce) {
  document.querySelectorAll("[data-magnetic], .nav-cta, #waBtn").forEach((b) => {
    b.addEventListener("mousemove", (e) => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px, ${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
    });
    b.addEventListener("mouseleave", () => (b.style.transform = ""));
  });
}

/* parallax do hero com o mouse */
if (finePointer && !reduce && $("#heroVisual")) {
  const hv = $("#heroVisual");
  addEventListener("mousemove", (e) => {
    const dx = e.clientX - innerWidth / 2, dy = e.clientY - innerHeight / 2;
    hv.querySelectorAll("[data-depth]").forEach((el) => {
      const d = +el.dataset.depth;
      el.style.translate = `${dx * d}px ${dy * d}px`;
    });
    const photo = hv.querySelector(".hero-photo");
    if (photo) photo.style.translate = `${dx * 0.02}px ${dy * 0.02}px`;
  });
}

/* spotlight nas fotos dos trabalhos */
worksEl.addEventListener("mousemove", (e) => {
  const m = e.target.closest(".work-media");
  if (!m) return;
  const r = m.getBoundingClientRect();
  m.style.setProperty("--mx", `${e.clientX - r.left}px`);
  m.style.setProperty("--my", `${e.clientY - r.top}px`);
});

/* tilt card nos flashes */
if (finePointer && !reduce) {
  document.querySelectorAll(".flash").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.style.transition = "transform .1s linear, box-shadow .35s";
      card.style.transform = `rotateX(${(0.5 - py) * 14}deg) rotateY(${(px - 0.5) * 16}deg) translateZ(0)`;
      card.style.setProperty("--gx", `${px * 100}%`);
      card.style.setProperty("--gy", `${py * 100}%`);
    });
    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform .6s var(--ease), box-shadow .35s";
      card.style.transform = "";
    });
  });
}

/* marquee entorta com a velocidade do scroll */
if (!reduce) {
  const mq = document.querySelector(".marquee");
  let lastY = scrollY, timer;
  addEventListener("scroll", () => {
    const v = Math.max(-2.5, Math.min(2.5, (scrollY - lastY) * 0.08));
    lastY = scrollY;
    mq.style.setProperty("--skew", `${-v}deg`);
    clearTimeout(timer);
    timer = setTimeout(() => mq.style.setProperty("--skew", "0deg"), 120);
  }, { passive: true });
}

/* contadores */
const countIO = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    countIO.unobserve(en.target);
    const el = en.target, end = +el.dataset.count, t0 = performance.now();
    if (el.dataset.suffix) el.setAttribute("data-suffix", el.dataset.suffix);
    const step = (t) => {
      const p = Math.min(1, (t - t0) / 1400);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}, { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach((el) => countIO.observe(el));

/* letras do rodapé */
(() => {
  const logo = $("#footerLogo");
  logo.innerHTML = [..."MANOEL.INK"].map((ch) => `<span class="ch"${ch === "." ? ' style="color:var(--red)"' : ""}>${ch}</span>`).join("");
})();

/* WhatsApp flutuante aparece depois do hero */
{
  const wa = $("#waFloat"), bar = $("#ctaBar");
  const hero = document.querySelector(".xhero"), form = $("#agendar"), foot = document.querySelector(".footer");
  // aparece depois do hero; a barra some quando o formulário ou o rodapé estão na tela
  const sync = () => {
    const vh = innerHeight;
    const pastHero = hero.getBoundingClientRect().bottom < vh * 0.35;
    const onScreen = (el) => { const r = el.getBoundingClientRect(); return r.top < vh * 0.85 && r.bottom > vh * 0.15; };
    const atForm = onScreen(form) || onScreen(foot);
    wa.classList.toggle("show", pastHero);
    bar.classList.toggle("show", pastHero && !atForm);
  };
  addEventListener("scroll", sync, { passive: true });
  addEventListener("resize", sync);
  sync();
  $("#ctaBarIg").dataset.msg = encodeURIComponent("Oi, Manoel! Vim pelo site e quero fazer uma tattoo.");
  if (CHANNEL === "wa") $("#ctaBarIg").href = waLink("Oi, Manoel! Vim pelo site e quero fazer uma tattoo.");
}

/* hero: bola preta grande ao fundo (cortada pelas bordas, como no wireframe)
   e a foto redonda centralizada na parte visível dela */
{
  const hv = $("#heroVisual"), orb = hv && hv.querySelector(".orb"), arc = hv && hv.querySelector(".arc");
  const place = () => {
    const img = hv && hv.querySelector("img.hero-photo");
    if (!img) return;
    const W = hv.offsetWidth, H = hv.offsetHeight;
    const D = orb.offsetWidth, L = orb.offsetLeft, T = orb.offsetTop;
    const x0 = Math.max(L, 0), y0 = Math.max(T, 0);
    const x1 = Math.min(L + D, W), y1 = Math.min(T + D, H);
    const vw = x1 - x0, vh = y1 - y0;
    const mobile = innerWidth <= 860, V = innerWidth;
    // celular: posição fixa da foto (proporcional à tela), dentro da bola gigante do canto
    const P = mobile ? V * 0.44 : Math.min(vw, vh) * 0.82;            // diâmetro da foto
    const cx = mobile ? V * 0.77 - hv.offsetLeft : x0 + vw / 2 + vw * 0.02;
    const cy = mobile ? V * 0.36 : y0 + vh / 2;
    Object.assign(img.style, { left: (cx - P / 2) + "px", top: (cy - P / 2) + "px", width: P + "px", height: P + "px", margin: "0", right: "auto", bottom: "auto" });
    const A = P * 1.1;                      // arco vermelho em volta da foto
    Object.assign(arc.style, { left: (cx - A / 2) + "px", top: (cy - A / 2) + "px", width: A + "px", height: A + "px" });
    // celular: o texto de baixo só começa depois que a bola preta termina
    const title = document.querySelector(".hero-title"), sub = document.querySelector(".hero-sub");
    title.style.marginBottom = "";
    if (mobile && sub) {
      // ponto mais baixo da bola que aparece na tela (na borda direita, já que o centro fica fora)
      // medidas sem transform (a bola tem animação de entrada em scale)
      const hb = hv.getBoundingClientRect(), R = orb.offsetWidth / 2;
      const ocx = hb.left + orb.offsetLeft + R, ocy = hb.top + orb.offsetTop + R;
      const dx = Math.max(0, ocx - V);
      const orbBottom = dx < R ? ocy + Math.sqrt(R * R - dx * dx) : ocy + R;
      const gap = orbBottom + 14 - sub.getBoundingClientRect().top;
      if (gap > 0) title.style.marginBottom = (20 + gap) + "px";
    }
  };
  place();
  addEventListener("resize", place);
  addEventListener("load", place);
}

/* =========================================================
   REFERÊNCIAS (out/2026): cor por seção, fonte variável, raspa aí
   ========================================================= */

/* cor por seção: a nova cor sobe como uma cortina atrás do conteúdo */
{
  const THEMES = { paper: "#efeef1", ink: "#121212", red: "#d4211c" };
  const base = $("#bgBase"), wipe = $("#bgWipe");
  let current = "paper", lastY = scrollY, busy = null;
  const setTheme = (t) => {
    if (t === current) return;
    const down = scrollY >= lastY;
    current = t;
    document.body.dataset.theme = t;
    clearTimeout(busy);
    wipe.className = "bg-wipe" + (down ? "" : " from-top");
    wipe.style.background = THEMES[t];
    void wipe.offsetWidth;
    wipe.classList.add("go");
    busy = setTimeout(() => { base.style.background = THEMES[t]; wipe.className = "bg-wipe"; }, reduce ? 0 : 820);
  };
  addEventListener("scroll", () => { requestAnimationFrame(() => (lastY = scrollY)); }, { passive: true });
  const themeIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) setTheme(en.target.dataset.theme); });
  }, { rootMargin: "-50% 0px -50% 0px" });
  document.querySelectorAll("[data-theme]").forEach((el) => themeIO.observe(el));
}

/* títulos: a fonte vai de fina e estreita a pesada conforme entra na tela */
if (!reduce) {
  const titles = [...document.querySelectorAll(".title")];
  let ticking = false;
  const morph = () => {
    ticking = false;
    const vh = innerHeight;
    titles.forEach((t) => {
      const r = t.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const p = Math.min(1, Math.max(0, (vh * 0.95 - r.top) / (vh * 0.5)));
      const e = 1 - Math.pow(1 - p, 3);
      t.style.setProperty("--wdth", (50 + e * 12).toFixed(1));
      t.style.setProperty("--wght", (120 + e * 760).toFixed(0));
    });
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(morph); } }, { passive: true });
  addEventListener("resize", morph);
  morph();
}

/* raspa aí: raspar a "pele" e descobrir a tatuagem */
{
  const sec = $("#raspa"), card = $("#scratchCard"), img = $("#scratchImg"), cv = $("#scratchCanvas"), cap = $("#scratchCap");
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  const picks = ["Suminagashi", "Blackwork autoral", "Shenlong", "Anjo caído", "Máscara oriental"]
    .map((n) => WORKS.find((w) => w.title === n)).filter(Boolean);
  let idx = 0, down = false, last = null, moves = 0;

  function paintSkin() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = card.clientWidth, h = card.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#d7a98a"); g.addColorStop(.55, "#c48f6e"); g.addColorStop(1, "#a9785a");
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    // poros e textura de pele
    for (let i = 0; i < w * h / 90; i++) {
      ctx.fillStyle = `rgba(${Math.random() > .5 ? "90,50,30" : "255,230,210"},${Math.random() * .12})`;
      ctx.fillRect(Math.random() * w, Math.random() * h, 1.4, 1.4);
    }
    const s = ctx.createRadialGradient(w * .3, h * .25, 10, w * .5, h * .5, w);
    s.addColorStop(0, "rgba(255,240,225,.28)"); s.addColorStop(1, "rgba(60,30,15,.35)");
    ctx.fillStyle = s; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgba(60,30,15,.35)";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.font = `900 ${Math.round(w * .13)}px Anybody, Anton, sans-serif`;
    ctx.fillText("RASPA AQUI", w / 2, h / 2);
    ctx.font = `500 ${Math.round(w * .03)}px "JetBrains Mono", monospace`;
    ctx.fillText("↓ PASSA O DEDO ↓", w / 2, h / 2 + w * .11);
  }
  function load(i) {
    const w = picks[i % picks.length];
    sec.classList.remove("revealed");
    cap.textContent = "";
    img.src = w.photos[0];
    img.alt = `${w.title}: ${w.place}`;
    moves = 0;
    paintSkin();
  }
  const pos = (e) => { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  function scratch(p) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.lineWidth = Math.max(38, card.clientWidth * .11);
    ctx.beginPath();
    ctx.moveTo((last || p).x, (last || p).y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last = p;
    if (++moves % 10 === 0) check();
  }
  function check() {
    const { data } = ctx.getImageData(0, 0, cv.width, cv.height);
    let clear = 0, n = 0;
    for (let i = 3; i < data.length; i += 4 * 37) { n++; if (data[i] < 40) clear++; }
    if (clear / n > .42) reveal();
  }
  function reveal() {
    if (sec.classList.contains("revealed")) return;
    sec.classList.add("revealed");
    const w = picks[idx % picks.length];
    cap.textContent = `${w.title} · ${w.place}`;
  }
  cv.addEventListener("pointerdown", (e) => { down = true; last = null; cv.setPointerCapture(e.pointerId); scratch(pos(e)); });
  cv.addEventListener("pointermove", (e) => { if (down) scratch(pos(e)); });
  ["pointerup", "pointercancel"].forEach((t) => cv.addEventListener(t, () => { down = false; last = null; check(); }));
  $("#scratchNext").addEventListener("click", () => load(++idx));
  addEventListener("resize", () => { if (!sec.classList.contains("revealed")) paintSkin(); });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => load(idx));
}

/* =========================================================
   HERO NOVO: nome que abre no scroll
   ========================================================= */
{
  const hero = $("#xhero");
  if (!reduce) {
    // ao rolar, JUAN vai pra esquerda, MANOEL pra direita e o rosto cresce
    const l1 = $("#heroL1"), l2 = $("#heroL2"), face = $("#heroFace");
    const move = () => {
      const p = Math.min(1, Math.max(0, scrollY / (hero.offsetHeight * .9)));
      l1.style.transform = `translateX(${-p * 22}vw)`;
      l2.style.transform = `translateX(${p * 22}vw)`;
      face.style.transform = `translate(0, -50%) scale(${1 + p * .35}) rotate(${p * 8}deg)`;
    };
    addEventListener("scroll", () => requestAnimationFrame(move), { passive: true });
  }
}

/* =========================================================
   DESTAQUES: foto que encolhe + cards empilhando
   ========================================================= */
{
  const sec = $("#destaques"), sticky = sec.querySelector(".sc-sticky"), slot = $("#scSlot"), stack = $("#scStack");
  const side = $("#scSide"), cName = $("#scName"), cPlace = $("#scPlace"), cCount = $("#scCount"), cIg = $("#scIg");
  const picks = ["Blackwork autoral", "Suminagashi", "Anjo caído", "Shenlong", "Homenagem ao BK", "Eevee"]
    .map((t) => WORKS.find((w) => w.title === t)).filter(Boolean);
  const items = [{ title: "No studio", place: "Petrópolis · Maceió/AL", photos: ["img/manoel-sobre.jpg"] }, ...picks];
  const N = picks.length, STEPS = N + 1.6;
  sec.style.setProperty("--steps", STEPS);

  stack.innerHTML =
    `<div class="sc-intro" id="scIntro"><img src="img/manoel-sobre.jpg" alt="Juan Manoel tatuando no studio"><span class="sc-intro-label">NO STUDIO</span></div>` +
    picks.map((w, i) => `<a class="sc-card" ${w.post ? `href="https://www.instagram.com/p/${w.post}/" target="_blank" rel="noopener"` : `href="#trabalhos"`} data-k="${i + 1}" aria-label="${w.title}: ${w.place}">
      <img src="${w.photos[0]}" alt="${w.title}: ${w.place}" loading="lazy"></a>`).join("");
  const intro = $("#scIntro"), cards = [...stack.querySelectorAll(".sc-card")];
  const label = intro.querySelector(".sc-intro-label");
  let box = null, active = -1;

  const measure = () => {
    const s = sticky.getBoundingClientRect(), r = slot.getBoundingClientRect();
    box = { L: r.left - s.left, T: r.top - s.top, W: r.width, H: r.height, VW: s.width, VH: s.height };
    cards.forEach((c) => Object.assign(c.style, { left: box.L + "px", top: box.T + "px", width: box.W + "px", height: box.H + "px" }));
  };
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const setActive = (k) => {
    if (k === active) return;
    active = k;
    const w = items[k];
    cName.textContent = w.title;
    cPlace.textContent = w.place;
    cCount.textContent = `${String(k + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;
    if (w.post) { cIg.href = `https://www.instagram.com/p/${w.post}/`; cIg.hidden = false; } else cIg.hidden = true;
  };
  const frame = () => {
    if (!box) measure();
    const r = sec.getBoundingClientRect();
    const p = clamp(-r.top / (r.height - innerHeight));
    const seg = p * STEPS;
    // 1) a foto cheia encolhe até virar o card da esquerda
    const e = ease(clamp(seg));
    const t = box.T * e, l = box.L * e, rr = (box.VW - box.L - box.W) * e, b = (box.VH - box.T - box.H) * e;
    intro.style.clipPath = `inset(${t}px ${rr}px ${b}px ${l}px round ${18 * e}px)`;
    label.style.opacity = 1 - clamp(seg * 2.2);
    side.style.opacity = clamp(seg * 1.6 - .4);
    // 2) os cards sobem e empilham por cima
    let top = 0;
    cards.forEach((c, i) => {
      const q = ease(clamp(seg - (i + 1)));             // 0 → 1 enquanto o card sobe
      const depth = Math.max(0, seg - (i + 2));          // quanto já foi coberto pelos próximos
      const sc = 1 - Math.min(depth, 3) * .045;
      c.style.transform = `translateY(${(1 - q) * (box.VH - box.T + 40)}px) scale(${sc})`;
      c.style.setProperty("--dim", Math.min(depth, 3) * .18);
      if (q > .55) top = i + 1;
    });
    setActive(top);
  };
  addEventListener("scroll", () => requestAnimationFrame(frame), { passive: true });
  addEventListener("resize", () => { measure(); frame(); });
  addEventListener("load", () => { measure(); frame(); });
  measure(); frame();
}

/* =========================================================
   SCROLL SUAVE (Lenis) — só no computador
   ========================================================= */
let lenis = null;
if (window.Lenis && finePointer && !reduce) {
  lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  // links internos (#agendar, #flashes…) também deslizam
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute("href").length < 2) return;
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -72 });
  });
  // a foto ampliada trava a rolagem enquanto está aberta
  new MutationObserver(() => (lb.hidden ? lenis.start() : lenis.stop())).observe(lb, { attributes: true, attributeFilter: ["hidden"] });
}

/* =========================================================
   FLASHES: carrossel travado
   ========================================================= */
{
  const sec = $("#flashes"), track = $("#flashGrid"), bar = $("#fxBar");
  let travel = 0;
  const measure = () => {
    travel = Math.max(0, track.scrollWidth - innerWidth);
    sec.style.setProperty("--fx-h", `calc(100svh + ${travel}px)`);
  };
  const frame = () => {
    const r = sec.getBoundingClientRect();
    const span = r.height - innerHeight;
    const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
    track.style.transform = `translateX(${-p * travel}px)`;
    bar.style.transform = `scaleX(${p})`;
  };
  if (!reduce) {
    measure(); frame();
    addEventListener("scroll", () => requestAnimationFrame(frame), { passive: true });
    addEventListener("resize", () => { measure(); frame(); });
    addEventListener("load", () => { measure(); frame(); });
  }
}

/* =========================================================
   MANIFESTO: as palavras acendem conforme rola
   ========================================================= */
{
  const sec = $("#manifesto"), txt = $("#mfText");
  const wrap = (node) => {
    [...node.childNodes].forEach((c) => {
      if (c.nodeType === 3) {
        const frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(part); return; }
          const s = document.createElement("span"); s.className = "mf-w"; s.textContent = part; frag.append(s);
        });
        c.replaceWith(frag);
      } else if (c.nodeType === 1) wrap(c);
    });
  };
  wrap(txt);
  const words = [...txt.querySelectorAll(".mf-w")];
  const frame = () => {
    const r = sec.getBoundingClientRect();
    const span = r.height - innerHeight * .6;
    const p = Math.min(1, Math.max(0, (innerHeight * .4 - r.top) / span));
    const lit = Math.round(p * words.length * 1.15);
    words.forEach((w, i) => w.classList.toggle("on", i < lit));
  };
  if (reduce) words.forEach((w) => w.classList.add("on"));
  else { addEventListener("scroll", () => requestAnimationFrame(frame), { passive: true }); frame(); }
}
