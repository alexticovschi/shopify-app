import Head from "next/head";
import { Page, EmptyState, Layout, Link as PLink } from "@shopify/polaris";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const start = () => router.push("/create");

  return (
    <Page>
      <Head>
        <title>Shopify App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Layout.Section>
          <EmptyState
            heading="Create a Sale Banner for a Product."
            action={{
              content: "Start",
              onAction: () => start(),
            }}
            secondaryAction={{
              content: "Learn more",
              url: "https://help.shopify.com",
            }}
            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
          >
            <p>Get More Sales With This Banner.</p>
          </EmptyState>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
