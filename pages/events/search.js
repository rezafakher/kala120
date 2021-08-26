import styles from '@/styles/Home.module.css'
import Layout from "@/components/Layout";
import React from "react";
import {API_URL} from "@/config/index";
import EventItem from "@/components/EventItem";
import qs from 'qs'


export default function SearchPage({events}) {
    return (
        <Layout className={styles.container}>
            <h1>Events</h1>
            {events.length === 0 && <h3>Events Not Found</h3>}
            <div className="row w-100">
                {events.map(evt => (
                    <EventItem key={evt.id} evt={evt}/>
                ))}
            </div>

        </Layout>
    )
}

export async function getServerSideProps({query : { term }}) {
const query = qs.stringify({
    _where: {
        _or: [
            {name_contains: term},
            {address_contains: term}
        ]
    }
})

    const res = await fetch(`${API_URL}/events?${query}`);
    const events = await res.json();

    return {
        props: {events},
    }
}
