import { FC, ReactNode } from "react";

export type FCWithChildren<P = {}> = FC<P & { children: ReactNode | ReactNode[] }>;
