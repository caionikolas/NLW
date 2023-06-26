'use client';

import './styles.css';
import Image from 'next/image'
import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import logo from '../home/assets/logo.svg'
import { FiArrowDownLeft } from 'react-icons/fi';
import Link from 'next/link';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import axios from 'axios'
import api from '../../services/api'
import { LatLngExpression } from 'leaflet';
import { useRouter } from 'next/navigation'

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

export default function CreatePoint(){
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setufs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [FormData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: ''
    })

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0')
    const [selectedItems, setSelectedItems] = useState<number[]>([])

    const position:LatLngExpression = [-5.0891998, -42.8112109]
    const setLatitude = position[0]
    const setLongtude = position[1]

    const router = useRouter()

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data)
        })
    }, [])

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla)

            setufs(ufInitials)
        })
    })

    useEffect(() => {
        if (selectedUf === '0'){
            return 
        }

        axios
            .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
                const cityNames = response.data.map(city => city.nome)

            setCities(cityNames)
        })
    },[selectedUf]);

    function handleSelectedUf (event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value

        setSelectedUf(uf)
    }

    function handleSelectedCity (event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value

        setSelectedCity(city)
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target;

        setFormData({ ...FormData, [name]: value })
    }

    function handleSelectItem(id: number){
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0){
            const filteredItems = selectedItems.filter(item => item !== id)

            setSelectedItems(filteredItems)
        } else{
            setSelectedItems([ ...selectedItems, id ])
        }
    }


    async function handleSubmit(event: FormEvent){
        event.preventDefault();

        const { name, email, whatsapp } = FormData;
        const uf = selectedUf;
        const city = selectedCity;
        const latitude = setLatitude
        const longitude = setLongtude
        const items = selectedItems;

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items
        };

        await api.post('points', data);

        alert('Ponto de coleta criado!');

        router.push('/');
    }

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

            <form onSubmit={handleSubmit}>
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
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input 
                                type="text" 
                                name="whatsapp" 
                                id="whatsapp" 
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset >
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <MapContainer  center={position} zoom={16}>
                        <TileLayer 
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={position}></Marker>
                    </MapContainer>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select 
                                name="uf" 
                                id="uf" 
                                value={selectedUf}
                                onChange={handleSelectedUf}>
                                    <option value="0">Selecione uma UF</option>
                                    {ufs.map(uf => (
                                        <option key={uf} value={uf}>{uf}</option>
                                    ))}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select 
                                name="city" 
                                id="city" 
                                value={selectedCity}
                                onChange={handleSelectedCity}
                                >
                                    <option value="0">Selecione uma Cidade</option>
                                    {cities.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                    ))}
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
                            <li 
                            key={item.id} 
                            onClick={() => handleSelectItem(item.id)}
                            className={selectedItems.includes(item.id) ? 'selected' : ''}
                            >
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