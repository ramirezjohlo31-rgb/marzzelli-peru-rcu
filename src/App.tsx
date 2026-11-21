import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  Minus,
  Moon,
  PackageCheck,
  Plus,
  Quote,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sun,
  Trash2,
  Truck,
  X,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: "Carteras" | "Calzado" | "Mochilas" | "Accesorios";
  gender: "Dama" | "Caballero" | "Unisex";
  material: "Cuero" | "Textil + cuero";
  price: number;
  image: string;
  description: string;
  colors: { name: string; hex: string }[];
  tag?: string;
};

type QuoteItem = { product: Product; color: string; quantity: number };

const heroSlides = [
  {
    eyebrow: "Marroquinería peruana",
    title: "Piezas que llevan el oficio en cada detalle.",
    text: "Diseñamos y confeccionamos artículos de cuero que mejoran con el tiempo, hechos por manos expertas en el Perú.",
    image:
      "https://images.unsplash.com/photo-1787005241178-c9006ea9610b?auto=format&fit=crop&w=1800&q=88",
  },
  {
    eyebrow: "Cuero legítimo",
    title: "Del trazo preciso a una pieza única.",
    text: "Seleccionamos materiales nobles y cuidamos cada corte, costura y acabado para crear productos con carácter.",
    image:
      "https://images.unsplash.com/photo-1787070534639-8fc823677aff?auto=format&fit=crop&w=1800&q=88",
  },
  {
    eyebrow: "Diseño para todos los días",
    title: "Tradición que acompaña tu ritmo.",
    text: "Colecciones funcionales para damas y caballeros, en cuero 100% legítimo y combinaciones contemporáneas.",
    image:
      "https://images.unsplash.com/photo-1637868796504-32f45a96d5a0?auto=format&fit=crop&w=1800&q=88",
  },
];

const products: Product[] = [
  {
    id: 1,
    name: "Cartera Firenze",
    category: "Carteras",
    gender: "Dama",
    material: "Cuero",
    price: 389,
    image:
      "https://images.unsplash.com/photo-1746880223690-359948154c53?auto=format&fit=crop&w=900&q=85",
    description:
      "Cartera estructurada de cuero vacuno, con forro interior, herrajes metálicos y correa regulable.",
    colors: [
      { name: "Chocolate", hex: "#5B3927" },
      { name: "Negro", hex: "#191919" },
      { name: "Camel", hex: "#B87943" },
    ],
    tag: "Nuevo",
  },
  {
    id: 2,
    name: "Mochila Andina",
    category: "Mochilas",
    gender: "Unisex",
    material: "Textil + cuero",
    price: 329,
    image:
      "https://images.unsplash.com/photo-1630484179057-75e24310e2ff?auto=format&fit=crop&w=900&q=85",
    description:
      "Mochila urbana de lona de alta resistencia con aplicaciones de cuero, compartimento para laptop y espalda acolchada.",
    colors: [
      { name: "Arena", hex: "#B9A48A" },
      { name: "Olivo", hex: "#686B4A" },
      { name: "Negro", hex: "#191919" },
    ],
    tag: "Más vendido",
  },
  {
    id: 3,
    name: "Oxford Montalvo",
    category: "Calzado",
    gender: "Caballero",
    material: "Cuero",
    price: 419,
    image:
      "https://images.unsplash.com/photo-1570800493677-12a7ad3d4d86?auto=format&fit=crop&w=900&q=85",
    description:
      "Zapato Oxford de cuero plena flor, armado y acabado a mano con suela de alta duración.",
    colors: [
      { name: "Negro", hex: "#191919" },
      { name: "Café", hex: "#65402F" },
    ],
  },
  {
    id: 4,
    name: "Billetera Clásica",
    category: "Accesorios",
    gender: "Caballero",
    material: "Cuero",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1586579724969-2cb96841bcb8?auto=format&fit=crop&w=900&q=85",
    description:
      "Billetera compacta de cuero con seis ranuras, doble compartimento y bordes pintados a mano.",
    colors: [
      { name: "Negro", hex: "#191919" },
      { name: "Tabaco", hex: "#814C32" },
      { name: "Vino", hex: "#722F37" },
    ],
  },
  {
    id: 5,
    name: "Bolso Verona",
    category: "Carteras",
    gender: "Dama",
    material: "Cuero",
    price: 359,
    image:
      "https://images.unsplash.com/photo-1591348278900-019a8a2a8b1d?auto=format&fit=crop&w=900&q=85",
    description:
      "Bolso de hombro de silueta limpia, cierre seguro y distribución interior para el uso cotidiano.",
    colors: [
      { name: "Vino", hex: "#722F37" },
      { name: "Negro", hex: "#191919" },
    ],
  },
  {
    id: 6,
    name: "Portadocumentos Lima",
    category: "Accesorios",
    gender: "Unisex",
    material: "Cuero",
    price: 269,
    image:
      "https://images.unsplash.com/photo-1517254797898-04edd251bfb3?auto=format&fit=crop&w=900&q=85",
    description:
      "Organizador delgado para documentos y tecnología, con cierre metálico y tacto suave.",
    colors: [
      { name: "Cognac", hex: "#9A5D36" },
      { name: "Chocolate", hex: "#5B3927" },
    ],
  },
  {
    id: 7,
    name: "Mochila Barranco",
    category: "Mochilas",
    gender: "Dama",
    material: "Cuero",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1682364853446-db043f643207?auto=format&fit=crop&w=900&q=85",
    description:
      "Mochila ligera y versátil de cuero natural, con bolsillos organizadores y tirantes cómodos.",
    colors: [
      { name: "Camel", hex: "#B87943" },
      { name: "Negro", hex: "#191919" },
    ],
  },
  {
    id: 8,
    name: "Correa Heritage",
    category: "Accesorios",
    gender: "Caballero",
    material: "Cuero",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1621240246587-f196b6ecb43a?auto=format&fit=crop&w=900&q=85",
    description: "Correa de cuero entero con hebilla de metal satinado y cinco puntos de ajuste.",
    colors: [
      { name: "Negro", hex: "#191919" },
      { name: "Café", hex: "#65402F" },
    ],
  },
];

