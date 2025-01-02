import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loding, setLoading] = useState(true);

  const authStatus = useSelector((state) => state.auth.status);
  const authData = useSelector((state) => state.auth.userData);

  // console.log("auth checking : ", authentication, authStatus, authData);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/auth/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoading(false);
  }, [authStatus, navigate, authentication]);

  return loding ? (
    <div className="w-screen h-40 flex align-middle justify-center">
      <h2>Loading</h2>
    </div>
  ) : (
    <>{children}</>
  );
};

export default Protected;
