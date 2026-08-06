"use client";

import { useEffect, useState } from "react";

const flavors = [
  { name: "Pistache", note: "cremoso & marcante", tone: "pistachio" },
  { name: "Cheesecake de goiabada", note: "autoral Tayti", tone: "guava" },
  { name: "Tiramisù brasileiro", note: "café & afeto", tone: "coffee" },
  { name: "Chocolate belga", note: "intenso & aveludado", tone: "chocolate" },
  { name: "Fior di latte", note: "puro & delicado", tone: "milk" },
  { name: "Manga com maracujá", note: "vegano & tropical", tone: "mango" },
];

const stores = [
  {
    name: "Moema",
    type: "Matriz",
    address: "Alameda dos Jurupis, 843 — Moema, São Paulo",
    whatsapp: "https://wa.me/5511977571111",
    rappi:
      "https://www.rappi.com.br/restaurantes/900143461-tayti-gelateria-e-cafe",
    ifood:
      "https://www.ifood.com.br/delivery/sao-paulo-sp/tayti-gelateria--cafe-indianopolis/95603f21-5c4a-4a9f-8fca-782f48cfbe41?utm_medium=share",
    maps:
      "https://www.google.com/maps/search/?api=1&query=Alameda%20dos%20Jurupis%20843%20Moema%20S%C3%A3o%20Paulo",
  },
  {
    name: "Klabin / Ipiranga",
    type: "Loja & fábrica",
    address: "Rua Mariz e Barros, 365 — Chácara Klabin, São Paulo",
    whatsapp: "https://wa.me/5511945931192",
    rappi:
      "https://www.rappi.com.br/restaurantes/900655556-tayti-gelateria-e-cafe",
    ifood:
      "https://www.ifood.com.br/delivery/sao-paulo-sp/tayti-gelateria--cafejardim-da-gloria/3e7ef894-7ad3-45d7-b56b-16177a476eca?utm_medium=share",
    maps:
      "https://www.google.com/maps/search/?api=1&query=Rua%20Mariz%20e%20Barros%20365%20Ch%C3%A1cara%20Klabin%20S%C3%A3o%20Paulo",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const parallaxNodes = document.querySelectorAll<HTMLElement>("[data-parallax]");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );

    nodes.forEach((node) => observer.observe(node));

    let frame = 0;
    const updateParallax = () => {
      const mobileBoost = window.innerWidth <= 760 ? 1.65 : 1;
      parallaxNodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const speed = Number(node.dataset.parallax ?? 0.05);
        const distance = window.innerHeight / 2 - (rect.top + rect.height / 2);
        const movement = Math.max(-72, Math.min(72, distance * speed * mobileBoost));
        node.style.setProperty("--parallax-y", `${movement}px`);
      });
      frame = 0;
    };
    const requestParallax = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    if (!prefersReducedMotion) {
      updateParallax();
      window.addEventListener("scroll", requestParallax, { passive: true });
      window.addEventListener("resize", requestParallax);
    }

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestParallax);
      window.removeEventListener("resize", requestParallax);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <div className="top-note">
        <span>Gelato artesanal feito diariamente em São Paulo</span>
        <span className="top-note__locations">Moema · Klabin / Ipiranga</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Tayti Gelateria — início">
          <img src="/images/logo-tayti-card.png" alt="Tayti Gelateria e Café" />
        </a>
        <nav className={menuOpen ? "nav is-open" : "nav"} aria-label="Navegação principal">
          <a href="#sabores" onClick={closeMenu}>Sabores</a>
          <a href="#chef" onClick={closeMenu}>A chef</a>
          <a href="#experiencia" onClick={closeMenu}>Experiência</a>
          <a href="#lojas" onClick={closeMenu}>Lojas</a>
        </nav>
        <a className="header-order" href="#lojas">Pedir agora <Arrow /></a>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">Gelateria de chef · desde 2020</p>
          <h1>
            O tempo é o
            <em>ingrediente secreto.</em>
          </h1>
          <p className="hero__lead">
            Gelatos autorais produzidos em pequenas quantidades, com ingredientes
            escolhidos a dedo e o cuidado de quem conhece cada receita por inteiro.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#sabores">Descobrir sabores <Arrow /></a>
            <a className="text-link" href="#lojas">Encontrar uma Tayti</a>
          </div>
          <div className="hero__signature">
            <span className="signature-mark" aria-hidden="true">
              <img src="/images/chef-elisabeth.jpg" alt="" />
            </span>
            <p><strong>Por Chef Elisabeth Tayti</strong><br />Mestre gelatier & especialista em confeitaria</p>
          </div>
        </div>

        <div className="hero__visual" aria-label="Gelatos Tayti servidos em casquinhas">
          <div className="hero__photo-wrap" data-parallax="0.06">
            <img src="/images/gelato-detail-01.jpg" alt="Três gelatos Tayti servidos em casquinhas" />
          </div>
          <div className="hero__seal" aria-hidden="true">
            <span>feito</span>
            <strong>aqui</strong>
            <span>todo dia</span>
          </div>
          <p className="hero__caption">Texturas que só o feito à mão consegue criar.</p>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          <span>Receitas autorais</span><i>✦</i><span>Ingredientes selecionados</span><i>✦</i>
          <span>Produção artesanal</span><i>✦</i><span>Receitas autorais</span><i>✦</i>
          <span>Ingredientes selecionados</span><i>✦</i><span>Produção artesanal</span><i>✦</i>
        </div>
      </div>

      <section className="manifesto section-shell" id="sabores">
        <span className="manifesto__orb" data-parallax="0.14" aria-hidden="true" />
        <div className="manifesto__heading" data-reveal>
          <p className="eyebrow">Nosso jeito de fazer</p>
          <h2>Menos pressa.<br />Mais sabor.</h2>
        </div>
        <div className="manifesto__body" data-reveal>
          <p className="manifesto__intro">
            Cada receita nasce do conhecimento da Chef Elisabeth e é preparada
            artesanalmente na própria Tayti. Do primeiro ingrediente à última
            espatulada, tudo acontece por aqui.
          </p>
          <div className="values">
            <div><strong>01</strong><span>Produção diária</span><p>Pequenas quantidades para preservar frescor e textura.</p></div>
            <div><strong>02</strong><span>Receita de chef</span><p>Clássicos e criações autorais desenvolvidos pela Elisabeth.</p></div>
            <div><strong>03</strong><span>Ingredientes reais</span><p>Insumos de alta qualidade, escolhidos pelo que entregam de sabor.</p></div>
          </div>
        </div>
      </section>

      <section className="texture-panel" data-reveal>
        <img data-parallax="0.075" src="/images/gelatos.jpg" alt="Texturas de diferentes sabores de gelato Tayti" />
      </section>

      <section className="flavors section-shell">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Clássicos & autorais</p>
            <h2>Sabores com<br />assinatura.</h2>
          </div>
          <p>
            A vitrine muda ao longo do ano. Alguns sabores voltam como uma boa
            lembrança; outros chegam para surpreender.
          </p>
        </div>
        <div className="flavor-grid">
          {flavors.map((flavor, index) => (
            <article className={`flavor-card flavor-card--${flavor.tone}`} data-reveal key={flavor.name}>
              <span className="flavor-card__number">0{index + 1}</span>
              <div className="flavor-card__scoop" aria-hidden="true" />
              <h3>{flavor.name}</h3>
              <p>{flavor.note}</p>
            </article>
          ))}
        </div>
        <p className="availability">Consulte os sabores disponíveis do dia em cada unidade.</p>
      </section>

      <section className="chef-window" id="chef">
        <div className="chef-window__stage">
          <img src="/images/chef-elisabeth.jpg" alt="Chef Elisabeth Tayti em sua cozinha" />
        </div>
        <div className="chef-window__content section-shell">
          <div className="chef-window__copy" data-reveal>
            <p className="eyebrow">A criadora por trás de cada receita</p>
            <h2>Ciência, técnica e sensibilidade.</h2>
            <p className="chef-window__lead">
              Mestre gelatier, especialista em confeitaria e panificação, formada
              em Gastronomia, Química Industrial e Segurança de Alimentos.
            </p>
            <p>
              Elisabeth transforma conhecimento em gelatos de sabor preciso e
              atendimento próximo — uma combinação que faz a Tayti ser, ao mesmo
              tempo, autoral e acolhedora.
            </p>
            <div className="chef-window__quote">“O melhor ingrediente é aquele que você consegue sentir de verdade.”</div>
          </div>
          <div className="chef-window__identity" data-reveal>
            <span>Chef & fundadora</span>
            <strong>Elisabeth Tayti</strong>
          </div>
        </div>
      </section>

      <section className="experience section-shell" id="experiencia">
        <div className="section-heading" data-reveal>
          <div><p className="eyebrow">Muito além da casquinha</p><h2>Uma pausa à moda Tayti.</h2></div>
          <p>Gelato, café, confeitaria e encontros — feitos para serem aproveitados sem pressa.</p>
        </div>
        <div className="experience-grid">
          <article className="experience-card experience-card--large" data-reveal>
            <img src="/images/carrossel-05.jpg" alt="Gelatos Tayti em casquinhas e copinhos" />
            <div><span>Gelatos</span><p>Da vitrine para o seu momento.</p></div>
          </article>
          <article className="experience-card" data-reveal>
            <img src="/images/carrossel-03.jpg" alt="Café Illy acompanhado de gelato" />
            <div><span>Café & confeitaria</span><p>Combinações feitas na casa.</p></div>
          </article>
          <article className="experience-card experience-card--coral" data-reveal>
            <p className="eyebrow">Celebre com a Tayti</p>
            <h3>Gelato que vai até o seu evento.</h3>
            <p>Carrettino refrigerado, vitrine e formatos para encontros de diferentes tamanhos.</p>
            <a href="https://wa.me/5511977571111?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20eventos%20com%20a%20Tayti." target="_blank" rel="noreferrer">Pedir orçamento <Arrow /></a>
          </article>
        </div>
      </section>

      <section className="reviews">
        <div className="reviews__intro section-shell" data-reveal>
          <div className="reviews__score">
            <span className="reviews__platform">Google</span>
            <strong>4,8</strong>
            <span className="reviews__stars" aria-label="4,8 de 5 estrelas">★★★★★</span>
            <small>Mais de 700 avaliações</small>
          </div>
          <div className="reviews__heading">
            <p className="eyebrow">Falado por quem prova</p>
            <h2>O sabor fica.<br />O cuidado também.</h2>
            <a className="text-link" href="https://www.google.com/search?q=tayti+gelateria" target="_blank" rel="noreferrer">Ver avaliações no Google <Arrow /></a>
          </div>
        </div>
        <div className="review-grid section-shell">
          <article className="review-card" data-reveal>
            <span className="review-card__stars" aria-hidden="true">★★★★★</span>
            <blockquote>“Sabor excepcional e atendimento impecável! Estão de parabéns!”</blockquote>
            <p>Matheus Pereira <span>· Google</span></p>
          </article>
          <article className="review-card" data-reveal>
            <span className="review-card__stars" aria-hidden="true">★★★★★</span>
            <blockquote>“Maravilhoso! Atendimento super humanizado e acolhedor.”</blockquote>
            <p>Murilo Cesar <span>· Google</span></p>
          </article>
          <article className="review-card" data-reveal>
            <span className="review-card__stars" aria-hidden="true">★★★★★</span>
            <blockquote>“Pistache surreal, iogurte e pé de moleque foram as dicas da Tayti. Experiência única!”</blockquote>
            <p>Alvamar Cirne <span>· Google</span></p>
          </article>
        </div>
      </section>

      <section className="stores" id="lojas">
        <div className="stores__heading section-shell" data-reveal>
          <p className="eyebrow">Duas lojas, a mesma Tayti</p>
          <h2>Escolha onde<br />viver seu momento.</h2>
          <p>Visite, converse com a equipe ou peça seu gelato pela unidade mais próxima.</p>
        </div>
        <div className="store-grid section-shell">
          {stores.map((store, index) => (
            <article className="store-card" data-reveal key={store.name}>
              <div className="store-card__top">
                <span>0{index + 1}</span>
                <p>{store.type}</p>
              </div>
              <h3>{store.name}</h3>
              <a className="store-card__address" href={store.maps} target="_blank" rel="noreferrer">
                {store.address} <Arrow />
              </a>
              <div className="store-card__hours"><span>Terça a domingo</span><strong>12h — 19h30</strong></div>
              <div className="store-card__actions">
                <a className="order-main" href={store.whatsapp} target="_blank" rel="noreferrer">WhatsApp <Arrow /></a>
                <a href={store.rappi} target="_blank" rel="noreferrer">Rappi <Arrow /></a>
                <a href={store.ifood} target="_blank" rel="noreferrer">iFood <Arrow /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="visit-banner">
        <div className="visit-banner__photo"><img data-parallax="0.065" src="/images/loja-moema.jpg" alt="Ambiente acolhedor de uma loja Tayti ao anoitecer" /></div>
        <div className="visit-banner__copy" data-reveal>
          <p className="eyebrow">Fique mais um pouco</p>
          <h2>Um lugar para provar, conversar e voltar.</h2>
          <p>Ambientes acolhedores, áreas ao ar livre e água filtrada para clientes e pets.</p>
          <a className="text-link" href="#lojas">Ver endereços</a>
        </div>
      </section>

      <footer>
        <div className="footer__brand">
          <img src="/images/logo-tayti-card.png" alt="Tayti Gelateria e Café" />
          <p>Gelatos artesanais, café e confeitaria em São Paulo.</p>
        </div>
        <div className="footer__nav">
          <span>Explore</span>
          <a href="#sabores">Sabores</a><a href="#chef">A chef</a><a href="#experiencia">Experiência</a><a href="#lojas">Lojas</a>
        </div>
        <div className="footer__social">
          <span>Acompanhe</span>
          <a href="https://www.instagram.com/taytigelateria/" target="_blank" rel="noreferrer">Instagram <Arrow /></a>
          <a href="https://www.facebook.com/taytigelateria/" target="_blank" rel="noreferrer">Facebook <Arrow /></a>
        </div>
        <div className="footer__bottom"><span>© {new Date().getFullYear()} Tayti Gelateria & Café</span><span>Feito artesanalmente em São Paulo</span></div>
      </footer>

      <a className="mobile-order" href="#lojas">Pedir agora <Arrow /></a>
    </main>
  );
}
