import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseResolver } from './warehouse.resolver';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseInput } from './create-warehouse.input';
import { UpdateWarehouseInput } from './update-warehouse.input';
import { Warehouse } from './warehouse.entity';

describe('WarehouseResolver', () => {
  let resolver: WarehouseResolver;
  let warehouseService: WarehouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarehouseResolver, WarehouseService],
    }).compile();

    resolver = module.get<WarehouseResolver>(WarehouseResolver);
    warehouseService = module.get<WarehouseService>(WarehouseService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createWarehouse', () => {
    it('should create a new warehouse', async () => {
      const createWarehouseInput: CreateWarehouseInput = {
        // Provide the necessary input values for testing
      };

      const createdWarehouse: Warehouse = {
        // Provide the expected created warehouse object
      };

      jest
        .spyOn(warehouseService, 'create')
        .mockResolvedValue(createdWarehouse);

      const result = await resolver.createWarehouse(createWarehouseInput);

      expect(result).toEqual(createdWarehouse);
      expect(warehouseService.create).toHaveBeenCalledWith(
        createWarehouseInput,
      );
    });
  });

  describe('findAll', () => {
    it('should return all warehouses', async () => {
      const limit = 10;
      const offset = 0;
      const warehouses: Warehouse[] = [
        // Provide the expected array of warehouses
      ];

      jest.spyOn(warehouseService, 'findAll').mockResolvedValue(warehouses);

      const result = await resolver.findAll(limit, offset);

      expect(result).toEqual(warehouses);
      expect(warehouseService.findAll).toHaveBeenCalledWith(limit, offset);
    });
  });

  describe('findOne', () => {
    it('should return a warehouse by ID', async () => {
      const id = '123';
      const warehouse: Warehouse = {
        // Provide the expected warehouse object
      };

      jest.spyOn(warehouseService, 'findOne').mockResolvedValue(warehouse);

      const result = await resolver.findOne(id);

      expect(result).toEqual(warehouse);
      expect(warehouseService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('updateWarehouse', () => {
    it('should update a warehouse', async () => {
      const updateWarehouseInput: UpdateWarehouseInput = {
        // Provide the necessary input values for testing
      };

      const updatedWarehouse: Warehouse = {
        // Provide the expected updated warehouse object
      };

      jest
        .spyOn(warehouseService, 'update')
        .mockResolvedValue(updatedWarehouse);

      const result = await resolver.updateWarehouse(updateWarehouseInput);

      expect(result).toEqual(updatedWarehouse);
      expect(warehouseService.update).toHaveBeenCalledWith(
        updateWarehouseInput.id,
        updateWarehouseInput,
      );
    });
  });

  describe('removeWarehouse', () => {
    it('should remove a warehouse', async () => {
      const id = '123';

      jest.spyOn(warehouseService, 'remove').mockResolvedValue(undefined);

      const result = await resolver.removeWarehouse(id);

      expect(result).toBeUndefined();
      expect(warehouseService.remove).toHaveBeenCalledWith(id);
    });
  });
});
