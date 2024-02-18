import { useQuery, useMutation } from "@apollo/client";
import * as gql from "../../graphql";
import { Warehouse, Warehouses } from "../../types/warehouses";
import CreateWarehouse from "./create";

const WarehousesList = () => {
  const { data, error, refetch } = useQuery<Warehouses>(
    gql.warehouses.getWarehouses
  );
  const [removeWarehouse] = useMutation(gql.warehouses.removeWarehouse, {
    onCompleted: () => {
      refetch();
    },
  });
  return (
    <div className="container">
      <CreateWarehouse refetch={refetch} />
      {error ? (
        <p>Error loading warehouses.</p>
      ) : (
        <div className="row mt-3 ">
          {data?.warehouses?.map((warehouse: Warehouse) => (
            <div key={warehouse.id} className="col-sm-12  mb-4 d-flex">
              <div className="card flex-fill ">
                <button
                  className="btn btn-danger position-absolute top-0 end-0 m-2"
                  style={{ fontSize: "1.5rem" }}
                  onClick={() =>
                    removeWarehouse({ variables: { id: warehouse.id } })
                  }
                >
                  &times;
                </button>
                <div className="card-body text-start">
                  <h5 className="card-title text-start">
                    Name: {warehouse.name}
                  </h5>
                  <h6 className="card-title ">
                    Description: {warehouse.description}
                  </h6>
                  <p className="card-text ">Size: {warehouse.size}</p>
                </div>
              </div>
            </div>
          )) || "Loading..."}
        </div>
      )}
    </div>
  );
};

export default WarehousesList;
