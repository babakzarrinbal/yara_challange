import { useMutation } from "@apollo/client";
import { warehouses as warehousesGQL } from "../../graphql";
import { useState } from "react";

interface CreateWarehouseProps {
  refetch: () => void;
}

export const CreateWarehouse: React.FC<CreateWarehouseProps> = ({
  refetch,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [createWarehouse, { error, loading }] = useMutation(
    warehousesGQL.createWarehouse,
    {
      onCompleted: () => {
        setIsCollapsed(true);
        refetch();
      },
    }
  );

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const createWarehouseInput = {
        name,
        description,
        size,
      };

      const result = await createWarehouse({
        variables: { createWarehouseInput },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <p>loading...</p>
  ) : error ? (
    <p>Error adding warehouse.</p>
  ) : (
    <div className="card">
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="card-header"
        id="headingOne"
      >
        <h2 className="mb-0">
          <button
            className="btn btn-link"
            type="button"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Add Warehouse
          </button>
        </h2>
      </div>
      {!isCollapsed && (
        <div
          id="collapseOne"
          className="collapse show"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >
          <div className="card-body">
            <form className="mb-3" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="warehouseName" className="form-label">
                  Warehouse Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="warehouseName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="warehouseDescription" className="form-label">
                  Warehouse Description
                </label>
                <textarea
                  className="form-control"
                  id="warehouseDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="warehouseSize" className="form-label">
                  Warehouse Size
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="warehouseSize"
                  value={size}
                  min={0}
                  onChange={(e) => setSize(Number(e.target.value))}
                />
              </div>
              <button type="submit" className="btn btn-success">
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateWarehouse;
