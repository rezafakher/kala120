import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "@/styles/modal.module.css";

export default function Modal({ show, onClose, children, title }) {
        const [isBrowser, setIsBrowser] = useState(false);

        useEffect(() => {
            setIsBrowser(true);
        }, []);

        const handleCloseClick = (e) => {
            e.preventDefault();
            onClose();
        };

        const modalContent = show ? (
            <div className={styles.ModalOverlay}>
                <div className={styles.Modal}>
                    <div className={styles.ModalHeader}>
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                    {title && <div>{title}</div>}
                    <div className={styles.ModalBody}>{children}</div>
                </div>
            </div>
        ) : null;

        if (isBrowser) {
            return ReactDOM.createPortal(
                modalContent,
                document.getElementById("modal-root")
            );
        } else {
            return null;
        };
}
