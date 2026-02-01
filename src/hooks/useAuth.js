import useAuthStore from "../app/store";

const useAuth = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated;
};

export default useAuth;
