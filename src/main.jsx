import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { WorkPage } from './pages/WorkPage.jsx'
import { ProjectPage } from './pages/ProjectPage.jsx'
import { AboutPage } from './pages/AboutPage.jsx'
import { ContactPage } from './pages/ContactPage.jsx'
import { PlaygroundPage } from './pages/PlaygroundPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'work', element: <WorkPage /> },
      { path: 'work/:slug', element: <ProjectPage /> },
      // Old /portfolio links keep working
      { path: 'portfolio', loader: () => redirect('/work') },
      { path: 'portfolio/:slug', loader: ({ params }) => redirect(`/work/${params.slug}`) },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'playground', element: <PlaygroundPage /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
