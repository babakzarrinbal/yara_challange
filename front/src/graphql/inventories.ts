import { gql } from "@apollo/client";
export const exportAction = gql`
  mutation exportAction(
    $name: String!
    $description: String!
    $size: Int!
    $isHazardous: Boolean!
  ) {
    createProduct(
      name: $name
      description: $description
      size: $size
      isHazardous: $isHazardous
    ) {
      id
      name
      description
      size
      isHazardous
    }
  }
`;

export const importAction = gql`
  mutation importAction(
    $productId: String!
    $warehouseId: String!
    $qty: Int!
  ) {
    createProduct(productId: $productId, warehouseId: $warehouseId, qty: $qty) {
      id
      product {
        id
      }
      warehouse {
        id
      }
      qty
    }
  }
`;

export const getInventories = gql`
  {
    inventories {
      id
      product {
        id
        name
        description
        isHazardous
        size
      }
      warehouse {
        id
        name
        description
        size
      }
      qty
    }
  }
`;
