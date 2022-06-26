import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Item } from 'src/entities/Item.model';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: EntityRepository<Item>,
  ) {}
  async create(
    createItemInput: CreateItemInput,
  ): Promise<{ data: Item; error: Error }> {
    try {
      const item = this.itemRepository.create(createItemInput);
      if (!item) {
        throw new Error('Item not created');
      }
      await this.itemRepository.persistAndFlush(item);

      return {
        data: item,
        error: undefined,
      };
    } catch (error) {
      return {
        data: undefined,
        error,
      };
    }
  }

  async findAll(): Promise<{ data: Item[]; error: Error }> {
    try {
      const items = await this.itemRepository.findAll({ populate: true });
      console.log({ items });
      if (!items) {
        throw new Error('Items not found');
      }
      return {
        data: items,
        error: undefined,
      };
    } catch (error) {
      return {
        data: undefined,
        error,
      };
    }
  }

  async findOne(id: string): Promise<{ data: Item; error: Error }> {
    try {
      const item = await this.itemRepository.findOne(id, { populate: true });
      if (!item) {
        throw new Error('Item not found');
      }
      return {
        data: item,
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
    updateItemInput: UpdateItemInput,
  ): Promise<{ data: Item; error: Error }> {
    try {
      const item = await this.itemRepository.findOne(id);
      if (!item) {
        throw new Error('Item does not exist');
      }
      wrap(item).assign(updateItemInput);
      await this.itemRepository.flush();
      return {
        data: item,
        error: undefined,
      };
    } catch (error) {
      return {
        data: undefined,
        error,
      };
    }
  }

  async remove(id: string): Promise<{ data: Item; error: Error }> {
    try {
      const item = await this.itemRepository.findOne(id);
      if (!item) {
        throw new Error('Item does not exist');
      }
      await this.itemRepository.remove(item).flush();
      return {
        data: item,
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
