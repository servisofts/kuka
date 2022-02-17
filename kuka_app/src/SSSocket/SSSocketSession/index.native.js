import { Log } from "../../SSLog"

import SessionMobile from './SessionMobile';
export const create=(sessionConfig, store, insertInReducer)=>{
    return new SessionMobile(sessionConfig, store, insertInReducer);
}