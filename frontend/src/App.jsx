import { useEffect, useState } from "react"
import api from "../config/axiosInstance";


function App() {

  const [link, setLink] = useState("");
  const [currLink, setCurrLink] = useState("");
  const [allLinks, setAllLinks] = useState([])

  const handleSubmit = async () => {
    const res = await api.post("/url/create", { link });
    setCurrLink(res.data.newLink)
    getAllLinks()
    setLink("")
  }

  const getAllLinks = async () => {

    const res = await api.get("/url/allLinks")
    setAllLinks(res.data.links)
  }

  useEffect(() => {
    getAllLinks()
  }, [])
  const handleCurrCopy = async () => {
    
    try {
      
      await navigator.clipboard.writeText(`http://localhost:3000/${currLink.shortCode}`);

    } catch (error) {
      console.log(error)
    }
  }

  const handleCopy = async(code) => {
    try {
      await navigator.clipboard.writeText(`http://localhost:3000/${code}`)

    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {

    try {
      
      await api.delete(`/url/delete/${id}`)
      getAllLinks();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h3 className="text-center text-2xl m-4">URL SHORTNER</h3>
      <div className="flex justify-center gap-5 align-center my-15 mx-auto p-3 w-[70%]">
        <input type="text" name="link" value={link} placeholder="Enter the URL" onChange={(e) => setLink(e.target.value)} className="bg-gray-100 border p-3 w-[75%] rounded-2xl"/>
        <button onClick={handleSubmit} className="bg-orange-500 py-3 px-6 rounded-2xl cursor-pointer">Shorten</button>
      </div>
      <div className="flex gap-5 bg-gray-100 p-4 my-3 mx-auto w-full align-center">
        {!currLink ? "" : (
          <div
            className="flex items-center justify-between gap-4 bg-white border border-gray-200 shadow-sm rounded-lg p-4 mx-auto max-w-2xl transition hover:shadow-md"
            key={currLink._id}
          >
            {/* Short Code */}
            <p className="font-semibold text-blue-600 shrink-0">
              {currLink.shortCode}
            </p>

            {/* Original URL (Truncated) */}
            <p className="text-gray-600 truncate min-w-0 flex-1 text-sm" title={currLink.originalURL}>
              {currLink.originalURL}
            </p>

            {/* Click Count */}
            <p className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full shrink-0">
              {currLink.clicks} {currLink.clicks === 1 ? 'click' : 'clicks'}
            </p>

            {/* Copy Button */}
            <button
              onClick={handleCurrCopy}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded-md transition active:scale-95 shrink-0"
            >
              Copy
            </button>
          </div>
        ) }
      </div>

      <div>
        {!allLinks ? "No links found." : 
          allLinks.map(url => {
            return (
              <div
                className="flex items-center justify-between gap-4 bg-white border border-gray-200 shadow-sm rounded-lg p-4 mx-auto my-2 max-w-2xl transition hover:shadow-md"
                key={url._id}
              >
                {/* Short Code */}
                <a href={`http://localhost:3000/${url.shortCode}`} target="_blank" className="font-semibold text-blue-600 shrink-0" onClick={() => getAllLinks}>
                  {url.shortCode}
                </a>

                {/* Original URL (Truncated) */}
                <p className="text-gray-600 truncate min-w-0 flex-1 text-sm" title={url.originalURL}>
                  {url.originalURL}
                </p>

                {/* Click Count */}
                <p className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full shrink-0">
                  {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
                </p>

                {/* Copy Button */}
                <button
                  onClick={() => handleCopy(url.shortCode)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded-md transition active:scale-95 shrink-0"
                >
                  Copy
                </button>
                <button
                  onClick={() => handleDelete(url._id)}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-3 py-1.5 rounded-md transition active:scale-95 shrink-0"
                >
                  Delete
                </button>
              </div>
            )
          })
        }
      </div>
      
    </>
  )
}

export default App
