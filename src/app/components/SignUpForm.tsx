interface SignUpProps {
  email: string;
  setEmail: Function;
  createWallet: Function;
}

const SignUpForm: React.FC<SignUpProps> = ({
  email,
  setEmail,
  createWallet,
}) => {
  return (
    <>
      <div className="col-span-2 p-5">some stuff</div>
      <div className="col-span-3 p-5">
        <div className="bg-white shadow-md rounded p-8">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={(event) => createWallet()}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
