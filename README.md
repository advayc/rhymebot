# Rhymebot

Rhymebot is a Google Chrome extension that helps you find rhyming words for a given word. It enhances your writing experience by providing a quick and convenient way to explore different rhymes.

## Contributing

Contributions to Rhymebot are welcome! If you have any ideas, bug reports, or feature requests, please open an issue on the [GitHub repository](https://github.com/your-username/rhymebot).

1. Clone the repository to your local machine using `git clone https://github.com/advayc/rhymebot.git`.

2. First, you need to get an API key from [API Ninjas](https://api-ninjas.com/profile). This key is used to fetch rhyming words from their API.

3. Once you have your API key, open the `script.js` file in the root directory of the project. Find the line that contains `'X-Api-Key': 'YOUR_API_KEY'` and replace `'YOUR_API_KEY'` with the API key you got from API Ninjas.

4. Save the `script.js` file and load the extension into your Google Chrome browser. To do this, navigate to `chrome://extensions/` in your browser, enable "Developer mode", click "Load unpacked", and select the root directory of the Rhymebot project.

5. Now, you should see the Rhymebot extension in your Chrome toolbar. Click on it to open the extension.

6. In the extension, you'll see a form with a text input field and a submit button. Enter the word you want to find rhymes for in the text field and click "Submit".

7. The extension will display a list of words that rhyme with the word you entered.

Remember to keep your API key secret to prevent unauthorized usage.


## License

Rhymebot is licensed under the [MIT License](https://opensource.org/licenses/MIT).
