import {useEffect} from "react"
import {useLocation} from "react-router-dom"

export default function ScrollToTop() {
    const {pathname} = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
        console.log(1111, pathname)
    }, [pathname])

    return null
}