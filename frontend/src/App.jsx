import { useEffect } from 'react'

import { login } from './lib/api'
import Banner from './component/banner/main'

export default function App() {
    return (
        <>
        <a href='http://localhost:3000/api/token/login'>login or sum</a>
        <Banner />
        </>
    )
}