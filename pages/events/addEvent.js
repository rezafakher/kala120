import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@/components/Layout";
import styles from '@/styles/Home.module.css'
import React from "react";
import {API_URL} from "@/config/index";
import {useState} from 'react';
import {useRouter} from 'next/router';
import Modal from "@/components/Modal";
import ImageUpload from "@/components/imageUpload";


export default function AddEvents(evt) {
    const [showModal, setShowModal] = useState(false);

    const [values, setValues] = useState({
        name: '',
        address: '',
        date: '',
        time: '',
        description: '',
    });

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation
        const hasEmptyField = Object.values(values).some((element) => element === "");
        if (hasEmptyField) {
            toast.error('Please fill  all fields')
            return
        }

        const res = await fetch(`${API_URL}/events`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(values)
        });

        if (!res.ok) {
            toast.error("something went wrong")
        } else {
            const evt = await res.json();
            router.push(`/events/${evt.slug}`);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value})
    };


    return (
        <Layout className={styles.container}>
            <ToastContainer />

            <div className=" row w-75">
                <form className="col-lg-6" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-3 col-lg-12">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={values.name}
                                   onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3 col-lg-12">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" className="form-control" id="address" name="address" value={values.address}
                                   onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3 col-lg-12">
                            <label htmlFor="time" className="form-label">Time</label>
                            <input type="text" className="form-control" id="time" name="time" value={values.time}
                                   onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3 col-lg-12">
                            <label htmlFor="time" className="form-label">Date</label>
                            <input type="date" className="form-control" id="time" name="date" value={values.date}
                                   onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3 col-lg-12">
                            <label htmlFor="description" className="form-label">description</label>
                            <textarea className="form-control" rows="5" id="description" name="description"
                                      value={values.description} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-25 mt-4 m-auto">Submit</button>
                </form>

                <div className="col-lg-6">
                    <button onClick={() => setShowModal(true)} className="btn btn-secondary">Open Modal</button>
                </div>
            </div>

            <Modal
                onClose={() => setShowModal(false)}
                show={showModal}
            >
                <ImageUpload evtId={evt.id} />
            </Modal>
        </Layout>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`${API_URL}/events`);
    const events = await res.json();

    return {
        props: {events},
    }
}
