import { useQuery, useMutation } from "@apollo/client";
import * as gql from "../../graphql";
import { Product, Products } from "../../types/products";
import CreateProduct from "./create";

const ProductsList = () => {
  const { data, error, refetch } = useQuery<Products>(gql.products.getProducts);
  const [removeProduct] = useMutation(gql.products.removeProduct, {
    onCompleted: () => {
      refetch();
    },
  });
  return (
    <div className="container">
      <CreateProduct refetch={refetch} />
      {error ? (
        <p>Error loading products.</p>
      ) : (
        <div className="row mt-3 ">
          {data?.products?.map((product: Product) => (
            <div key={product.id} className="col-sm-12  mb-4 d-flex">
              <div className="card flex-fill ">
                <button
                  className="btn btn-danger position-absolute top-0 end-0 m-2"
                  style={{ fontSize: "1.5rem" }}
                  onClick={() =>
                    removeProduct({ variables: { id: product.id } })
                  }
                >
                  &times;
                </button>
                <div className="card-body text-start">
                  <h5 className="card-title text-start">
                    Name: {product.name}
                  </h5>
                  <h6 className="card-title ">
                    Description: {product.description}
                  </h6>
                  <p className="card-text ">
                    Size: {product.size} <br />
                    {product.isHazardous ? "Hazardous" : "Non-hazardous"}
                  </p>
                </div>
              </div>
            </div>
          )) || "Loading..."}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
