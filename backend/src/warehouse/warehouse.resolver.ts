import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WarehouseService } from './warehouse.service';
import { Warehouse } from './entities/warehouse.entity';
import { CreateWarehouseInput } from './dto/create-warehouse.input';
import { UpdateWarehouseInput } from './dto/update-warehouse.input';

@Resolver(() => Warehouse)
export class WarehouseResolver {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Mutation(() => Warehouse)
  createWarehouse(
    @Args('createWarehouseInput') createWarehouseInput: CreateWarehouseInput,
  ): Promise<Warehouse> {
    return this.warehouseService.create(createWarehouseInput);
  }

  @Query(() => [Warehouse], { name: 'warehouses' })
  findAll() // @Args('limit', { type: () => Number, nullable: true }) limit?: number,
  // @Args('offset', { type: () => Number, nullable: true }) offset?: number,
  : Promise<Warehouse[]> {
    return this.warehouseService
      .findAll
      // limit, offset
      ();
  }

  @Query(() => Warehouse, { name: 'warehouse' })
  findOne(@Args('id') id: string): Promise<Warehouse> {
    return this.warehouseService.findOne(id);
  }

  @Mutation(() => Warehouse)
  updateWarehouse(
    @Args('updateWarehouseInput') updateWarehouseInput: UpdateWarehouseInput,
  ) {
    return this.warehouseService.update(
      updateWarehouseInput.id,
      updateWarehouseInput,
    );
  }

  @Mutation(() => Warehouse)
  removeWarehouse(@Args('id') id: string) {
    return this.warehouseService.remove(id);
  }
}
