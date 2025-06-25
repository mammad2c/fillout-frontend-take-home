import { renderComponent } from "@/tests/render-component";
import Home from ".";

describe("Home Page", () => {
  it("should render", () => {
    const { queryByText } = renderComponent(<Home />);

    expect(queryByText(/Hello Fillout/i)).toBeInTheDocument();
  });
});
