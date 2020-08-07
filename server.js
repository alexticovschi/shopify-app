const Koa = require("koa");
const next = require("next");
const Router = require("@koa/router");
require("isomorphic-fetch");
const dotenv = require("dotenv");
dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const { default: createShopifyAuth } = require("@shopify/koa-shopify-auth");
const { verifyRequest } = require("@shopify/koa-shopify-auth");
const session = require("koa-session");
const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET_KEY } = process.env;

app.prepare().then(() => {
  const server = new Koa();
  server.use(session({ secure: true, sameSite: "none" }, server));
  server.keys = [SHOPIFY_API_SECRET_KEY];

  const router = new Router();

  router.get("/a", async (ctx) => {
    await app.render(ctx.req, ctx.res, "/a", ctx.query);
    ctx.respond = false;
  });

  router.get("/b", async (ctx) => {
    await app.render(ctx.req, ctx.res, "/b", ctx.query);
    ctx.respond = false;
  });

  // router.all('*', async (ctx) => {
  //   await handle(ctx.req, ctx.res)
  //   ctx.respond = false
  // })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(router.routes());
  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ["read_products"],
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;

        ctx.cookies.set("shopOrigin", shop, {
          httpOnly: false,
          secure: true,
          sameSite: "none",
        });

        ctx.redirect(`https://${shop}/admin/apps/alxapp`);
      },
    })
  );

  server.use(verifyRequest());
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
    return;
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
