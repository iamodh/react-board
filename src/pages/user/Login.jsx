import useAxiosInstance from "@hooks/useAxiosInstance";
import useUserStore from "@zustand/userStore";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const setUser = useUserStore((store) => store.setUser);

  const { register, handleSubmit } = useForm();
  const axios = useAxiosInstance();
  const navigate = useNavigate();

  const login = useMutation({
    mutationFn: (formData) => {
      return axios.post("/users/login", formData);
    },

    onSuccess: (res) => {
      console.log(res);

      const user = res.data.item;
      setUser({
        _id: user._id,
        name: user.name,
        profile: user.image?.path,
        accessToken: user.token.accessToken,
        refreshToken: user.token.refreshToken,
      });

      alert(res.data.item.name + "님, 로그인 되었습니다.");
      navigate(location.state?.from || "/");
    },

    onError: (err) => {
      alert(err.response?.data.message || "잠시후 다시 요청하세요.");
    },
  });
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(login.mutate)}>
      <label htmlFor="email">이메일</label>
      <input
        type="email"
        id="email"
        className="ring-1 ring-slate-200 rounded-md"
        {...register("email")}
      />
      <br />
      <label htmlFor="password">비밀번호</label>
      <input
        type="password"
        id="password"
        className="ring-1 ring-slate-200 rounded-md"
        {...register("password")}
      />
      <br />
      <button className="bg-orange-400 " type="submit">
        로그인
      </button>
    </form>
  );
}
