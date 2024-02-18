import { gql } from "@apollo/client";
export const createProduct = gql`
  mutation createProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
      name
      description
      size
      isHazardous
    }
  }
`;

export const getProducts = gql`
  query GetProducts {
    products {
      id
      name
      description
      size
      isHazardous
    }
  }
`;

export const removeProduct = gql`
  mutation removeProduct($id: String!) {
    removeProduct(id: $id) {
      name
    }
  }
`;
