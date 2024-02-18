import { gql } from "@apollo/client";
export const createWarehouse = gql`
  mutation createWarehouse($createWarehouseInput: CreateWarehouseInput!) {
    createWarehouse(createWarehouseInput: $createWarehouseInput) {
      id
      name
      description
      size
    }
  }
`;

export const getWarehouses = gql`
  query GetWarehouses {
    warehouses {
      id
      name
      description
      size
    }
  }
`;

export const removeWarehouse = gql`
  mutation removeWarehouse($id: String!) {
    removeWarehouse(id: $id) {
      name
    }
  }
`;