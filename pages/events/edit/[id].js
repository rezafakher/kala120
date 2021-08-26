import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@/components/Layout";
import styles from '@/styles/modal.module.css'
import React from "react";
import {API_URL} from "@/config/index";
import {useState , useEffect} from 'react';
import {useRouter} from 'next/router';
import moment from 'moment';
import Image from 'next/image';
import Modal from "@/components/Modal";
import ImageUpload from "@/components/imageUpload";


export default function EditEvents({evt}) {

    const [showModal, setShowModal] = useState(false);

    const [values, setValues] = useState({
        name: evt.name,
        address: evt.address,
        date: evt.date,
        time: evt.time,
        description: evt.description,
    });

    const [imagePreview, setImagePreview] = useState(
        evt.image ? evt.image.formats.thumbnail.url : null
    );

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation
        const hasEmptyField = Object.values(values).some((element) => element === "");
        if (hasEmptyField) {
            toast.error('Please fill  all fields')
        }

        const res = await fetch(`${API_URL}/events/${evt.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
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

    const imageUploaded = async (e) => {
        const res = await fetch(`${API_URL}/events/${evt.id}`)
        const data = await res.json();
        setImagePreview(data.image.formats.small.url)
        setShowModal(false)
    };
    return (
        <Layout className={styles.container}>
            <ToastContainer/>

            <div className="row w-100">
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
                            <input type="date" className="form-control" id="time" name="date"
                                   value={moment(values.date).format('yyyy-MM-DD')}
                                   onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3 col-lg-12">
                            <label htmlFor="description" className="form-label">description</label>
                            <textarea className="form-control" rows="3" id="description" name="description"
                                      value={values.description} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-25 mt-4 m-auto">Update</button>
                </form>

                <div className="col-lg-6">
                    {imagePreview ? (<Image src={imagePreview} height={300} width={300}/>) : <p>no image uploade</p>}
                    <button onClick={() => setShowModal(true)} className="btn btn-secondary">Open Modal</button>
                </div>
            </div>

            <Modal
                onClose={() => setShowModal(false)}
                show={showModal}
            >
                <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
            </Modal>

        </Layout>
    )
}

export async function getServerSideProps({params: {id}}) {
    const res = await fetch(`${API_URL}/events/${id}`);
    const evt = await res.json();

    return {
        props: {evt},
    }
}
