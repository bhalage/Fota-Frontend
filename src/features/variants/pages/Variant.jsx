import { useEffect, useState } from 'react';
import NewVariantDrawer from '../components/NewVariantDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { addNewVariant, getVariants } from '../services/variantService';
import {selectVariants, selectVariantsError, selectVariantsLoading } from '../redux/variantSelector';
import VariantTable from '../components/VariantTable';
import { Button } from 'antd';

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


const handleSubmit = async () => {
  try {
    const result = await dispatch(
      addNewVariant({
        variantName: variant.name,
        description: variant.description,
        modelIdToAddVariant: variant.modelId,
      })
    ).unwrap(); // ✅ wait for result

    console.log("Variant added:", result);

    // ✅ refresh the variants list after successful add
    await dispatch(getVariants());

    // ✅ reset state & close drawer
    setVariant({ name: "", description: "", modelId: "" });
    setDrawerOpen(false);
  } catch (error) {
    console.error("Failed to add variant:", error);
  }
};

  useEffect(() => {
    dispatch(getVariants());
  }, [dispatch]);

  useEffect(() => {
    console.log("Variants from Redux:", variantsData);
  }, [variantsData]);

  return (
    <div className='relative'>
      <div className="flex justify-between items-center sticky top-0 bg-white z-10 px-4 py-4 shadow mb-4">
        <h1 className="text-2xl font-semibold">All Variants</h1>
        <Button
        type='primary'
          // className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setDrawerOpen(true)}
        >
          + New Vehicle Variant
        </Button>
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
