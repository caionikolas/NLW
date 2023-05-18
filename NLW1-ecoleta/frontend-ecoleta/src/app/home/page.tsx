import { Roboto } from 'next/font/google'
import Image from 'next/image'
import './home.css'
import { FiLogIn } from 'react-icons/fi'
import logo from './assets/logo.svg'

const roboto = Roboto({ 
  subsets: ['latin'],
  weight:'400'
})

export default function Home() {
    return (
      <div id="page-home">
        <div className="content">
          <header>
            <Image
              src={logo}
              alt="Ecoleta"
              width={100}
              height={24}
            />
          </header>

          <main>
            <h1>Seu Marketplace de coleta de resíduos.</h1>
            <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>

            <a href="/cadastro">
              <span>
                <FiLogIn/>
              </span>
              <strong>Cadastre um ponto de coleta</strong>
            </a>
          </main>
        </div>
      </div>
    )
  }