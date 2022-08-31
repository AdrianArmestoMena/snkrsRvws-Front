import { rest } from "msw";

const apiUrl = process.env.REACT_APP_API_URL as string;

const handlers = [
  rest.post(`${apiUrl}/users/log-in`, async (req, res, ctx) => {
    const { password } = await req.json();
    const status = password === "" ? 400 : 200;

    return res(
      ctx.status(status),
      ctx.json({
        user: { token: "1234" },
      })
    );
  }),

  rest.post(`${apiUrl}/users/signUp`, async (req, res, ctx) => {
    const { password } = await req.json();
    const status = password === "" ? 400 : 200;

    return res(
      ctx.status(status),
      ctx.json({
        newUser: {
          userName: "Adriana",
          email: "arm@this.com",
          contacts: [],
          reviews: [],
          id: "630d2cfb6b681f3c99cf1717",
        },
      })
    );
  }),
];

export default handlers;
