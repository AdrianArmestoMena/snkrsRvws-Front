import { screen, wrappedRender } from "../../test-utils/WrappedRender";
import ModalError from "./ModalError";

describe("Given a FormRegister function", () => {
  describe("When it is called", () => {
    test("Then it should show a h2 with Join to hte snkrsrvws community", async () => {
      wrappedRender(
        <ModalError type="error" text="Can't login. Try it again" />
      );

      const mainText = screen.getByText("Can't login. Try it again");

      expect(mainText).toBeInTheDocument();
    });
  });
});
