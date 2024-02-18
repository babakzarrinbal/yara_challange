import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryResolver } from './inventory.resolver';
import { Inventory } from './entities/inventory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseModule } from 'src/warehouse/warehouse.module';
import { ProductModule } from 'src/product/product.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Inventory]),
    WarehouseModule,
    ProductModule,
  ],
  providers: [InventoryResolver, InventoryService],
})
export class InventoryModule {}
