import { createBrowserHistory } from "history";

const CADASTRO = "/cadastro";
const MEDICO = "/medico";
const USUARIO = "/usuario";
const PACIENTE = "/paciente";
export const Routes = {
  ajuda: { index: "/ajuda" },
  login: { index: "/login" },

  home: { index: "/" },
  logoff: { index: "/logoff" },
  cadastro: {
    index: CADASTRO,
    medico: { index: CADASTRO + "/medico" },
    usuario: { index: CADASTRO + "/usuario" },
    paciente: { index: CADASTRO + "/paciente" }
  },
  medico: {
    index: MEDICO,
    editar: { index: MEDICO + "/editar" },
    ver: { index: MEDICO + "/ver" }
  },
  paciente: {
    index: PACIENTE,
    editar: { index: PACIENTE + "/editar" },
    ver: { index: PACIENTE + "/ver" }
  },
  usuario: {
    index: USUARIO,
    editar: { index: USUARIO + "/editar" },
    ver: { index: USUARIO + "/ver" }
  }
};

export const titles = {
  "/ajuda": "Ajuda",
  "/login": "Login",
  "/logoff": "Logoff",
  "/": "Bem vindo!",
  "/cadastro": "Cadastro",
  "/cadastro/medico": "Cadastro de médico",
  "/cadastro/usuario": "Cadastro de usuário",
  "/cadastro/paciente": "Cadastro de paciente",
  "/medico": "Painel de médico",
  "/medico/editar": "Médico - Editar",
  "/medico/ver": "Médico - Ver",
  "/usuario": "Painel de usuário",
  "/usuario/editar": "Usuário - Editar",
  "/usuario/ver": "Usuário - Ver",
  "/paciente": "Painel de paciente",
  "/paciente/editar": "Paciente - Editar",
  "/paciente/ver": "Paciente - Ver"
};

class HistoryManagerBase {
  private history = createBrowserHistory();

  public getHistory = () => this.history;

  public goHome = () => this.history.push(Routes.home.index);
}

export default new HistoryManagerBase();
