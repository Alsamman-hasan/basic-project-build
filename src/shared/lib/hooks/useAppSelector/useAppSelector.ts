import { TypedUseSelectorHook, useSelector } from "react-redux";
import { StateSchema } from "@/app/providers/StorProvider";

export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
