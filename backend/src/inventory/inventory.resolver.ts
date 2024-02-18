import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InventoryService } from './inventory.service';
import { Inventory } from './entities/inventory.entity';

@Resolver()
export class InventoryResolver {
  constructor(private readonly inventoryService: InventoryService) {}

  @Mutation(() => Inventory)
  async importAction(
    @Args('productId') productId: string,
    @Args('warehouseId') warehouseId: string,
    @Args('qty') qty: number,
  ) {
    const inventory = await this.inventoryService.validateAction(
      productId,
      warehouseId,
      qty,
      'import',
    );
    return this.inventoryService.importAction(inventory);
  }

  @Mutation(() => Inventory)
  async exportAction(
    @Args('productId') productId: string,
    @Args('warehouseId') warehouseId: string,
    @Args('qty') qty: number,
  ) {
    const inventory = await this.inventoryService.validateAction(
      productId,
      warehouseId,
      qty,
      'export',
    );

    return this.inventoryService.exportAction(inventory);
  }

  @Query(() => [Inventory], { name: 'inventories' })
  async getInventory() {
    return this.inventoryService.findAll();
  }
}
