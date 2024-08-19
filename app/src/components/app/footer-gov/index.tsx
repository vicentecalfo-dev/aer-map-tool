export default function FooterGov() {
  const today = new Date();
  const formatedData = today.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <footer className="p-6 row-span-1 flex items-center gap-0">
      <div className="flex-1">
        <p className="text-xs">
        Dados atualizados em <span className="font-bold text-govbr-blue-warm-vivid-70">{
            formatedData
          }</span>.
        </p>
        <span className="text-xs">
          <span className="font-bold text-govbr-blue-warm-vivid-70">Versão 1.0. </span>
        Administrado e Desenvolvido pelo Centro Nacional de Conservação da Flora (CNCFlora).
        </span>
      </div>
      <div className="flex gap-5 items-center">
        <img src="/images/cncflora-logo.png" className="h-[30px]" />
        <img
          src="https://www.google.com/u/1/ac/images/logo.gif?uid=110697717679372764560&service=google_gsuite"
          className="h-[50px]"
        />
        <div className="flex items-center gap-2">
          <span className="flex flex-col justify-end text-right text-xs gap-0">
            <span>Ministério do</span>
            <span className="font-black mt-[-5px]">Meio Ambiente</span>
          </span>
          <img src="/images/brasil-logo.png" className="w-[110px]" />
        </div>
      </div>
      <div></div>
    </footer>
  );
}
