import From from "@/components/From";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-5  mt-4 rounded-sm">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-semibold">Users From</h1>
      </div>
      <div className="flex items-center justify-center h-screen">
        <From />
      </div>
    </div>
  );
};

export default Home;
