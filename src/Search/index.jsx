import { useState } from "react";

function Search() {
  const arr = ["Edge", "Firefox", "Chrome", "Opera", "Safari"];
  const [browser, setBrowser] = useState(arr);
  const [showSearch, setShowSearch] = useState(false);

  function handleSearch(value) {
    value.length > 0 ? setShowSearch(true) : setShowSearch(false);
    const search = arr.filter((item) => item.toLowerCase().startsWith(value));
    console.log(search);
    setBrowser(search);
  }
  return (
    <div>
      <input
        name="browser"
        id="browser"
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
      />
      {showSearch == true
        ? browser.map((item, index) => <p key={index}>{item}</p>)
        : ""}
    </div>
  );
}
export default Search;
