import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Heart,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "./components/Sheet";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { PRODUCTS, byId, cropStyle, type Product } from "./data/catalog";
import { IMAGES_PATH, WHATSAPP_NUMBER } from "./config";
import styles from "./App.module.css";

const WA = WHATSAPP_NUMBER;
const IMG = {
  hero: IMAGES_PATH + "IMG_0993.jpeg",
  inuka: IMAGES_PATH + "inuka-linha-cosmeticos.jpg",
  moda: IMAGES_PATH + "IMG_0995.jpeg",
  look: IMAGES_PATH + "inuka-colecao.jpg",
};

const TABS = [
  { key: "all", label: "Todos" },
  { key: "Inuka", label: "Perfumes Inuka" },
  { key: "Shein", label: "Moda Shein" },
  { key: "Promo", label: "Promoções" },
];
const CIRCLES = [
  { label: "Perfumes Femininos", sub: "Perfume feminino", id: 1 },
  { label: "Perfumes Masculinos", sub: "Perfume masculino", id: 2 },
  { label: "Difusores", sub: "Difusor", id: 3 },
  { label: "Cosméticos", sub: "Cosméticos", id: 4 },
  { label: "Vestidos", sub: "Vestido", id: 33 },
  { label: "Saias", sub: "Saia", id: 45 },
  { label: "Blusas", sub: "Blusa", id: 47 },
  { label: "Acessórios", sub: "Acessórios", id: 46 },
];

interface Slide { img: string; eyebrow: string; title: ReactNode; text: string; cta: string; f: string }
const SLIDES: Slide[] = [
  { img: IMG.hero, eyebrow: "Wanda Cosméticos & Fashion", title: <>Realce a sua <em>beleza</em> e estilo em um só lugar</>, text: "Fragrâncias exclusivas Inuka e as melhores tendências da Shein à sua espera.", cta: "Ver Catálogo", f: "all" },
  { img: IMG.moda, eyebrow: "Moda Shein", title: <>Looks modernos para <em>todas</em> as ocasiões</>, text: "Vestidos, conjuntos e blusas selecionados, a preços acessíveis.", cta: "Ver Moda Shein", f: "Shein" },
];

/** Produtos do "look completo" (ids do catálogo). */
const LOOK = [42, 1, 46];
/** Produtos mostrados de cada vez na vitrine. */
const PAGE = 8;
const mt = (n: number) => `${n.toLocaleString("pt-PT").replace(/\s/g, " ")} MT`;
const priced = (p: Product): p is Product & { price: number } => p.price !== null;

const SocialIcon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

