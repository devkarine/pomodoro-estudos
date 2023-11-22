import { useState } from "react";
import { Cronometro } from "../components/Cronometro";
import { Form } from "../components/Form";
import { List } from "../components/List";
import style from "./App.module.scss";
import { TarefasProps } from "../types/tarefa";

function App() {
  const [tarefas, setTarefas] = useState<TarefasProps[]>([]);
  const [selecionado, setSelecionado] = useState<TarefasProps>();

  const selecionaTarefa = (tarefaSeleciona: TarefasProps) => {
    setSelecionado(tarefaSeleciona);
    setTarefas((tarefasAnteriores) =>
      tarefasAnteriores.map((tarefa) => ({
        ...tarefa,
        selecionado: tarefa.id === tarefaSeleciona.id ? true : false,
      }))
    );
  };

  const finalizarTarefa = () => {
    if (selecionado) {
      setSelecionado(undefined);
      setTarefas((tarefasAnteriores) =>
        tarefasAnteriores.map((tarefa) => {
          if (tarefa.id === selecionado.id) {
            return {
              ...tarefa,
              selecionado: false,
              completado: true,
            };
          }
          return tarefa;
        })
      );
    }
  };
  return (
    <div className={style.AppStyle}>
      <Form setTarefas={setTarefas} />
      <List tarefas={tarefas} selecionaTarefa={selecionaTarefa} />
      <Cronometro selecionado={selecionado} finalizarTarefa={finalizarTarefa} />
    </div>
  );
}

export default App;
