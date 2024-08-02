import styles from "../../styles/admin/adminreceived.module.css";
import {useState} from "react";

export default function AdminReceived() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                {isOpen ? <Modal setIsOpen={setIsOpen} isOpen={isOpen}/> :
                    <>
                        <h2>Received Applications</h2>
                        <table style={{width: '20vw', borderCollapse: 'separate', borderSpacing: '0 10px'}}>
                            <tbody>
                            <tr onClick={()=>setIsOpen(true)}>
                                <td style={{border: "1px solid black", textAlign: "center"}}>Name</td>
                                <td style={{border: "1px solid black", textAlign: "center"}}>IT</td>
                            </tr>
                            <tr>
                                <td style={{border: "1px solid black", textAlign: "center"}}>Name</td>
                                <td style={{border: "1px solid black", textAlign: "center"}}>IT</td>
                            </tr>
                            </tbody>
                        </table>
                    </>
                }
            </div>
        </div>
    )
}

const Modal = ({ isOpen, setIsOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <h1 onClick={() => setIsOpen(false)}>Close</h1>
            <h1>Name</h1>
            <div>
                <button>Verify</button>
                <button>Comments</button>
            </div>
        </div>
    );
};
