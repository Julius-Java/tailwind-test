/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { SideBar } from "./SideBar"

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  )

  const elements = document.documentElement;

  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  useEffect(() => {
    const handleColorSchemeChange = (e) => {
      if (e.matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };

    darkQuery.addEventListener("change", handleColorSchemeChange);
  }, [])

  useEffect(() => {
    switch (theme) {
      case "dark" :
        elements.classList.add("dark")
        localStorage.setItem("theme", "dark")
        break;

      case "light" :
        elements.classList.remove("dark")
        localStorage.setItem("theme", "light")
        break;
    }
  }, [theme])


  const options = [
    {
      icon: "sunny",
      text: "light"
    },

    {
      icon: "moon",
      text: "dark"
    }
  ]


  return (
    <div className="">
      <ModeToggleButton options={options} theme={theme} setTheme={setTheme} />
      <SideBar />
    </div>
  )
}

const ModeToggleButton = ({options, theme, setTheme}) => {
  return (
    <div className="mode-shifter-container">
      {options.map(option => (
        <button
          key={option.text}
          onClick={() => setTheme(option.text)}
          className={`w-8 h-8 leading-9 text-xl m-1 ${theme === option.text ? "text-fuchsia-600" : "text-gray-600"} transition-colors duration-200`}
        >
          <ion-icon name={option.icon}></ion-icon>
      </button>
      ))}
    </div>
  )
}

export default App