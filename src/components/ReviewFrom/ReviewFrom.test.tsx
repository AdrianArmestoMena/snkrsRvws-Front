import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { wrappedRender } from "../../test-utils/WrappedRender";
import ReviewFrom from "./ReviewFrom";

const mockUseUsers = {
  logIn: jest.fn().mockResolvedValue(true),
};

jest.mock("../../hooks/useUser", () => () => mockUseUsers);

describe("Given a ReviewForm function", () => {
  describe("When it is called", () => {
    test("And if the user write in the Brand input it should show it", async () => {
      wrappedRender(<ReviewFrom />);

      const type = "Nike";

      const input = screen.getByLabelText("Brand");
      await userEvent.type(input, type);

      expect(input).toHaveValue("Nike");
    });

    test("And if the user write in the Model input it should show", async () => {
      const type = "AirMax";

      wrappedRender(<ReviewFrom />);

      const input = screen.getByLabelText("Model");

      await userEvent.type(input, type);

      expect(input).toHaveValue("AirMax");
    });

    test("And if the user write in the Review input it should show", async () => {
      const type = "Nice kicks";

      wrappedRender(<ReviewFrom />);

      const input = screen.getByLabelText("Your review");

      await userEvent.type(input, type);

      expect(input).toHaveValue("Nice kicks");
    });

    test("And if the user select a picture on the picture input it should show", async () => {
      wrappedRender(<ReviewFrom />);

      const fakeFile = new File(["hello"], "hello.png", { type: "image/png" });

      const fileInput: HTMLInputElement =
        screen.getByLabelText("Kick's picture");

      userEvent.upload(fileInput, fakeFile);

      const files = fileInput.files as FileList;
      const file = files[0];

      expect(file).toStrictEqual(fakeFile);
    });
  });
});
