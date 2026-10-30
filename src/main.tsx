import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import './styles/main.scss'

// Pages é uma hospedagem estática: o hash mantém as rotas após atualizar a aba.
const Router = import.meta.env.MODE === 'pages' ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(<StrictMode><Router><App /></Router></StrictMode>)
