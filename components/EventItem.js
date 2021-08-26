import React from 'react';
import Image from "next/image";
import Link from "next/link";

function EventItem({evt}) {
    return (
        <div className="col-lg-4">
            <div className="card">
                {evt.image && (
                    <Image alt={evt.slug}
                           src={evt.image.formats.small.url}
                           width={100}
                           height={100}/>
                )}
                <div className="card-body">
                    <h5 className="card-title">{evt.name}</h5>
                    <p className="card-text">{evt.address}</p>
                    <Link href={`/events/${evt.slug}`}>
                        <a className="btn btn-secondary">
                            More
                        </a></Link>
                </div>
            </div>
        </div>
    );
}

export default EventItem;