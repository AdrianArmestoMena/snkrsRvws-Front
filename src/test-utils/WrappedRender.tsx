import { render } from "@testing-library/react";
import Wrapper from "./Wrapper";

const wrappedRender = (view: JSX.Element) => render(view, { wrapper: Wrapper });

export * from "@testing-library/react";

export { wrappedRender };
