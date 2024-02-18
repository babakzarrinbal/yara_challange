import { gql } from "@apollo/client";
export const createWarehouse = gql`
  mutation createWarehouse($name: String!, $description: String!, $size: Int!) {
    createProduct(name: $name, description: $description, size: $size) {
      id
      name
      description
      size
    }
  }
`;

export const getWarehouses = gql`
  {
    warehouses {
      id
      name
      description
      size
    }
  }
`;
