import AppDataSource from '../../data-source';
import { Request, Response } from 'express';
import { Applicant } from '../entity/Applicants.entity';
import { TaskBased } from '../entity/TaskBased.entity';

export class TaskBasedController {
  private taskgrainedRepository = AppDataSource.getRepository(TaskBased);

  async allTaskBased(_: Request, response: Response) {
    try {
      const taskgraineds = this.taskgrainedRepository.find();
      response.status(201).json({
        status: true,
        message: `taskgrained successfully fetched`,
        data: taskgraineds,
      });
      return;
    } catch (error) {
      console.log(error);
      response.status(500).json({
        status: false,
        message: 'server error',
        error: error,
      });
    }
  }

  async oneTaskBased(request: Request, response: Response) {
    try {
      const id = request.params.id;

      const taskgrained = await this.taskgrainedRepository.findOne({
        where: { id },
      });

      if (!taskgrained) {
        return 'unregistered taskgrained';
      }
      return taskgrained;
    } catch (error) {
      console.log(error);
      response.status(500).json({
        status: false,
        message: 'server error',
        error: error,
      });
    }
  }

  async saveTaskBased(request: Request, response: Response) {
    try {
      const taskgrained = Object.assign(new Applicant(), {
        ...request.body,
      });

      const savedApplicant = await this.taskgrainedRepository.save(taskgrained);
      response.status(201).json({
        status: true,
        message: `taskgrained successfully created click on the`,
        data: savedApplicant,
      });
      return;
    } catch (error) {
      console.log(error);
      response.status(500).json({
        status: false,
        message: 'server error',
        error: error,
      });
    }
  }

  async removeTaskBased(request: Request<{ id: string }>, response: Response) {
    try {
      const id = request.params.id;

      const taskgrainedToRemove = await this.taskgrainedRepository.findOneBy({
        id,
      });

      if (!taskgrainedToRemove) {
        return 'this taskgrained not exist';
      }

      await this.taskgrainedRepository.remove(taskgrainedToRemove);

      response.status(201).send('taskgrained deleted successfully');
      return;
    } catch (error) {
      response.status(500).json({
        status: false,
        message: 'server error',
        error: error,
      });
    }
  }
}