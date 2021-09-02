import { Log } from "../../SSLog"
import SessionWeb from './SessionWeb';
export const create=(sessionConfig, store, insertInReducer)=>{
    return new SessionWeb(sessionConfig, store, insertInReducer);
}
