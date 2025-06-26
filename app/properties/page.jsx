import PropertyCard from "@/components/propertyCard";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import Pagination from "@/components/Pagination";

const PropertiesPage = async ({ searchParams }) => {
  const { page = 1, pageSize = 9 } = await searchParams;

  await connectDB();

  const skip = (page - 1) * pageSize;
  const total = await Property.countDocuments({});

  const properties = await Property.find({}).skip(skip).limit(pageSize);
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property, index) => {
              console.log(property.name);
              return (
                <PropertyCard
                  key={property._id}
                  property={property}
                  isAboveFold={index < 6}
                />
              );
            })}
          </div>
        )}
        {total > pageSize && (
          <Pagination
            page={parseInt(page)}
            pageSize={parseInt(pageSize)}
            totalItems={parseInt(total)}
          />
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
