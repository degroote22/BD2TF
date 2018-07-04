import { autoSubscribe, AutoSubscribeStore, StoreBase } from "resub";
import HistoryManager from "src/singletons/HistoryManager";
import { LoginPossibilities } from "../utils/types";

@AutoSubscribeStore
class AuthManager extends StoreBase {
  private auth = LoginPossibilities.anonimo;
  public setAuth(auth: LoginPossibilities) {
    this.auth = auth;
    this.trigger();
    HistoryManager.goHome();
  }
  @autoSubscribe
  public getAuth() {
    return this.auth;
  }
}

export default new AuthManager();
