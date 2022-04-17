import { ComponentType, FC, ReactNode } from "react";

export type FCWithChildren<P = {}> = FC<P & { children: ReactNode | ReactNode[] }>;

export interface PageData<P = any> {
  route: string;
  component: ComponentType<P>;
}
