import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {
	async create(request: Request, response: Response) {
		const { name, email } = request.body;

		const usersRepository = getCustomRepository(UsersRepository);

		const isEmailAlreadyUsed = await usersRepository.findOne({
			email,
		});

		if (isEmailAlreadyUsed) {
			return response.status(400).json({
				error: 'This e-mail is already used.',
			});
		}

		const user = usersRepository.create({
			name,
			email,
		});

		await usersRepository.save(user);

		return response.status(201).json(user);
	}
}

export { UserController };
