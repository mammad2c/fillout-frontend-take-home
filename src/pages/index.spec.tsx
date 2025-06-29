import { renderComponent } from "@/shared/tests/render-component";
import Home from "./index.page";

describe("Home Page", () => {
  it("should render", () => {
    const { queryByText } = renderComponent(<Home />);

    expect(queryByText(/Hello Fillout/i)).toBeInTheDocument();
  });
});
