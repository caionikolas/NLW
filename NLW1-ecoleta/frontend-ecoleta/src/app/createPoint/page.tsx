'use client';

import './styles.css';
import Image from 'next/image'
import { useEffect, useState } from 'react'
import logo from '../home/assets/logo.svg'
import { FiArrowDownLeft } from 'react-icons/fi';
import Link from 'next/link';
import { MapContainer, Popup, TileLayer, Marker } from 'react-leaflet'
import axios from 'axios'
import api from '../../services/api'

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IBGEUFResponse {
    sigla: string;
}

export default function CreatePoint(){
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data)
        })
    }, [])

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/PI/municipios').then(response => {
            const ufInitials = response.data.map(uf => uf.silga)
        })
    })

    return (
        <div id="page-create-point">
            <header>
                <Image
                src={logo}
                alt="Ecoleta"
                width={100}
                height={24}
                />

                <Link href="./">
                    <FiArrowDownLeft />
                    Voltar para home
                </Link>

            </header>
            <form>
                <h1>Cadastro do <br/> ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    
                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input 
                                type="text" 
                                name="whatsapp" 
                                id="whatsapp" 
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <MapContainer center={[-5.0891998, -42.8112109]} zoom={16}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={[-5.0891998, -42.8112109]}></Marker>
                    </MapContainer>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf">
                                <option value="0">Selecione uma UF</option>
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecione uma Cidade</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className='items-grid'>
                        {items.map(item => (
                            <li key={item.id}>
                            <img src={item.image_url} alt={item.title} />   
                            <span>{item.title}</span>
                        </li>
                        ))}
                    </ul>
                </fieldset>
                
                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    )
}