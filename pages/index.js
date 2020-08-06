import Head from "next/head";
import Link from "next/link";
import { Avatar, Badge, Page, Thumbnail, DisplayText } from "@shopify/polaris";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Page
      title="3/4 inch Leather pet collar"
      subtitle="Perfect for any pet"
      additionalNavigation={
        <Avatar size="small" initials="CD" customer={false} />
      }
      separator
    >
      <DisplayText size="large">Good evening, Dominic.</DisplayText>
      <p>Page content</p>
    </Page>
  );
}
