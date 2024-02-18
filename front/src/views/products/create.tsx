import { useMutation } from "@apollo/client";
import { products as productsGQL } from "../../graphql";
import { useState } from "react";

interface CreateProductProps {
  refetch: () => void;
}

export const CreateProduct: React.FC<CreateProductProps> = ({ refetch }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState(0);
  const [isHazardous, setIsHazardous] = useState(false);
  const [createProduct, { error, loading }] = useMutation(
    productsGQL.createProduct,
    {
      onCompleted: () => {
        refetch();
      },
    }
  );

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const createProductInput = {
        name,
        description,
        size,
        isHazardous,
      };

      const result = await createProduct({ variables: { createProductInput } });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <p>loading...</p>
  ) : error ? (
    <p>Error adding product.</p>
  ) : (
    <form className="mb-3" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="productName" className="form-label">
          Product Name
        </label>
        <input
          type="text"
          className="form-control"
          id="productName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="productDescription" className="form-label">
          Product Description
        </label>
        <textarea
          className="form-control"
          id="productDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="productSize" className="form-label">
          Product Size
        </label>
        <input
          type="number"
          className="form-control"
          id="productSize"
          value={size}
          min={0}
          onChange={(e) => setSize(Number(e.target.value))}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="productIsHazardous"
          checked={isHazardous}
          onChange={(e) => setIsHazardous(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="productIsHazardous">
          Is Hazardous?
        </label>
      </div>
      <button type="submit" className="btn btn-success">
        Add
      </button>
    </form>
  );
};

export default CreateProduct;
