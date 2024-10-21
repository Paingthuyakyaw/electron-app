import {createBrowserRouter, RouterProvider} from "react-router-dom"
const Router = () => {

const router = createBrowserRouter([
    {
        path : "/",
        lazy : async () => ({
            Component  : (await import('./layout/app-layout')).default
        }),
        children : [
            {
                index : true,
                lazy : async () => ({
                    Component : (await import('./page/dashboard')).default
                })
            },
            {
                path : "/customer-service",
                lazy : async () => ({
                    Component : (await import('./page/customer-service')).default
                })
            }
        ]
    }
])

  return (
    <RouterProvider router={router} />
  )
}

export default Router
