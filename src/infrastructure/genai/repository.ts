import { ChatRepository } from "../../application/repositores/chat-repository";
import { Despesa } from "../../domain/despesa";
import { ai } from '../genai/connection';
import { v4 as uuidv4 } from 'uuid';

interface MyState {
    transactions: Despesa[];
}

export class RepositoryAI implements ChatRepository {
    async open(transactions: Despesa[], uid: string, userName: string, messageUser: string): Promise<any> {
        const session = ai.createSession<MyState>({
            initialState: { transactions: transactions },
        });

        const sessionId = uuidv4();

        const prompt = `
            Olá, ${userName}! Eu sou a Gal, sua conselheira financeira virtual. Estou aqui para ajudar com os seguintes assuntos:
            - Análise de gastos e receitas
            - Sugestões de economia
            - Planejamento financeiro
            - Respostas a dúvidas sobre finanças pessoais
            
            Como posso te ajudar hoje?

            **Transações fornecidas pela usuária:**
            ${JSON.stringify(transactions, null, 2)}

            **Instrução da Usuária:** ${messageUser}

            **Diretrizes para resposta:**
            1. **Seja concisa e clara:** Responda diretamente ao que foi perguntado, sem introduções desnecessárias.
            2. **Foque no contexto:** Use os dados fornecidos para elaborar respostas úteis e contextuais.
            3. **Inclua cálculos claros:** Apresente cálculos de forma simples e compreensível, apenas quando necessário.
            4. **Dê sugestões práticas:** Ofereça dicas rápidas e úteis, relacionadas ao contexto da pergunta.
            5. **Evite redundâncias:** Não repita informações ou forneça respostas fora do escopo solicitado.
            6. **Respeite limites:** 
               - Perguntas ofensivas: "Não posso responder a essa pergunta."
               - Perguntas irrelevantes a finanças: "Essa pergunta não parece está relacionada a finanças, então não conseguirei responder por aqui."
            7. Para perguntas gerais, baseie-se em boas práticas financeiras e tendências de mercado.

            **Exemplo de resposta:**
            - Pergunta: "Quanto gasto com transporte por mês?"
              Resposta: "Você gastou R$ 200,00 com transporte no mês de janeiro."
            - Pergunta: "Se eu reduzir meus gastos em 10%, quanto consigo poupar em um ano?"
              Resposta: "Reduzindo seus gastos em 10%, você economizaria R$ 155,08 por mês, ou aproximadamente R$ 1861,00 por ano."
        `;

        const chat = session.chat();

        const messages: Array<{ content: string, timestamp: string }> = [];

        const { text } = await chat.send(prompt);

        messages.push({
            content: text,
            timestamp: new Date().toISOString(),
        });

        return {
            sessionId,
            userId: uid,
            userName: userName,
            messages: messages,
        };
    }
}
