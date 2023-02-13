import { memo } from "react";
import { Wrapper } from "@/shared/ui/Wrapper/Wrapper";
import cls from "./mainPage.module.scss";
import { Counter } from "@/entities/Counter";

const MainPage = memo((props: any) => {
  return (
    <Wrapper>
      <Counter />
    </Wrapper>
  );
});

export default MainPage;
