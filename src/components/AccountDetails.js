import { RiEditBoxFill } from "react-icons/ri";

const fields = [
  { title: "Name", content: "John Doe", id: "name" },
  { title: "Email", content: "johndoe@example.com", id: "email" },
  { title: "Password", content: "********", id: "password" },
  { title: "Phone Number", content: "+1 (123) 456-7890", id: "phone" },
  {
    title: "Address",
    content: "123 Main St, City, State, Country",
    id: "address",
  },
];

const AccountDetails = () => {
  return (
    <div className="mt-10">
      <div className="bg-white p-6 rounded-lg shadow">
        {fields.map((field) => (
          <div
            key={field.id}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <p className="text-sm font-normal">{field.title}</p>
              <p className="mt-1 text-lg font-semibold">{field.content}</p>
            </div>
            <button className="flex items-center bg-transparent border border-mintGreen text-black font-medium text-sm px-4 py-3 rounded-md">
              <RiEditBoxFill className="mr-1" />
              Change
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountDetails;
