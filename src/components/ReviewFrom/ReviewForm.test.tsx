import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { wrappedRender } from "../../test-utils/WrappedRender";
import ReviewForm from "./ReviewForm";

const mockUseReviews = {
  createReview: jest.fn().mockResolvedValue(true),
};

jest.mock("../../hooks/useReviews", () => () => mockUseReviews);

describe("Given a ReviewForm function", () => {
  describe("When it is called", () => {
    test("And if the user write in the Brand input it should show it", async () => {
      wrappedRender(<ReviewForm />);

      const type = "Nike";

      const input = screen.getByLabelText("Brand");
      await userEvent.type(input, type);

      expect(input).toHaveValue("Nike");
    });

    test("And if the user write in the Model input it should show", async () => {
      wrappedRender(<ReviewForm />);

      const type = "AirMax";
      const input = screen.getByLabelText("Model");

      await userEvent.type(input, type);

      expect(input).toHaveValue("AirMax");
    });

    test("And if the user write in the Review input it should show", async () => {
      wrappedRender(<ReviewForm />);

      const type = "Nice kicks";
      const input = screen.getByLabelText("Your review");

      await userEvent.type(input, type);

      expect(input).toHaveValue("Nice kicks");
    });

    test("And if the user select a picture on the picture input it should show", async () => {
      wrappedRender(<ReviewForm />);

      const fakeFile = new File(["hello"], "hello.png", { type: "image/png" });

      const fileInput: HTMLInputElement =
        screen.getByLabelText("Kick's picture");

      userEvent.upload(fileInput, fakeFile);

      const files = fileInput.files as FileList;
      const file = files[0];

      expect(file).toStrictEqual(fakeFile);
    });

    test("And if the user fill all the inputs and click on the button it should call the crate review action of useReviews", async () => {
      wrappedRender(<ReviewForm />);

      const type = "Nike";
      const brand = screen.getByLabelText("Brand");
      await userEvent.type(brand, type);

      const fakeFile = new File(["hello"], "hello.png", { type: "image/png" });
      const fileInput: HTMLInputElement =
        screen.getByLabelText("Kick's picture");
      userEvent.upload(fileInput, fakeFile);

      const typeReview = "Nice kicks";
      const inputReview = screen.getByLabelText("Your review");
      await userEvent.type(inputReview, typeReview);

      const typeModel = "AirMax";
      const inputModel = screen.getByLabelText("Model");
      await userEvent.type(inputModel, typeModel);

      const button = screen.getByRole("button", { name: "Craete Review" });
      await userEvent.click(button);

      expect(mockUseReviews.createReview).toHaveBeenCalled();
    });

    test("And if the user doesn't fill all the inputs and click on the button it shouldn't call the crate review action of useReviews", async () => {
      wrappedRender(<ReviewForm />);

      const button = screen.getByRole("button", { name: "Craete Review" });
      await userEvent.click(button);

      expect(mockUseReviews.createReview).not.toHaveBeenCalled();
    });
  });
});
