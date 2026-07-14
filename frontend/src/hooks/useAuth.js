import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { loginSuccess, logout, setLoading } from "../features/auth/authSlice";

import { refreshAccessToken, getCurrentUser } from "../features/auth/authAPI";

function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        const refresh = await refreshAccessToken();

        const accessToken = refresh.accesstoken;

        const me = await getCurrentUser();

        dispatch(
          loginSuccess({
            user: me.user,

            accessToken,
          })
        );
      } catch {
        dispatch(logout());
      } finally {
        dispatch(setLoading(false));
      }
    };

    init();
  }, []);
}

export default useAuth;
