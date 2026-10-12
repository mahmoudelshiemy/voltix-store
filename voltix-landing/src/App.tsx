import { useMemo, useState } from 'react'
import {
  ArrowLeft, ArrowUpLeft, BadgeCheck, ChevronDown, Headphones, Heart,
  Menu, MessageCircle, PackageCheck, Search, ShieldCheck, ShoppingBag,
  Smartphone, Sparkles, Star, Truck, Watch, X, Zap,
} from 'lucide-react'

type Product = {
  id: number
  name: string
  category: string
  price: number
  oldPrice?: number
  rating: number
  badge?: string
  image: string
  tone: string
}

const products: Product[] = [
  { id: 1, name: 'سماعة Air Pro اللاسلكية', category: 'صوتيات', price: 1299, oldPrice: 1599, rating: 4.9, badge: 'الأكثر مبيعًا', image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=85', tone: 'bg-[#eef1f5]' },
  { id: 2, name: 'ساعة ذكية Fit X', category: 'ساعات ذكية', price: 1899, oldPrice: 2299, rating: 4.8, badge: 'خصم 17%', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85', tone: 'bg-[#f3f0eb]' },
  { id: 3, name: 'سماعة Studio Max', category: 'صوتيات', price: 2499, rating: 4.7, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85', tone: 'bg-[#f1f1f1]' },
  { id: 4, name: 'شاحن سريع Volt 30W', category: 'إكسسوارات', price: 499, oldPrice: 649, rating: 4.6, badge: 'عرض خاص', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=85', tone: 'bg-[#eef3f8]' },
  { id: 5, name: 'هاتف Nova Pro', category: 'موبايلات', price: 12499, oldPrice: 13999, rating: 4.8, badge: 'وصل حديثًا', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85', tone: 'bg-[#eef1f5]' },
]

const categories = [
  { label: 'كل المنتجات', icon: Sparkles },
  { label: 'موبايلات', icon: Smartphone },
  { label: 'صوتيات', icon: Headphones },
  { label: 'ساعات ذكية', icon: Watch },
  { label: 'إكسسوارات', icon: Zap },
]

const money = (price: number) => `${price.toLocaleString('en-US')} ج.م`

export default function App() {
  const [activeCategory, setActiveCategory] = useState('كل المنتجات')
  const [searchTerm, setSearchTerm] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const [favorites, setFavorites] = useState<number[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = activeCategory === 'كل المنتجات' || product.category === activeCategory
    const matchesSearch = product.name.includes(searchTerm.trim())
    return matchesCategory && matchesSearch
  }), [activeCategory, searchTerm])

  const addToCart = (product: Product) => {
    setCartCount((count) => count + 1)
    setNotice(`تمت إضافة ${product.name} إلى سلة التسوق`)
    window.setTimeout(() => setNotice(''), 2600)
  }

  const toggleFavorite = (id: number) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])

  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900">
      <div className="bg-[#101827] px-4 py-2 text-center text-xs font-semibold text-white sm:text-sm">
        <span className="text-blue-300">عرض لفترة محدودة</span> — شحن مجاني للطلبات فوق 2,000 جنيه
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex shrink-0 items-center gap-2" aria-label="فولتكس الصفحة الرئيسية">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20"><Zap size={23} fill="currentColor" /></span>
            <span className="leading-tight"><span className="block text-xl font-extrabold tracking-tight">فولتكس</span><span className="text-[10px] font-bold tracking-[.18em] text-slate-400">VOLTIX STORE</span></span>
          </a>

          <nav className={`${mobileMenuOpen ? 'absolute inset-x-0 top-full flex border-b border-slate-100 bg-white p-5 shadow-xl' : 'hidden'} flex-col gap-5 text-sm font-bold text-slate-600 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
            <a onClick={() => setMobileMenuOpen(false)} className="transition hover:text-blue-600" href="#home">الرئيسية</a>
            <a onClick={() => setMobileMenuOpen(false)} className="transition hover:text-blue-600" href="#categories">الأقسام</a>
            <a onClick={() => setMobileMenuOpen(false)} className="transition hover:text-blue-600" href="#products">منتجاتنا</a>
            <a onClick={() => setMobileMenuOpen(false)} className="transition hover:text-blue-600" href="#why-us">ليه فولتكس؟</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <label className="hidden h-11 w-48 items-center gap-2 rounded-xl bg-slate-50 px-3 text-slate-400 lg:flex xl:w-60">
              <Search size={17} />
              <input value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }} placeholder="بتدور على إيه؟" className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400" />
            </label>
            <button onClick={() => { setNotice(`في سلتك ${cartCount} منتج`); window.setTimeout(() => setNotice(''), 2400) }} className="relative grid h-11 w-11 place-items-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-blue-200 hover:bg-blue-50" aria-label="سلة التسوق">
              <ShoppingBag size={19} />
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">{cartCount}</span>
            </button>
            <button className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="فتح القائمة">{mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}</button>
            <a href="https://wa.me/201115932356" target="_blank" rel="noreferrer" className="hidden h-11 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700 sm:flex"><MessageCircle size={17} /> تواصل معنا</a>
          </div>
        </div>
        <div className="border-t border-slate-100 px-4 py-2 lg:hidden">
          <label className="mx-auto flex max-w-7xl items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-slate-400"><Search size={17} /><input value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }} placeholder="ابحث عن منتج..." className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" /></label>
        </div>
      </header>

      <main>
        <section id="home" className="relative isolate overflow-hidden bg-[#101827] text-white">
          <div className="absolute -left-28 -top-24 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -bottom-40 right-1/3 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-[1fr_.9fr] md:py-20 lg:px-8 lg:py-24">
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.06] px-3 py-2 text-xs font-bold text-blue-200"><Sparkles size={15} /> التكنولوجيا بشكل مختلف</div>
              <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.35] tracking-tight sm:text-5xl lg:text-6xl">طوّر يومك مع <span className="text-blue-400">تكنولوجيا</span> على مزاجك.</h1>
              <p className="mt-5 max-w-xl text-sm leading-8 text-slate-300 sm:text-base">اكتشف أحدث الأجهزة والإكسسوارات اللي تجمع بين الأداء المميز والتصميم العصري، واختار اللي يناسب أسلوب حياتك.</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#products" className="group inline-flex h-12 items-center gap-3 rounded-xl bg-blue-600 px-5 text-sm font-extrabold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-500">اكتشف المنتجات <ArrowLeft size={18} className="transition group-hover:-translate-x-1" /></a>
                <a href="#categories" className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/15 px-5 text-sm font-bold text-white transition hover:bg-white/5">تصفح الأقسام <ChevronDown size={16} /></a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-4 border-t border-white/10 pt-6">
                <div><div className="text-2xl font-extrabold">+2,500</div><div className="mt-1 text-xs text-slate-400">عميل سعيد</div></div>
                <div className="h-10 w-px bg-white/10" />
                <div><div className="flex items-center gap-1 text-2xl font-extrabold">4.9 <Star size={16} fill="#FBBF24" stroke="#FBBF24" /></div><div className="mt-1 text-xs text-slate-400">تقييم العملاء</div></div>
                <div className="h-10 w-px bg-white/10" />
                <div><div className="text-2xl font-extrabold">24/7</div><div className="mt-1 text-xs text-slate-400">دعم ومساعدة</div></div>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute inset-8 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[.02] p-3 shadow-2xl shadow-black/20 sm:p-5">
                <div className="absolute left-6 top-6 z-10 rounded-2xl bg-white px-4 py-3 text-slate-900 shadow-xl"><div className="text-[10px] font-bold text-slate-500">اختيار الأسبوع</div><div className="mt-1 text-sm font-extrabold">صوت نقي. تجربة أقوى.</div></div>
                <img className="h-[300px] w-full rounded-[1.5rem] object-cover sm:h-[390px]" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=90" alt="سماعة رأس لاسلكية بتصميم عصري" />
                <div className="absolute bottom-6 right-6 left-6 flex items-center justify-between rounded-2xl border border-white/15 bg-[#101827]/80 p-4 backdrop-blur-xl sm:bottom-8 sm:right-8 sm:left-8"><div><div className="text-xs text-slate-300">وصل حديثًا</div><div className="mt-1 font-extrabold">سماعات الجيل الجديد</div></div><a href="#products" aria-label="تسوق السماعات" className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 transition hover:bg-blue-500"><ArrowUpLeft size={22} /></a></div>
              </div>
              <div className="absolute -bottom-4 -right-2 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#1d293b] p-3 shadow-xl sm:flex"><span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300"><PackageCheck size={21} /></span><span><span className="block text-sm font-bold">منتجات أصلية</span><span className="text-[11px] text-slate-400">جودة تقدر تثق فيها</span></span></div>
            </div>
          </div>
        </section>

        <section id="categories" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-7 flex items-end justify-between gap-4"><div><p className="text-xs font-extrabold text-blue-600">اختار اللي يناسبك</p><h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">تسوّق حسب القسم</h2></div><a href="#products" className="hidden items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-blue-600 sm:flex">كل المنتجات <ArrowLeft size={16} /></a></div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map(({ label, icon: Icon }) => <button key={label} onClick={() => { setActiveCategory(label); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }} className={`group flex min-h-28 items-center gap-3 rounded-2xl border p-4 text-right transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5 sm:min-h-32 sm:flex-col sm:items-start sm:justify-between ${activeCategory === label ? 'border-blue-200 bg-blue-50' : 'border-slate-100 bg-white'}`}><span className={`grid h-11 w-11 place-items-center rounded-xl transition ${activeCategory === label ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white'}`}><Icon size={21} /></span><span className="text-sm font-extrabold">{label}</span></button>)}
          </div>
        </section>

        <section id="products" className="scroll-mt-28 bg-slate-50 py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-extrabold text-blue-600">اختيارات تستاهل التجربة</p><h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">منتجات مختارة ليك</h2><p className="mt-2 text-sm text-slate-500">تقنية أفضل، تفاصيل أذكى، وتجربة أسهل.</p></div><div className="flex flex-wrap gap-2">{categories.slice(0, 4).map(({ label }) => <button key={label} onClick={() => setActiveCategory(label)} className={`rounded-full px-3 py-2 text-xs font-bold transition sm:px-4 sm:text-sm ${activeCategory === label ? 'bg-[#101827] text-white' : 'border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600'}`}>{label}</button>)}</div></div>
            {filteredProducts.length > 0 ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {filteredProducts.map((product) => <article key={product.id} className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5">
                <div className={`relative overflow-hidden ${product.tone}`}><img src={product.image} alt={product.name} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />{product.badge && <span className="absolute right-3 top-3 rounded-lg bg-blue-600 px-2.5 py-1.5 text-[10px] font-extrabold text-white">{product.badge}</span>}<button onClick={() => toggleFavorite(product.id)} aria-label="إضافة للمفضلة" className={`absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 shadow-sm transition hover:scale-105 ${favorites.includes(product.id) ? 'text-rose-500' : 'text-slate-500'}`}><Heart size={17} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} /></button></div>
                <div className="p-4"><div className="flex items-center justify-between gap-2"><span className="text-[11px] font-bold text-slate-400">{product.category}</span><span className="flex items-center gap-1 text-xs font-bold text-slate-600"><Star size={13} fill="#FBBF24" stroke="#FBBF24" /> {product.rating}</span></div><h3 className="mt-2 font-extrabold">{product.name}</h3><div className="mt-4 flex items-center justify-between gap-2"><div><span className="block text-base font-extrabold text-slate-900">{money(product.price)}</span>{product.oldPrice && <span className="mt-1 block text-xs text-slate-400 line-through">{money(product.oldPrice)}</span>}</div><button onClick={() => addToCart(product)} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 transition hover:bg-blue-600 hover:text-white" aria-label={`أضف ${product.name} للسلة`}><ShoppingBag size={18} /></button></div></div>
              </article>)}
            </div> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><Search className="mx-auto text-slate-400" size={28} /><p className="mt-3 font-bold">مفيش منتجات مطابقة لبحثك</p><button onClick={() => { setSearchTerm(''); setActiveCategory('كل المنتجات') }} className="mt-3 text-sm font-bold text-blue-600">عرض كل المنتجات</button></div>}
            <div className="mt-8 text-center"><button onClick={() => { setActiveCategory('كل المنتجات'); setSearchTerm('') }} className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-extrabold transition hover:border-blue-200 hover:text-blue-600">عرض كل المنتجات <ArrowLeft size={17} /></button></div>
          </div>
        </section>

        <section id="why-us" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-9 text-center"><p className="text-xs font-extrabold text-blue-600">تجربة شراء من غير قلق</p><h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">ليه تختار فولتكس؟</h2><p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500">من أول ما تختار منتجك لحد ما يوصل لباب بيتك، إحنا مهتمين بكل تفصيلة.</p></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[{ icon: Truck, title: 'شحن سريع', desc: 'توصيل لباب البيت في أسرع وقت.' }, { icon: ShieldCheck, title: 'ضمان موثوق', desc: 'اشتري وأنت مطمن مع ضمان على منتجات مختارة.' }, { icon: BadgeCheck, title: 'جودة مضمونة', desc: 'اختيارات بعناية عشان تجربة أفضل.' }, { icon: MessageCircle, title: 'دعم يساعدك', desc: 'فريقنا جاهز يجاوب عن استفساراتك.' }].map(({ icon: Icon, title, desc }) => <div key={title} className="rounded-2xl border border-slate-100 p-6 text-center transition hover:border-blue-100 hover:shadow-lg hover:shadow-slate-900/5"><span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600"><Icon size={22} /></span><h3 className="mt-4 font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p></div>)}
          </div>
        </section>

        <section className="px-4 pb-14 sm:px-6 lg:px-8 lg:pb-16"><div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-blue-600 px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-14"><div className="absolute -left-10 -top-24 h-64 w-64 rounded-full border-[35px] border-white/10"/><div className="absolute -bottom-32 right-1/2 h-64 w-64 rounded-full bg-white/10 blur-2xl"/><div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"><div><span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold"><Sparkles size={14} /> خليك أول واحد يعرف</span><h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">جاهز تحدّث تجربتك التقنية؟</h2><p className="mt-2 max-w-xl text-sm leading-7 text-blue-100">تواصل معانا وساعدنا نختارلك المنتج المناسب لاحتياجاتك.</p></div><a href="https://wa.me/201115932356" target="_blank" rel="noreferrer" className="inline-flex h-12 shrink-0 items-center gap-2 rounded-xl bg-white px-5 text-sm font-extrabold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-50"><MessageCircle size={18} /> اسألنا على واتساب <ArrowLeft size={17} /></a></div></div></section>
      </main>

      <footer className="bg-[#101827] text-white"><div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8"><div><a href="#home" className="inline-flex items-center gap-2"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600"><Zap size={21} fill="currentColor" /></span><span className="text-xl font-extrabold">فولتكس</span></a><p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">وجهتك لاكتشاف أجهزة إلكترونية وإكسسوارات تجمع بين التكنولوجيا والتصميم.</p></div><div><h3 className="font-extrabold">روابط سريعة</h3><div className="mt-4 flex flex-col gap-3 text-sm text-slate-400"><a className="transition hover:text-white" href="#home">الرئيسية</a><a className="transition hover:text-white" href="#categories">الأقسام</a><a className="transition hover:text-white" href="#products">المنتجات</a><a className="transition hover:text-white" href="#why-us">عن فولتكس</a></div></div><div><h3 className="font-extrabold">تواصل معانا</h3><p className="mt-4 text-sm leading-7 text-slate-400">عندك سؤال أو محتاج مساعدة في اختيار منتجك؟ إحنا هنا لمساعدتك.</p><a href="https://wa.me/201115932356" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-300 transition hover:text-white"><MessageCircle size={17} /> راسلنا على واتساب</a></div></div><div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-500">© {new Date().getFullYear()} فولتكس. جميع الحقوق محفوظة.</div></footer>

      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl bg-[#101827] px-5 py-4 text-sm font-bold text-white shadow-2xl"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300"><PackageCheck size={18} /></span>{notice}<button onClick={() => setNotice('')} className="mr-auto text-slate-400 hover:text-white" aria-label="إغلاق"><X size={17} /></button></div>}
    </div>
  )
}
