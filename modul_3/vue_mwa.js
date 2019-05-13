var app = new Vue({
	el: '#app',
	data: {
		///return {
		page: 'game',
		url: "https://api.jsonbin.io/b/5c49972e6dbfe317d4c3eeb1",
		bottomNav: null,
		teams: [],
		games: [],
		currentMatch: {},
		currenTeam: {},
		textToSend: null,
		authUser: false,
		posts: {},
		txtMessages:[],
		teamhome: null,
		teamguest:null

		//}

	},
	methods: {
		fetchData: function () {
			fetch(this.url)
				.then(function (data) {

					return data.json()
				})
				.then(function (myData) {
					console.log(myData)
					app.teams = myData.teams
					app.games = myData.games

				})

		},
		///////login
		login() {

			// https://firebase.google.com/docs/auth/web/google-signin

			var provider = new firebase.auth.GoogleAuthProvider();
			//
			// // How to Log In
			firebase.auth().signInWithPopup(provider);
			this.getPosts()

		},
		////////chat
		writeNewPost() {

			// https://firebase.google.com/docs/database/web/read-and-write


			// // Values
			var message = {
				message: this.textToSend,
				name: firebase.auth().currentUser.displayName

			};

			console.log(message);
			//
			//
			firebase.database().ref('spiderman').push(message);


			console.log("write");
			this.getPosts()
			
		},

		getPosts() {

			firebase.database().ref('spiderman').on('value', function (data) {
				//
				var posts = document.getElementById("posts");
				//posts.innerHTML = "";
				console.log(data.val());
				var messages = data.val();
				app.txtMessages=[]
				for (var key in messages) {
					var text = document.createElement("p");
					var element = messages[key];

					text.append(element.message);
					text.append(element.name);
					//posts.append(text);
					
					app.txtMessages.push({name:element.name, content:  element.message})
				}
				
				console.log(messages[key]);
				//
			})

			console.log("getting posts");
			setTimeout(() => {
           this.scrollToEnd();
         }, 600);

		},




		matchSelect(string, object) {
			this.page = string;
			this.currentMatch = object;
			this.teamhome = this.teams.find(obj => obj.teamname === object.teamhome);
			this.teamguest = this.teams.find(obj => obj.teamname === object.teamguest);
			
		},
		teamSelect(string, team) {
			this.page = string;
			this.currenTeam = this.teams.find(obj => obj.teamname === team);
			
		},
		
		scrollToEnd() {
     var container = this.$el.querySelector("#container");
     container.scrollTop = container.scrollHeight;
   }

	},

	created() {
		this.fetchData()
	}


})
