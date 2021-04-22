import {Request, Response} from "express"
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

// Detratores: 0-6, Passivos: 7-8, Promotores: 9-10
// ((P - D)/n) * 100
class NpsController {
    async execute(request: Request, response: Response){
        const {survey_id} = request.params;
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull())
        });
        const detractors = surveysUsers.filter(
            survey => survey.value >= 0 && survey.value <= 6 
        ).length;
        const passives = surveysUsers.filter(
            survey => survey.value >= 7 && survey.value <= 8 
        ).length; 
        const promoters = surveysUsers.filter(
            survey => survey.value >= 9 
        ).length;

        const totalAnswers = surveysUsers.length;

        const calc = Number((((promoters - detractors)/totalAnswers) * 100).toFixed(2));

        return response.json({
            detractors,
            promoters,
            passives,
            totalAnswers,
            nps: calc
        })
    }
}

export {NpsController};