import Link from "next/link";

const Recommendation = ({ data }) => {
  return (
    <div className="col-span-3 p-2 rounded lg:col-span-2 dropdown dropdown-hover bg-primary-focus">
      <label
        tabIndex={0}
        className="flex items-center justify-center w-full h-full "
      >
        Recommendation
      </label>
      <div className="flex justify-center">
        <ul
          tabIndex={0}
          className="w-full p-2 shadow dropdown-content menu bg-base-100 rounded-box"
        >
          {data.length === 0 ? (
            <li>
              <a>No Recommendation</a>
            </li>
          ) : (
            data.map((el) => (
              <li key={el.id}>
                <Link href={`/${el.id}`}>{el.title}</Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Recommendation;
