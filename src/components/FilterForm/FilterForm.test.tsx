import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { wrappedRender } from "../../test-utils/WrappedRender";
import FilterForm from "./FilterForm";

const mockUseReviews = {
  loadReviewsByBrand: jest.fn(),
};
jest.mock("../../hooks/useReviews", () => () => mockUseReviews);

describe("Given a FormRegister function", () => {
  describe("When it is called", () => {
    test("And if the user click on the Submit button it should call login function", async () => {
      const brand = {
        brand: "nike",
      };

      wrappedRender(<FilterForm />);

      const inputBrand = screen.getByLabelText("Brand");
      await userEvent.type(inputBrand, brand.brand);

      const button = screen.getByRole("button", { name: "SEARCH" });
      userEvent.click(button);

      expect(mockUseReviews.loadReviewsByBrand).toHaveBeenCalled();
    });

    test("And if the user don't type  and click on the Submit button it shouldn't call the login function", async () => {
      wrappedRender(<FilterForm />);

      const button = screen.getByRole("button", { name: "SEARCH" });
      userEvent.click(button);

      expect(mockUseReviews.loadReviewsByBrand).not.toHaveBeenCalled();
    });
  });
});
