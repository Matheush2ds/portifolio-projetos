import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateNutritionService } from '../services/CreateNutritionService';

export interface DataProps {
    name: string;
    weight: string;
    height: string;
    age: string;
    gender: string;
    objective: string;
    level: string;
}

class CreateNutritionController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { name, weight, height, age, gender, objective, level } = request.body as DataProps;

            const createNutrition = new CreateNutritionService();
            const nutrition = await createNutrition.execute({
                name,
                weight,
                height,
                age,
                gender,
                objective,
                level,
            });

            reply.send(nutrition);
        } catch (err) {
            reply.code(500).send({ error: 'Failed to process request' });
        }
    }
}

export { CreateNutritionController };
