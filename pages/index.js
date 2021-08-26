import styles from '@/styles/Home.module.css'
import Layout from "@/components/Layout";
import React from "react";
import {API_URL} from "@/config/index";
import EventItem from "@/components/EventItem";


export default function Home({events}) {
    return (
        <Layout className={styles.container}>
            <h1>Home page</h1>
            {events.length === 0 && <h3>Events Not Found</h3>}
            <div className="row w-100">
                {events.map(evt => (
                    <EventItem key={evt.id} evt={evt}/>
                ))}
            </div>

        </Layout>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`${API_URL}/events?_sort=date:ASC`);
    const events = await res.json();

    return {
        props: {events: events},
    }
}
