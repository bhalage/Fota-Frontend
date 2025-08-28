import { useEffect, useState } from 'react';
import NewVariantDrawer from '../components/NewVariantDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { addNewVariant, getVariants } from '../services/variantService';
import {selectVariants, selectVariantsError, selectVariantsLoading } from '../redux/variantSelector';
import VariantTable from '../components/VariantTable';

const Variant = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [variant, setVariant] = useState({
    name: "",
    description: "",
    modelId: ""
  });

  const dispatch = useDispatch();
  const variantsData = useSelector(selectVariants);
  const loading=useSelector(selectVariantsLoading);
  const error=useSelector(selectVariantsError);
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addNewVariant({
      "variantName": variant.name,
      "description": variant.description,
      "modelIdToAddVariant": variant.modelId
    }));
console.log(variant)
    // reset state & close drawer
    setVariant({ name: "", description: "", modelId: "" });
    setDrawerOpen(false);
  };

  useEffect(() => {
    dispatch(getVariants());
  }, [dispatch]);

  useEffect(() => {
    console.log("Variants from Redux:", variantsData);
  }, [variantsData]);

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">All Variants</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setDrawerOpen(true)}
        >
          + New Variant
        </button>
      </div>
    {loading && <p>Loading Variants....</p>}
    {error && <p className='text-red-500'>Error:{error}</p>}
    <VariantTable data={variantsData || []} />

      {/* {loading ?<>Variant Loading...</>:<VariantTable data={variantsData || []} />} */}

      <NewVariantDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        variant={variant}
        setVariant={setVariant}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Variant;
