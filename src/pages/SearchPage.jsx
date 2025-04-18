import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const countries = [
  "India", "United States", "Canada", "United Kingdom", "Germany", "France",
 "Australia", "Brazil", "Japan", "South Korea", "Russia", "China"
];

function SearchPage() {
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState([]);
  const [searchByCountry, setSearchByCountry] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchByCountry && inputValue.trim()) {
      const response = await fetch(`https://www.reddit.com/search.json?q=${encodeURIComponent(inputValue)}&sort=top&limit=10`);
      const data = await response.json();
      const posts = data.data.children.map(post => ({
        title: post.data.title,
        permalink: post.data.permalink,
        id: post.data.id
      }));
      setResults(posts);
    } else if (!searchByCountry && inputValue.trim()) {
      const response = await fetch(`https://www.reddit.com/search.json?q=${inputValue}&type=user`);
      const data = await response.json();
      const users = data.data.children.map(item => item.data);
      setResults(users);
    }
  };

  const handleUserClick = (user) => {
    navigate(`/user/${user.name}`);
  };

  return (
    <div className='main-search-outer' >
      <h1>Reddit Search</h1>

      <div className='search-box' >
        <input
          type="text"
          placeholder={searchByCountry ? "Search Country" : "Search User"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          list={searchByCountry ? "country-list" : undefined}
        />
        {searchByCountry && (
          <datalist id="country-list">
            {countries.map(country => (
              <option key={country} value={country} />
            ))}
          </datalist>
        )}

        <button
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className='checkbox' >
        <label>
          <input
            type="checkbox"
            checked={searchByCountry}
            onChange={() => {
              setSearchByCountry(prev => !prev);
              setResults([]);
              setInputValue('');
            }}
          />
          Search by country
        </label>
      </div>

      <ol className='user-list-box' >
        {searchByCountry ? (
          results.map(post => (
            <li key={post.id}>
              <a
                href={`https://reddit.com${post.permalink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.title}
              </a>
            </li>
          ))
        ) : (
          results.map(user => (
            <li
              key={user.id}
              onClick={() => handleUserClick(user)}
            >
              {user.name}
            </li>
          ))
        )}
      </ol>
    </div>
  );
}

export default SearchPage;
