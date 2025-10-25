import {JSX} from "react";
import styles from "@/app/page.module.css";

export default function Index(): JSX.Element {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                Hello
            </main>
        </div>
    );
}
