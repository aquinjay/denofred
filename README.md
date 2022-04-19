# denoFred
Deno module to connect to FRED API

# How to use

## Instantiate FRED object (S&P500 data example)
```
const spData = new FREDPull('SP500');
```

You can add a secondary argument object that can take the following:

```
const options = {
  file_type: '',
  realtime_start: '',
  realtime_end: '',
  limit: '',
  offset: '',
  sort_order: '',
  observation_start: '',
  observation_end: '',
  units: '',
  frequency: '',
  aggregation_method: '',
  output_type: '',
  vintage_dates: ''
};

const spData = new FREDPull('SP500', options);
```
Learn more about options here: https://fred.stlouisfed.org/docs/api/fred/category_series.html

## Set your API Key
Create a FRED account and get your API key from: https://fred.stlouisfed.org/docs/api/api_key.html

Set your API key as below:
```
spData.setKey = 'yourAPIkey';
```

## Pull Data

```
const spResult = await spData.fetchData();
```
Note for the txt and xls file types, ```spData.fetchData()``` will save a .zip file called fredData.zip. To modify the location and file name, add a third argument during class instantiation with the location and name of the file with the .zip extension.

More to come :)
