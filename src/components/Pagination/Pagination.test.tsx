import userEvent from "@testing-library/user-event";
import { screen, wrappedRender } from "../../test-utils/WrappedRender";
import Pagination from "./Pagination";

describe("Given a Pagination component", () => {
  const pageNumber = 1;
  const plus = jest.fn();
  const less = jest.fn();
  describe("When it is instantiated with a page and two functions", () => {
    test("The it should show the page", () => {
      wrappedRender(
        <Pagination page={pageNumber} onClickLess={less} onClickPluss={plus} />
      );
      const page = screen.getByText(`Page ${pageNumber}`);

      expect(page).toBeInTheDocument();
    });
    test("Then it should call pluss function if pluss botton is clicked", () => {
      wrappedRender(
        <Pagination page={pageNumber} onClickLess={less} onClickPluss={plus} />
      );
      const buttons = screen.getAllByRole("button");
      userEvent.click(buttons[1]);
      expect(plus).toHaveBeenCalled();
    });

    test("Then it should call les function if less botton is clicked", () => {
      wrappedRender(
        <Pagination page={pageNumber} onClickLess={less} onClickPluss={plus} />
      );
      const buttons = screen.getAllByRole("button");
      userEvent.click(buttons[0]);
      expect(less).toHaveBeenCalled();
    });
  });
});
