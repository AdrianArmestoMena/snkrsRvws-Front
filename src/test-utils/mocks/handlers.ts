import { rest } from "msw";

const apiUrl = process.env.REACT_APP_API_URL as string;
const correctId = "1234";
const incorrectId = "12345";
const brand = "Nike";
const wrongBrand = "geox";

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

  rest.post(`${apiUrl}/reviews/addreview`, async (req, res, ctx) => {
    const request: any = await req;
    const formData: string = await request._body.get("review");
    const review = JSON.parse(formData);

    const status = review.brand === "" ? 400 : 200;

    return res(
      ctx.status(status),
      ctx.json({
        newReview: {
          brand: "nike",
          model: "jordan11",
          picture: "uploads\\b1c7cbcb713f5c58adfb155d8640088d",
          review: "Nice shoes",
          owner: "630e5e99bd6d5f91b999517b",
          likes: [],
          comments: [],
          id: "63149166440acde4125bf0f8",
          backupImage: "url",
        },
      })
    );
  }),

  rest.put(
    `${apiUrl}/reviews/updatereview/${correctId}`,
    async (req, res, ctx) => {
      const request: any = await req;
      const formData: string = await request._body.get("review");
      const review = JSON.parse(formData);

      const status = review.brand === "" ? 400 : 200;

      return res(
        ctx.status(status),
        ctx.json({
          newReview: {
            brand: "adidas",
            model: "12",
            picture: "123",
            review: "nix",
            owner: "630e5e99bd6d5f91b999517b",
            likes: [],
            comments: [],
            id: "63149166440acde4125bf0f8",
          },
        })
      );
    }
  ),

  rest.get(`${apiUrl}/reviews/${correctId}`, async (req, res, ctx) => {
    const status = 200;

    return res(
      ctx.status(status),
      ctx.json({
        reviews: [
          {
            brand: "NIke",
            model: "Jordan 11 low black and white",
            picture: "uploads/f96fc1f1c03538f4940955da94925f90",
            review: "weqklrn ejq rtjqenr qejrt qer iluqe",
            owner: "6310d142612b1f0a1cec8961",
            likes: [],
            comments: [],
            id: "6315c901e752dbaefbdfca05",
            backupImage: "url",
          },
        ],
      })
    );
  }),

  rest.delete(`${apiUrl}/reviews/${correctId}`, async (req, res, ctx) => {
    const status = 200;
    return res(
      ctx.status(status),
      ctx.json({
        reviews: {
          brand: "NIke",
          model: "Jordan 11 low black and white",
          picture: "uploads/f96fc1f1c03538f4940955da94925f90",
          review: "weqklrn ejq rtjqenr qejrt qer iluqe",
          owner: "6310d142612b1f0a1cec8961",
          likes: [],
          comments: [],
          id: "6315c901e752dbaefbdfca05",
          backupImage: "url",
        },
      })
    );
  }),

  rest.delete(`${apiUrl}/reviews/${incorrectId}`, async (req, res, ctx) => {
    const status = 404;
    return res(
      ctx.status(status),
      ctx.json({
        error: "error",
      })
    );
  }),

  rest.get(`${apiUrl}/reviews/${incorrectId}`, async (req, res, ctx) => {
    const status = 400;

    return res(
      ctx.status(status),
      ctx.json({
        error: "Error message",
      })
    );
  }),

  rest.get(
    `${apiUrl}/reviews/onereview/${incorrectId}`,
    async (req, res, ctx) => {
      const status = 404;
      return res(
        ctx.status(status),
        ctx.json({
          error: "error",
        })
      );
    }
  ),

  rest.get(
    `${apiUrl}/reviews/onereview/${correctId}`,
    async (req, res, ctx) => {
      const status = 200;
      return res(
        ctx.status(status),
        ctx.json({
          reviews: [
            {
              brand: "Adidas",
              model: "forum",
              picture: "uploads/f96fc1f1c03538f4940955da94925f90",
              review: "weqklrn ejq rtjqenr qejrt qer iluqe",
              owner: "6310d142612b1f0a1cec8961",
              likes: [],
              comments: [],
              id: "1234",
              backupImage: "url",
            },
          ],
        })
      );
    }
  ),

  rest.get(`${apiUrl}/reviews/bybrand/${wrongBrand}`, async (req, res, ctx) => {
    const status = 404;
    return res(
      ctx.status(status),
      ctx.json({
        error: "error",
      })
    );
  }),

  rest.get(`${apiUrl}/reviews/bybrand/${brand}`, async (req, res, ctx) => {
    const status = 200;
    return res(
      ctx.status(status),
      ctx.json({
        reviews: [
          {
            brand: "Nike",
            model: "Jordan 11 low black and white",
            picture: "uploads/f96fc1f1c03538f4940955da94925f90",
            review: "weqklrn ejq rtjqenr qejrt qer iluqe",
            owner: "6310d142612b1f0a1cec8961",
            likes: [],
            comments: [],
            id: "6315c901e752dbaefbdfca05",
            backupImage: "url",
          },
        ],
      })
    );
  }),

  rest.get(`${apiUrl}/reviews`, async (req, res, ctx) => {
    const status = 200;
    return res(
      ctx.status(status),
      ctx.json({
        reviews: [
          {
            brand: "Nike",
            model: "Jordan 11 low black and white",
            picture: "uploads/f96fc1f1c03538f4940955da94925f90",
            review: "weqklrn ejq rtjqenr qejrt qer iluqe",
            owner: "6310d142612b1f0a1cec8961",
            likes: [],
            comments: [],
            id: "6315c901e752dbaefbdfca05",
            backupImage: "url",
          },
        ],
      })
    );
  }),
];

export default handlers;
