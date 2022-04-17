export class FREDPull {
    baseURL = 'https://api.stlouisfed.org/fred/'
    seriesURL = 'series/observations?series_id=';
    argsUrl;
    apiKey;
    url;

    constructor(series, options_obj) {
        this.series = series;
        this.options = typeof options_obj === 'undefined' ? '' : options_obj

        this.checkSeries = function() {
            try {
                if(typeof(this.series) !== 'string') throw new Error('Warning, the series was not set correctly.');
            } catch(err) {
                console.error(err)
            }
        };

        this.checkSeries();

        this.setOptions = function() {
            let args = new String();
            if(options_obj !== 'undefined') {
                
                Object.entries(this.options).forEach(([key,value]) => {
                    if(value !== '') { 
                        args += '&'.concat(key,'=',value);
                    };
                });   
                
                this.argsUrl = args;
            }
            
        };

        this.setOptions();
    };

    set setKey(apiValue) {
        this.apiKey = '&api_key='.concat(apiValue);
        this.url = this.baseURL.concat(this.seriesURL, this.series, this.argsUrl, this.apiKey);
    };

    async fetchData() {
        try {
            const res = await fetch(this.url);
            if(!res.ok) {
                const error_obj = await fetch(res.url);
                const error_res = await error_obj.json();

                throw Error(`${error_res.code}: ${error_res.error_message}`);
            }

            let data;
            switch(this.options?.file_type) {
                case 'json':
                    data = await res.json();
                    break;
                case 'undefined':
                case 'xml':
                    data = await res.text();
                    break;
                case 'txt':
                case 'xls':
                    data = res;
                    break;
            }
            return data;
        } catch(err) {
            throw err;
        }
    };
}
