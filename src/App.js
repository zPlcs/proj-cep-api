import React, { useState } from 'react'
import './style/app.css'
const App = () => {
  const [printCep, setPrintCep] = useState('')
  const [cepInput, setCepInput] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState(null);

  const buscarCep = async () => {
    setErro(null);
    setEndereco(null);

    const cep = cepInput.replace(/\D/g, '');

    if (cep.length !== 8) {
      setErro('CEP inválido. Digite 8 dígitos.');
      return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Falha na requisição.');
      }

      const data = await response.json();

      if (data.erro) {
        setErro('CEP não encontrado. Tente outro número.');
      } else {
        setEndereco(data);
      }

    } catch (e) {
      setErro('Ocorreu um erro na rede/servidor.');
    }

    LimparForm()
  }

  const LimparForm = () => {
    setPrintCep(cepInput)
    setCepInput("")
  }


  return (
    <div className="app">
      <label>Insira o CEP: </label>
      <input value={cepInput} onChange={(e) => setCepInput(e.target.value)}/>
      <button onClick={buscarCep}>Consultar</button>

      {erro && <p className="erro">{erro}</p>}

      {endereco && !erro && (
                <p>
                    CEP: {printCep}
                    <br/>Rua: {endereco.logradouro}
                    <br/>Bairro: {endereco.bairro}
                    <br/>Localidade: {endereco.localidade}
                    <br/>UF: {endereco.uf}
                    <br/>IBGE: {endereco.ibge}
                </p>
            )}
    </div>
  );
}

export default App;
