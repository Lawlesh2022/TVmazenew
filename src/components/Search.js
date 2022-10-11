import React, { useEffect, useState } from 'react'

import '../App.css'
import Show from './Show'
import Actor from './Actor'
import Def from './Def'

const Search = () => {

  const [option, setOption] = useState("default")
  const [input, setInput] = useState('')
  const [actorData, setActorData] = useState([])
  const [showData, setShowData] = useState([])
  const [placeholder, setPlaceholder] = useState("select a option to search");



  useEffect(() => {
    
     if (option === "actor") {
      if (input !== "")
      fetch(`https://api.tvmaze.com/search/people?q=${input}`)
        .then((result) => {
          result.json()
            .then((response) => {
              setActorData(response);
            });
        }
        );
      // console.log(actorData)
    } else if(option === 'show'){
      if (input !== "") {
        fetch(`https://api.tvmaze.com/search/shows?q=${input}`).then(
          (result) => {
            result.json().then((response) => {
              setShowData(response);
            });
          }
        );
        // console.log(showData)
      }
    }
  }, [input]);


  const optionHandler = (e) => {
    setOption(e.target.value)
    setInput('')
    setActorData([])
    setShowData([])
  };

  useEffect(()=>{
    if(option==='show') setPlaceholder("e.g. Friends")
    else if(option === 'actor') setPlaceholder("e.g. Dwayne Johnson")
    else setPlaceholder("select an option to search")
  },[option])


  return (
    <>
      <div className='select_container'>
        <select value={option} onChange={optionHandler}>
          <option value={"defaut"} >-Select-</option>
          <option value={"show"} >Show</option>
          <option value={"actor"} >Actor</option>
        </select>

        <input
          className='search-box'
          type={'search'}
          value={input}
          placeholder={placeholder}
          onChange={(e) => {

            option === 'show' || option === 'actor' ?
              setInput(e.target.value)
              :
              alert("'Search by Show' or 'Search by Actor'")
          }}
        />
      </div>
      {option === "actor" && input !== "" ? actorData.length !== 0 ? <Actor data={actorData} /> : <h3 className="noData">Results for '{input}' not found</h3> : ""}
      {option === "show" && input !== "" ? showData.length !== 0 ? <Show data={showData} /> : <h3 className="noData">Results for '{input}' not found</h3> : ""}
      {option !== "show"  && option !== "actor" ? <Def /> : ""}
    </>
  )
}

export default Search