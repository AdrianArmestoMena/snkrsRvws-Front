import { rest } from "msw";

const apiUrl = process.env.REACT_APP_API_URL as string;

const handlers = [
  rest.post(`${apiUrl}/users/login`, async (req, res, ctx) => {
    const { password } = await req.json();
    const status = password === "" ? 400 : 200;

    return res(
      ctx.status(status),
      ctx.json({
        user: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InZ2dnZ2IiwiaWQiOiI2MzBmMjkwOTJmMDU2MDMzMDFjOTY2ZjUiLCJpYXQiOjE2NjE5Mzk2MTl9.Zff5fV2EnVvFNBKZSNbmlE-fcZQbBoMhbq-q0KTjH7I",
        },
      })
    );
  }),

  rest.post(`${apiUrl}/users/signup`, async (req, res, ctx) => {
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
