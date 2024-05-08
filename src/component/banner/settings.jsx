import styles from './setting.module.css'

export default function Setting() {
    const handleChange = () => {

    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.icon} onClick={handleChange}></div>
        </div>
    )
}