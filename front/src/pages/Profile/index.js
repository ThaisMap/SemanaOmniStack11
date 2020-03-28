import React, {useState, useEffect } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';


export default function Profile(){
    const [incidents, setIncidentes] = useState([]);
   
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidentes(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidentes(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert('Algo deu errado, tente novamente');       
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
        <header>
            <img src={logoImg} alt="logo"/>
            <span>Seja bem-vinda {ongName}</span>

            <Link to='/incidents/new' className="button">Cadastrar novo caso </Link>
            <button type="button" onClick={handleLogout}>
                <FiPower  size={16} color="#E02041" />
            </button>
        </header>
        
        <h1>Casos cadastrados</h1>

        <ul>
           {incidents.map(incident => (
                 <li key = {incident.id}>
                 <strong>CASO:</strong>
                 <p>{incident.title}</p>
                 <strong>DESCRIÇÃO</strong>
                 <p>{incident.description}</p>
                 <strong>VALOR</strong>
                 <p>
                     {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}
                 </p>
                 <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                     <FiTrash2 size={20} color="#a8a8b3"/>
                 </button>
             </li>    
           ))}       

        </ul>

        </div>
    );
}