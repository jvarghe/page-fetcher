/* M02W05 CHALLENGE: HTTP AND NODEJS: PAGE DOWNLOADER
 *
 * Let's use our previous knowledge of working with HTTP and file systems and
 * put them together.
 *
 * Implement a node app called `fetcher.js`. It should take two command line
 * arguments:
 *
 *     1. A URL
 *     2. A local file path
 *
 * It should download the resource at the URL to the local path on your machine.
 * Upon completion, it should print out a message like `Downloaded and saved
 * 1235 bytes to ./index.html`.
 *
 *
 * ASYNCHRONOUS OPERATIONS
 *
 * There are two operations in this problem which will take an unknown amount
 * of time:
 *
 *   1. You need to make an HTTP request and wait for the response.
 *   2. After the HTTP request is complete, you need to take the data you
 *      receive and write it to a file in your local filesystem.
 *
 * When you're trying to control the order of asynchronous operations, you can
 * use nested callbacks.
 *
 *
 * PSEUDOCODE
 *
 *   * When the program starts, you need to collect CLI information: the URL
 *     and the local file path where the response will be saved. Create
 *     variables for both of these.
 *
 *   * Call the Request Callback that will make the request, and collect and
 *     store the response object.
 *
 *   * Within the first callback, nest a second `writeFile()` callback that
 *     will asynchronously create and write a file on the local filesystem.
 *
 */


// IMPORTS
const request = require("request");
const fs = require("fs");


const saveNetworkResourceToFile = function() {

  // CAPTURE AND SORT CLI DATA
  const cliArguments = process.argv.splice(2);
  const url = cliArguments[0];
  const filePath = cliArguments[1];


  // CALLBACK 1: INVOKE THE REQUEST FUNCTION
  // Make a request for the given URL using the `request()` function.
  request(url, (error, response, body) => {

    // Error Handling: Print the error(s) if one occurred.
    if (error === true) {
      console.log(`request() Error: ${error}`);

      // If the request goes through...
    } else {

      // Print the response status code if a response was received.
      // console.log("Response Status Code:", response && response.statusCode);

      // Print the HTML for the URL to console.
      // console.log("Response Body:", body);



      // CALLBACK 2: WRITE THE RESPONSE BODY TO A FILE
      // Write the retrieved resource to a file on the local computer.
      fs.writeFile(filePath, body, (error) => {

        // If there is an error, log it to the terminal.
        if (error === true) {
          console.log(`writeFile() Error: ${error}`);

          // If there are no errors...
        } else {

          // Log results to console:
          console.log(`Downloaded Requested Resource and Saved it to ${filePath}!`);
          console.log(`The file is ${body.length} bytes.`);

        }

      });
    }

  });

};



// DRIVER CODE
saveNetworkResourceToFile();