const categories = ["Todos", "Carteras", "Calzado", "Mochilas", "Accesorios"];

export default function App() {
  const [slide, setSlide] = useState(0);
  const [category, setCategory] = useState("Todos");
  const [gender, setGender] = useState("Todos");
  const [material, setMaterial] = useState("Todos");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    localStorage.getItem("marzzelli-theme") === "dark" ? "dark" : "light",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("marzzelli-theme", theme);
  }, [theme]);

  useEffect(() => {
    const timer = window.setInterval(
      () => setSlide((current) => (current + 1) % heroSlides.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      selectedProduct || cartOpen || menuOpen || welcomeOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct, cartOpen, menuOpen, welcomeOpen]);

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          (category === "Todos" || product.category === category) &&
          (gender === "Todos" || product.gender === gender || product.gender === "Unisex") &&
          (material === "Todos" || product.material === material) &&
          product.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [category, gender, material, search],
  );

  const quoteCount = quoteItems.reduce((sum, item) => sum + item.quantity, 0);

  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  function openProduct(product: Product) {
    setSelectedProduct(product);
    setSelectedColor(product.colors[0].name);
  }

  function addToQuote() {
    if (!selectedProduct) return;
    setQuoteItems((items) => {
      const existing = items.find(
        (item) => item.product.id === selectedProduct.id && item.color === selectedColor,
      );
      if (existing) {
        return items.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...items, { product: selectedProduct, color: selectedColor, quantity: 1 }];
    });
    setSelectedProduct(null);
    setCartOpen(true);
  }

  function changeQuantity(index: number, amount: number) {
    setQuoteItems((items) =>
      items
        .map((item, itemIndex) =>
          itemIndex === index ? { ...item, quantity: item.quantity + amount } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function sendWhatsApp() {
    const list = quoteItems
      .map(
        (item) =>
          `• ${item.quantity} x ${item.product.name} — color ${item.color} (ref. S/ ${item.product.price})`,
      )
      .join("\n");
    const total = quoteItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const message = `Hola, INDUSTRIAS MARZZELLI PERÚ. Quisiera solicitar una cotización para:\n\n${list}\n\nTotal referencial: S/ ${total}\n\n¿Podrían confirmarme disponibilidad, acabados y tiempo de entrega?`;
    window.open(`https://wa.me/51999999999?text=${encodeURIComponent(message)}`, "_blank");
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-heading)]">
      <header className="fixed inset-x-0 top-0 z-40 bg-[var(--bg-header)] text-[var(--text-header)] shadow-[0_1px_0_rgba(0,0,0,.08)]">
        <div className="hidden h-8 items-center justify-between bg-[var(--bg-dark)] px-10 text-[10px] font-semibold tracking-wide text-white/75 sm:flex">
          <span>HECHO EN PERÚ · CUERO SELECCIONADO</span>
          <div className="flex gap-6">
            <a href="#empresa" className="hover:text-white">
              Nosotros
            </a>
            <a href="#contacto" className="hover:text-white">
              Ayuda
            </a>
          </div>
        </div>
        <div className="mx-auto flex h-18 max-w-384 items-center justify-between px-5 lg:px-10">
          <a href="#" className="flex items-center" aria-label="Marzzelli, inicio">
            <img
              src={`${import.meta.env.BASE_URL}marzzelli-logo.png`}
              alt="Marzzelli"
              className="h-10 w-auto sm:h-11"
            />
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm font-semibold lg:flex">
            <a className="retail-nav-link" href="#novedades">
              Novedades
            </a>
            <a className="retail-nav-link" href="#coleccion">
              Dama
            </a>
            <a className="retail-nav-link" href="#coleccion">
              Caballero
            </a>
            <a className="retail-nav-link" href="#estilos">
              Colecciones
            </a>
            <a className="retail-nav-link" href="#oficio">
              Nuestro oficio
            </a>
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-[var(--bg-subtle)]"
              aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
              title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a
              href="#coleccion"
              className="hidden h-10 items-center gap-2 rounded-full bg-[var(--bg-subtle)] px-4 text-sm text-[var(--text-muted)] transition hover:bg-[var(--bg-subtle-hover)] xl:flex"
            >
              <Search size={18} />
              <span>Buscar</span>
            </a>
            <button
              onClick={() => setCartOpen(true)}
              className="relative grid h-11 w-11 place-items-center rounded-full transition hover:bg-[var(--bg-subtle)]"
              aria-label={`Abrir cotización, ${quoteCount} productos`}
            >
              <ShoppingBag size={21} />
              {quoteCount > 0 && (
                <span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--accent)] px-1 text-[10px] text-white">
                  {quoteCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full hover:bg-[var(--bg-subtle)] lg:hidden"
              aria-label="Abrir menú"
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="novedades" className="bg-[var(--bg-cream)] pt-18 sm:pt-26">
          <div className="relative h-[58vh] min-h-120 overflow-hidden sm:h-[70vh]">
            {heroSlides.map((item, index) => (
              <div
                key={item.title}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === slide ? "opacity-100" : "pointer-events-none opacity-0"}`}
              >
                <img src={item.image} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            ))}
            <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 sm:bottom-7 lg:right-10">
              <button
                className="hero-control"
                onClick={() => setSlide((slide - 1 + heroSlides.length) % heroSlides.length)}
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="min-w-12 text-center text-xs tracking-[0.2em] text-white">
                0{slide + 1} / 0{heroSlides.length}
              </span>
              <button
                className="hero-control"
                onClick={() => setSlide((slide + 1) % heroSlides.length)}
                aria-label="Imagen siguiente"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="mx-auto flex max-w-4xl flex-col items-center px-5 py-12 text-center sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
              {heroSlides[slide].eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-[1.02] tracking-[-0.035em] text-[var(--text-heading)] sm:text-6xl lg:text-7xl">
              {heroSlides[slide].title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-[var(--text-hero)] sm:text-base">
              {heroSlides[slide].text}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a className="retail-button" href="#coleccion">
                Comprar ahora
              </a>
              <a className="retail-button" href="#oficio">
                Conoce la historia
              </a>
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--border-faint)] bg-[var(--bg-surface)] text-[var(--text-strong-alt)]">
          <div className="mx-auto grid max-w-360 grid-cols-1 md:grid-cols-3">
            {[
              [ShieldCheck, "Cuero seleccionado", "Materiales legítimos y trazables"],
              [Sparkles, "Hecho a mano", "Confección y acabados expertos"],
              [Truck, "Envíos a todo el Perú", "Despachos seguros y coordinados"],
            ].map(([Icon, title, text], index) => (
              <div
                key={String(title)}
                className={`flex items-center gap-4 px-6 py-6 lg:px-10 ${index < 2 ? "md:border-r md:border-[var(--border-faint)]" : ""}`}
              >
                <Icon className="shrink-0 text-[var(--accent)]" size={25} strokeWidth={1.6} />
                <div>
                  <p className="text-sm font-semibold text-[var(--text-strong-alt)]">{String(title)}</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">{String(text)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="estilos" className="scroll-mt-28 bg-[var(--bg-surface)] px-5 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-360">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="section-kicker">Encuentra tu pieza</p>
                <h2 className="mt-2 text-2xl font-semibold text-[var(--text-strong)] sm:text-3xl">
                  Compra por estilo
                </h2>
              </div>
              <a
                href="#coleccion"
                className="hidden text-sm font-semibold underline underline-offset-4 sm:block"
              >
                Ver todo
              </a>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                ["Carteras", products[0].image, "Para llevarlo todo"],
                ["Calzado", products[2].image, "Pasos con carácter"],
                ["Accesorios", products[4].image, "Detalles que perduran"],
              ].map(([item, image, subtitle]) => (
                <button
                  key={item}
                  onClick={() => {
                    setCategory(item);
                    document.getElementById("coleccion")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group relative aspect-4/5 overflow-hidden bg-[var(--bg-media-alt)] text-left"
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,.62),transparent_48%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <p className="text-sm text-white/75">{subtitle}</p>
                    <h3 className="mt-1 text-2xl font-semibold">{item}</h3>
                    <span className="mt-5 inline-flex rounded-full bg-[var(--bg-surface)] px-5 py-2.5 text-xs font-bold text-[var(--text-strong)] transition group-hover:bg-[var(--accent)] group-hover:text-white">
                      Comprar
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="coleccion" className="scroll-mt-24 bg-[var(--bg-cream)] px-5 py-16 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-360">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="section-kicker">Colección Marzzelli</p>
                <h2 className="mt-2 text-3xl font-semibold text-[var(--text-strong)] sm:text-4xl">
                  Lo mejor de Marzzelli
                </h2>
                <p className="mt-4 max-w-xl leading-7 text-[var(--text-body)]">
                  Piezas funcionales, honestas y duraderas. Encuentra la que se adapta a tu estilo.
                </p>
              </div>
              <label className="flex h-12 w-full items-center gap-3 border-b border-[var(--border-input)] lg:w-72">
                <Search size={18} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-full bg-transparent text-sm text-[var(--text-input)] outline-none placeholder:text-[var(--text-placeholder)]"
                  placeholder="Buscar un producto"
                />
              </label>
            </div>

            <div className="mt-12 border-y border-[var(--border)] py-5">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {categories.map((item) => (
                    <button
                      key={item}
                      onClick={() => setCategory(item)}
                      className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${
                        category === item
                          ? "bg-[var(--bg-ink)] text-white"
                          : "bg-[var(--bg-surface)] text-[var(--text-strong)] hover:bg-[var(--bg-chip)]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <FilterSelect
                    label="Género"
                    value={gender}
                    onChange={setGender}
                    options={["Todos", "Dama", "Caballero"]}
                  />
                  <FilterSelect
                    label="Material"
                    value={material}
                    onChange={setMaterial}
                    options={["Todos", "Cuero", "Textil + cuero"]}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between text-sm text-[var(--text-soft)]">
              <span>{filteredProducts.length} productos</span>
              {(category !== "Todos" || gender !== "Todos" || material !== "Todos") && (
                <button
                  onClick={() => {
                    setCategory("Todos");
                    setGender("Todos");
                    setMaterial("Todos");
                  }}
                  className="font-semibold text-[var(--accent)] hover:underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            {filteredProducts.length > 0 ? (
              <div className="mt-7 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <article key={product.id} className="group">
                    <button
                      className="relative block aspect-4/5 w-full overflow-hidden bg-[var(--bg-media)] text-left"
                      onClick={() => openProduct(product)}
                      aria-label={`Ver ${product.name}`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                      <span className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-[var(--bg-surface)] text-[var(--text-strong)] opacity-0 shadow-xl transition group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowRight size={18} />
                      </span>
                      {product.tag && (
                        <span className="absolute left-3 top-3 bg-[var(--accent)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                          {product.tag}
                        </span>
                      )}
                    </button>
                    <div className="pt-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          {product.tag ? (
                            <p className="text-xs font-semibold text-[var(--accent)]">{product.tag}</p>
                          ) : (
                            <p className="text-xs text-[var(--text-faint)]">{product.category}</p>
                          )}
                          <button
                            onClick={() => openProduct(product)}
                            className="mt-1.5 text-left text-base font-semibold text-[var(--text-strong)] hover:text-[var(--accent)]"
                          >
                            {product.name}
                          </button>
                          <p className="mt-1 text-xs text-[var(--text-faint)]">{product.material}</p>
                        </div>
                        <p className="whitespace-nowrap text-sm font-bold text-[var(--text-heading)]">
                          S/ {product.price}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-10 border border-[var(--border)] bg-[var(--bg-surface)] px-6 py-20 text-center">
                <PackageCheck className="mx-auto text-[var(--accent)]" size={34} />
                <h3 className="mt-4 font-serif text-2xl font-bold">No encontramos coincidencias</h3>
                <p className="mt-2 text-sm text-[var(--text-soft)]">
                  Prueba con otra combinación de filtros.
                </p>
              </div>
            )}
          </div>
        </section>

        <section id="oficio" className="scroll-mt-20 bg-[var(--bg-dark)] px-5 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-360 items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1787005241178-c9006ea9610b?auto=format&fit=crop&w=1200&q=88"
                alt="Artesano trazando un patrón sobre cuero"
                className="aspect-4/3 w-full object-cover"
              />
              <div className="absolute -bottom-7 right-0 bg-[var(--accent)] px-7 py-6 text-white sm:right-7">
                <strong className="block font-serif text-4xl">100%</strong>
                <span className="text-xs uppercase tracking-[0.18em]">Hecho en Perú</span>
              </div>
            </div>
            <div className="pt-6 text-white lg:pt-0">
              <p className="section-kicker text-[var(--accent-soft)]">El valor del oficio</p>
              <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-white sm:text-5xl">
                La diferencia se siente en las manos.
              </h2>
              <p className="mt-6 max-w-xl leading-7 text-white/65">
                Cada pieza comienza con una selección cuidadosa del material. Nuestros maestros
                marroquineros interpretan cada diseño con precisión, respetando las cualidades
                naturales del cuero.
              </p>
              <div className="mt-9 grid gap-6 sm:grid-cols-3">
                {[
                  ["01", "Selección", "Cueros y textiles de calidad."],
                  ["02", "Confección", "Corte y costura experta."],
                  ["03", "Acabado", "Control pieza por pieza."],
                ].map(([number, title, text]) => (
                  <div key={number} className="border-t border-white/20 pt-4">
                    <span className="text-xs font-bold text-[var(--accent)]">{number}</span>
                    <h3 className="mt-3 font-serif text-xl text-white">{title}</h3>
                    <p className="mt-2 text-xs leading-5 text-white/50">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="empresa" className="scroll-mt-20 bg-[var(--bg-surface)] px-5 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-360 gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="section-kicker">Industria peruana</p>
              <h2 className="section-title mt-4">Una empresa, muchas historias por crear.</h2>
            </div>
            <div>
              <Quote className="text-[var(--accent)]" size={35} strokeWidth={1.5} />
              <p className="mt-6 font-serif text-2xl leading-relaxed text-[var(--text-heading)] sm:text-3xl">
                En INDUSTRIAS MARZZELLI PERÚ CUEROS E.I.R.L. unimos experiencia manufacturera,
                diseño contemporáneo y respeto por el material para crear artículos que perduran.
              </p>
              <div className="mt-8 grid gap-6 border-t border-[var(--border)] pt-8 sm:grid-cols-3">
                {[
                  ["Diseño", "Desarrollo propio y soluciones a medida."],
                  ["Calidad", "Revisión minuciosa en cada etapa."],
                  ["Compromiso", "Producción responsable y local."],
                ].map(([title, text]) => (
                  <div key={title}>
                    <h3 className="font-bold text-[var(--text-heading)]">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contacto" className="bg-[var(--bg-header)] px-5 pt-16 text-[var(--text-heading)] lg:px-10">
        <div className="mx-auto grid max-w-360 gap-12 border-b border-[var(--border)] pb-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src={`${import.meta.env.BASE_URL}marzzelli-logo.png`}
              alt="Marzzelli"
              className="h-10 w-auto"
            />
            <p className="mt-5 max-w-xs text-sm leading-6 text-[var(--text-muted)]">
              Marroquinería fina peruana para acompañarte por muchos años.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-heading)]">
              Visítanos
            </h3>
            <p className="mt-5 text-sm leading-7 text-[var(--text-muted)]">
              Lima, Perú
              <br />
              Atención previa coordinación
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-heading)]">
              Contacto
            </h3>
            <p className="mt-5 text-sm leading-7 text-[var(--text-muted)]">
              ventas@marzzelli.pe
              <br />
              +51 999 999 999
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-heading)]">
              Síguenos
            </h3>
            <button className="mt-5 flex items-center gap-3 text-sm text-[var(--text-muted)] transition hover:text-[var(--text-heading)]">
              <Camera size={18} /> Instagram
            </button>
          </div>
        </div>
        <div className="mx-auto flex max-w-360 flex-col gap-2 py-6 text-xs text-[var(--text-muted)] sm:flex-row sm:justify-between">
          <span>© 2025 Industrias Marzzelli Perú Cueros E.I.R.L.</span>
          <span>Diseñado y confeccionado en Perú</span>
        </div>
      </footer>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[var(--bg-header)] p-6 text-[var(--text-heading)] lg:hidden">
          <div className="flex items-center justify-between">
            <img
              src={`${import.meta.env.BASE_URL}marzzelli-logo.png`}
              alt="Marzzelli"
              className="h-9 w-auto"
            />
            <div className="flex items-center gap-1">
              <button
                onClick={toggleTheme}
                className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-[var(--bg-subtle)]"
                aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
                title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">
                <X />
              </button>
            </div>
          </div>
          <nav className="mt-20 flex flex-col gap-8 font-serif text-4xl">
            {[
              ["Novedades", "#novedades"],
              ["Dama", "#coleccion"],
              ["Caballero", "#coleccion"],
              ["Colecciones", "#estilos"],
              ["Nuestro oficio", "#oficio"],
              ["Contacto", "#contacto"],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}

      {welcomeOpen && <WelcomeModal onClose={() => setWelcomeOpen(false)} />}

      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Detalles de ${selectedProduct.name}`}
          onMouseDown={(event) => event.target === event.currentTarget && setSelectedProduct(null)}
        >
          <div className="relative grid max-h-[94vh] w-full max-w-5xl overflow-y-auto bg-[var(--bg-elevated)] lg:grid-cols-2">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center bg-[var(--bg-surface)] text-[var(--text-heading)] shadow-md hover:text-[var(--accent)]"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="h-[42vh] w-full object-cover lg:h-full lg:min-h-155"
            />
            <div className="flex flex-col justify-center p-7 sm:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                {selectedProduct.category} · {selectedProduct.gender}
              </p>
              <h2 className="mt-3 font-serif text-4xl font-bold text-[var(--text-heading)]">
                {selectedProduct.name}
              </h2>
              <p className="mt-4 text-xl font-bold text-[var(--text-heading)]">S/ {selectedProduct.price}</p>
              <p className="mt-6 leading-7 text-[var(--text-muted)]">{selectedProduct.description}</p>
              <div className="mt-8 border-t border-[var(--border)] pt-7">
                <div className="flex justify-between">
                  <span className="text-sm font-bold">Elige el acabado</span>
                  <span className="text-sm text-[var(--text-muted)]">{selectedColor}</span>
                </div>
                <div className="mt-4 flex gap-3">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`grid h-10 w-10 place-items-center rounded-full border-2 transition ${
                        selectedColor === color.name ? "border-[var(--accent)]" : "border-transparent"
                      }`}
                      aria-label={color.name}
                      title={color.name}
                    >
                      <span
                        className="grid h-7 w-7 place-items-center rounded-full border border-black/10"
                        style={{ background: color.hex }}
                      >
                        {selectedColor === color.name && <Check size={14} className="text-white" />}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={addToQuote} className="primary-button mt-9 justify-center">
                Agregar a cotización <ShoppingBag size={18} />
              </button>
              <p className="mt-4 text-center text-xs text-[var(--text-note)]">
                Precio referencial. Confirma disponibilidad y entrega por WhatsApp.
              </p>
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute inset-0 h-full w-full cursor-default"
            onClick={() => setCartOpen(false)}
            aria-label="Cerrar cotización"
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[var(--bg-elevated)] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                  Tu selección
                </p>
                <h2 className="mt-1 font-serif text-2xl font-bold">Solicitar cotización</h2>
              </div>
              <button onClick={() => setCartOpen(false)} aria-label="Cerrar">
                <X />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {quoteItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag size={38} strokeWidth={1.3} className="text-[var(--accent)]" />
                  <h3 className="mt-5 font-serif text-2xl font-bold">Tu lista está vacía</h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-[var(--text-muted)]">
                    Explora la colección y agrega los productos que deseas cotizar.
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-7 text-sm font-bold text-[var(--accent)] hover:underline"
                  >
                    Ver colección
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {quoteItems.map((item, index) => (
                    <div
                      key={`${item.product.id}-${item.color}`}
                      className="flex gap-4 border-b border-[var(--border-faint)] pb-6"
                    >
                      <img src={item.product.image} alt="" className="h-24 w-20 object-cover" />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-lg font-bold">{item.product.name}</h3>
                        <p className="mt-1 text-xs text-[var(--text-muted)]">Color: {item.color}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border border-[var(--border-strong)]">
                            <button
                              onClick={() => changeQuantity(index, -1)}
                              className="p-1.5"
                              aria-label="Quitar uno"
                            >
                              {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                            </button>
                            <span className="w-7 text-center text-xs font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => changeQuantity(index, 1)}
                              className="p-1.5"
                              aria-label="Agregar uno"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="text-sm font-bold">
                            S/ {item.product.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {quoteItems.length > 0 && (
              <div className="border-t border-[var(--border)] bg-[var(--bg-surface)] p-6">
                <div className="flex justify-between">
                  <span className="text-sm text-[var(--text-muted)]">Total referencial</span>
                  <strong>
                    S/{" "}
                    {quoteItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)}
                  </strong>
                </div>
                <button
                  onClick={sendWhatsApp}
                  className="primary-button mt-5 w-full justify-center"
                >
                  Pedir por WhatsApp <ArrowRight size={18} />
                </button>
                <p className="mt-3 text-center text-[11px] leading-4 text-[var(--text-note)]">
                  Se abrirá WhatsApp con el detalle listo para enviar.
                </p>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="relative flex min-w-0 flex-1 items-center bg-[var(--bg-surface)] px-3 sm:min-w-40 sm:flex-none">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full appearance-none bg-transparent pr-8 text-xs font-semibold text-[var(--text-heading)] outline-none sm:text-sm"
        aria-label={label}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {label}: {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3" size={15} />
    </label>
  );
}

function WelcomeModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Presentación de la empresa"
    >
      <div className="w-full max-w-sm text-center bg-[var(--bg-elevated)] px-7 py-8 shadow-2xl">
        <img
          src={`${import.meta.env.BASE_URL}marzzelli-logo.png`}
          alt="Marzzelli"
          className="mx-auto h-11 w-auto"
        />
        <h2 className="mt-5 font-serif text-2xl font-bold text-[var(--text-heading)]">
          Industrias Marzzelli Perú Cueros E.I.R.L.
        </h2>
        <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
          Marroquinería fina peruana para acompañarte por muchos años.
        </p>
        <button onClick={onClose} className="primary-button mt-8">
          Aceptar
        </button>
      </div>
    </div>
  );
}
