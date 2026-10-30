import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { InfoDialog } from '../Dialog/Dialog'
import { Icon } from '../Icon/Icon'

const departments = [
  ['tecnologia', 'Tecnologia'], ['supermercado', 'Supermercado'], ['bebidas', 'Bebidas'],
  ['ferramentas', 'Ferramentas'], ['saude', 'Saúde'], ['esportes', 'Esportes e Fitness'], ['moda', 'Moda'],
]

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title"><div className="container hero__content">
    <h1 id="hero-title">Venha conhecer nossas <br />promoções</h1>
    <p><strong>Confira</strong> nossos produtos</p>
    <a className="yellow-button" href="#produtos" onClick={event => {
      event.preventDefault()
      document.getElementById('produtos')?.scrollIntoView()
    }}>Ver produto</a>
  </div></section>
}

export function DepartmentTiles() {
  return <nav className="department-tiles container" aria-label="Comprar por departamento">
    {departments.map(([id, name], index) => <Link className={index === 0 ? 'is-active' : ''} key={id}
      to={index === 0 ? '/produtos' : `/produtos?departamento=${id}`}>
      <span><img src={`${import.meta.env.BASE_URL}images/${id}.png`} width="61" height="61" alt="" /></span>{name}
    </Link>)}
  </nav>
}

export function Partners({ label }: { label: string }) {
  return <section className="partners container" aria-label={label}>
    {[1, 2].map(item => <article className="partner-card" key={item}><div>
      <h2>Parceiros</h2><p>Encontre tudo o que precisa<br />em um só lugar.</p>
      <Link className="yellow-button" to="/produtos">CONFIRA</Link>
    </div></article>)}
  </section>
}

export function Brands() {
  return <section className="brands container" aria-labelledby="brands-title"><h2 id="brands-title">Navegue por marcas</h2>
    <ul>{[1, 2, 3, 4, 5].map(item => <li key={item}><Link to="/produtos" aria-label={`Explorar produtos — Econverse ${item}`}>
      <img className="brand-logo" src={`${import.meta.env.BASE_URL}images/logo.png`} width="119" height="35" alt="Econverse" loading="lazy" />
    </Link></li>)}</ul>
  </section>
}

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false)
  const [terms, setTerms] = useState(false)
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true) }
  return <section className="newsletter" aria-labelledby="newsletter-title"><div className="container newsletter__inner">
    <div><h2 id="newsletter-title">Inscreva-se na nossa newsletter</h2><p>Assine a nossa newsletter e receba as novidades e conteúdos exclusivos<br className="desktop-break" /> da Econverse.</p></div>
    <form onSubmit={submit}>
      <div className="newsletter__fields">
        <label className="sr-only" htmlFor="newsletter-name">Seu nome</label><input id="newsletter-name" name="name" autoComplete="given-name" placeholder="Digite seu nome" required />
        <label className="sr-only" htmlFor="newsletter-email">Seu e-mail</label><input id="newsletter-email" name="email" type="email" autoComplete="email" placeholder="Digite seu e-mail" required />
        <button className="yellow-button" type="submit">INSCREVER</button>
      </div>
      <div className="newsletter__consent"><label><input type="checkbox" required />Aceito os</label> <button type="button" onClick={() => setTerms(true)}>termos e condições</button></div>
      {submitted && <p className="newsletter__feedback" role="status">Formulário validado. Esta demonstração não envia inscrições nem armazena seus dados.</p>}
    </form>
  </div>{terms && <InfoDialog title="Termos e condições" onClose={() => setTerms(false)}><p>A newsletter é uma demonstração. Nenhum cadastro é enviado ou armazenado. Carrinho e favoritos são salvos somente no seu navegador.</p></InfoDialog>}</section>
}

const footerColumns = [
  { title: 'Institucional', links: ['Sobre Nós', 'Movimento', 'Trabalhe conosco'] },
  { title: 'Ajuda', links: ['Suporte', 'Fale Conosco', 'Perguntas Frequentes'] },
  { title: 'Termos', links: ['Termos e Condições', 'Política de Privacidade', 'Troca e Devolução'] },
]

export function Footer() {
  const [info, setInfo] = useState<string | null>(null)
  return <footer className="site-footer"><div className="footer-main"><div className="container footer-main__inner">
    <div className="footer-about"><Link to="/" aria-label="Econverse — início"><img className="brand-logo" src={`${import.meta.env.BASE_URL}images/logo.png`} width="164" height="49" alt="Econverse" loading="lazy" /></Link>
      <p>Projeto desenvolvido para o desafio<br />de desenvolvimento front-end da Econverse.</p>
      <nav aria-label="Redes sociais">{['instagram', 'facebook', 'linkedin'].map(name => <button key={name} aria-label={name} onClick={() => setInfo('Redes sociais')}><Icon name={name} size={20} /></button>)}</nav>
    </div>
    <nav className="footer-columns" aria-label="Informações institucionais">{footerColumns.map(column => <div key={column.title}><h2>{column.title}</h2><ul>{column.links.map(link => <li key={link}><button onClick={() => setInfo(link)}>{link}</button></li>)}</ul></div>)}</nav>
  </div></div><p className="copyright">© {new Date().getFullYear()} Econverse.</p>
    {info && <InfoDialog title={info} onClose={() => setInfo(null)}><p>Este site apresenta o teste técnico da Econverse. Carrinho e favoritos ficam no seu navegador. Não há pagamento, envio de pedidos ou coleta de dados.</p><Link className="text-link" to="/produtos" onClick={() => setInfo(null)}>Explorar catálogo</Link></InfoDialog>}
  </footer>
}
