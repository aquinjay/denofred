# denoFred
Deno module to connect to FRED API.

If you find this project helpful, consider staring this repo or making a donation to support this and future projects here via GitHub Sponsers: https://github.com/sponsors/aquinjay. 

# How to use

## Instantiate FRED object (S&P500 data example) and pull data

```
import {SeriesFred} from 'https://deno.land/x/denofred@v1.0.0/main.js'
import {FRED_KEY} from './keys.js'

const options = {
    observation_start: '2021-01-01',
    observation_end: '2022-01-01',
    file_type: 'json'
}

const fredObj = new SeriesFred(FRED_KEY, options);

try {
    const dta = await fredObj.fetchSeriesObservations('SP500');
    console.log(dta);
} catch(err) {
    console.error(err);
}
```

The secondary argument can be an object that includes a variety of key-values such as:

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
```

See the Fred API documentation for more information about requests and arguments: https://fred.stlouisfed.org/docs/api/fred

Note for the txt and xls file types, ```fredObj.fetchSeriesObservations()``` will save a .zip file called fredData.zip. To modify the location and file name, add a second argument to the above method with the location and name of the file with the .zip extension. Also include the flag ```--allow-write``` to allow deno to write the file.

When running your script, be sure to set the ```--allow-net``` flag as follows:

```
deno run --allow-net=api.stlouisfed.org
```

## Set your API Key
Create a FRED account and get your API key from: https://fred.stlouisfed.org/docs/api/api_key.html

## Methods

## Categories

```
const fredObj = new CategoryFred(FRED_KEY, options) // Instantiate object

fredObj.fetchCategory(category_id) // category_id is a single string
fredObj.fetchCategoryChildren(category_id)
fredObj.fetchCategoryRelated(category_id)
fredObj.fetchCategorySeries(category_id)
fredObj.fetchCategoryTags(category_id)
fredObj.fetchCategoryRelatedTags(category_id, tag_names) // tag_names is an array of strings
```

## Releases

```
const fredObj = new ReleasesFred(FRED_KEY, options) // Instantiate Object

fredObj.fetchReleases() // No arguments
fredObj.fetchReleasesDates() // No arguments
fredObj.fetchRelease(release_id) // release_id is a single string
fredObj.fetchReleaseDates(release_id)
fredObj.fetchReleaseSeries(release_id)
fredObj.fetchReleaseSources(release_id)
fredObj.fetchReleaseTags(relesase_id)
fredObj.fetchReleaseRelatedTags(release_id,tag_names) // tag_names is an array of strings
```                                  

### Series

```
const fredObj = new SeriesFred(FRED_KEY, options) // Instantiate Object

fredObj.fetchSeries(series_id); // series_id is a single string
fredObj.fetchSeriesCategories(series_id);
fredObj.fetchSeriesObservations(series_id, 'fredData.zip'); // second argument is optional. fredData.zip is default when saving zip files.
fredObj.fetchSeriesRelease(series_id);
fredObj.fetchSeriesSearch(text_obj); // text_obj is an array of strings
fredObj.fetchSeriesSearchTags(text_obj);
fredObj.fetchSeriesSearchRelatedTags(text_obj, tag_names); // tag_names is an array of strings
fredObj.fetchSeriesTags(series_id);
fredObj.fetchSeriesUpdates(); // No mandatory arguments
fredObj.fetchSeriesVintagedates(series_id);
```

### Sources

```
const fredObj = new SourcesFred(FERD_KEY, options) // Instantiate Object

fredObj.fetchSources() // No arguments
fredObj.fetchSource(source_id) // pass a single string
fredObj.fetchSourceReleases(source_id) // pass a single string
```

### Tags

```
const fredObj = new TagsFred(FRED_KEY, options) // Instantiate Object

fredObj.fetchTags() // No mandatory arguments
fredObj.fetchRelatedTags(tag_names) // array of strings.
fredObj.fetchTagsSeries(tag_names)
```
