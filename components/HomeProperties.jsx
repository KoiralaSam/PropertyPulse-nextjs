import connectDB from "@/config/db";
import Property from "@/models/Property";
import PropertyCard from "./propertyCard";
import Link from "next/link";
const HomeProperties = async () => {
  await connectDB();
  const recentProperties = await Property.find({ }).sort({createdAt: -1}).limit(3).lean();
  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          {recentProperties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentProperties.map((property, index) => {
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
        </div>
      </section>
      <section className="m-auto max-w-lg my-6 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
