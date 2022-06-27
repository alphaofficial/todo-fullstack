import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StatusService } from './status.service';
import { CreateStatusInput } from './dto/create-status.input';
import { UpdateStatusInput } from './dto/update-status.input';
import { Status } from 'src/entities/Status.model';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(() => Status)
export class StatusResolver {
  constructor(private readonly statusService: StatusService) {}

  @Mutation(() => Status)
  async createStatus(
    @Args('createStatusInput') createStatusInput: CreateStatusInput,
  ) {
    const { data, error } = await this.statusService.create(createStatusInput);
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  @Query(() => [Status], { name: 'statuses' })
  async findAll() {
    const { data, error } = await this.statusService.findAll();
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  @Query(() => Status, { name: 'status' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    const { data, error } = await this.statusService.findOne(id);
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  @Mutation(() => Status)
  async updateStatus(
    @Args('updateStatusInput') updateStatusInput: UpdateStatusInput,
  ) {
    const { data, error } = await this.statusService.update(
      updateStatusInput.id,
      updateStatusInput,
    );
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  @Mutation(() => Status)
  async removeStatus(@Args('id', { type: () => String }) id: string) {
    const { data, error } = await this.statusService.remove(id);
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }
}
