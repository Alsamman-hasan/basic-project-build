
// import { useTranslation } from "react-i18next";
// import { Button } from "shared/ui/Buttons";
// import { ButtonBgColor, ButtonSize } from "shared/ui/Buttons/types";
import { classNames } from 'shared/lib/classNames/classNames';
import cls from "./PageError.module.scss";

export interface PageErrorProps {
  className?: string;
}
export const PageError = ({ className }: PageErrorProps) => {
  // const { t } = useTranslation("common");
  // const realodPage = () => {
  //   // eslint-disable-next-line no-restricted-globals
  //   location.reload();
  // };

  return (
    <div className={classNames(cls.PageError, {}, [className])}>
      <p className={classNames(cls.info)}>произошла непредвиденная ошибка</p>
      {/* <Button
        sizes={ButtonSize.MEDIUM}
        btnBg={ButtonBgColor.BLUE}
        className={cls.btn}
        onClick={realodPage}
      >
        {t("Обновить страницу")}
      </Button> */}
    </div>
  );
};