import useAxiosInstance from "@hooks/useAxiosInstance";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function New() {
  const { register, handleSubmit } = useForm();
  const { type } = useParams();
  const queryClient = useQueryClient();
  const axios = useAxiosInstance();
  const navigate = useNavigate();
  const addItem = useMutation({
    mutationFn: (formData) => {
      const body = {
        title: formData.title,
        content: formData.content,
        type: type,
      };
      return axios.post("/posts", body);
    },

    onSuccess: () => {
      alert("게시물이 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["posts", type] });
      navigate(`/${type}`);
    },

    onError: (err) => {
      console.error(err);
    },
  });
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(addItem.mutate)}>
      <label htmlFor="title">제목</label>
      <input
        type="text"
        id="title"
        className="ring-1 ring-slate-200 rounded-md"
        {...register("title")}
      />
      <br />
      <label htmlFor="content">내용</label>
      <textarea
        rows={10}
        className="ring-1 ring-slate-200 rounded-md"
        {...register("content")}
      />
      <br />
      <div className="flex gap-4 *:rounded-md ">
        <button className="bg-orange-400 w-1/2" type="submit">
          글 작성
        </button>
        <button
          onClick={() => {
            navigate(`/${type}`);
          }}
          className="bg-black text-white w-1/2"
        >
          취소
        </button>
      </div>
    </form>
  );
}
