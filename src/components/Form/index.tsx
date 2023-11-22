import React, { useState } from "react";
import { Button } from "../Button";
import style from "./Formulario.module.scss";
import { TarefasProps } from "../../types/tarefa";
import { v4 as uuidv4 } from "uuid";

interface Props {
  setTarefas: React.Dispatch<React.SetStateAction<TarefasProps[]>>;
}

export const Form = ({ setTarefas }: Props) => {
  const [tarefa, setTarefa] = useState("");
  const [tempo, setTempo] = useState("00:00");

  const adicionarTarefa = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setTarefas((tarefasAntigas) => [
      ...tarefasAntigas,
      {
        tarefa,
        tempo,
        selecionado: false,
        completado: false,
        id: uuidv4(),
      },
    ]);
    setTarefa("");
    setTempo("00:00");
  };
  return (
    <form className={style.novaTarefa} onSubmit={adicionarTarefa}>
      <div className={style.inputContainer}>
        <label>Adicionar um novo estudo</label>
        <input
          type="text"
          name="tarefa"
          value={tarefa}
          onChange={(evento) => setTarefa(evento.target.value)}
          id="tarefa"
          placeholder="O que você quer estudar"
          required
        />
      </div>
      <div className={style.inputContainer}>
        <label>Tempo</label>
        <input
          type="time"
          step="1"
          value={tempo}
          onChange={(evento) => setTempo(evento.target.value)}
          name="tempo"
          id="tempo"
          min="00:00:00"
          max="01:30:00"
          placeholder="O que você quer estudar"
          required
        />
      </div>

      <Button type="submit">Adicionar</Button>
    </form>
  );
};
