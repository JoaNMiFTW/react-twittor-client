import { Home } from "../page/Home/Home"
import { Error404 } from "../page/Error404/Error404"



const configRouting = [
    {
        path: "/",
        exact: true,
        page: Home
    },
    {
        path: "*",
        page: Error404
    }
]

export default configRouting