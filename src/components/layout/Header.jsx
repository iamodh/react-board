export default function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <div className="w-1/3 flex justify-start">
        <a href="#">
          <img src="/icon.svg" />
        </a>
      </div>
      <nav className="flex gap-6 w-1/3 justify-center">
        <a href="#">
          <span>정보공유</span>
        </a>
        <a href="#">
          <span>자유게시판</span>
        </a>
        <a href="#">
          <span>브런치스토리</span>
        </a>
      </nav>
      <div className="flex w-1/3 justify-end items-center gap-3 *:px-2 *:rounded-sm *:text-sm *:h-8 *:leading-8">
        <button className="bg-orange-400 text-white">로그인</button>
        <button className="bg-orange-200">회원가입</button>
        <button className="bg-slate-200 size-7">
          <img src="moon.svg" />
        </button>
      </div>
    </header>
  );
}
