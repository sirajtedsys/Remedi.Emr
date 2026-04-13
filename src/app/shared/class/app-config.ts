export class AppConfig {

    EnvType: 'dev' | 'webbuild' | 'mobile' = 'dev'
    url: string = ''
    constructor() {

        if (this.EnvType == 'webbuild') {
            let protocol = window.location.protocol
            const host = window.location.hostname; // e.g., "192.168.1.236"
            let port = window.location.port;       // "" if default
            let finalurl = protocol + '//' + host
            // let api = '/opapi.web/api/v1'
                  let api = '/opapi.web/api'


            if (!port) {
                this.url = finalurl + api
            }
            else {
                this.url = finalurl + ":" + port + api;
            }

            console.log(this.url);

        }
        else if (this.EnvType == 'mobile') {
            const storedUrl = localStorage.getItem('op_api_web_url'); // Retrieve from localStorage

            console.log(storedUrl);

            // console.log(this.IsMobileApp);

            // this.url = storedUrl + '/opapi.web/api/v1'
            
            this.url = storedUrl + '/opapi.web/api'
        }
        else {

            this.url = 'https://localhost:7045/api'; // Default URL if not found

        }



    }
}
