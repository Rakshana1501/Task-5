import { useState, useEffect } from "react";

export function Form() {
  const [usersdata, setUsersdata] = useState([]);
  const [searchbar, setSearchbar] = useState("");
  const [loadingeffect, setLoadingeffect] = useState(true);
  const [errormsg, setErrormsg] = useState("");

  const fetchUsers = () => {
    setLoadingeffect(true);
    setErrormsg("");

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("API doen't Fetch or check the Network");
        }
        return response.json();
      })
      .then((data) => {
        setUsersdata(data);
        setLoadingeffect(false);
      })
      .catch(() => {
        setErrormsg("Failed to fetch users. Please try again.");
        setLoadingeffect(false);
      });
  };

  useEffect(() => {
    let ignore = false;

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to get the user data");
        }
        return response.json();
      })
      .then((data) => {
        if (!ignore) {
          setUsersdata(data);
          setLoadingeffect(false);
        }
      })
      .catch(() => {
        if (!ignore) {
          setErrormsg("Failed to fetch users. Please try again.");
          setLoadingeffect(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const filteredUsers = usersdata.filter((user) =>
    user.name.toLowerCase().includes(searchbar.toLowerCase())
  );

  return (
    <div>
      <h2>User List</h2>

      <input
        type="text"
        placeholder="Rakshana....."
        value={searchbar}
        onChange={(e) => setSearchbar(e.target.value)}
      />

      <button onClick={fetchUsers}>
        Refresh
      </button>

      {loadingeffect && <p></p>}

      {errormsg && <p style={{ color: "red" }}>{errormsg}</p>}

      {!loadingeffect && !errormsg && filteredUsers.length === 0 && (
        <p>No users found.</p>
      )}

      {!loadingeffect && !errormsg && filteredUsers.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginTop: "10px",
            borderRadius: "5px"
          }}
        >
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>City: {user.address?.city}</p>
          <p>Phone: {user.phone}</p>
        </div>
      ))}
    </div>
  );
}
