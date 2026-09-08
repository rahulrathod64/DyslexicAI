import Brain from "@/components/brain";
import Button from "@/components/button";
import Services from "@/components/services";

export default function Home() {  
  return (
    <>
    <div className=" text-white font-sans min-h-screen">
      <div className="flex flex-col lg:flex-row items-center justify-between w-[90%] mx-auto py-12 ">
        {/* Left Section */}
        <div className="w-full lg:w-[50%] space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-md">
            Dyslexi Ai
          </h1>
          <p className="text-xl text-gray-300 max-w-md">
            Early Detection and Therapy for Dyslexia using AI
          </p>
          <Button props={'welcome'}/>
          
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[60%] mt-10 lg:mt-0 ">
          <div className="rounded-3xl shadow-xl h-[70vh] flex justify-center  shadow-purple-700/50 ">
              <Brain/>
          </div>
        </div>
      </div>
    </div>
    <Services/>
    </>
  );
}


{/* <div className="min-h-screen bg-black text-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            Our Services
          </h1>
          <p className="text-center text-gray-300 mb-10">
            DyslexiAI offers a comprehensive suite of tools and experiences to empower children, parents, and educators in the early detection and personalized therapy of dyslexia.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-700 rounded-2xl shadow-lg p-1"
              >
                <Card className="bg-black text-white rounded-2xl h-full">
                  <CardContent className="p-5">
                    <h2 className="text-xl font-semibold mb-2 text-purple-400">
                      {service.title}
                    </h2>
                    <p className="text-sm text-gray-300">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div> */}

      