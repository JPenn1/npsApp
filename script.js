'use strict';


function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}


function displayResults(responseJson, maxResults){
        
        //clear results
        $('.js-results-list').empty();
        //unhide
        $('.js-results').removeClass('hidden'); 
        const numResults = responseJson.data.length;
        for(let i = 0; i < numResults; i++)
        {
            $('.js-results-list').append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
            <p> ${responseJson.data[i].description}</p>
            </li>`);
        }
           
    }
    
function getParks(baseUrl, stateAbArray, maxResults, apiKey){
    console.log("getParks ran");
    //parameters
    const params ={
        stateCode: stateAbArray,
        api_key: apiKey,
        limit: maxResults
    }
    console.log(params);
    //url string
    const queryString = formatQueryParams(params);
    const url = baseUrl + '?' + queryString;
    console.log(url);  
        fetch(url)
            .then((response) => {
                return response.json();
           })
            .then(responseJson => displayResults(responseJson, maxResults))
            //the catch intiates the error
            .catch(error => alert(`unable to process request, try again.`));
             
       };

function watchForm(){
    $('#js-form').submit(event => {
        event.preventDefault();
        console.log('watchForm ran');
        const baseUrl = 'https://developer.nps.gov/api/v1/parks';
        const stateAbArray = $('#js-search-area').val().split(",");
        const maxResults = $('#js-max-results').val();
        const apiKey = `SMeYPca8WkFvcvHkTwtiaoW0vnok5PCUF4l3wvcm`; 
        getParks(baseUrl, stateAbArray, maxResults, apiKey);

        });
    };
    
    $(function() {
        console.log('App loaded! Waiting for submit!');
        watchForm();
      });