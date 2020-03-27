import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';


export default function Profile(){
    return (
        <header>
            <img src={logoImg} alt="logo"/>
            <span>Seja bem-vinda APAE</span>

            <Link to='/incidents/new' className="button">Cadastrar novo caso </Link>
            <button type="button">
                <FiPower  size={16} color="#E02041" />
            </button>
        </header>
    );
}