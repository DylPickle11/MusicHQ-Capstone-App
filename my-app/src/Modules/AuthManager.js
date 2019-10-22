const remoteURL = "http://localhost:3000";

export default {
    getUser(userName) {
		return fetch(`${remoteURL}/users?userName=${userName}`).then(result =>
			result.json()
		);
	},
    createUser(newUser) {
      return fetch(`${remoteURL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      }).then(data => data.json())
    },
    getUserById(id) {
		return fetch(`${remoteURL}/users/${id}`).then(result => result.json());
	}
};
