import React, {useState} from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
      
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data = { title, description, value};
        console.log(data);

    try{
        await api.post('incidents', data, {
            headers: {
                Authorization: ongId,
            }
        });

        history.push('/profile');
    } 
    catch (error){
        console.log(error);
        alert('Algo deu errado, tente novamente');
    }
     
}

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para 
                        encontrar um herói para resolver isso.</p>

                    <Link to="/profile" className="back-link">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input placeholder="Título do caso"
                    value = {title}
                    onChange = {e => setTitle(e.target.value)} />
                    <textarea placeholder="Descrição"
                    value = {description}
                    onChange = {e => setDescription(e.target.value)} />
                    <input placeholder="Valor em reais"
                    value = {value}
                    onChange = {e => setValue(e.target.value)}/>
                   
                    <div className="button-group">
                        <Link to="/profile" className="cancel-button">Cancelar</Link>
                        <button className="button" type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>

        </div>
    );
}