export default function App() {
  const [filter, setFilter] = useState("all");
  const [term, setTerm] = useState("");
  const [shown, setShown] = useState(PAGE);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [liked, setLiked] = useState<number[]>([]);
  const [toast, setToast] = useState("");

  const catsRef = useScrollReveal();
  const bannersRef = useScrollReveal();
  const shopRef = useScrollReveal();
  const lookRef = useScrollReveal();
  const howRef = useScrollReveal();
  const aboutRef = useScrollReveal();

  useEffect(() => {
    const t = window.setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 7000);
    return () => window.clearInterval(t);
  }, []);

  const list = useMemo(
    () =>
      PRODUCTS.filter((p) => {
        const f =
          filter === "all" ||
          (filter === "Promo" ? !!p.old : filter.startsWith("sub:") ? p.sub === filter.slice(4) : p.cat === filter);
        const q = !term || `${p.name} ${p.sub}`.toLowerCase().includes(term.toLowerCase());
        return f && q;
      }),
    [filter, term],
  );

  const lines = PRODUCTS.filter((p) => cart[p.id]);
  const count = lines.reduce((s, p) => s + cart[p.id], 0);
  const total = lines.reduce((s, p) => s + cart[p.id] * (p.price ?? 0), 0);
  const lookPriced = LOOK.every((id) => byId(id).price !== null);
  const lookTotal = LOOK.reduce((s, id) => s + (byId(id).price ?? 0), 0);

  const flash = (t: string) => {
    setToast(t);
    window.setTimeout(() => setToast(""), 1800);
  };
  const add = (id: number) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    flash("Adicionado ao carrinho");
  };
  const step = (id: number, d: number) =>
    setCart((c) => {
      const n = (c[id] || 0) + d;
      const next = { ...c };
      if (n <= 0) delete next[id];
      else next[id] = n;
      return next;
    });
  const go = (f: string) => {
    setFilter(f);
    setShown(PAGE);
    setMenuOpen(false);
    document.getElementById("vitrine")?.scrollIntoView({ behavior: "smooth" });
  };
  const openWa = (text: string) =>
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  const checkout = () =>
    openWa(
      `Olá! Gostaria de encomendar:\n${lines
        .map((p) => `• ${cart[p.id]}x ${p.name}${priced(p) ? ` – ${mt(cart[p.id] * p.price)}` : ""}`)
        .join("\n")}${total > 0 ? `\nTotal (itens com preço): ${mt(total)}` : ""}`,
    );
  const orderLook = () => {
    if (lookPriced) {
      setCart((c) => {
        const n = { ...c };
        LOOK.forEach((id) => (n[id] = (n[id] || 0) + 1));
        return n;
      });
      flash("Look adicionado ao carrinho");
      setCartOpen(true);
    } else {
      openWa(`Olá! Gostaria de saber o preço deste look completo: ${LOOK.map((id) => byId(id).name).join(" + ")}`);
    }
  };
  const toggleLike = (id: number) => setLiked((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));

  return (
    <div className={styles.page}>
      <div className={styles.announce}>
        <span>Perfumes 100% originais Inuka</span>
        <span>Entrega ao domicílio</span>
        <span>Pague com M-Pesa, e-Mola ou numerário na entrega</span>
      </div>

      <header className={styles.header}>
        <div className={styles.bar}>
          <a href="#inicio" className={styles.logo}>
            Wanda <em>Cosméticos &amp; Fashion</em>
          </a>
          <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
            <a href="#inicio" onClick={() => setMenuOpen(false)}>Início</a>
            <button onClick={() => go("Inuka")}>Perfumes Inuka</button>
            <button onClick={() => go("Shein")}>Moda Shein</button>
            <button onClick={() => go("Promo")}>Promoções</button>
            <a href="#contactos" onClick={() => setMenuOpen(false)}>Contactos</a>
          </nav>
          <div className={styles.icons}>
            <Button variant="ghost" size="icon" shape="pill" aria-label="Pesquisar" onClick={() => setSearchOpen((o) => !o)}>
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" shape="pill" aria-label="Carrinho" onClick={() => setCartOpen(true)} className={styles.cartBtn}>
              <ShoppingBag size={20} />
              {count > 0 && <span className={styles.badge}>{count}</span>}
            </Button>
            <Button variant="ghost" size="icon" shape="pill" aria-label="Menu" className={styles.menuBtn} onClick={() => setMenuOpen((o) => !o)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
        {searchOpen && (
          <div className={styles.searchRow}>
            <Input
              autoFocus
              value={term}
              placeholder="Pesquisar perfumes, vestidos, acessórios…"
              onChange={(e) => {
                setTerm(e.target.value);
                setShown(PAGE);
                if (e.target.value) document.getElementById("vitrine")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>
        )}
      </header>

      <main>
        <section id="inicio" className={styles.hero}>
          <div className={styles.slides}>
            {SLIDES.map((s, i) => (
              <div key={i} className={`${styles.slide} ${slide === i ? styles.slideOn : ""}`}>
                <img src={s.img} alt="" className={styles.slideImg} />
                <div className={styles.slideCopy}>
                  <span className={styles.eyebrow}>{s.eyebrow}</span>
                  <h1 className={styles.h1}>{s.title}</h1>
                  <p className={styles.lead}>{s.text}</p>
                  <div className={styles.ctas}>
                    <Button size="lg" shape="pill" onClick={() => go(s.f)}>
                      {s.cta} <ArrowRight size={18} />
                    </Button>
                    <Button size="lg" shape="pill" variant="outline" onClick={() => go("Promo")}>Ver promoções</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.dots}>
            {SLIDES.map((_, i) => (
              <button key={i} aria-label={`Destaque ${i + 1}`} className={`${styles.dot} ${slide === i ? styles.dotOn : ""}`} onClick={() => setSlide(i)} />
            ))}
          </div>
        </section>

        <div className={styles.trust}>
          <span><ShieldCheck size={22} /><b>Produtos originais</b><small>Perfumes Inuka autênticos</small></span>
          <span><Truck size={22} /><b>Entrega ao domicílio</b><small>Ou levantamento na loja</small></span>
          <span><Smartphone size={22} /><b>M-Pesa e e-Mola</b><small>Pagamento simples e local</small></span>
          <span><MessageCircle size={22} /><b>Atendimento WhatsApp</b><small>Resposta rápida</small></span>
        </div>

        <section className={styles.section}>
          <div ref={catsRef} className={styles.reveal}>
            <div className={styles.circles}>
              {CIRCLES.map((c) => (
                <button key={c.sub} className={styles.circle} onClick={() => go(`sub:${c.sub}`)}>
                  <span className={styles.circleImg}>
                    <img src={byId(c.id).img} alt="" loading="lazy" style={cropStyle(byId(c.id))} />
                  </span>
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.noTop}`}>
          <div ref={bannersRef} className={styles.reveal}>
            <div className={styles.banners}>
              <button className={styles.banner} onClick={() => go("Inuka")}>
                <img src={IMG.inuka} alt="" loading="lazy" />
                <div className={styles.bannerShade} />
                <div className={styles.bannerCopy}>
                  <span className={styles.eyebrowLight}>Perfumes e cosméticos</span>
                  <h3 className={styles.h3}>Universo Inuka</h3>
                  <div className={styles.pills}><span>Masculinos</span><span>Femininos</span><span>Difusores</span><span>Cosméticos</span></div>
                  <span className={styles.go}>Explorar <ArrowRight size={16} /></span>
                </div>
              </button>
              <button className={styles.banner} onClick={() => go("Shein")}>
                <img src={IMG.moda} alt="" loading="lazy" />
                <div className={styles.bannerShade} />
                <div className={styles.bannerCopy}>
                  <span className={styles.eyebrowLight}>Moda feminina</span>
                  <h3 className={styles.h3}>Moda Shein</h3>
                  <div className={styles.pills}><span>Vestidos</span><span>Conjuntos</span><span>Blusas</span><span>Acessórios</span></div>
                  <span className={styles.go}>Explorar <ArrowRight size={16} /></span>
                </div>
              </button>
            </div>
          </div>
        </section>

        <section id="vitrine" className={`${styles.section} ${styles.tint}`}>
          <div ref={shopRef} className={styles.reveal}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>Vitrine</span>
              <h2 className={styles.h2}>Os mais <em>vendidos</em></h2>
            </div>
            <div className={styles.filters}>
              {TABS.map((f) => (
                <button key={f.key} className={`${styles.chip} ${filter === f.key ? styles.chipOn : ""}`} onClick={() => { setFilter(f.key); setShown(PAGE); }}>
                  {f.label}
                </button>
              ))}
              {filter.startsWith("sub:") && (
                <button className={`${styles.chip} ${styles.chipOn}`} onClick={() => { setFilter("all"); setShown(PAGE); }}>
                  {filter.slice(4)} <X size={12} />
                </button>
              )}
            </div>
            <div className={styles.grid}>
              {list.slice(0, shown).map((p) => (
                <article key={p.id} className={styles.card}>
                  <div className={styles.ph}>
                    <div className={styles.phInner}>
                      <img src={p.img} alt={p.name} loading="lazy" style={cropStyle(p)} />
                      {p.mask && <div className={styles.mask} style={{ ["--mask" as string]: p.mask }} />}
                    </div>
                    {p.tag && <span className={`${styles.tag} ${p.tag === "Novo" ? styles.tagNew : ""}`}>{p.tag}</span>}
                    {p.old && p.price !== null && <span className={styles.off}>-{Math.round((1 - p.price / p.old) * 100)}%</span>}
                    <button className={`${styles.heart} ${liked.includes(p.id) ? styles.heartOn : ""}`} aria-label="Favorito" onClick={() => toggleLike(p.id)}>
                      <Heart size={16} />
                    </button>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.brand}>{p.cat} · {p.sub}</span>
                    <h3 className={styles.pname}>{p.name}</h3>
                    {priced(p) ? (
                      <div className={styles.price}>{mt(p.price)}{p.old && <s>{mt(p.old)}</s>}</div>
                    ) : (
                      <div className={styles.ask}>Preço sob consulta</div>
                    )}
                    <div className={styles.acts}>
                      {priced(p) && <Button shape="pill" size="sm" onClick={() => add(p.id)}>Adicionar ao Carrinho</Button>}
                      <Button shape="pill" size="sm" variant={priced(p) ? "outline" : "primary"} onClick={() => openWa(priced(p) ? `Olá! Gostaria de encomendar: ${p.name} (${mt(p.price)})` : `Olá! Gostaria de saber o preço e a disponibilidade de: ${p.name}`)}>
                        <MessageCircle size={14} /> {priced(p) ? "Encomendar pelo WhatsApp" : "Perguntar preço no WhatsApp"}
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
              {list.length === 0 && <p className={styles.empty}>Nenhum produto encontrado.</p>}
            </div>
            {list.length > shown && (
              <div className={styles.more}>
                <Button variant="outline" size="lg" shape="pill" onClick={() => setShown((n) => n + PAGE)}>
                  Ver mais produtos
                </Button>
              </div>
            )}
          </div>
        </section>

        <section className={styles.section}>
          <div ref={lookRef} className={styles.reveal}>
            <div className={styles.look}>
              <div className={styles.lookPic}><img src={IMG.look} alt="Look completo com perfume" loading="lazy" /></div>
              <div className={styles.lookBody}>
                <span className={styles.eyebrow}>Moda + Fragrância</span>
                <h2 className={styles.h2}>Monte o seu <em>look</em> completo</h2>
                <p className={styles.body}>Um vestido da Shein, o seu perfume Inuka favorito e o toque final em acessórios.</p>
                <div className={styles.combo}>
                  {LOOK.map((id, i) => (
                    <div key={id} className={styles.comboRow}>
                      <div className={styles.mini}>
                        <span className={styles.miniImg}><img src={byId(id).img} alt={byId(id).name} loading="lazy" style={cropStyle(byId(id))} /></span>
                        <small>{byId(id).name}</small>
                        <b>{byId(id).price !== null ? mt(byId(id).price as number) : "Sob consulta"}</b>
                      </div>
                      {i < LOOK.length - 1 && <span className={styles.plus}>+</span>}
                    </div>
                  ))}
                </div>
                <div className={styles.lookFoot}>
                  <div><small>Look completo</small><div className={styles.lookPrice}>{lookPriced ? mt(lookTotal) : "Preço sob consulta"}</div></div>
                  <Button size="lg" shape="pill" onClick={orderLook}>
                    {lookPriced ? <><ShoppingBag size={18} /> Adicionar o look</> : <><MessageCircle size={18} /> Pedir este look</>}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="como" className={`${styles.section} ${styles.tint}`}>
          <div ref={howRef} className={styles.reveal}>
            <div className={styles.head}>
              <span className={styles.eyebrow}>Encomendas</span>
              <h2 className={styles.h2}>Como <em>comprar</em></h2>
            </div>
            <div className={styles.steps}>
              {[
                ["1", "Escolha os seus produtos", "Navegue pelo catálogo e adicione os seus favoritos ao carrinho."],
                ["2", "Finalize o pedido", "Envie o pedido pelo WhatsApp e confirmamos disponibilidade e total."],
                ["3", "Receba em casa ou levante", "Entrega ao domicílio ou levantamento, como preferir."],
              ].map(([n, t, d]) => (
                <div key={n} className={styles.step}>
                  <span className={styles.num}>{n}</span>
                  <h3 className={styles.h3s}>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
            <div className={styles.pay}>
              {["M-Pesa", "e-Mola", "Transferência Bancária", "Numerário na entrega"].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="sobre" className={styles.section}>
          <div ref={aboutRef} className={`${styles.about} ${styles.reveal}`}>
            <div className={styles.aboutPic}><img src={IMG.hero} alt="" loading="lazy" /></div>
            <div>
              <span className={styles.eyebrow}>Sobre nós</span>
              <h2 className={styles.h2}>A história da <em>Wanda</em></h2>
              <p className={styles.body}>
                A Wanda Cosméticos &amp; Fashion nasceu do desejo de oferecer às mulheres moçambicanas produtos bonitos, originais e acessíveis. Começámos com as fragrâncias Inuka e, com o carinho das nossas clientes, juntámos uma seleção cuidada de moda Shein.
              </p>
              <p className={styles.body}>
                O nosso compromisso é simples: qualidade, confiança e um atendimento acolhedor, do primeiro contacto à entrega.
              </p>
              <div className={styles.vals}><span>Produtos originais</span><span>Preços acessíveis</span><span>Atendimento personalizado</span></div>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div>
            <h2 className={styles.ctaTitle}>Receba novidades e promoções no WhatsApp</h2>
            <p>Novos perfumes, chegadas da Shein e ofertas só para clientes.</p>
          </div>
          <Button size="lg" shape="pill" variant="secondary" onClick={() => openWa("Olá! Quero receber novidades e promoções da Wanda.")}>
            <MessageCircle size={18} /> Quero receber
          </Button>
        </section>
      </main>

      <footer id="contactos" className={styles.footer}>
        <div className={styles.fgrid}>
          <div>
            <div className={styles.flogo}>Wanda <em>Cosméticos &amp; Fashion</em></div>
            <p>Beleza e estilo em um só lugar. Perfumes originais Inuka e moda feminina selecionada.</p>
            <div className={styles.soc}>
              <a href="#" aria-label="Instagram"><SocialIcon d="M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 6a3 3 0 100 6 3 3 0 000-6zm5-2h.01" /></a>
              <a href="#" aria-label="Facebook"><SocialIcon d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v5h4v-5h3l1-4h-4V8z" /></a>
              <a href="#" aria-label="TikTok"><SocialIcon d="M14 4v10.5a3.5 3.5 0 11-3.5-3.5M14 4c.3 2.5 2 4 4.5 4" /></a>
            </div>
          </div>
          <div><h4>Links rápidos</h4><ul><li><a href="#inicio">Início</a></li><li><a href="#vitrine">Catálogo</a></li><li><a href="#como">Como comprar</a></li><li><a href="#sobre">Sobre nós</a></li></ul></div>
          <div><h4>Horário</h4><ul><li>Seg – Sex: 8h – 18h</li><li>Sábado: 9h – 15h</li><li>Domingo: encomendas por WhatsApp</li></ul></div>
          <div><h4>Contactos</h4><ul><li>WhatsApp: +258 84 000 0000</li><li>Maputo, Moçambique</li><li>Entregas ao domicílio</li></ul></div>
        </div>
        <div className={styles.copy}>
          <span>© 2026 Wanda Cosméticos &amp; Fashion. Todos os direitos reservados.</span>
          <span className={styles.payChips}><i>M-Pesa</i><i>e-Mola</i><i>Transferência</i><i>Numerário</i></span>
        </div>
      </footer>

      <a className={styles.wapp} aria-label="Falar no WhatsApp" href={`https://wa.me/${WA}?text=${encodeURIComponent("Olá! Gostaria de mais informações.")}`} target="_blank" rel="noopener noreferrer">
        <MessageCircle size={28} />
      </a>

      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="right" className={styles.sheet} aria-describedby={undefined}>
          <SheetHeader><SheetTitle>O seu carrinho</SheetTitle></SheetHeader>
          <div className={styles.lines}>
            {lines.length === 0 && <p className={styles.empty}>O carrinho está vazio.</p>}
            {lines.map((p) => (
              <div key={p.id} className={styles.line}>
                <span className={styles.thumb}><img src={p.img} alt="" style={cropStyle(p)} /></span>
                <div className={styles.lineInfo}>
                  <b>{p.name}</b>
                  <span>{priced(p) ? mt(p.price) : "Sob consulta"}</span>
                  <div className={styles.qty}>
                    <button aria-label="Menos" onClick={() => step(p.id, -1)}><Minus size={14} /></button>
                    <span>{cart[p.id]}</span>
                    <button aria-label="Mais" onClick={() => step(p.id, 1)}><Plus size={14} /></button>
                    <button aria-label="Remover" className={styles.rm} onClick={() => step(p.id, -99)}><Trash2 size={14} /></button>
                  </div>
                </div>
                <b>{priced(p) ? mt(cart[p.id] * p.price) : ""}</b>
              </div>
            ))}
          </div>
          <SheetFooter className={styles.sfoot}>
            <div className={styles.total}><span>Total</span><b>{mt(total)}</b></div>
            <Button shape="pill" size="lg" disabled={!count} onClick={checkout}>Finalizar pelo WhatsApp</Button>
            <small>Pagamento: M-Pesa, e-Mola, transferência ou numerário na entrega.</small>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <div className={`${styles.toast} ${toast ? styles.toastOn : ""}`}>{toast}</div>
    </div>
  );
}
