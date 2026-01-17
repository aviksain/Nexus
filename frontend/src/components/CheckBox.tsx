function CheckBox({
  label=""
}) {
  return (
    <div className="mr-1 flex items-center">
      <input
        type="checkbox"
        id="checkbox-2"
        className="absolute h-6 w-6 cursor-pointer opacity-0 [&:checked+div]:bg-green-500 [&:checked+div_svg]:block"
        name="checkbox-2"
      />
      <div className="mr-2 flex h-6 w-6 flex-shrink-0 items-center justify-center border-[1px] border-white bg-transparent focus-within:border-white">
        <svg
          className="pointer-events-none hidden h-3 w-3 fill-current text-white"
          version="1.1"
          viewBox="0 0 17 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(-9 -11)" fill="#000000" fillRule="nonzero">
              <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z"></path>
            </g>
          </g>
        </svg>
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor="checkbox-2" className="text-sm font-medium text-white">
          {label}
        </label>
      </div>
    </div>
  );
}

export default CheckBox;
