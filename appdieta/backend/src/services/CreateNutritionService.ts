import { GoogleGenerativeAI } from '@google/generative-ai';
import { DataProps } from '../controllers/CreateNutritionController';

class CreateNutritionService {
    async execute({ age, name, weight, level, objective, gender, height }: DataProps) {
        try {
            const genAi = new GoogleGenerativeAI(process.env.API_KEY!);
            const model = await genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

            const response = await model.generateContent(`Crie uma dieta completa para uma pessoa com nome: ${name} do sexo ${gender} com peso atual: ${weight}kg, altura: ${height}cm, idade: ${age} anos e com foco em ${objective}. Atualmente nível de atividade: ${level}. Ignore qualquer outro parâmetro que não seja os passados. Retorne em JSON com as respectivas propriedades: propriedade nome o nome da pessoa, propriedade sexo com sexo, propriedade idade, propriedade altura, propriedade peso, propriedade objetivo com o objetivo atual, e propriedade refeições com um array contendo dentro cada objeto uma refeição da dieta. Dentro de cada refeição, a propriedade horário com horário da refeição, propriedade nome com o nome e a propriedade alimentos com um array contendo os alimentos dessa refeição. Inclua também uma propriedade como suplementos contendo um array com sugestão de suplemento indicado para o sexo dessa pessoa e o objetivo dela. Não retorne nenhuma observação além das passadas no prompt, retorne em JSON e nenhuma propriedade pode ter acento.`);

            console.log(JSON.stringify(response, null, 2));

            if (response.response && response.response.candidates) {
                const jsonText = response.response.candidates[0]?.content.parts[0]?.text as string;
                return { data: jsonText };
            } else {
                throw new Error("Resposta não contém candidatos válidos.");
            }
        } catch (err) {
            console.error("Erro JSON: ", err);
            throw new Error("Falha ao criar.");
        }
    }
}

export { CreateNutritionService };
