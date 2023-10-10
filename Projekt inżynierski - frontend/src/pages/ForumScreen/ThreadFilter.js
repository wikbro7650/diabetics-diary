import { useEffect, useState } from "react";

const filterList = [
  "wszystkie",
  "moje",
  "Cukrzyca typu 1",
  "Cukrzyca typu 2",
  "Przyjaciele & rodzina",
  "Jedzenie & dieta",
  "Badanie cukru we krwi",
  "Pompy insulinowe",
  "Aktywność fizyczna",
  "Utrata wagi",
  "Powikłania",
  "Przedstaw się",
];

export default function ThreadFilter(props) {
  const { currentFilter, changeFilter } = props;
  const [group, setGroup] = useState("wszystkie");
  const [text, setText] = useState("");
  const [currentFilters, setCurrentFilters] = useState({
    text: "",
    group: "",
  });
  const handleClick = (value) => {
    setGroup(value);
    setCurrentFilters((prevState) => ({
      ...prevState,
      group: group,
      text: text,
    }));
    console.log(currentFilters);
  };
  const handleTextChange = (event) => {
    if (event.key === "Enter") {
      setCurrentFilters((prevState) => ({
        ...prevState,
        group: group,
        text: text,
      }));
      console.log(currentFilters);
    }
  };
  useEffect(() => {
    setText(text);
    setGroup(group);

    currentFilters.text = text;
    currentFilters.group = group;
    changeFilter(currentFilters);
  }, [handleClick, handleTextChange]);

  return (
    <div className="thread-filter">
      <input
        className="searchInput"
        onKeyDown={handleTextChange}
        onChange={(e) => setText(e.target.value)}
        placeholder="Szukaj..."
      />
      <nav>
        <p>Grupuj wg:</p>
        <div>
          {filterList.map((f) => (
            <button
              key={f}
              onClick={() => handleClick(f)}
              className={currentFilters.group === f ? "active" : ""}
            >
              {f}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
