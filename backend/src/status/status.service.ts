import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateStatusInput } from '../status/dto/create-status.input';
import { UpdateStatusInput } from '../status/dto/update-status.input';
import { Status } from '../entities/Status.model';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: EntityRepository<Status>,
  ) {}
  async create(
    createStatusInput: CreateStatusInput,
  ): Promise<{ data: Status; error: Error }> {
    try {
      const status = this.statusRepository.create(createStatusInput);
      if (!status) {
        throw new Error('Status not created');
      }
      await this.statusRepository.persistAndFlush(status);

      return {
        data: status,
        error: undefined,
      };
    } catch (error) {
      return {
        data: undefined,
        error,
      };
    }
  }

  async findAll(): Promise<{ data: Status[]; error: Error }> {
    try {
      const statuses = await this.statusRepository.findAll({ populate: true });
      if (!statuses) {
        throw new Error('Statuses not found');
      }
      return {
        data: statuses,
        error: undefined,
      };
    } catch (error) {
      return {
        data: undefined,
        error,
      };
    }
  }

  async findOne(id: string): Promise<{ data: Status; error: Error }> {
    try {
      const status = await this.statusRepository.findOne(id, {
        populate: true,
      });
      if (!status) {
        throw new Error('Status not found');
      }
      return {
        data: status,
        error: undefined,
      };
    } catch (error) {
      return {
        data: undefined,
        error,
      };
    }
  }

  async update(
    id: string,
    updateStatusInput: UpdateStatusInput,
  ): Promise<{ data: Status; error: Error }> {
    try {
      const status = await this.statusRepository.findOne(id);
      if (!status) {
        throw new Error('Status does not exist');
      }
      wrap(status).assign(updateStatusInput);
      await this.statusRepository.flush();
      return {
        data: status,
        error: undefined,
      };
    } catch (error) {
      return {
        data: undefined,
        error,
      };
    }
  }

  async remove(id: string): Promise<{ data: Status; error: Error }> {
    try {
      const status = await this.statusRepository.findOne(id);
      if (!status) {
        throw new Error('Status does not exist');
      }
      await this.statusRepository.remove(status).flush();
      return {
        data: status,
        error: undefined,
      };
    } catch (error) {
      return {
        data: undefined,
        error,
      };
    }
  }
}
