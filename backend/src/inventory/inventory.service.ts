import {
  Injectable,
  NotFoundException,
  // ConflictException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { WarehouseService } from 'src/warehouse/warehouse.service';
import { ProductService } from 'src/product/product.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { InventoryInput } from './dto/inventory.input';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    private warehouseService: WarehouseService,
    private productService: ProductService,
  ) {}

  async validateAction(
    productId: string,
    warehouseId: string,
    qty: number,
    actionType: 'import' | 'export',
  ): Promise<Inventory> {
    // validate items and api call for calculation of inventory
    const warehouse = await this.warehouseService.findOne(warehouseId);
    if (!warehouse) {
      throw new NotFoundException('Warehouse not found');
    }
    const product = await this.productService.findOne(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    // check if warehouse has isHasourdous product and the product is hazardous
    // hazardous, check if warehouse has hazardous storage
    // check if warehouse has enough space for the product
    const inventory = this.inventoryRepository.create({
      warehouse,
      product,
      qty,
      type: actionType,
    });

    return inventory;
  }

  async importAction(importInventoryInput: InventoryInput): Promise<Inventory> {
    const inventory = this.inventoryRepository.create({
      ...importInventoryInput,
      type: 'import',
    });
    return await this.inventoryRepository.save(inventory);
  }

  async exportAction(exportInventoryInput: InventoryInput): Promise<Inventory> {
    const inventory = this.inventoryRepository.create({
      ...exportInventoryInput,
      type: 'export',
    });
    return await this.inventoryRepository.save(inventory);
  }

  async findAll(): Promise<Inventory[]> {
    return await this.inventoryRepository.find({
      order: { timestamp: 'DESC' },
      relations: ['product', 'warehouse'],
    });
  }
}
