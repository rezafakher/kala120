import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/Home.module.css'
import Layout from "@/components/Layout";
import React from "react";
import {API_URL} from "@/config/index";
import Image from "next/image";
import {useRouter} from "next/router";
import Link from "next/link"


export default function EventPage({evt}) {
    const router = useRouter();

    const deleteEvent = async (e) => {
        if (confirm("are you sure")) {
            const res = await fetch(`${API_URL}/events/${evt.id}`,
                {
                    method: 'DELETE'
                })
            const data = await res.json()

            if (!res.ok) {
                toast.error(data.error)
            } else {
                router.push('/events');
            }

        }
    }


    return (
        <Layout className={styles.container}>
            <h3>{evt.name}</h3>
            <ToastContainer/>

            <span>{new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}</span>
            {evt.image && (
                <div>
                    <Image src={evt.image.formats.large.url} width={700} height={400}/>
                </div>
            )}
            <p>{evt.description}</p>

            <br/><br/>

            <div className="flex">
                <div className="btn btn-danger mx-2" onClick={deleteEvent}>
                    Delete Event
                </div>
                <Link href={`/events/edit/${evt.id}`}>
                    <a className="btn btn-warning mx-2">
                        Edit Event
                    </a>
                </Link>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({query: {slug}}) {
    const res = await fetch(`${API_URL}/events?slug=${slug}`);
    const events = await res.json();

    return {
        props: {
            evt: events[0]
        },
    }
}
