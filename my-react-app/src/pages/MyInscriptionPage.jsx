import SectionListInscriptions from "../components/SectionListInscriptions";

const MyInscriptionsPage = () => (
  <div className="min-h-screen bg-light-gradient dark:bg-dark-gradient flex flex-col">
    <div className="flex-1 flex items-center justify-center w-full p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-4 lg:w-[800px]">
        <SectionListInscriptions />
      </div>
    </div>
  </div>
  
);

export default MyInscriptionsPage;