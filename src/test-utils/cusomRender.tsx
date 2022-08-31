import { render } from "@testing-library/react";
import Wrapper from "./Wrapper";

const wrappedRender = (component: JSX.Element, ...options: any) =>
  render(component, { wrapper: Wrapper, ...options });

export { wrappedRender };
