import { Despesa } from "../../domain/despesa";

export interface ChatRepository {
    open(transactions: Despesa[], uid: string, userName: string, messageUser: string): Promise<any>;
}