import { createBrowserHistory } from "history";

const CADASTRO = "/cadastro";
export const Routes = {
  ajuda: { index: "/ajuda" },
  login: { index: "/login" },
  cadastro: {
    index: CADASTRO,
    medico: { index: CADASTRO + "/medico" },
    usuario: { index: CADASTRO + "/usuario" },
    paciente: { index: CADASTRO + "/paciente" }
  },
  home: { index: "/" }
};

class HistoryManagerBase {
  private history = createBrowserHistory();

  public getHistory = () => this.history;
}

export default new HistoryManagerBase();
