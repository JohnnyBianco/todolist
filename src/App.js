import { useEffect, useLayoutEffect, useState } from "react";
import './App.css';
import moment from "moment";
import { CgClose } from 'react-icons/cg';


moment.locale('PT-BR')

function App() {

  let [lista, setLista] = useState([]);
  let [novoItem, setNovoItem] = useState("");
  let [novaHora, setNovaHora] = useState("");


  useEffect(() => {
    const listaM = JSON.parse(localStorage.getItem('lista'));
    if (listaM) {
      setLista(listaM);
    }
  }, []);
  
  
  useEffect(() => {
    if(lista.length){
    localStorage.setItem('lista', JSON.stringify(lista))};
  }, [lista]);

 


  function addNova() {

    let newArray = [...lista];
    newArray.push({
      id: Math.random(),
      name: novoItem,
      done: false,
      time: novaHora,
    });
    setLista(newArray);
    setNovoItem("");
    console.log(newArray)


  }

  function deletarItem(index) {
    let tempArray = [...lista];
    tempArray.splice(index, 1);

    setLista(tempArray)
  }

  const concluirItem = (item) => {
    let newList = [...lista];
    newList.map((it) => {
      if (it == item) {
        it.done = !it.done;
      }
    })
    setLista(newList)
  }
  const dataEndPeriod = moment().format('ll');


  return (
    <>
      <div className="container">
        <input className="input-text" value={novoItem} onChange={value => setNovoItem(value.target.value)} type="text" />
        <input value={novaHora} onChange={value => setNovaHora(value.target.value)} type="time" />

        <button onClick={() => addNova()}>Add</button>

        <p className="data">{dataEndPeriod}</p>
        <ul className="todo">
          {lista.map((item, index) => (
            <li className={`todo-item ${item.done ? "done" : "task"}`} key={index}>
              <span>{item.name}</span>
              <div className="div-button">
                <span>{item.time}</span>
                <button onClick={() => concluirItem(item)} className={item.done ? "buttonIsDone teste" : "buttonIsNotDone teste"}>
                  {item.done && <CgClose size={10} color="#000" />}
                </button>
                <button className="button1" onClick={() => deletarItem(index)}>Delete</button>

              </div>
            </li>
          ))}
        </ul>
      </div>
    </>

  );


}

export default App;
