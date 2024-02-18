import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWarehouseInput } from './dto/create-warehouse.input';
import { UpdateWarehouseInput } from './dto/update-warehouse.input';
import { Warehouse } from './entities/warehouse.entity';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
  ) {}

  async create(createWarehouseInput: CreateWarehouseInput) {
    const warehouse =
      await this.warehouseRepository.create(createWarehouseInput);
    return await this.warehouseRepository.save(warehouse);
  }

  async findAll() {
    // limit: number = 10, offset: number = 0
    return await this.warehouseRepository.find({
      // take: limit,
      // skip: offset,
    });
  }

  async findOne(id: string) {
    return await this.warehouseRepository.findOne({ where: { id } });
  }

  async update(id: string, updateWarehouseInput: UpdateWarehouseInput) {
    const warehouse = await this.warehouseRepository.findOne({ where: { id } });
    if (!warehouse) {
      throw new Error(`Warehouse with id ${id} not found`);
    }
    Object.assign(warehouse, updateWarehouseInput);
    return await this.warehouseRepository.save(warehouse);
  }

  async remove(id: string) {
    const warehouse = await this.warehouseRepository.findOne({ where: { id } });
    if (!warehouse) {
      throw new Error(`Warehouse with id ${id} not found`);
    }
    return await this.warehouseRepository.remove(warehouse);
  }
}
