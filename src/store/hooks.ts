import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "./store";

type DispatchFn = () => AppDispatch;

export const useUsersDispatch: DispatchFn = useDispatch;
export const useUsersSelector: TypedUseSelectorHook<RootState> = useSelector;