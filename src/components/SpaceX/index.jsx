import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import './style.css'


const SpaceX = (props) => {
    const[repositories, setRepositories] = useState([]);  //lista de repositorios vazia
    const[filterRepo, setFilterRepo] = useState([]);
    const[searchRepo, setSerchRepo] = useState('');
    
    useEffect(() =>{
        const handleData = async () => {
            try{
                const {data} = await Axios.get('https://api.spacexdata.com/v4/launches');
                setRepositories(data);
            }
            catch(error){
                console.error(error);
            }
        }
        handleData();
    }, [])

    const handleLike = (id) => {
        const newRepos = repositories.map(repo => {
            return repo.id === id ? {...repo, favorite: !repo.favorite} : repo;
        })
        setRepositories(newRepos);
    }

    useEffect(()=>{
        const lowerSearchRepo = searchRepo.toLowerCase();
        setFilterRepo(
            repositories.filter(repo => {
                return repo.name.toLowerCase().includes(lowerSearchRepo)
            })
        )
    }, [searchRepo, repositories])

    return(
        <div className="body">
            <h1 className="title">{props.children}</h1>
            <input className="input" placeholder="Type here the launche name" onChange={event=>setSerchRepo(event.target.value)}/>
            <div className="main">
                {filterRepo.map((repo) => (
                    <div className="card">
                        <img src={repo.links.patch.small} alt="descrição"/>
                        <p key={repo.id}>{repo.name}</p>
                        <a href={repo.links.article} rel="noreferrer" target="_blank">Leia sobre aqui</a>
                        <a href={repo.links.webcast} rel="noreferrer" target="_blank">Veja aqui um video do lançamento</a>
                        <button style={{ border:"none", backgroundColor:"white"}} onClick = {() => handleLike(repo.id)}>{repo.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon style={{ color: "black"}}/>}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SpaceX;