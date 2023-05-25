import './styles.css';
import Image from 'next/image'
import logo from '../home/assets/logo.svg'
import { FiArrowDownLeft } from 'react-icons/fi';

export default function CreatePoint(){
    return (
        <div id="page-create-point">
            <header>
                <Image
                src={logo}
                alt="Ecoleta"
                width={100}
                height={24}
                />

                <a href="./">
                    <FiArrowDownLeft />
                    Voltar para home
                </a>

                <form action="#"></form>
            </header>
        </div>
    )
}