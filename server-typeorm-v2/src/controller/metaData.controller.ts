import AppDataSource from '../../data-source';
import { Request, Response } from 'express';
import { Metadata } from '../entity/Metadata.entity';
import { Job } from '../entity/Job.entity';

export class MetadataController {
  private metadataRepository = AppDataSource.getRepository(Metadata);
  private jobRepository = AppDataSource.getRepository(Job);

  async allMetaDatas(_: Request, response: Response) {
    try {
      const metaData = await this.metadataRepository.find();
      response.status(201).json({
        status: true,
        message: `metaDatas for this job`,
        data: metaData,
      });
      return;
    } catch (error) {
      response.status(500).json({
        status: false,
        message: 'server error',
        error: error,
      });
    }
  }

  async oneMetaData(request: Request, response: Response) {
    try {
      const id = request.params.id;
      const metaData = await this.metadataRepository.findOne({
        where: {
          id: id,
        },
      });
      response.status(201).json({
        status: true,
        message: `user metaData for this job post`,
        data: metaData,
      });
      return;
    } catch (error) {
      response.status(500).json({
        status: false,
        message: 'server error',
        error: error,
      });
    }
  }

  async saveMetaData(request: Request, response: Response) {
    try {
      const job = await this.jobRepository.findOne({
        where: { id: request.params.jobId },
      });

      if (!job) {
        response.status(500).json({
          status: 'error',
          message: 'job with id does not exist',
        });
        return;
      }
      const metadata = Object.assign(new Metadata(), {
        ...request.body,
      });

      const savedMetaData = await this.metadataRepository.save({
        ...metadata,
        job: job,
      });
      response.status(201).json({
        status: true,
        message: `meta data created successfully`,
        data: savedMetaData,
      });
      return;
    } catch (error) {
      response.status(500).json({
        status: false,
        message: 'server error',
        error: error,
      });
    }
  }

  async updateMetaData(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const metaData = await this.metadataRepository.findOne({
        where: { id },
      });
      if (!metaData) {
        return response.status(400).json('meta data not found');
      }
      metaData.atsName = request.body.atsName;
      metaData.employersName = request.body.employersName;
      const res = await this.metadataRepository.save(metaData);
      response.status(201).json({
        status: true,
        message: 'meta data changed successfully',
        data: res,
      });
      return;
    } catch (error) {
      response.status(500).json({
        status: false,
        message: 'server error',
        error: error,
      });
    }
  }

  async removeMetaData(request: Request<{ id: string }>, response: Response) {
    try {
      const id = request.params.id;
      const metaData = await this.metadataRepository.findOne({
        where: { id },
      });

      if (!metaData) {
        return response.status(400).send('metaData not found');
      }
      await this.metadataRepository.remove(metaData);
      response.status(201).send('job metadata deleted successfully');
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
