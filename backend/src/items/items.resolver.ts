import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { Item } from 'src/entities/Item.model';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  async createItem(@Args('createItemInput') createItemInput: CreateItemInput) {
    const { data, error } = await this.itemsService.create(createItemInput);
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  @Query(() => [Item], { name: 'items' })
  async findAll() {
    const { data, error } = await this.itemsService.findAll();
    console.log({ data, error });
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  @Query(() => Item, { name: 'item' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    const { data, error } = await this.itemsService.findOne(id);
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  @Mutation(() => Item)
  async updateItem(@Args('updateItemInput') updateItemInput: UpdateItemInput) {
    const { data, error } = await this.itemsService.update(
      updateItemInput.id,
      updateItemInput,
    );
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }

  @Mutation(() => Item)
  async removeItem(@Args('id', { type: () => String }) id: string) {
    const { data, error } = await this.itemsService.remove(id);
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return data;
  }
}
