import { Route, Routes } from "react-router-dom"
import { Suspense } from "react"
import { routeConfig } from "./RouteConfig"

const MainRouter = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {Object.values(routeConfig).map(({ element, path }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>
    </>
  )
}

export default MainRouter
