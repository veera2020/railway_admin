import LoginValidation from "./LoginValidation"
const Loginform = () => {
  return (
    <>
      <div class="min-h-screen flex flex-col items-center justify-center bg-gray-300">
        <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <div class="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
            Login To Admin Account
          </div>
          <LoginValidation />
        </div>
      </div>
    </>
  );
};
export default Loginform;
