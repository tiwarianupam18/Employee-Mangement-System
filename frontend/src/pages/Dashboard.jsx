import MainLayout from "../layout/MainLayout";
import { getUser } from "../utils/auth";

function Dashboard() {
  const user = getUser();

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold">Welcome {user?.name}</h1>

      <p className="mt-2 text-gray-600">Role: {user?.role}</p>
    </MainLayout>
  );
}

export default Dashboard;
