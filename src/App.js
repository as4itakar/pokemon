import './App.css';
import { IoMdSearch } from "react-icons/io";
import {useState} from "react";

const BottomInfo = ({empty}) =>{
    return(
        <div className='gif-container'>
            {
                empty === true?
                    <h1>Ничего не найдено</h1>:
                    <img src='https://c.tenor.com/SMVw1SHxtI8AAAAi/cute-pokemon-mew.gif' alt=''/>
            }
        </div>
    )
}

function App() {
  const [pokemon, setPokemon] = useState([])
  const [input, setInput] = useState('')
  const [empty, setEmpty] = useState(null)

  const getPokemon = async () => {
      setPokemon([])
      try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`, {
              mode: 'cors',
              headers: {
                  'Access-Control-Allow-Origin':'*'
              }
          })
          const data = await response.json()
          setPokemon(data)
          if (pokemon.length === 0){
              setEmpty(true)
          }
      }catch (e) {
          console.log(e)
      }
  }

  const changeInput = (text) =>{
      const name = text.toLowerCase()
      setInput(name)

  }
  return (
    <div className="App">
        <div className='form'>
            <div className='top'>
                <h1>Введите имя покемона</h1>
            </div>
            <div className='bottom'>
                <div className='input-container'>
                    <input placeholder='Имя/id покемона' type='text' value={input} onChange={(e) => changeInput(e.target.value)}/>
                    <button onClick={getPokemon}>
                        <IoMdSearch className='icon'/>
                    </button>
                </div>
                {
                    pokemon.length === 0?
                        <BottomInfo empty={empty}/>:
                        <div className='pokemon-container'>
                            <div className='image-container'>
                                <div className='image-bg'>
                                    <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
                                </div>
                            </div>
                            <div className='info-container'>
                                <p>id: {pokemon.id}</p>
                                <p>Имя: {pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</p>
                                <p>Рост: {pokemon.height*10} см</p>
                                <p>Вес: {pokemon.weight/10} кг</p>
                            </div>
                        </div>
                }
            </div>
        </div>
    </div>
  );
}

export default App;
