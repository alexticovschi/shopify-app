import Head from "next/head";
import Link from "next/link";
import ToastExample from "./myToast";
import {
  Avatar,
  Badge,
  Page,
  Button,
  Thumbnail,
  DisplayText,
  CalloutCard,
  Card,
  EmptyState,
  Layout,
  Frame,
  Loading,
  Toast,
} from "@shopify/polaris";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Page>
      <Head>
        <title>Shopify App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ height: "100px" }}>
        <Frame>
          <Loading />
        </Frame>
      </div>
      <ToastExample />
      <Layout>
        <Layout.Section>
          <Card title="Order details" sectioned>
            <p>View a summary of your order man.</p>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card title="Tags" sectioned>
            <p>Add tags to your order.</p>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card title="Online store dashboard" sectioned>
            <p>View a summary of your online store’s performance.</p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
