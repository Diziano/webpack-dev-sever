import axios from 'axios';

class App {
    constructor() {
        this.userInfo = {};
        this.rootEl = document.getElementById('root');
    }

    async getUserInfo(username) {
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            
            const { name, bio, html_url, avatar_url } = response.data;

            this.userInfo = {
                name,
                bio,
                html_url,
                avatar_url
            }

            this.render();
        }catch(err) {
            console.warn('Erro na API');
        }
    }

    render() {
        this.rootEl.innerHTML = '';

        let runningEl = document.createElement('h1');
        runningEl.appendChild(document.createTextNode('Webpack is running...'));
        this.rootEl.appendChild(runningEl);

        let imgEl = document.createElement('img');
        imgEl.setAttribute('src', this.userInfo.avatar_url);

        let nameEl = document.createElement('strong');
        nameEl.appendChild(document.createTextNode(this.userInfo.name));

        let bioEl = document.createElement('p');
        bioEl.appendChild(document.createTextNode(this.userInfo.bio));

        let linkEl = document.createElement('a');
        linkEl.setAttribute('target', '_blank');
        linkEl.setAttribute('href', this.userInfo.html_url);
        linkEl.appendChild(document.createTextNode('Access GitHub'));

        let userEl = document.createElement('div');
        userEl.appendChild(imgEl);
        userEl.appendChild(nameEl);
        userEl.appendChild(bioEl);
        userEl.appendChild(linkEl);

        this.rootEl.appendChild(userEl);
    }
}

const app = new App();
app.getUserInfo('diziano');