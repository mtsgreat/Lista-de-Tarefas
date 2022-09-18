import React, { Component } from "react";
import "./Main.css";

import "./form";

import Form from "./form";
import Tarefas from "./Tarefas";


import { ChakraProvider } from '@chakra-ui/react'


import AlertError from "./AlertError";

export default class Main extends Component {
  state = {
    novaTarefa: "",
    tarefas: [],
    index: -1,
    isError: false
  
  };

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas"));

    if (!tarefas) return;

    this.setState({ tarefas });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if (tarefas === prevState.tarefas) return;

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (tarefas.indexOf(novaTarefa) !== -1) {return;
    } 

    if(novaTarefa === "") {
        this.setState({
          isError: true
        })
        return;
    }

    const novasTarefas = [...tarefas];

    if (index === -1) {
      this.setState({
        tarefas: [...novasTarefas, novaTarefa],
        novaTarefa: "",
      });
    } else {
      novasTarefas[index] = novaTarefa;

      this.setState({
        tarefas: [...novasTarefas],
        index: -1,
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  };

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);

    this.setState({
      tarefas: [...novasTarefas],
    });
  };

  handleEdit = (e, index) => {
    const { tarefas } = this.state;
    this.setState({
      index,
      novaTarefa: tarefas[index],
    });
  };

  render() {
    const { novaTarefa, tarefas, isError} = this.state;

    return (
        
        <ChakraProvider>
        <div className="main">
        <h1>Lista de tarefas</h1>

          {isError && 
            <AlertError />
          }    
        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={novaTarefa}
        />

        <Tarefas
          tarefas={tarefas}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />

        
      </div>
      </ChakraProvider>
    );
  }
}
