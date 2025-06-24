import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import ConvertToSerializableObject from "@/utils/convertToObjects";

const PropertyEditPage = async ({ params }) => {
  const { id } = await params;
  await connectDB();
  const propertyDoc = await Property.findById(id).lean();
  const property = ConvertToSerializableObject(propertyDoc);

  if (!property) {
    throw new Error("Property not found");
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;
