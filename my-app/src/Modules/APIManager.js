const remoteURL = "http://localhost:3000";

export default {
    //Login and Register

    addUser(newUser) {
      return fetch(`${remoteURL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      }).then(data => data.json())
    },
    searchUsername(email) {
      return fetch(`${remoteURL}/users?email=${email}`)
      .then(e => e.json()
      )
    },

    // Get Specific User Data
    getUserData(resource, userId) {
        return fetch(`${remoteURL}/${resource}?userId=${userId}`)
            .then(response => response.json())
    },
    // Get resources
    get(resource, id) {
        return fetch(`${remoteURL}/${resource}/${id}`).then(result => result.json())
    },
    getAll(resource) {
        return fetch(`${remoteURL}/${resource}`).then(result => result.json())
    },
    getExpand(resource, id) {
        return fetch(`${remoteURL}/${resource}/?folderId=${id}&_expand=folder&_expand=songPlan`).then(result => result.json())
    },
    getExpandGrade(resource, id) {
        return fetch(`${remoteURL}/${resource}/?gradeLevelId=${id}&_expand=keyword`).then(result => result.json())
    },
    delete(resource, id)  {
        return fetch(`${remoteURL}/${resource}/${id}`,{
            method: "DELETE"
        })
        .then(result => result.json())
    },
    post(resource, newObject) {
        return fetch(`${remoteURL}/${resource}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObject)
        }).then(response => response.json())
    },
    update(resource, editedObject) {
        return fetch(`${remoteURL}/${resource}/${editedObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedObject)
        }).then(response => response.json());

    }, getObjectWithDatabase(firstResource, id, secondResource) {
        return fetch(`${remoteURL}/${firstResource}/${id}?_embed=${secondResource}`)
            .then(response => response.json())
    
    }, getFriends(currentuserId) {
        return fetch(`http://localhost:3000/friendships?currentuserId=${currentuserId}&_expand=user`)
        .then(response => response.json());
      },
    searchPublicDatabase(search, resource, title) {
        return fetch(`${remoteURL}/${resource}?ifPublic=Yes, please make it Public!&${title}_like=${search}`)
            .then(response => response.json())
    },
    searchUserDatabaseMatch(resource, userId, search) {
        return fetch(`${remoteURL}/${resource}?userId=${userId}&title_like=${search}`)
            .then(response => response.json())
    },
    searchUserDatabase(resource, userId) {
        return fetch(`${remoteURL}/${resource}?userId=${userId}`)
            .then(response => response.json())
    },
    getAllPublic(resource){
        return fetch(`${remoteURL}/${resource}?ifPublic=Yes, please make it Public`)
        .then(response => response.json())
    },
    getAllComments(resource, songPlanId) {
        return fetch(`${remoteURL}/${resource}?songPlanId=${songPlanId}`)
        .then(response => response.json())
    },
    getCommentUserExpand(songPlanId) {
        return fetch(`${remoteURL}/comments?songPlanId=${songPlanId}&expand=user`)
        .then(response => response.json())
    }
}

