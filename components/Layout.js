import React from 'react';
import Head from "next/head";
import styles from "../styles/Home.module.css"
import Header from "./header"

const Layout = ({title, children}) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <Header />
            <div className={styles.container}>{children}</div>
        </div>
    );
};

export default Layout;
